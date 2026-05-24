"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Crown,
  Zap,
  Users,
  Star,
  Clock,
  TrendingUp,
  Shield,
  BookOpen,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Service {
  id: string;
  slug: string;
  icon: React.ReactNode;
  title: string;
  tagline: string;
  description: string;
  monthlyPrice: number | null;
  oneTimePrice: number | null;
  priceLabel: string;
  features: string[];
  cta: string;
  highlight: boolean;
  badge?: string;
}

interface FAQ {
  q: string;
  a: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES: Service[] = [
  {
    id: "apex-1on1",
    slug: "apex-one-on-one",
    icon: <Crown className="w-7 h-7" />,
    title: "Apex 1-on-1 Intensive",
    tagline: "The pinnacle of private coaching",
    description:
      "Complete access to a world-class coaching relationship. Weekly 90-minute strategy sessions, unlimited async communication, and full deep-dives into your business model, team, operations, and mindset. Reserved for founders who demand elite results.",
    monthlyPrice: 5000,
    oneTimePrice: 54000,
    priceLabel: "Starting at",
    features: [
      "4 × 90-min strategy sessions per month",
      "Unlimited voice/text async support",
      "Full business audit in month one",
      "Custom 90-day execution roadmap",
      "Financial model review & KPI dashboard",
      "Recruiting & team-building frameworks",
      "Quarterly board-level planning sessions",
      "Direct line to founder network",
    ],
    cta: "Apply for Private Coaching",
    highlight: true,
    badge: "Most Exclusive",
  },
  {
    id: "accelerator",
    slug: "apex-accelerator",
    icon: <Zap className="w-7 h-7" />,
    title: "Apex Accelerator",
    tagline: "Six months of intensive group coaching",
    description:
      "A cohort-based program designed to take revenue-generating businesses from $100K to $1M+. Deep curriculum, peer accountability, and direct access to coaching calls twice per week. Cohorts are limited to 20 founders.",
    monthlyPrice: 1200,
    oneTimePrice: 12000,
    priceLabel: "Per seat",
    features: [
      "2 × weekly group coaching calls",
      "Full Apex curriculum (48 modules)",
      "Private cohort Slack workspace",
      "Monthly 1-on-1 check-in call",
      "Copywriting & funnel reviews",
      "Guest expert sessions (2/month)",
      "Lifetime alumni community access",
      "Deal flow & partnership introductions",
    ],
    cta: "Join Next Cohort",
    highlight: false,
    badge: "Most Popular",
  },
  {
    id: "mastermind",
    slug: "apex-mastermind",
    icon: <Users className="w-7 h-7" />,
    title: "Apex Mastermind",
    tagline: "Peer power at the highest level",
    description:
      "A curated round-table of non-competing seven- and eight-figure founders. Monthly virtual hot seats, two in-person retreat days per year, and an always-on network that solves problems in hours, not months.",
    monthlyPrice: 2500,
    oneTimePrice: 27000,
    priceLabel: "Per member",
    features: [
      "Monthly 3-hour virtual mastermind",
      "2 × annual in-person retreats",
      "Facilitated hot seats every session",
      "Vetted member directory (verified revenue)",
      "Private deal-sharing board",
      "Vendor & contractor referral network",
      "Quarterly revenue accountability reports",
      "Spouse/partner coaching session (annual)",
    ],
    cta: "Request Membership",
    highlight: false,
  },
  {
    id: "foundation",
    slug: "apex-foundation",
    icon: <BookOpen className="w-7 h-7" />,
    title: "Foundation Blueprint",
    tagline: "The complete self-study system",
    description:
      "Everything you need to build your first $100K business from scratch. Video curriculum, templates, worksheets, and a community forum. No live calls—this is the ultimate DIY system for driven starters.",
    monthlyPrice: 97,
    oneTimePrice: 897,
    priceLabel: "One-time or",
    features: [
      "24 video modules (18+ hours)",
      "All Apex frameworks & templates",
      "Business model canvas workshops",
      "Pricing & positioning playbook",
      "Founding customer acquisition guide",
      "Community forum access (lifetime)",
      "Quarterly curriculum updates",
      "30-day money-back guarantee",
    ],
    cta: "Get Instant Access",
    highlight: false,
  },
];

const COMPARISON_ROWS = [
  { feature: "1-on-1 coaching calls", values: ["Weekly", "Monthly", "Hot seat", "—"] },
  { feature: "Group coaching", values: ["—", "2×/week", "Monthly", "—"] },
  { feature: "Async support", values: ["Unlimited", "Slack only", "Slack only", "Forum"] },
  { feature: "Curriculum access", values: ["Full", "Full", "Excerpts", "Full"] },
  { feature: "In-person events", values: ["On request", "2/year", "2/year", "—"] },
  { feature: "Revenue stage", values: ["$500K+", "$100K–$1M", "$1M+", "$0–$100K"] },
  { feature: "Cohort size", values: ["1", "20 max", "12 max", "Unlimited"] },
];

const FAQS: FAQ[] = [
  {
    q: "How do I know which program is right for me?",
    a: "The best fit depends on your current revenue, how much you need individualized attention, and your budget. Under $100K, Foundation Blueprint gives you the clearest roadmap. $100K–$1M, the Accelerator is purpose-built for your stage. $1M+, the Mastermind or 1-on-1 unlocks the next ceiling. We'll help you decide on your application call.",
  },
  {
    q: "Are there payment plans available?",
    a: "Yes. All programs offer monthly payment options. Annual plans receive a meaningful discount (displayed in the pricing grid above). We never charge hidden fees or surprise retainers.",
  },
  {
    q: "What's your refund policy?",
    a: "Foundation Blueprint comes with a 30-day money-back guarantee, no questions asked. For coaching programs, we offer a pro-rated refund within the first 14 days if you feel it's not the right fit. After that, we're committed to delivering results—and so are you.",
  },
  {
    q: "How quickly will I see results?",
    a: "Most 1-on-1 clients see measurable shifts in revenue or clarity within 60 days. Accelerator cohort members typically break through a key constraint in the first 30 days of the program. Timelines vary by starting point, commitment level, and market conditions—but we have documented case studies at every stage.",
  },
  {
    q: "Is there an application process?",
    a: "Yes—every coaching program (1-on-1, Accelerator, Mastermind) requires an application and a 30-minute call. This isn't a gatekeeping exercise; it's how we ensure mutual fit. Foundation Blueprint is open to anyone.",
  },
  {
    q: "Can I upgrade between programs?",
    a: "Absolutely. Many clients start in Foundation Blueprint or the Accelerator and upgrade as their revenue grows. We credit a portion of your previous investment toward the next tier.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function GoldUnderline() {
  return (
    <span className="absolute -bottom-3 left-0 w-full h-[3px] bg-gradient-to-r from-[#D4AF37] via-[#F5D66B] to-transparent rounded-full" />
  );
}

function ServiceCard({ service, billing }: { service: Service; billing: "monthly" | "one-time" }) {
  const price = billing === "monthly" ? service.monthlyPrice : service.oneTimePrice;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
        service.highlight
          ? "border-[#D4AF37]/60 bg-gradient-to-b from-[#171B22] to-[#1A1F2A] shadow-[0_0_60px_rgba(212,175,55,0.1)]"
          : "border-white/10 bg-[#171B22] hover:border-[#D4AF37]/30"
      }`}
    >
      {service.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#0D1015] text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
          {service.badge}
        </div>
      )}

      {/* Icon */}
      <div
        className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${
          service.highlight
            ? "bg-[#D4AF37]/20 text-[#D4AF37]"
            : "bg-white/5 text-[#D4AF37]"
        }`}
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3 className="font-montserrat font-bold text-2xl text-[#F8F8F8] mb-1">{service.title}</h3>
      <p className="text-[#D4AF37] text-sm font-medium mb-4">{service.tagline}</p>

