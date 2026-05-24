"use client";

import { useCallback, useEffect, useState } from "react";
import { Calendar, RefreshCw, Mail, Phone, Check, X, Clock, ExternalLink } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  status: string;
  scheduledAt: string | null;
  createdAt: string;
}

const STATUS_OPTIONS = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"];

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-400",
  CONFIRMED: "bg-blue-500/10 text-blue-400",
  COMPLETED: "bg-emerald-500/10 text-emerald-400",
  CANCELLED: "bg-red-500/10 text-red-400",
  NO_SHOW: "bg-white/5 text-white/30",
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const params = filter !== "ALL" ? `?status=${filter}` : "";
      const res = await fetch(`/api/bookings${params}`);
      const data = await res.json();
      setBookings(data.data ?? []);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchBookings();
  }

  const filtered = filter === "ALL" ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-montserrat)" }}>
            Bookings
          </h1>
          <p className="text-sm text-white/40 mt-0.5">Strategy call applications and bookings</p>
        </div>
        <button
          onClick={fetchBookings}
          className="flex items-center gap-2 rounded-sm border border-white/10 px-3 py-2 text-sm text-white/60 hover:text-white transition-colors"
        >
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 flex-wrap">
        {["ALL", ...STATUS_OPTIONS].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "rounded-sm px-3 py-1.5 text-xs font-medium transition-colors",
              filter === s
                ? "bg-[#D4AF37] text-[#0D1015]"
                : "bg-white/[0.04] text-white/40 hover:text-white"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw size={20} className="animate-spin text-[#D4AF37]" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-sm border border-white/[0.08] bg-[#171B22] p-12 text-center">
          <Calendar size={28} className="mx-auto mb-3 text-white/20" />
          <p className="text-white/40 text-sm">No bookings found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((booking) => (
            <div
              key={booking.id}
              className="rounded-sm border border-white/[0.08] bg-[#171B22] p-5"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white text-sm">{booking.name}</h3>
                    <span className={cn(
                      "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full",
                      STATUS_STYLES[booking.status] ?? "bg-white/5 text-white/30"
                    )}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/40">
                    <span className="flex items-center gap-1"><Mail size={11} />{booking.email}</span>
                    {booking.phone && <span className="flex items-center gap-1"><Phone size={11} />{booking.phone}</span>}
                    {booking.company && <span>· {booking.company}</span>}
                  </div>
                  {booking.message && (
                    <p className="mt-2 text-xs text-white/30 line-clamp-2">{booking.message}</p>
                  )}
                  <div className="mt-2 flex items-center gap-3 text-[10px] text-white/20">
                    <span className="flex items-center gap-1"><Clock size={10} />Applied {formatDate(booking.createdAt)}</span>
                    {booking.scheduledAt && (
                      <span className="flex items-center gap-1 text-[#D4AF37]/60">
                        <Calendar size={10} />Scheduled {formatDate(booking.scheduledAt)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                  {booking.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => updateStatus(booking.id, "CONFIRMED")}
                        className="flex items-center gap-1 rounded px-2.5 py-1.5 text-xs text-emerald-400/70 hover:bg-emerald-500/10 hover:text-emerald-400"
                      >
                        <Check size={12} /> Confirm
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, "CANCELLED")}
                        className="flex items-center gap-1 rounded px-2.5 py-1.5 text-xs text-red-400/60 hover:bg-red-500/10 hover:text-red-400"
                      >
                        <X size={12} /> Cancel
                      </button>
                    </>
                  )}
                  {booking.status === "CONFIRMED" && (
                    <button
                      onClick={() => updateStatus(booking.id, "COMPLETED")}
                      className="flex items-center gap-1 rounded px-2.5 py-1.5 text-xs text-blue-400/70 hover:bg-blue-500/10 hover:text-blue-400"
                    >
                      <Check size={12} /> Mark Complete
                    </button>
                  )}
                  <a
                    href={`mailto:${booking.email}`}
                    className="flex items-center gap-1 rounded px-2.5 py-1.5 text-xs text-white/30 hover:bg-white/[0.06] hover:text-white"
                  >
                    <ExternalLink size={12} /> Email
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
