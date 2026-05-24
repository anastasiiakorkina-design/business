import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { paginate } from "@/lib/utils";

// ─── Schemas ──────────────────────────────────────────────────────────────────

const CreateBookingSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional().nullable(),
  service: z.string().max(100).optional().nullable(),
  message: z.string().max(2000).optional().nullable(),
  preferredAt: z.string().datetime().optional().nullable(),
});

const ListQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().max(100).default(20),
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]).optional(),
  search: z.string().optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
});

// ─── POST /api/bookings ───────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = CreateBookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { name, email, phone, service, message, preferredAt } = parsed.data;

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      null;

    // Rate-limit: one booking request per email per 24 hrs
    const recentBooking = await prisma.booking.findFirst({
      where: {
        email: email.toLowerCase(),
        createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
    });

    if (recentBooking) {
      return NextResponse.json(
        {
          success: true,
          message:
            "Your booking request has been received. We'll confirm shortly.",
        },
        { status: 200 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone?.trim() ?? null,
        service: service?.trim() ?? null,
        message: message?.trim() ?? null,
        preferredAt: preferredAt ? new Date(preferredAt) : null,
        ipAddress: ip,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Your booking request has been received. We'll confirm shortly.",
        id: booking.id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/bookings]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── GET /api/bookings ────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const queryParsed = ListQuerySchema.safeParse(
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

  const where: Prisma.BookingWhereInput = {};

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
      { service: { contains: search, mode: "insensitive" } },
    ];
  }

  try {
    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({
      data: bookings,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (err) {
    console.error("[GET /api/bookings]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
