import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";

// ─── Schemas ──────────────────────────────────────────────────────────────────

const CreateServiceSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(120).optional(),
  description: z.string().min(10).max(5000),
  shortDesc: z.string().max(300).optional().nullable(),
  price: z.number().positive().optional().nullable(),
  priceLabel: z.string().max(50).optional().nullable(),
  features: z.array(z.string().max(200)).max(30).default([]),
  icon: z.string().max(50).optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  active: z.boolean().default(true),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

// ─── GET /api/services ────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const showAll = searchParams.get("all") === "true";

    let isAdmin = false;
    try {
      await requireAdmin();
      isAdmin = true;
    } catch {
      // public
    }

    const where: Prisma.ServiceWhereInput = {};
    if (!isAdmin || !showAll) {
      where.active = true;
    }

    const services = await prisma.service.findMany({
      where,
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
    });

    return NextResponse.json({ data: services });
  } catch (err) {
    console.error("[GET /api/services]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── POST /api/services ───────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = CreateServiceSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const data = parsed.data;

    // Auto-generate slug if not provided
    let slug = data.slug ?? slugify(data.name);
    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const service = await prisma.service.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        shortDesc: data.shortDesc ?? null,
        price: data.price ?? null,
        priceLabel: data.priceLabel ?? null,
        features: data.features,
        icon: data.icon ?? null,
        imageUrl: data.imageUrl ?? null,
        active: data.active,
        featured: data.featured,
        sortOrder: data.sortOrder,
      },
    });

    return NextResponse.json({ data: service }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/services]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
