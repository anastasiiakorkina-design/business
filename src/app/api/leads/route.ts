import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { paginate } from "@/lib/utils";

// ─── Validation ─────────────────────────────────────────────────────────────

const CreateLeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().nullable(),
  message: z.string().max(2000).optional().nullable(),
  source: z.string().max(100).optional().nullable(),
});

const LeadQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().max(100).default(20),
  status: z
    .enum(["NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "DISQUALIFIED"])
    .optional(),
  search: z.string().optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
});

// ─── POST /api/leads ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const parsed = CreateLeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const { name, email, phone, message, source } = parsed.data;

    // Duplicate lead check within 24 hrs (same email)
    const existing = await prisma.lead.findFirst({
      where: {
        email: email.toLowerCase(),
        createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
    });

    if (existing) {
      // Silently succeed to avoid email enumeration
      return NextResponse.json(
        { success: true, message: "Thank you! We'll be in touch soon." },
        { status: 200 }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      null;

    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone?.trim() ?? null,
        message: message?.trim() ?? null,
        source: source?.trim() ?? null,
        ipAddress: ip,
        userAgent: req.headers.get("user-agent") ?? null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We'll be in touch soon.",
        id: lead.id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/leads]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ─── GET /api/leads ──────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const queryParsed = LeadQuerySchema.safeParse(
    Object.fromEntries(searchParams.entries())
  );

  if (!queryParsed.success) {
    return NextResponse.json(
      { error: "Invalid query parameters" },
      { status: 400 }
    );
  }

  const { page, perPage, status, search, from, to } = queryParsed.data;
  const { skip, take } = paginate(page, perPage);

  const where: Prisma.LeadWhereInput = {};

  if (status) where.status = status;
  if (from || to) {
    where.createdAt = {};
    if (from) where.createdAt.gte = new Date(from);
    if (to) where.createdAt.lte = new Date(to);
  }
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        message: true,
        source: true,
        status: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.lead.count({ where }),
  ]);

  return NextResponse.json({
    data: leads,
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
  });
}
