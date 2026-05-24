"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Trash2, Eye, EyeOff, RefreshCw, X, Check, Video, Youtube, ExternalLink } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

interface VideoItem {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string | null;
  description: string | null;
  duration: string | null;
  viewCount: number;
  published: boolean;
  createdAt: string;
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/videos");
      const data = await res.json();
      setVideos(data.data ?? []);
    } catch {
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchVideos(); }, [fetchVideos]);

  async function togglePublished(id: string, current: boolean) {
    await fetch(`/api/videos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !current }),
    });
    fetchVideos();
  }

  async function deleteVideo(id: string) {
    if (!confirm("Delete this video?")) return;
    await fetch(`/api/videos/${id}`, { method: "DELETE" });
    fetchVideos();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-montserrat)" }}>
            Videos
          </h1>
          <p className="text-sm text-white/40 mt-0.5">Manage your video content library</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-sm bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#0D1015] hover:bg-[#e8c84a]"
        >
          <Plus size={15} /> Add Video
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw size={20} className="animate-spin text-[#D4AF37]" />
        </div>
      ) : videos.length === 0 ? (
        <div className="rounded-sm border border-white/[0.08] bg-[#171B22] p-12 text-center">
          <Video size={28} className="mx-auto mb-3 text-white/20" />
          <p className="text-white/40 text-sm">No videos yet. Add your first video.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video.id}
              className={cn(
                "rounded-sm border bg-[#171B22] overflow-hidden",
                video.published ? "border-[#D4AF37]/15" : "border-white/[0.06] opacity-60"
              )}
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-[#0D1015] relative">
                {video.thumbnailUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                ) : video.videoUrl.includes("youtube") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`https://img.youtube.com/vi/${video.videoUrl.replace(/.*[?&]v=/, "").split("&")[0]}/mqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Youtube size={32} className="text-white/10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {video.duration && (
                  <span className="absolute bottom-2 right-2 text-[10px] bg-black/80 text-white px-1.5 py-0.5 rounded">
                    {video.duration}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white text-sm leading-tight mb-1 line-clamp-2">{video.title}</h3>
                <div className="flex items-center gap-2 text-[10px] text-white/30 mb-3">
                  <span>{video.viewCount.toLocaleString()} views</span>
                  <span>·</span>
                  <span>{formatDate(video.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePublished(video.id, video.published)}
                    className="flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs text-white/50 hover:bg-white/[0.06] hover:text-white"
                  >
                    {video.published ? <EyeOff size={12} /> : <Eye size={12} />}
                    {video.published ? "Unpublish" : "Publish"}
                  </button>
                  {video.videoUrl && (
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs text-white/50 hover:bg-white/[0.06] hover:text-white"
                    >
                      <ExternalLink size={12} /> View
                    </a>
                  )}
                  <button
                    onClick={() => deleteVideo(video.id)}
                    className="ml-auto flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs text-red-400/60 hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && <AddVideoModal onClose={() => setShowModal(false)} onSave={() => { setShowModal(false); fetchVideos(); }} />}
    </div>
  );
}

function AddVideoModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [form, setForm] = useState({ title: "", videoUrl: "", description: "", duration: "" });
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!form.title || !form.videoUrl) return;
    setSaving(true);
    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, duration: form.duration ? parseInt(form.duration) : undefined }),
      });
      if (res.ok) onSave();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-sm border border-white/[0.08] bg-[#171B22] p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-white">Add Video</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white"><X size={18} /></button>
        </div>
        <div className="space-y-4">
          {[
            { key: "title", label: "Video Title", placeholder: "My Video Title" },
            { key: "videoUrl", label: "Video URL", placeholder: "https://youtube.com/watch?v=..." },
            { key: "duration", label: "Duration (optional)", placeholder: "12:34" },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-xs text-white/40 mb-1">{label}</label>
              <input
                value={form[key as keyof typeof form]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                className="w-full rounded-sm border border-white/[0.08] bg-[#0D1015] px-3 py-2 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#D4AF37]/40"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs text-white/40 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full rounded-sm border border-white/[0.08] bg-[#0D1015] px-3 py-2 text-sm text-white outline-none focus:border-[#D4AF37]/40 resize-none"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 rounded-sm border border-white/10 py-2 text-sm text-white/60 hover:text-white">
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving || !form.title || !form.videoUrl}
            className="flex-1 rounded-sm bg-[#D4AF37] py-2 text-sm font-semibold text-[#0D1015] hover:bg-[#e8c84a] disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {saving ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
            Add Video
          </button>
        </div>
      </div>
    </div>
  );
}
