import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify, generateExcerpt } from "@/lib/utils";

// ─── Schema ───────────────────────────────────────────────────────────────────

const UpdatePostSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  slug: z.string().min(3).max(220).optional(),
  content: z.string().min(10).optional(),
  excerpt: z.string().max(500).optional().nullable(),
  coverImage: z.string().url().optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  category: z.string().max(100).optional().nullable(),
  tags: z.array(z.string().max(50)).max(20).optional(),
  authorName: z.string().max(100).optional().nullable(),
  authorImage: z.string().url().optional().nullable(),
  readTime: z.number().int().positive().optional().nullable(),
  publishedAt: z.string().datetime().optional().nullable(),
  seoTitle: z.string().max(70).optional().nullable(),
  seoDesc: z.string().max(160).optional().nullable(),
});

// ─── GET /api/blog/[slug] ─────────────────────────────────────────────────────

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    let isAdmin = false;
    try {
      await requireAdmin();
      isAdmin = true;
    } catch {
      // public
    }

    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Public callers cannot see non-published posts
    if (!isAdmin && post.status !== "PUBLISHED") {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Increment view count (non-blocking)
    prisma.blogPost
      .update({ where: { slug }, data: { viewCount: { increment: 1 } } })
      .catch(() => {});

    return NextResponse.json({ data: post });
  } catch (err) {
    console.error("[GET /api/blog/[slug]]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── PATCH /api/blog/[slug] ───────────────────────────────────────────────────

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug } = await params;

    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = UpdatePostSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const data = parsed.data;
    const updateData: Record<string, unknown> = { ...data };

    // Handle slug change with uniqueness check
    if (data.slug && data.slug !== slug) {
      const slugConflict = await prisma.blogPost.findUnique({
        where: { slug: data.slug },
      });
      if (slugConflict) {
        updateData.slug = `${slugify(data.slug)}-${Date.now()}`;
      }
    } else if (data.title && !data.slug) {
      // If title changes but no explicit slug, keep existing slug
      delete updateData.slug;
    }

    // Auto-generate excerpt if content changed and excerpt not supplied
    if (data.content && !data.excerpt) {
      updateData.excerpt = generateExcerpt(data.content);
    }

    // Auto-recalculate readTime if content changed
    if (data.content && !data.readTime) {
      const wordCount = data.content.split(/\s+/).length;
      updateData.readTime = Math.max(1, Math.round(wordCount / 200));
    }

    // Set publishedAt when transitioning to PUBLISHED
    if (data.status === "PUBLISHED" && existing.status !== "PUBLISHED") {
      updateData.publishedAt = data.publishedAt
        ? new Date(data.publishedAt as string)
        : new Date();
    }

    const updated = await prisma.blogPost.update({
      where: { id: existing.id },
      data: updateData,
    });

    return NextResponse.json({ data: updated });
  } catch (err) {
    console.error("[PATCH /api/blog/[slug]]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── DELETE /api/blog/[slug] ──────────────────────────────────────────────────

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug } = await params;

    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await prisma.blogPost.delete({ where: { slug } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/blog/[slug]]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
