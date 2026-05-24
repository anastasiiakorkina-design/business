import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const UpdateServiceSchema = z.object({
  title: z.string().min(2).max(200).optional(),
  slug: z.string().min(2).max(220).optional(),
  description: z.string().max(5000).optional(),
  price: z.number().positive().optional().nullable(),
  priceLabel: z.string().max(100).optional().nullable(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
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
    const parsed = UpdateServiceSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed" }, { status: 422 });
    }
    const updated = await prisma.service.update({ where: { id }, data: parsed.data });
    return NextResponse.json({ data: updated });
  } catch (err) {
    console.error("[PATCH /api/services/[id]]", err);
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
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/services/[id]]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
