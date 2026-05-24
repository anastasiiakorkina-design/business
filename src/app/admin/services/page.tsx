"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, RefreshCw, X, Check, DollarSign } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number | null;
  priceLabel: string | null;
  isActive: boolean;
  createdAt: string;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data.data ?? []);
    } catch {
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  async function toggleActive(id: string, current: boolean) {
    await fetch(`/api/services/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !current }),
    });
    fetchServices();
  }

  async function deleteService(id: string) {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    fetchServices();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-montserrat)" }}>
            Services
          </h1>
          <p className="text-sm text-white/40 mt-0.5">Manage your coaching offers and programs</p>
        </div>
        <button
          onClick={() => { setEditingService(null); setShowModal(true); }}
          className="flex items-center gap-2 rounded-sm bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#0D1015] transition-colors hover:bg-[#e8c84a]"
        >
          <Plus size={15} /> Add Service
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw size={20} className="animate-spin text-[#D4AF37]" />
        </div>
      ) : services.length === 0 ? (
        <div className="rounded-sm border border-white/[0.08] bg-[#171B22] p-12 text-center">
          <DollarSign size={28} className="mx-auto mb-3 text-white/20" />
          <p className="text-white/40 text-sm">No services yet. Add your first offering.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className={cn(
                "rounded-sm border bg-[#171B22] p-5 transition-all",
                service.isActive ? "border-[#D4AF37]/20" : "border-white/[0.06] opacity-60"
              )}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-semibold text-white text-sm leading-tight">{service.title}</h3>
                <span className={cn(
                  "text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0",
                  service.isActive ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-white/30"
                )}>
                  {service.isActive ? "Active" : "Hidden"}
                </span>
              </div>
              <p className="text-xs text-white/40 mb-3 line-clamp-2">{service.description}</p>
              {(service.price || service.priceLabel) && (
                <p className="text-sm font-semibold text-[#D4AF37] mb-3">
                  {service.priceLabel ?? `$${service.price?.toLocaleString()}`}
                </p>
              )}
              <p className="text-[10px] text-white/20 mb-4">Added {formatDate(service.createdAt)}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleActive(service.id, service.isActive)}
                  className="flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs text-white/50 hover:bg-white/[0.06] hover:text-white"
                >
                  {service.isActive ? <EyeOff size={12} /> : <Eye size={12} />}
                  {service.isActive ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => { setEditingService(service); setShowModal(true); }}
                  className="flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs text-white/50 hover:bg-white/[0.06] hover:text-white"
                >
                  <Edit2 size={12} /> Edit
                </button>
                <button
                  onClick={() => deleteService(service.id)}
                  className="ml-auto flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs text-red-400/60 hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <ServiceModal
          service={editingService}
          onClose={() => setShowModal(false)}
          onSave={() => { setShowModal(false); fetchServices(); }}
        />
      )}
    </div>
  );
}

function ServiceModal({
  service,
  onClose,
  onSave,
}: {
  service: Service | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const [form, setForm] = useState({
    title: service?.title ?? "",
    slug: service?.slug ?? "",
    description: service?.description ?? "",
    price: service?.price?.toString() ?? "",
    priceLabel: service?.priceLabel ?? "",
    isActive: service?.isActive ?? true,
  });
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: form.price ? parseFloat(form.price) : null,
      };
      const url = service ? `/api/services/${service.id}` : "/api/services";
      const method = service ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) onSave();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-sm border border-white/[0.08] bg-[#171B22] p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-white">{service ? "Edit Service" : "New Service"}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white"><X size={18} /></button>
        </div>
        <div className="space-y-4">
          {(["title", "slug", "priceLabel"] as const).map((field) => (
            <div key={field}>
              <label className="block text-xs text-white/40 mb-1 capitalize">{field}</label>
              <input
                value={form[field]}
                onChange={(e) => setForm(f => ({ ...f, [field]: e.target.value }))}
                className="w-full rounded-sm border border-white/[0.08] bg-[#0D1015] px-3 py-2 text-sm text-white outline-none focus:border-[#D4AF37]/40"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs text-white/40 mb-1">Price (USD)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))}
              className="w-full rounded-sm border border-white/[0.08] bg-[#0D1015] px-3 py-2 text-sm text-white outline-none focus:border-[#D4AF37]/40"
            />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full rounded-sm border border-white/[0.08] bg-[#0D1015] px-3 py-2 text-sm text-white outline-none focus:border-[#D4AF37]/40 resize-none"
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))}
              className={cn(
                "w-10 h-5 rounded-full transition-colors relative",
                form.isActive ? "bg-[#D4AF37]" : "bg-white/10"
              )}
            >
              <span className={cn(
                "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform",
                form.isActive ? "translate-x-5" : "translate-x-0.5"
              )} />
            </div>
            <span className="text-xs text-white/60">Active / Visible</span>
          </label>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 rounded-sm border border-white/10 py-2 text-sm text-white/60 hover:text-white">
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="flex-1 rounded-sm bg-[#D4AF37] py-2 text-sm font-semibold text-[#0D1015] hover:bg-[#e8c84a] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
            {service ? "Save Changes" : "Create Service"}
          </button>
        </div>
      </div>
    </div>
  );
}
