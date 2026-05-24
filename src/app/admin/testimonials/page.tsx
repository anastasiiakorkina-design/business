"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Star,
  Eye,
  EyeOff,
  RefreshCw,
  X,
  Check,
  ImageIcon,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Testimonial {
  id: string;
  name: string;
  title: string | null;
  company: string | null;
  content: string;
  rating: number;
  photoUrl: string | null;
  videoUrl: string | null;
  published: boolean;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
}

type FormData = Omit<Testimonial, "id" | "createdAt">;

const EMPTY_FORM: FormData = {
  name: "",
  title: null,
  company: null,
  content: "",
  rating: 5,
  photoUrl: null,
  videoUrl: null,
  published: false,
  featured: false,
  sortOrder: 0,
};

// ─── Star Rating Input ────────────────────────────────────────────────────────

function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={18}
            className={cn(
              (hover || value) >= star
                ? "fill-[#D4AF37] text-[#D4AF37]"
                : "text-white/20"
            )}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Form Modal ───────────────────────────────────────────────────────────────

function TestimonialModal({
  initial,
  onClose,
  onSave,
}: {
  initial?: Testimonial | null;
  onClose: () => void;
  onSave: (data: FormData, id?: string) => Promise<void>;
}) {
  const [form, setForm] = useState<FormData>(
    initial
      ? {
          name: initial.name,
          title: initial.title,
          company: initial.company,
          content: initial.content,
          rating: initial.rating,
          photoUrl: initial.photoUrl,
          videoUrl: initial.videoUrl,
          published: initial.published,
          featured: initial.featured,
          sortOrder: initial.sortOrder,
        }
      : { ...EMPTY_FORM }
  );
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const photoInputRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.length < 2) e.name = "Name is required";
    if (!form.content.trim() || form.content.length < 10)
      e.content = "Content must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      await onSave(form, initial?.id);
      onClose();
    } catch (err) {
      console.error(err);
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
      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0D1015] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
          <h2 className="text-sm font-bold tracking-wide text-white">
            {initial ? "Edit Testimonial" : "Add Testimonial"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-white/30 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {/* Photo URL */}
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/40">
              Photo URL
            </label>
            <div className="flex gap-2">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5">
                {form.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={form.photoUrl}
                    alt="photo"
                    className="h-full w-full object-cover"
                    onError={() => set("photoUrl", null)}
                  />
                ) : (
                  <ImageIcon size={14} className="text-white/20" />
                )}
              </div>
              <input
                type="url"
                value={form.photoUrl ?? ""}
                onChange={(e) => set("photoUrl", e.target.value || null)}
                placeholder="https://example.com/photo.jpg"
                className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-[#D4AF37]/40"
              />
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="flex items-center gap-1 rounded-lg border border-white/10 px-2 py-2 text-xs text-white/40 hover:border-white/20 hover:text-white"
                title="Upload (paste URL manually)"
              >
                <Upload size={13} />
              </button>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/40">
              Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={cn(
                "w-full rounded-lg border bg-white/[0.03] px-3 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-[#D4AF37]/40",
                errors.name ? "border-red-500/50" : "border-white/10"
              )}
              placeholder="Jane Smith"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Title + Company */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/40">
                Title
              </label>
              <input
                type="text"
                value={form.title ?? ""}
                onChange={(e) => set("title", e.target.value || null)}
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-[#D4AF37]/40"
                placeholder="CEO"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/40">
                Company
              </label>
              <input
                type="text"
                value={form.company ?? ""}
                onChange={(e) => set("company", e.target.value || null)}
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-[#D4AF37]/40"
                placeholder="Acme Inc."
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/40">
              Rating
            </label>
            <StarRatingInput
              value={form.rating}
              onChange={(v) => set("rating", v)}
            />
          </div>

          {/* Content */}
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/40">
              Testimonial *
            </label>
            <textarea
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              rows={4}
              className={cn(
                "w-full resize-none rounded-lg border bg-white/[0.03] px-3 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-[#D4AF37]/40",
                errors.content ? "border-red-500/50" : "border-white/10"
              )}
              placeholder="Share your experience…"
            />
            {errors.content && (
              <p className="mt-1 text-xs text-red-400">{errors.content}</p>
            )}
            <p className="mt-1 text-right text-[10px] text-white/25">
              {form.content.length}/2000
            </p>
          </div>

          {/* Video URL */}
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/40">
              Video URL (optional)
            </label>
            <input
              type="url"
              value={form.videoUrl ?? ""}
              onChange={(e) => set("videoUrl", e.target.value || null)}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-[#D4AF37]/40"
              placeholder="https://youtube.com/watch?v=…"
            />
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            {(["published", "featured"] as const).map((key) => (
              <label key={key} className="flex cursor-pointer items-center gap-2">
                <div
                  onClick={() => set(key, !form[key])}
                  className={cn(
                    "relative h-5 w-9 rounded-full transition-colors",
                    form[key] ? "bg-[#D4AF37]" : "bg-white/10"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
                      form[key] ? "translate-x-4" : "translate-x-0.5"
                    )}
                  />
                </div>
                <span className="text-xs font-medium capitalize text-white/60">
                  {key}
                </span>
              </label>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#0D1015] transition-opacity disabled:opacity-60"
            >
              {saving ? (
                <RefreshCw size={13} className="animate-spin" />
              ) : (
                <Check size={13} />
              )}
              {initial ? "Save Changes" : "Add Testimonial"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Testimonial Card ─────────────────────────────────────────────────────────

function TestimonialCard({
  t,
  onEdit,
  onDelete,
  onTogglePublish,
}: {
  t: Testimonial;
  onEdit: (t: Testimonial) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string, published: boolean) => void;
}) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  return (
    <div
      className={cn(
        "group relative rounded-xl border p-5 transition-all",
        t.published
          ? "border-white/8 bg-[#0D1015]"
          : "border-white/5 bg-[#0D1015]/60"
      )}
    >
      {t.featured && (
        <span className="absolute right-4 top-4 rounded-full bg-[#D4AF37]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]">
          Featured
        </span>
      )}

      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D4AF37]/10 text-sm font-bold text-[#D4AF37]">
          {t.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={t.photoUrl}
              alt={t.name}
              className="h-full w-full object-cover"
            />
          ) : (
            t.name[0]?.toUpperCase()
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white/90">{t.name}</p>
          {(t.title || t.company) && (
            <p className="text-[11px] text-white/40">
              {[t.title, t.company].filter(Boolean).join(" · ")}
            </p>
          )}
          <div className="mt-1 flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={cn(
                  i < t.rating
                    ? "fill-[#D4AF37] text-[#D4AF37]"
                    : "text-white/10"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/50">
        "{t.content}"
      </p>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onTogglePublish(t.id, !t.published)}
            className={cn(
              "flex items-center gap-1 rounded px-2 py-1 text-[11px] transition-colors",
              t.published
                ? "text-emerald-400 hover:bg-emerald-500/10"
                : "text-white/30 hover:bg-white/5 hover:text-white"
            )}
          >
            {t.published ? (
              <Eye size={11} />
            ) : (
              <EyeOff size={11} />
            )}
            {t.published ? "Published" : "Draft"}
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(t)}
            className="rounded p-1.5 text-white/30 hover:bg-white/5 hover:text-white"
          >
            <Edit2 size={13} />
          </button>
          {deleteConfirm ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onDelete(t.id)}
                className="rounded p-1 text-red-400 hover:bg-red-500/10"
              >
                <Check size={13} />
              </button>
              <button
                onClick={() => setDeleteConfirm(false)}
                className="rounded p-1 text-white/30 hover:text-white"
              >
                <X size={13} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setDeleteConfirm(true)}
              className="rounded p-1.5 text-white/20 hover:bg-red-500/10 hover:text-red-400"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Testimonial | null>(null);
  const [filterPublished, setFilterPublished] = useState<"all" | "published" | "draft">("all");

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch admin view — all testimonials including unpublished
      const res = await fetch("/api/testimonials?limit=100");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setTestimonials(data.data ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  async function handleSave(form: FormData, id?: string) {
    if (id) {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update");
      const data = await res.json();
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? data.data : t))
      );
    } else {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create");
      const data = await res.json();
      setTestimonials((prev) => [data.data, ...prev]);
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  }

  async function handleTogglePublish(id: string, published: boolean) {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, published } : t))
    );
    try {
      await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published }),
      });
    } catch (e) {
      console.error(e);
      fetchTestimonials();
    }
  }

  const filtered = testimonials.filter((t) => {
    if (filterPublished === "published") return t.published;
    if (filterPublished === "draft") return !t.published;
    return true;
  });

  const publishedCount = testimonials.filter((t) => t.published).length;
  const draftCount = testimonials.filter((t) => !t.published).length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Testimonials</h1>
          <p className="text-xs text-white/40">
            {publishedCount} published · {draftCount} draft
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchTestimonials()}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/60 hover:border-white/20 hover:text-white"
          >
            <RefreshCw size={13} className={cn(loading && "animate-spin")} />
            Refresh
          </button>
          <button
            onClick={() => {
              setEditTarget(null);
              setShowModal(true);
            }}
            className="flex items-center gap-1.5 rounded-lg bg-[#D4AF37] px-3 py-1.5 text-xs font-bold text-[#0D1015] transition-opacity hover:opacity-90"
          >
            <Plus size={13} />
            Add Testimonial
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 rounded-lg border border-white/5 bg-white/[0.02] p-1 w-fit">
        {(["all", "published", "draft"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilterPublished(f)}
            className={cn(
              "rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors",
              filterPublished === f
                ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                : "text-white/40 hover:text-white/70"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-xl border border-white/5 bg-[#0D1015]"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-white/5 bg-[#0D1015] py-16 text-center">
          <p className="text-sm text-white/30">No testimonials found.</p>
          <button
            onClick={() => {
              setEditTarget(null);
              setShowModal(true);
            }}
            className="mt-3 text-xs text-[#D4AF37] hover:underline"
          >
            Add the first one
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((t) => (
            <TestimonialCard
              key={t.id}
              t={t}
              onEdit={(t) => {
                setEditTarget(t);
                setShowModal(true);
              }}
              onDelete={handleDelete}
              onTogglePublish={handleTogglePublish}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <TestimonialModal
          initial={editTarget}
          onClose={() => {
            setShowModal(false);
            setEditTarget(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
