"use client";

import { useCallback, useEffect, useState } from "react";
import { Mail, Users, RefreshCw, Trash2, Download } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  source: string | null;
  tags: string[];
  subscribedAt: string;
  active: boolean;
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter");
      const data = await res.json();
      setSubscribers(data.data ?? []);
    } catch {
      setSubscribers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSubscribers(); }, [fetchSubscribers]);

  async function unsubscribe(email: string) {
    if (!confirm(`Unsubscribe ${email}?`)) return;
    await fetch("/api/newsletter", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    fetchSubscribers();
  }

  function exportCSV() {
    const rows = [
      ["Email", "Name", "Source", "Subscribed", "Active"],
      ...subscribers.map((s) => [
        s.email, s.name ?? "", s.source ?? "", formatDate(s.subscribedAt), s.active ? "Yes" : "No"
      ])
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "subscribers.csv"; a.click();
  }

  const filtered = subscribers.filter(s =>
    !search || s.email.includes(search) || (s.name ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const active = subscribers.filter(s => s.active).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-montserrat)" }}>
            Newsletter
          </h1>
          <p className="text-sm text-white/40 mt-0.5">Manage email subscribers</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 rounded-sm border border-white/10 px-3 py-2 text-sm text-white/60 hover:text-white"
          >
            <Download size={13} /> Export CSV
          </button>
          <button
            onClick={fetchSubscribers}
            className="flex items-center gap-2 rounded-sm border border-white/10 px-3 py-2 text-sm text-white/60 hover:text-white"
          >
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Subscribers", value: subscribers.length, icon: Users },
          { label: "Active", value: active, icon: Mail },
          { label: "Unsubscribed", value: subscribers.length - active, icon: Mail },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-sm border border-white/[0.08] bg-[#171B22] p-4">
            <div className="flex items-center gap-2 mb-1">
              <Icon size={14} className="text-[#D4AF37]/60" />
              <span className="text-xs text-white/40">{label}</span>
            </div>
            <p className="text-2xl font-bold text-white">{value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <input
        type="search"
        placeholder="Search by email or name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full max-w-sm rounded-sm border border-white/[0.08] bg-[#171B22] px-3 py-2 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#D4AF37]/40"
      />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw size={20} className="animate-spin text-[#D4AF37]" />
        </div>
      ) : (
        <div className="rounded-sm border border-white/[0.08] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-[#171B22]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/30">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/30 hidden sm:table-cell">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/30 hidden md:table-cell">Source</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/30 hidden lg:table-cell">Subscribed</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/30">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-white/80 text-xs">{sub.email}</td>
                  <td className="px-4 py-3 text-white/50 text-xs hidden sm:table-cell">{sub.name ?? "—"}</td>
                  <td className="px-4 py-3 text-white/40 text-xs hidden md:table-cell">{sub.source ?? "—"}</td>
                  <td className="px-4 py-3 text-white/30 text-xs hidden lg:table-cell">{formatDate(sub.subscribedAt)}</td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full",
                      sub.active ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-white/30"
                    )}>
                      {sub.active ? "Active" : "Unsub"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => unsubscribe(sub.email)}
                      className="rounded p-1 text-white/20 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                      title="Unsubscribe"
                    >
                      <Trash2 size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-10 text-center text-sm text-white/30">No subscribers found.</div>
          )}
        </div>
      )}
    </div>
  );
}
