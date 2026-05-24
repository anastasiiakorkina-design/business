"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  ChevronDown,
  Star,
  Clock,
  Users,
  Zap,
  TrendingUp,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

// ─── Service Data ─────────────────────────────────────────────────────────────

interface ServiceTestimonial {
  name: string;
  role: string;
  revenue: string;
  quote: string;
  avatar: string;
}

interface FAQ {
  q: string;
  a: string;
}

interface ServiceData {
  slug: string;
  name: string;
  tagline: string;
  heroDescription: string;
  price: string;
  priceNote: string;
  duration: string;
  included: string[];
  forWho: string[];
  notForWho: string[];
  testimonials: ServiceTestimonial[];
  faqs: FAQ[];
  accentColor: string;
  icon: React.ReactNode;
}

const SERVICES: Record<string, ServiceData> = {
  "one-on-one-coaching": {
    slug: "one-on-one-coaching",
    name: "Elite 1:1 Coaching",
    tagline: "Private, intensive coaching for founders who refuse to settle.",
    heroDescription:
      "Our most exclusive program. Direct, weekly access to James Alcott and a dedicated senior coach. Designed for founders between $500K and $10M who are ready to move with uncommon speed.",
    price: "$4,500/month",
    priceNote: "6-month minimum commitment. Annual option available.",
    duration: "6–12 months",
    icon: <Users className="w-6 h-6" />,
    accentColor: "#D4AF37",
    included: [
      "Weekly 60-minute 1:1 coaching session with James or senior coach",
      "Unlimited async voice note and text access between sessions",
      "Full Apex Blueprint assessment in first 2 weeks",
      "Custom 90-day sprint plan updated quarterly",
      "Access to all Apex frameworks, templates, and playbooks",
      "Quarterly in-person intensive (travel not included)",
      "Private Slack channel with the Apex team",
      "Priority access to new programs and beta features",
      "Monthly KPI review and accountability scorecard",
      "Recorded session library for every coaching call",
    ],
    forWho: [
      "Founders generating $500K–$10M annually",
      "CEOs who are still too involved in day-to-day operations",
      "Entrepreneurs who've hit a plateau for 6+ months",
      "Leaders ready to build a self-sustaining company",
      "Founders preparing for their first major hire or exit",
    ],
    notForWho: [
      "Founders under $250K in annual revenue",
      "Anyone looking for quick hacks or shortcuts",
      "People unwilling to implement feedback between sessions",
      "Those who aren't ready to invest in serious growth",
    ],
    testimonials: [
      {
        name: "Marcus Webb",
        role: "CEO, Elevate E-commerce",
        revenue: "$800K → $4.2M",
        quote: "The 1:1 coaching is unlike anything I've experienced. James doesn't coach you — he operates alongside you. Every session produces an action that moves the needle.",
        avatar: "MW",
      },
      {
        name: "David Kim",
        role: "Founder, KoraTech Commerce",
        revenue: "$1.2M → $5.7M",
        quote: "6 months in and I've made more progress than in the previous 3 years. The ROI on this investment isn't even a question.",
        avatar: "DK",
      },
    ],
    faqs: [
      {
        q: "Can I upgrade or downgrade my program?",
        a: "After your initial 6-month commitment, you can upgrade to an annual plan at a discounted rate or transition to a different program that better fits your needs.",
      },
      {
        q: "What if I don't see results in the first 90 days?",
        a: "We have a 90-day progress guarantee. If you've implemented every agreed-upon action and don't see meaningful movement, we'll extend your program for free until you do.",
      },
      {
        q: "How are sessions delivered?",
        a: "All sessions are conducted via Zoom. Quarterly intensives can be in-person at the Apex HQ in Austin or at a location of your choice.",
      },
      {
        q: "Who will be coaching me — James or a team member?",
        a: "All clients start with a 2-week intake with James directly. Ongoing sessions are delivered by James or a senior Apex coach depending on the specific coaching need and schedule.",
      },
    ],
  },
  "apex-accelerator": {
    slug: "apex-accelerator",
    name: "Apex Accelerator",
    tagline: "6-week intensive to install the core systems that drive predictable growth.",
    heroDescription:
      "A structured, cohort-based program for founders between $250K and $2M. In 6 weeks, you'll build your Offer Architecture, Lead Engine, and Sales Playbook from the ground up.",
    price: "$6,000",
    priceNote: "One-time investment. Payment plans available.",
    duration: "6 weeks",
    icon: <Zap className="w-6 h-6" />,
    accentColor: "#D4AF37",
    included: [
      "3 live group coaching sessions per week (recorded)",
      "1:1 onboarding call with your assigned Apex coach",
      "Complete Offer Architecture build-out with live feedback",
      "Lead generation strategy designed for your specific business",
      "Sales playbook with qualifying scripts and objection handling",
      "Access to the Apex Resource Library for 12 months",
      "Cohort of 15–20 peers at similar revenue stage",
      "90-day post-program accountability check-ins",
    ],
    forWho: [
      "Founders generating $250K–$2M annually",
      "Business owners who feel disorganized or scattered",
      "Entrepreneurs without a clear, documented sales process",
      "Those who want a structured program with accountability",
    ],
    notForWho: [
      "Founders generating under $100K",
      "Anyone looking for passive or self-paced learning only",
      "Those who can't commit 8–10 hours per week for 6 weeks",
    ],
    testimonials: [
      {
        name: "Tyler Brooks",
        role: "Founder, Apex Performance Coaching",
        revenue: "$85K → $520K",
        quote: "The Accelerator gave me more clarity in 6 weeks than I'd had in 3 years of running my business. The offer architecture alone changed everything.",
        avatar: "TB",
      },
      {
        name: "Elena Martinez",
        role: "Director, Vertex Strategy",
        revenue: "$450K → $1.9M",
        quote: "Best investment I've made in my business. The cohort format was an unexpected bonus — we all kept each other accountable after the program ended.",
        avatar: "EM",
      },
    ],
    faqs: [
      {
        q: "When does the next cohort start?",
        a: "We run cohorts every 6–8 weeks. After applying, you'll receive information about the next available start date.",
      },
      {
        q: "Is this live or self-paced?",
        a: "Primarily live. There are 3 group sessions per week, all recorded. You can catch up on recordings but live attendance is strongly recommended.",
      },
      {
        q: "What's the refund policy?",
        a: "We offer a full refund within the first 5 days if you determine the program isn't right for you. After day 5, no refunds are issued.",
      },
    ],
  },
  "inner-circle-mastermind": {
    slug: "inner-circle-mastermind",
    name: "Inner Circle Mastermind",
    tagline: "The premier peer mastermind for 7-figure founders.",
    heroDescription:
      "Application-only access to the Apex Inner Circle — a community of 500+ vetted entrepreneurs generating $1M+. Monthly live intensives, weekly accountability, and direct coaching from the Apex team.",
    price: "$18,000/year",
    priceNote: "Annual membership. Monthly payment option at $1,800/month.",
    duration: "Annual (rolling)",
    icon: <TrendingUp className="w-6 h-6" />,
    accentColor: "#D4AF37",
    included: [
      "Monthly 2-day live intensive with James and senior coaches",
      "Weekly group coaching call (recorded)",
      "Accountability pod matched to your revenue stage",
      "Complete access to Apex Resource Library",
      "Member deal network (avg $12K/year in savings)",
      "Annual luxury retreat (travel not included)",
      "Private community platform with 500+ vetted members",
      "Speaker and feature opportunities",
      "Apex Certification upon program completion",
    ],
    forWho: [
      "Founders generating $1M+ annually",
      "CEOs who want elite peer accountability",
      "Leaders who've outgrown solo coaching",
      "Those who want systematic mentorship at scale",
    ],
    notForWho: [
      "Founders under $750K in revenue",
      "Those who prefer fully private coaching",
      "Entrepreneurs not ready for serious community investment",
    ],
    testimonials: [
      {
        name: "Sarah Chen",
        role: "Founder, NovaBrand Agency",
        revenue: "$380K → $1.4M",
        quote: "The Inner Circle is the most results-focused community I've ever been a part of. The peer accountability alone is worth more than the investment.",
        avatar: "SC",
      },
      {
        name: "Nina Okafor",
        role: "CEO, Okafor Digital",
        revenue: "$600K → $2.8M",
        quote: "I've been in three masterminds before this. None came close to the depth of conversation and quality of operator in the Inner Circle.",
        avatar: "NO",
      },
    ],
    faqs: [
      {
        q: "How do I apply?",
        a: "Click the apply button below. We review all applications within 48 hours and schedule a brief qualification call before extending an offer.",
      },
      {
        q: "Is the membership truly exclusive?",
        a: "Yes. We cap the Inner Circle at 600 members to maintain quality. We review and remove inactive members quarterly to keep the community high-signal.",
      },
      {
        q: "Can I cancel my membership?",
        a: "Annual memberships are non-refundable. Monthly payment plans can be cancelled with 30 days notice after a 6-month minimum.",
      },
    ],
  },
};

