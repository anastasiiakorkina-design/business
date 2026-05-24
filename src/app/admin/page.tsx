"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  TrendingUp,
  DollarSign,
  CalendarCheck,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Star,
  Plus,
  Eye,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { cn, formatDate, formatCurrency } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatCard {
  label: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  source: string | null;
  status: string;
  createdAt: string;
}

interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  published: boolean;
  createdAt: string;
}

// ─── Revenue Chart (SVG) ──────────────────────────────────────────────────────

function RevenueChart() {
  // Placeholder monthly revenue data
  const data = [18000, 24000, 21000, 32000, 28000, 38000, 35000, 42000, 39000, 48000, 45000, 52000];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const max = Math.max(...data);
  const height = 120;
  const width = 600;
  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding;

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * chartWidth;
    const y = padding + (1 - val / max) * chartHeight;
    return `${x},${y}`;
  });

  const areaPath = `M ${points.join(" L ")} L ${padding + chartWidth},${height} L ${padding},${height} Z`;
  const linePath = `M ${points.join(" L ")}`;

  return (
    <div className="relative w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${width} ${height + 24}`}
        className="w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((frac) => (
          <line
            key={frac}
            x1={padding}
            y1={padding + frac * chartHeight}
            x2={padding + chartWidth}
            y2={padding + frac * chartHeight}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}

        {/* Area fill */}
        <path d={areaPath} fill="url(#chartGradient)" />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dots */}
        {points.map((pt, i) => {
          const [x, y] = pt.split(",").map(Number);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill="#D4AF37"
              stroke="#0D1015"
              strokeWidth="2"
            />
          );
        })}

        {/* Month labels */}
        {months.map((m, i) => {
          const x = padding + (i / (data.length - 1)) * chartWidth;
          return (
            <text
              key={m}
              x={x}
              y={height + 18}
              textAnchor="middle"
              fontSize="9"
              fill="rgba(255,255,255,0.3)"
              fontFamily="var(--font-inter), sans-serif"
            >
              {m}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, change, icon: Icon, color }: StatCard) {
  const positive = change >= 0;
  return (
    <div className="rounded-xl border border-white/5 bg-[#0D1015] p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-white/40">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold text-white">{value}</p>
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            color
          )}
        >
          <Icon size={20} className="text-white" />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        {positive ? (
          <ArrowUpRight size={14} className="text-emerald-400" />
        ) : (
          <ArrowDownRight size={14} className="text-red-400" />
        )}
        <span
          className={cn(
            "text-xs font-semibold",
            positive ? "text-emerald-400" : "text-red-400"
          )}
        >
          {Math.abs(change)}%
        </span>
        <span className="text-xs text-white/30">vs last month</span>
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    NEW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    CONTACTED: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    QUALIFIED: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    CONVERTED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    DISQUALIFIED: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        map[status] ?? "bg-white/5 text-white/40 border-white/10"
      )}
    >
      {status.toLowerCase()}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [leadsRes, testimonialsRes] = await Promise.all([
          fetch("/api/leads?perPage=5"),
          fetch("/api/testimonials?limit=5"),
        ]);

        if (leadsRes.ok) {
          const d = await leadsRes.json();
          setLeads(d.data ?? []);
        }
        if (testimonialsRes.ok) {
          const d = await testimonialsRes.json();
          // For pending approval, fetch all (including unpublished) via admin
          setTestimonials((d.data ?? []).slice(0, 4));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const STATS: StatCard[] = [
    {
      label: "Total Leads",
      value: "247",
      change: 12.5,
      icon: Users,
      color: "bg-blue-500/20",
    },
    {
      label: "Active Clients",
      value: "38",
      change: 8.3,
      icon: TrendingUp,
      color: "bg-purple-500/20",
    },
    {
      label: "Monthly Revenue",
      value: formatCurrency(52000),
      change: 15.7,
      icon: DollarSign,
      color: "bg-emerald-500/20",
    },
    {
      label: "Bookings",
      value: "14",
      change: -3.2,
      icon: CalendarCheck,
      color: "bg-[#D4AF37]/20",
    },
  ];

  const QUICK_ACTIONS = [
    { label: "New Lead", href: "/admin/leads", icon: Plus, color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    { label: "New Post", href: "/admin/blog", icon: Plus, color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
    { label: "View Bookings", href: "/admin/bookings", icon: Eye, color: "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20" },
    { label: "Add Testimonial", href: "/admin/testimonials", icon: Plus, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  ];

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Revenue chart */}
        <div className="xl:col-span-2 rounded-xl border border-white/5 bg-[#0D1015] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">
                Revenue Overview
              </h2>
              <p className="text-xs text-white/30">Last 12 months</p>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
              +15.7% YoY
            </span>
          </div>
          <RevenueChart />
        </div>

        {/* Quick actions */}
        <div className="rounded-xl border border-white/5 bg-[#0D1015] p-5">
          <h2 className="mb-4 text-sm font-semibold text-white">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-lg border p-3 text-center transition-all hover:scale-[1.02]",
                  a.color
                )}
              >
                <a.icon size={18} />
                <span className="text-xs font-medium">{a.label}</span>
              </Link>
            ))}
          </div>

          {/* Pending items summary */}
          <div className="mt-4 space-y-2">
            <p className="text-xs font-medium uppercase tracking-widest text-white/30">
              Needs Attention
            </p>
            <div className="flex items-center gap-2 rounded-lg bg-yellow-500/5 border border-yellow-500/10 px-3 py-2">
              <AlertCircle size={14} className="text-yellow-400 flex-shrink-0" />
              <span className="text-xs text-white/60">3 leads uncontacted today</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-blue-500/5 border border-blue-500/10 px-3 py-2">
              <CheckCircle size={14} className="text-blue-400 flex-shrink-0" />
              <span className="text-xs text-white/60">2 testimonials pending review</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Recent leads */}
        <div className="rounded-xl border border-white/5 bg-[#0D1015] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Recent Leads</h2>
            <Link
              href="/admin/leads"
              className="flex items-center gap-1 text-xs text-[#D4AF37] hover:underline"
            >
              View all <ArrowUpRight size={12} />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 animate-pulse rounded-lg bg-white/5" />
              ))}
            </div>
          ) : leads.length === 0 ? (
            <p className="text-sm text-white/30">No leads yet.</p>
          ) : (
            <div className="space-y-1">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.03]"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10 text-xs font-bold text-[#D4AF37]">
                    {lead.name[0]?.toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-white/80">
                      {lead.name}
                    </p>
                    <p className="truncate text-[10px] text-white/30">
                      {lead.email}
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 flex-col items-end gap-1">
                    <StatusBadge status={lead.status} />
                    <span className="flex items-center gap-1 text-[10px] text-white/25">
                      <Clock size={9} />
                      {formatDate(lead.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Testimonials pending */}
        <div className="rounded-xl border border-white/5 bg-[#0D1015] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              Recent Testimonials
            </h2>
            <Link
              href="/admin/testimonials"
              className="flex items-center gap-1 text-xs text-[#D4AF37] hover:underline"
            >
              Manage <ArrowUpRight size={12} />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 animate-pulse rounded-lg bg-white/5" />
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <p className="text-sm text-white/30">No testimonials yet.</p>
          ) : (
            <div className="space-y-3">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="rounded-lg border border-white/5 p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-white/80">
                        {t.name}
                      </p>
                      <p className="mt-1 line-clamp-2 text-[11px] text-white/40">
                        {t.content}
                      </p>
                    </div>
                    <div className="flex flex-shrink-0 flex-col items-end gap-1.5">
                      <div className="flex">
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
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase",
                          t.published
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        )}
                      >
                        {t.published ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
