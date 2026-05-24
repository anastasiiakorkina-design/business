"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  FileText,
  Calendar,
  BarChart2,
  Tag,
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  status: PostStatus;
  category: string | null;
  tags: string[];
  authorName: string | null;
  readTime: number | null;
  publishedAt: string | null;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<PostStatus, string> = {
  PUBLISHED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  DRAFT: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  ARCHIVED: "bg-white/5 text-white/30 border-white/10",
};

function StatusBadge({ status }: { status: PostStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        STATUS_STYLES[status]
      )}
    >
      {status.toLowerCase()}
    </span>
  );
}

// ─── Quick Edit Row ───────────────────────────────────────────────────────────

function QuickEditTitle({
  postId: _postId,
  slug,
  initialTitle,
  onSave,
}: {
  postId: string;
  slug: string;
  initialTitle: string;
  onSave: (title: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!title.trim() || title === initialTitle) {
      setEditing(false);
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/blog/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error("Failed");
      onSave(title);
      setEditing(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="group flex items-center gap-1.5 text-left"
        title="Click to edit title"
      >
        <span className="text-sm font-medium text-white/80 group-hover:text-white">
          {title}
        </span>
        <Edit2
          size={11}
          className="flex-shrink-0 text-white/20 group-hover:text-white/50"
        />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <input
        autoFocus
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") save();
          if (e.key === "Escape") setEditing(false);
        }}
        className="flex-1 rounded border border-[#D4AF37]/40 bg-[#D4AF37]/5 px-2 py-0.5 text-sm text-white outline-none"
      />
      <button
        onClick={save}
        disabled={saving}
        className="rounded p-0.5 text-emerald-400 hover:bg-emerald-500/10"
      >
        {saving ? (
          <RefreshCw size={12} className="animate-spin" />
        ) : (
          <Check size={12} />
        )}
      </button>
      <button
        onClick={() => {
          setTitle(initialTitle);
          setEditing(false);
        }}
        className="rounded p-0.5 text-white/30 hover:text-white"
      >
        <X size={12} />
      </button>
    </div>
  );
}

// ─── New Post Modal ───────────────────────────────────────────────────────────

function NewPostModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (post: BlogPost) => void;
}) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<PostStatus>("DRAFT");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!content.trim()) {
      setError("Content is required");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          status,
          category: category || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed");
      }
      const data = await res.json();
      onCreate(data.data);
      onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0D1015] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
          <h2 className="text-sm font-bold text-white">New Blog Post</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/40">
              Title *
            </label>
            <input
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-[#D4AF37]/40"
              placeholder="Post title…"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/40">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PostStatus)}
                className="w-full rounded-lg border border-white/10 bg-[#0D1015] px-3 py-2 text-sm text-white outline-none focus:border-[#D4AF37]/40"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/40">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-[#D4AF37]/40"
                placeholder="Business"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/40">
              Content *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-[#D4AF37]/40"
              placeholder="Write your post content here… (Markdown supported)"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/60 hover:border-white/20 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-2 text-sm font-bold text-[#0D1015] disabled:opacity-60"
            >
              {saving ? (
                <RefreshCw size={13} className="animate-spin" />
              ) : (
                <FileText size={13} />
              )}
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 15,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<PostStatus | "">("");
  const [showNewModal, setShowNewModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchPosts = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          perPage: "15",
        });
        if (search) params.set("search", search);
        if (filterStatus) params.set("status", filterStatus);

        const res = await fetch(`/api/blog?${params}`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setPosts(data.data ?? []);
        setPagination(data.pagination);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [search, filterStatus]
  );

  useEffect(() => {
    const t = setTimeout(() => fetchPosts(1), 300);
    return () => clearTimeout(t);
  }, [fetchPosts]);

  async function toggleStatus(post: BlogPost) {
    const nextStatus: PostStatus =
      post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, status: nextStatus } : p))
    );
    try {
      await fetch(`/api/blog/${post.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
    } catch (e) {
      console.error(e);
      fetchPosts(pagination.page);
    }
  }

  async function deletePost(slug: string) {
    try {
      await fetch(`/api/blog/${slug}`, { method: "DELETE" });
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
      setDeleteConfirm(null);
      setPagination((p) => ({ ...p, total: p.total - 1 }));
    } catch (e) {
      console.error(e);
    }
  }

  const publishedCount = posts.filter((p) => p.status === "PUBLISHED").length;
  const draftCount = posts.filter((p) => p.status === "DRAFT").length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Blog Posts</h1>
          <p className="text-xs text-white/40">
            {pagination.total} total · {publishedCount} published · {draftCount} draft
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchPosts(pagination.page)}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/60 hover:border-white/20 hover:text-white"
          >
            <RefreshCw size={13} className={cn(loading && "animate-spin")} />
            Refresh
          </button>
          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-1.5 rounded-lg bg-[#D4AF37] px-3 py-1.5 text-xs font-bold text-[#0D1015] hover:opacity-90"
          >
            <Plus size={13} />
            New Post
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            type="text"
            placeholder="Search posts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-white placeholder-white/25 outline-none focus:border-[#D4AF37]/40"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as PostStatus | "")}
          className="rounded-lg border border-white/10 bg-[#0D1015] py-2 pl-3 pr-8 text-sm text-white/70 outline-none focus:border-[#D4AF37]/40"
        >
          <option value="">All statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-white/5 bg-[#0D1015]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                  Title
                </th>
                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                  Category
                </th>
                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                  Status
                </th>
                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                  Stats
                </th>
                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                  Date
                </th>
                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-white/[0.03]">
                    {[...Array(6)].map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 animate-pulse rounded bg-white/5" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : posts.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-16 text-center text-sm text-white/30"
                  >
                    No posts found.{" "}
                    <button
                      onClick={() => setShowNewModal(true)}
                      className="text-[#D4AF37] hover:underline"
                    >
                      Create one
                    </button>
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-white/[0.03] transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3 max-w-xs">
                      <QuickEditTitle
                        postId={post.id}
                        slug={post.slug}
                        initialTitle={post.title}
                        onSave={(newTitle) =>
                          setPosts((prev) =>
                            prev.map((p) =>
                              p.id === post.id ? { ...p, title: newTitle } : p
                            )
                          )
                        }
                      />
                      <div className="mt-0.5 flex items-center gap-2">
                        <span className="text-[11px] text-white/25">
                          /{post.slug}
                        </span>
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-0.5 text-[10px] text-white/25"
                          >
                            <Tag size={8} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-white/40">
                        {post.category ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={post.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 text-[11px] text-white/35">
                        <span className="flex items-center gap-1">
                          <BarChart2 size={10} />
                          {post.viewCount}
                        </span>
                        {post.readTime && (
                          <span>{post.readTime}m read</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-[11px] text-white/35">
                        <Calendar size={10} />
                        {post.publishedAt
                          ? formatDate(post.publishedAt)
                          : formatDate(post.createdAt)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {/* Toggle publish */}
                        <button
                          onClick={() => toggleStatus(post)}
                          className={cn(
                            "rounded p-1.5 transition-colors",
                            post.status === "PUBLISHED"
                              ? "text-emerald-400 hover:bg-emerald-500/10"
                              : "text-white/25 hover:bg-white/5 hover:text-white"
                          )}
                          title={
                            post.status === "PUBLISHED" ? "Unpublish" : "Publish"
                          }
                        >
                          {post.status === "PUBLISHED" ? (
                            <Eye size={13} />
                          ) : (
                            <EyeOff size={13} />
                          )}
                        </button>

                        {/* View live */}
                        {post.status === "PUBLISHED" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="rounded p-1.5 text-white/25 hover:bg-white/5 hover:text-white"
                            title="View live"
                          >
                            <Eye size={13} />
                          </Link>
                        )}

                        {/* Delete */}
                        {deleteConfirm === post.slug ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => deletePost(post.slug)}
                              className="rounded p-1 text-red-400 hover:bg-red-500/10"
                            >
                              <Check size={12} />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="rounded p-1 text-white/30 hover:text-white"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(post.slug)}
                            className="rounded p-1.5 text-white/20 hover:bg-red-500/10 hover:text-red-400"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-white/5 px-4 py-3">
            <span className="text-xs text-white/30">
              {pagination.total} posts
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => fetchPosts(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="rounded p-1.5 text-white/30 hover:text-white disabled:opacity-30"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="px-2 text-xs text-white/50">
                {pagination.page} / {pagination.totalPages}
              </span>
              <button
                onClick={() => fetchPosts(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                className="rounded p-1.5 text-white/30 hover:text-white disabled:opacity-30"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* New Post Modal */}
      {showNewModal && (
        <NewPostModal
          onClose={() => setShowNewModal(false)}
          onCreate={(post) => {
            setPosts((prev) => [post, ...prev]);
            setPagination((p) => ({ ...p, total: p.total + 1 }));
          }}
        />
      )}
    </div>
  );
}