// ─── FAQ Accordion Item ───────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#2C2F36]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full py-5 text-left gap-4"
      >
        <span className="text-[#F8F8F8] font-semibold text-sm leading-relaxed"
          style={{ fontFamily: "Montserrat, sans-serif" }}>
          {q}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}
          className="shrink-0 text-[#D4AF37]">
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[#A8A8A8] text-sm leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const service = SERVICES[slug];
  if (!service) notFound();

  return (
    <div className="bg-[#0D1015] text-[#F8F8F8] min-h-screen">

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-6 lg:px-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(212,175,55,0.09) 0%, transparent 65%)",
          }}
        />
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.025]" aria-hidden="true">
          <filter id="noise-service">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise-service)" />
        </svg>
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-8 bg-[#D4AF37]" />
              <span className="text-xs font-semibold tracking-[0.28em] uppercase text-[#D4AF37]"
                style={{ fontFamily: "Poppins, sans-serif" }}>
                Apex Service
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="w-14 h-14 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] mb-6"
            >
              {service.icon}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-black tracking-tight leading-[0.95] mb-4"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                color: "#F8F8F8",
              }}
            >
              {service.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[#D4AF37] text-xl font-semibold mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {service.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#A8A8A8] text-lg leading-relaxed mb-8 max-w-2xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {service.heroDescription}
            </motion.p>

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap gap-6 mb-10 text-sm"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <div className="flex items-center gap-2 text-[#A8A8A8]">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                {service.duration}
              </div>
              <div className="flex items-center gap-2 text-[#A8A8A8]">
                <Shield className="w-4 h-4 text-[#D4AF37]" />
                Results guarantee
              </div>
              <div className="flex items-center gap-2 text-[#A8A8A8]">
                <Users className="w-4 h-4 text-[#D4AF37]" />
                Limited spots
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#0D1015] font-bold text-sm tracking-wider uppercase rounded-sm hover:bg-[#e8c84a] transition-colors duration-200"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Apply / Book a Call <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#D4AF37]/40 text-[#D4AF37] font-semibold text-sm tracking-wider uppercase rounded-sm hover:bg-[#D4AF37]/08 transition-colors duration-200"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                All Services
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── WHAT'S INCLUDED ──────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-24" style={{ backgroundColor: "#171B22" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2
                className="font-black text-[#F8F8F8] mb-8 tracking-tight"
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
              >
                What's <span style={{ color: "#D4AF37" }}>Included</span>
              </h2>
              <div className="space-y-3">
                {service.included.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="text-[#A8A8A8] text-sm leading-relaxed"
                      style={{ fontFamily: "Inter, sans-serif" }}>
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Who it's for / not for */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-10"
            >
              <div>
                <h3 className="font-black text-[#F8F8F8] mb-5 text-lg" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  This Is For You If…
                </h3>
                <div className="space-y-2.5">
                  {service.forWho.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                      <span className="text-[#A8A8A8] text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-black text-[#F8F8F8] mb-5 text-lg" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  This Is NOT For You If…
                </h3>
                <div className="space-y-2.5">
                  {service.notForWho.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
                      <span className="text-[#A8A8A8] text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ──────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-24">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-sm overflow-hidden p-10 text-center"
            style={{
              background: "linear-gradient(135deg, #1a1f28 0%, #171B22 100%)",
              border: "1px solid rgba(212,175,55,0.25)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)" }}
            />
            <div className="relative">
              <div className="text-xs font-semibold tracking-[0.28em] uppercase text-[#D4AF37] mb-4"
                style={{ fontFamily: "Poppins, sans-serif" }}>
                Investment
              </div>
              <div
                className="font-black text-[#F8F8F8] mb-2"
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                {service.price}
              </div>
              <p className="text-[#A8A8A8] text-sm mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
                {service.priceNote}
              </p>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-10 py-4 bg-[#D4AF37] text-[#0D1015] font-bold tracking-wider uppercase rounded-sm hover:bg-[#e8c84a] transition-colors duration-200 text-sm"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="mt-4 text-xs text-[#6b6b6b]" style={{ fontFamily: "Inter, sans-serif" }}>
                All applications reviewed within 48 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-24" style={{ backgroundColor: "#171B22" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="font-black text-[#F8F8F8] tracking-tight"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
            >
              What <span style={{ color: "#D4AF37" }}>Clients Say</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {service.testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-[#0D1015] border border-[#D4AF37]/15 rounded-sm p-7"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-[#A8A8A8] text-sm leading-relaxed italic mb-5"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold text-xs"
                    style={{ fontFamily: "Montserrat, sans-serif" }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-[#F8F8F8] font-bold text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>{t.name}</div>
                    <div className="text-[#6b6b6b] text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{t.role}</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-[#D4AF37] text-xs font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>{t.revenue}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-24">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2
              className="font-black text-[#F8F8F8] tracking-tight"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
            >
              Frequently Asked <span style={{ color: "#D4AF37" }}>Questions</span>
            </h2>
          </motion.div>
          <div>
            {service.faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-24 relative overflow-hidden" style={{ backgroundColor: "#171B22" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)" }}
        />
        <div className="max-w-2xl mx-auto relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="font-black text-[#F8F8F8] tracking-tight mb-5 leading-[0.95]"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              Ready to Get Started?
              <br />
              <span style={{ color: "#D4AF37" }}>Apply Today.</span>
            </h2>
            <p className="text-[#A8A8A8] leading-relaxed mb-8 max-w-xl mx-auto"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Spots are limited and fill quickly. Submit your application and we'll be in touch within 48 hours.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#D4AF37] text-[#0D1015] font-bold tracking-wider uppercase rounded-sm hover:bg-[#e8c84a] transition-colors duration-200 text-sm"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Book a Strategy Call <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
