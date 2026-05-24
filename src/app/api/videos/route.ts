import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { paginate } from "@/lib/utils";

const CreateVideoSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(220).optional(),
  videoUrl: z.string().min(5).max(500),
  thumbnailUrl: z.string().url().optional().nullable(),
  description: z.string().max(2000).optional().nullable(),
  duration: z.number().int().positive().optional().nullable(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  category: z.string().max(100).optional().nullable(),
  tags: z.array(z.string()).default([]),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const perPage = Math.min(parseInt(searchParams.get("perPage") ?? "20", 10), 50);
  const { skip, take } = paginate(page, perPage);

  let isAdmin = false;
  try { await requireAdmin(); isAdmin = true; } catch {}

  const where: Prisma.VideoWhereInput = {};
  if (!isAdmin) where.published = true;

  try {
    const [videos, total] = await Promise.all([
      prisma.video.findMany({ where, skip, take, orderBy: { createdAt: "desc" } }),
      prisma.video.count({ where }),
    ]);
    return NextResponse.json({ data: videos, total, page, perPage });
  } catch (err) {
    console.error("[GET /api/videos]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try { await requireAdmin(); } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    const parsed = CreateVideoSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
    }
    const data = parsed.data;
    // Auto-generate slug from title if not provided
    const slug = data.slug ?? data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const video = await prisma.video.create({ data: { ...data, slug } });
    return NextResponse.json({ data: video }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/videos]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
