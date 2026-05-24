import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const UpdateVideoSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  videoUrl: z.string().min(5).max(500).optional(),
  thumbnailUrl: z.string().url().optional().nullable(),
  description: z.string().max(2000).optional().nullable(),
  duration: z.number().int().positive().optional().nullable(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  category: z.string().max(100).optional().nullable(),
  tags: z.array(z.string()).optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try { await requireAdmin(); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    const parsed = UpdateVideoSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed" }, { status: 422 });
    }
    const updated = await prisma.video.update({ where: { id }, data: parsed.data });
    return NextResponse.json({ data: updated });
  } catch (err) {
    console.error("[PATCH /api/videos/[id]]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try { await requireAdmin(); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    await prisma.video.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/videos/[id]]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
