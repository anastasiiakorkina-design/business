import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// ─── Schema ───────────────────────────────────────────────────────────────────

const UpdateTestimonialSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  title: z.string().max(150).optional().nullable(),
  company: z.string().max(100).optional().nullable(),
  content: z.string().min(10).max(2000).optional(),
  rating: z.number().int().min(1).max(5).optional(),
  photoUrl: z.string().url().optional().nullable(),
  videoUrl: z.string().url().optional().nullable(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

// ─── PATCH /api/testimonials/[id] ────────────────────────────────────────────

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = UpdateTestimonialSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const updated = await prisma.testimonial.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json({ data: updated });
  } catch (err) {
    console.error("[PATCH /api/testimonials/[id]]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── DELETE /api/testimonials/[id] ───────────────────────────────────────────

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    await prisma.testimonial.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/testimonials/[id]]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