      {/* Description */}
      <p className="text-[#A8A8A8] text-sm leading-relaxed mb-6">{service.description}</p>

      {/* Price */}
      <div className="mb-6 pb-6 border-b border-white/10">
        <span className="text-[#A8A8A8] text-xs uppercase tracking-widest block mb-1">
          {service.priceLabel}
        </span>
        {price !== null ? (
          <div className="flex items-end gap-1">
            <span className="text-[#D4AF37] font-montserrat font-bold text-4xl">
              ${price.toLocaleString()}
            </span>
            <span className="text-[#A8A8A8] text-sm mb-1">
              /{billing === "monthly" ? "mo" : "yr"}
            </span>
          </div>
        ) : (
          <span className="text-[#A8A8A8] text-lg">Contact for pricing</span>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {service.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-[#F8F8F8]/85">
            <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/book"
        className={`w-full text-center py-3.5 px-6 rounded-xl font-semibold text-sm uppercase tracking-widest transition-all duration-300 ${
          service.highlight
            ? "bg-[#D4AF37] text-[#0D1015] hover:bg-[#F5D66B] shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            : "border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0D1015]"
        }`}
      >
        {service.cta}
      </Link>
    </motion.div>
  );
}

function FAQItem({ faq }: { faq: FAQ; index?: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-[#F8F8F8] font-medium group-hover:text-[#D4AF37] transition-colors">
          {faq.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[#D4AF37] shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[#A8A8A8] text-sm leading-relaxed pb-5">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ServicesClient() {
  const [billing, setBilling] = useState<"monthly" | "one-time">("monthly");
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="bg-[#0D1015] min-h-screen">
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-24 px-6 overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] mb-6 border border-[#D4AF37]/30 rounded-full px-5 py-2">
              Investment in Excellence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative inline-block font-montserrat font-black text-5xl md:text-7xl text-[#F8F8F8] uppercase tracking-tight mb-8"
          >
            Elite Programs
            <br />
            <span className="relative">
              & Services
              <GoldUnderline />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#A8A8A8] text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Every program is engineered around one outcome: compounding growth.
            Choose the intensity that matches your ambition.
          </motion.p>
        </div>
      </section>

      {/* ── Service Cards ── */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <span className={`text-sm font-medium transition-colors ${billing === "monthly" ? "text-[#F8F8F8]" : "text-[#A8A8A8]"}`}>
              Monthly
            </span>
            <button
              onClick={() => setBilling(billing === "monthly" ? "one-time" : "monthly")}
              className="relative w-14 h-7 bg-[#171B22] border border-[#D4AF37]/40 rounded-full transition-all"
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-[#D4AF37] transition-all duration-300 ${
                  billing === "one-time" ? "left-8" : "left-1"
                }`}
              />
            </button>
            <span className={`text-sm font-medium transition-colors ${billing === "one-time" ? "text-[#F8F8F8]" : "text-[#A8A8A8]"}`}>
              Annual <span className="text-[#D4AF37] text-xs font-bold">(Save 10%)</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} billing={billing} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Section ── */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-montserrat font-black text-3xl md:text-4xl text-[#F8F8F8] uppercase tracking-tight mb-4">
              Which Program Is{" "}
              <span className="text-[#D4AF37]">Right for You?</span>
            </h2>
            <p className="text-[#A8A8A8] text-sm">Side-by-side comparison across all programs</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 bg-[#171B22]">
                  <th className="text-left text-[#A8A8A8] text-xs uppercase tracking-widest font-semibold px-6 py-4 w-40">
                    Feature
                  </th>
                  {SERVICES.map((s) => (
                    <th
                      key={s.id}
                      className={`text-center text-xs uppercase tracking-widest font-bold px-4 py-4 ${
                        s.highlight ? "text-[#D4AF37]" : "text-[#F8F8F8]"
                      }`}
                    >
                      {s.title.split(" ").slice(0, 2).join(" ")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-white/5 ${i % 2 === 0 ? "bg-[#0D1015]" : "bg-[#171B22]/50"}`}
                  >
                    <td className="text-[#A8A8A8] text-sm px-6 py-4 font-medium">{row.feature}</td>
                    {row.values.map((v, vi) => (
                      <td key={vi} className="text-center text-sm px-4 py-4">
                        {v === "—" ? (
                          <span className="text-white/20">—</span>
                        ) : (
                          <span className={vi === 0 ? "text-[#D4AF37] font-semibold" : "text-[#F8F8F8]/80"}>
                            {v}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Trust Signals ── */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Star className="w-6 h-6" />, stat: "2,000+", label: "Clients coached" },
              { icon: <TrendingUp className="w-6 h-6" />, stat: "$500M+", label: "Revenue generated" },
              { icon: <Clock className="w-6 h-6" />, stat: "10+ yrs", label: "Coaching experience" },
              { icon: <Shield className="w-6 h-6" />, stat: "98%", label: "Client satisfaction" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-[#171B22] border border-white/10 rounded-xl p-6 text-center hover:border-[#D4AF37]/30 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] mb-4">
                  {item.icon}
                </div>
                <div className="font-montserrat font-black text-2xl text-[#D4AF37] mb-1">{item.stat}</div>
                <div className="text-[#A8A8A8] text-xs uppercase tracking-widest">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-montserrat font-black text-3xl md:text-4xl text-[#F8F8F8] uppercase tracking-tight mb-4">
              Frequently Asked <span className="text-[#D4AF37]">Questions</span>
            </h2>
          </div>
          <div className="bg-[#171B22] border border-white/10 rounded-2xl px-8 py-2">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="px-6 pb-32">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#171B22] to-[#0D1015] p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[#D4AF37]/3 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

            <Crown className="w-12 h-12 text-[#D4AF37] mx-auto mb-6" />

            <h2 className="font-montserrat font-black text-3xl md:text-4xl text-[#F8F8F8] uppercase tracking-tight mb-4">
              Schedule Your <span className="text-[#D4AF37]">Application Call</span>
            </h2>
            <p className="text-[#A8A8A8] mb-8 max-w-lg mx-auto leading-relaxed">
              30 minutes. No pitch. Just a direct conversation about where you are,
              where you want to be, and which program gives you the fastest path there.
            </p>

            <Link
              href="/book"
              className="inline-flex items-center gap-3 bg-[#D4AF37] text-[#0D1015] font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-[#F5D66B] transition-all duration-300 shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)]"
            >
              Book Application Call
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-[#A8A8A8] text-xs mt-6">
              Limited spots available each month · No obligation
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
