import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { paginate, slugify, generateExcerpt } from "@/lib/utils";

// ─── Schemas ──────────────────────────────────────────────────────────────────

const CreatePostSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(220).optional(),
  content: z.string().min(10),
  excerpt: z.string().max(500).optional().nullable(),
  coverImage: z.string().url().optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  category: z.string().max(100).optional().nullable(),
  tags: z.array(z.string().max(50)).max(20).default([]),
  authorName: z.string().max(100).optional().nullable(),
  authorImage: z.string().url().optional().nullable(),
  readTime: z.number().int().positive().optional().nullable(),
  publishedAt: z.string().datetime().optional().nullable(),
  seoTitle: z.string().max(70).optional().nullable(),
  seoDesc: z.string().max(160).optional().nullable(),
});

const ListQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().max(50).default(10),
  category: z.string().optional(),
  tag: z.string().optional(),
  search: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
});

// ─── GET /api/blog ────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryParsed = ListQuerySchema.safeParse(
    Object.fromEntries(searchParams.entries())
  );

  if (!queryParsed.success) {
    return NextResponse.json(
      { error: "Invalid query parameters", issues: queryParsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Check if caller is admin (optional — public gets published only)
  let isAdmin = false;
  try {
    await requireAdmin();
    isAdmin = true;
  } catch {
    // public access
  }

  const { page, perPage, category, tag, search, status } = queryParsed.data;
  const { skip, take } = paginate(page, perPage);

  const where: Prisma.BlogPostWhereInput = {};

  // Non-admin callers only see published posts
  if (!isAdmin) {
    where.status = "PUBLISHED";
  } else if (status) {
    where.status = status;
  }

  if (category) where.category = { equals: category, mode: "insensitive" };
  if (tag) where.tags = { has: tag };
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { excerpt: { contains: search, mode: "insensitive" } },
    ];
  }

  try {
    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        skip,
        take,
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          coverImage: true,
          status: true,
          category: true,
          tags: true,
          authorName: true,
          authorImage: true,
          readTime: true,
          publishedAt: true,
          viewCount: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      data: posts,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (err) {
    console.error("[GET /api/blog]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── POST /api/blog ───────────────────────────────────────────────────────────

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

    const parsed = CreatePostSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const data = parsed.data;

    // Auto-generate slug if not provided
    const rawSlug = data.slug ?? slugify(data.title);
    let slug = rawSlug;

    // Ensure slug uniqueness
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      slug = `${rawSlug}-${Date.now()}`;
    }

    // Auto-generate excerpt if not provided
    const excerpt = data.excerpt ?? generateExcerpt(data.content);

    // Auto-calculate read time if not provided (~200 words/min)
    const wordCount = data.content.split(/\s+/).length;
    const readTime = data.readTime ?? Math.max(1, Math.round(wordCount / 200));

    // Set publishedAt when status is PUBLISHED
    const publishedAt =
      data.status === "PUBLISHED"
        ? data.publishedAt
          ? new Date(data.publishedAt)
          : new Date()
        : null;

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug,
        excerpt,
        content: data.content,
        coverImage: data.coverImage ?? null,
        status: data.status,
        category: data.category ?? null,
        tags: data.tags,
        authorName: data.authorName ?? null,
        authorImage: data.authorImage ?? null,
        readTime,
        publishedAt,
        seoTitle: data.seoTitle ?? null,
        seoDesc: data.seoDesc ?? null,
      },
    });

    return NextResponse.json({ data: post }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/blog]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
