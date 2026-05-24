import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// ─── Schemas ─────────────────────────────────────────────────────────────────

const CreateTestimonialSchema = z.object({
  name: z.string().min(2).max(100),
  title: z.string().max(150).optional().nullable(),
  company: z.string().max(100).optional().nullable(),
  content: z.string().min(10).max(2000),
  rating: z.number().int().min(1).max(5).default(5),
  photoUrl: z.string().url().optional().nullable(),
  videoUrl: z.string().url().optional().nullable(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

const ListQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).optional(),
  featured: z
    .string()
    .optional()
    .transform((v) => (v === "true" ? true : v === "false" ? false : undefined)),
});

// ─── GET /api/testimonials ────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = ListQuerySchema.safeParse(Object.fromEntries(searchParams.entries()));

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
    }

    const { limit, featured } = parsed.data;

    const where: Prisma.TestimonialWhereInput = {
      published: true,
    };
    if (featured !== undefined) where.featured = featured;

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
      take: limit,
      select: {
        id: true,
        name: true,
        title: true,
        company: true,
        content: true,
        rating: true,
        photoUrl: true,
        videoUrl: true,
        featured: true,
        sortOrder: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ data: testimonials });
  } catch (err) {
    console.error("[GET /api/testimonials]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── POST /api/testimonials ───────────────────────────────────────────────────

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

    const parsed = CreateTestimonialSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const testimonial = await prisma.testimonial.create({ data: parsed.data });

    return NextResponse.json({ data: testimonial }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/testimonials]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
