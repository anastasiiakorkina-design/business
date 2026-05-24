"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Search,
  Filter,
  Download,
  Trash2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Mail,
  Phone,
  MoreHorizontal,
  Check,
  X,
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "CONVERTED" | "DISQUALIFIED";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: string | null;
  status: LeadStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; color: string }
> = {
  NEW: { label: "New", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  CONTACTED: { label: "Contacted", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  QUALIFIED: { label: "Qualified", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  CONVERTED: { label: "Converted", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  DISQUALIFIED: { label: "Disqualified", color: "bg-red-500/10 text-red-400 border-red-500/20" },
};

// ─── StatusBadge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        cfg.color
      )}
    >
      {cfg.label}
    </span>
  );
}

// ─── StatusDropdown ───────────────────────────────────────────────────────────

function StatusDropdown({
  leadId,
  currentStatus,
  onUpdate,
}: {
  leadId: string;
  currentStatus: LeadStatus;
  onUpdate: (id: string, status: LeadStatus) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded p-1 text-white/30 hover:text-white"
      >
        <MoreHorizontal size={14} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-1 w-36 rounded-lg border border-white/10 bg-[#171B22] py-1 shadow-xl">
            {(Object.keys(STATUS_CONFIG) as LeadStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => {
                  onUpdate(leadId, s);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-1.5 text-xs transition-colors hover:bg-white/5",
                  s === currentStatus ? "text-[#D4AF37]" : "text-white/60"
                )}
              >
                {s === currentStatus && <Check size={10} className="flex-shrink-0" />}
                {s !== currentStatus && <span className="w-[10px]" />}
                {STATUS_CONFIG[s].label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Export CSV ───────────────────────────────────────────────────────────────

function exportCSV(leads: Lead[]) {
  const headers = ["Name", "Email", "Phone", "Source", "Status", "Message", "Date"];
  const rows = leads.map((l) => [
    l.name,
    l.email,
    l.phone ?? "",
    l.source ?? "",
    l.status,
    (l.message ?? "").replace(/"/g, '""'),
    formatDate(l.createdAt),
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 20,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<LeadStatus | "">("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchLeads = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          perPage: "20",
        });
        if (search) params.set("search", search);
        if (filterStatus) params.set("status", filterStatus);

        const res = await fetch(`/api/leads?${params}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setLeads(data.data ?? []);
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
    const t = setTimeout(() => fetchLeads(1), 300);
    return () => clearTimeout(t);
  }, [fetchLeads]);

  async function updateStatus(id: string, status: LeadStatus) {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
    try {
      await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
    } catch (e) {
      console.error(e);
      fetchLeads(pagination.page);
    }
  }

  async function deleteLead(id: string) {
    try {
      await fetch(`/api/leads/${id}`, { method: "DELETE" });
      setLeads((prev) => prev.filter((l) => l.id !== id));
      setDeleteConfirm(null);
      setPagination((p) => ({ ...p, total: p.total - 1 }));
    } catch (e) {
      console.error(e);
    }
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selectedIds.size === leads.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(leads.map((l) => l.id)));
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Leads</h1>
          <p className="text-xs text-white/40">
            {pagination.total} total leads
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportCSV(leads)}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:border-white/20 hover:text-white"
          >
            <Download size={13} />
            Export CSV
          </button>
          <button
            onClick={() => fetchLeads(pagination.page)}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:border-white/20 hover:text-white"
          >
            <RefreshCw size={13} className={cn(loading && "animate-spin")} />
            Refresh
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
            placeholder="Search name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-white placeholder-white/25 outline-none focus:border-[#D4AF37]/40 focus:ring-1 focus:ring-[#D4AF37]/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={13} className="text-white/30" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as LeadStatus | "")}
            className="rounded-lg border border-white/10 bg-[#0D1015] py-2 pl-3 pr-8 text-sm text-white/70 outline-none focus:border-[#D4AF37]/40"
          >
            <option value="">All statuses</option>
            {(Object.keys(STATUS_CONFIG) as LeadStatus[]).map((s) => (
              <option key={s} value={s}>
                {STATUS_CONFIG[s].label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk actions */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-4 py-2">
          <span className="text-xs text-[#D4AF37]">
            {selectedIds.size} selected
          </span>
          <button
            onClick={() => selectedIds.forEach((id) => deleteLead(id))}
            className="flex items-center gap-1 rounded px-2 py-1 text-xs text-red-400 hover:bg-red-500/10"
          >
            <Trash2 size={12} />
            Delete selected
          </button>
          <button
            onClick={() => setSelectedIds(new Set())}
            className="ml-auto text-xs text-white/30 hover:text-white"
          >
            Clear
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-white/5 bg-[#0D1015]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === leads.length && leads.length > 0}
                    onChange={toggleSelectAll}
                    className="h-3.5 w-3.5 rounded border-white/20 accent-[#D4AF37]"
                  />
                </th>
                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                  Contact
                </th>
                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                  Source
                </th>
                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                  Status
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
                [...Array(6)].map((_, i) => (
                  <tr key={i} className="border-b border-white/[0.03]">
                    {[...Array(6)].map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 animate-pulse rounded bg-white/5" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : leads.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-sm text-white/30"
                  >
                    No leads found.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <>
                    <tr
                      key={lead.id}
                      className={cn(
                        "border-b border-white/[0.03] transition-colors hover:bg-white/[0.02]",
                        selectedIds.has(lead.id) && "bg-[#D4AF37]/[0.03]"
                      )}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(lead.id)}
                          onChange={() => toggleSelect(lead.id)}
                          className="h-3.5 w-3.5 rounded border-white/20 accent-[#D4AF37]"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <button
                            onClick={() =>
                              setExpandedId(
                                expandedId === lead.id ? null : lead.id
                              )
                            }
                            className="text-sm font-medium text-white/80 hover:text-[#D4AF37] text-left"
                          >
                            {lead.name}
                          </button>
                          <div className="mt-0.5 flex items-center gap-2">
                            <a
                              href={`mailto:${lead.email}`}
                              className="flex items-center gap-1 text-[11px] text-white/40 hover:text-white/70"
                            >
                              <Mail size={9} />
                              {lead.email}
                            </a>
                            {lead.phone && (
                              <a
                                href={`tel:${lead.phone}`}
                                className="flex items-center gap-1 text-[11px] text-white/40 hover:text-white/70"
                              >
                                <Phone size={9} />
                                {lead.phone}
                              </a>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-white/40">
                          {lead.source ?? "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-white/40">
                          {formatDate(lead.createdAt)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <StatusDropdown
                            leadId={lead.id}
                            currentStatus={lead.status}
                            onUpdate={updateStatus}
                          />
                          {deleteConfirm === lead.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => deleteLead(lead.id)}
                                className="rounded p-1 text-red-400 hover:bg-red-500/10"
                              >
                                <Check size={13} />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="rounded p-1 text-white/30 hover:text-white"
                              >
                                <X size={13} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(lead.id)}
                              className="rounded p-1 text-white/20 hover:text-red-400"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Expanded row */}
                    {expandedId === lead.id && (
                      <tr
                        key={`${lead.id}-expanded`}
                        className="border-b border-white/[0.03] bg-white/[0.015]"
                      >
                        <td colSpan={6} className="px-8 py-3">
                          <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">
                            Message
                          </p>
                          <p className="text-sm text-white/60 leading-relaxed">
                            {lead.message ?? "No message provided."}
                          </p>
                          {lead.notes && (
                            <div className="mt-2">
                              <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">
                                Notes
                              </p>
                              <p className="text-sm text-white/60">{lead.notes}</p>
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-white/5 px-4 py-3">
            <span className="text-xs text-white/30">
              Showing {(pagination.page - 1) * pagination.perPage + 1}–
              {Math.min(pagination.page * pagination.perPage, pagination.total)} of{" "}
              {pagination.total}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => fetchLeads(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="rounded p-1.5 text-white/30 hover:text-white disabled:opacity-30"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="px-2 text-xs text-white/50">
                {pagination.page} / {pagination.totalPages}
              </span>
              <button
                onClick={() => fetchLeads(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                className="rounded p-1.5 text-white/30 hover:text-white disabled:opacity-30"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
