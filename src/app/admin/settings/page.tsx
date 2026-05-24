"use client";

import { useState } from "react";
import { Save, RefreshCw, Globe, Mail, Phone, Instagram, Youtube, Twitter, Linkedin } from "lucide-react";

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "Apex Coaching",
    siteTagline: "Build an Empire. Live on Your Terms.",
    founderName: "James Apex",
    founderTitle: "Business Coach & Entrepreneur",
    contactEmail: "hello@apexcoaching.com",
    contactPhone: "+1 (555) 000-0000",
    instagramUrl: "https://instagram.com/apexcoaching",
    youtubeUrl: "https://youtube.com/@apexcoaching",
    twitterUrl: "https://twitter.com/apexcoaching",
    linkedinUrl: "https://linkedin.com/in/apexcoaching",
    calendlyUrl: "https://calendly.com/apexcoaching/strategy",
    metaDescription: "Join 2,000+ entrepreneurs who've scaled to 6 and 7 figures with proven systems and elite mentorship.",
  });

  async function save() {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function update(key: keyof typeof settings, value: string) {
    setSettings(s => ({ ...s, [key]: value }));
  }

  const fields = [
    { group: "Brand", items: [
      { key: "siteName", label: "Site Name", icon: Globe },
      { key: "siteTagline", label: "Tagline", icon: Globe },
      { key: "founderName", label: "Founder Name", icon: Globe },
      { key: "founderTitle", label: "Founder Title", icon: Globe },
    ]},
    { group: "Contact", items: [
      { key: "contactEmail", label: "Contact Email", icon: Mail },
      { key: "contactPhone", label: "Contact Phone", icon: Phone },
      { key: "calendlyUrl", label: "Calendly URL", icon: Globe },
    ]},
    { group: "Social", items: [
      { key: "instagramUrl", label: "Instagram URL", icon: Instagram },
      { key: "youtubeUrl", label: "YouTube URL", icon: Youtube },
      { key: "twitterUrl", label: "Twitter URL", icon: Twitter },
      { key: "linkedinUrl", label: "LinkedIn URL", icon: Linkedin },
    ]},
    { group: "SEO", items: [
      { key: "metaDescription", label: "Meta Description", icon: Globe },
    ]},
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-montserrat)" }}>
            Settings
          </h1>
          <p className="text-sm text-white/40 mt-0.5">Configure your website settings</p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 rounded-sm bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#0D1015] hover:bg-[#e8c84a] disabled:opacity-50 transition-colors"
        >
          {saving ? <RefreshCw size={13} className="animate-spin" /> : <Save size={13} />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {fields.map(({ group, items }) => (
        <div key={group} className="rounded-sm border border-white/[0.08] bg-[#171B22] p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]/70 mb-4">{group}</h2>
          <div className="space-y-4">
            {items.map(({ key, label, icon: Icon }) => (
              <div key={key}>
                <label className="flex items-center gap-1.5 text-xs text-white/40 mb-1.5">
                  <Icon size={11} className="text-white/20" />
                  {label}
                </label>
                <input
                  value={settings[key as keyof typeof settings]}
                  onChange={(e) => update(key as keyof typeof settings, e.target.value)}
                  className="w-full rounded-sm border border-white/[0.08] bg-[#0D1015] px-3 py-2 text-sm text-white outline-none focus:border-[#D4AF37]/40 transition-colors"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="rounded-sm border border-red-500/20 bg-red-500/5 p-5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-red-400/70 mb-3">Danger Zone</h2>
        <p className="text-xs text-white/30 mb-4">These actions are irreversible. Proceed with caution.</p>
        <button className="rounded-sm border border-red-500/30 px-4 py-2 text-xs font-medium text-red-400/70 hover:text-red-400 hover:border-red-500/50 transition-colors">
          Clear All Test Data
        </button>
      </div>
    </div>
  );
}
