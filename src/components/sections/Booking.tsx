"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield, Clock, TrendingUp, Lock, Star, Calendar } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CALL_EXPECTATIONS = [
  {
    icon: <TrendingUp size={18} />,
    title: "Deep-Dive Revenue Audit",
    description:
      "We map your current model, identify the exact bottlenecks capping your growth, and prioritize the highest-leverage moves for your specific situation.",
  },
  {
    icon: <Calendar size={18} />,
    title: "Custom 90-Day Roadmap",
    description:
      "You leave with a clear, step-by-step action plan tailored to where you are now and where you want to be — no generic advice.",
  },
  {
    icon: <Star size={18} />,
    title: "Elite Mentorship Assessment",
    description:
      "We assess whether you're the right fit for deeper coaching — and if so, exactly how we'd work together to engineer your results.",
  },
];

const TRUST_BADGES = [
  { icon: <Lock size={14} />, label: "100% Confidential" },
  { icon: <Shield size={14} />, label: "No Sales Pressure" },
  { icon: <TrendingUp size={14} />, label: "Results Guaranteed" },
];

const FAQ_ITEMS = [
  {
    value: "who-is-this-for",
    question: "Who is this strategy call for?",
    answer:
      "This call is designed for entrepreneurs who are already generating revenue — typically between $50K and $2M/year — and are ready to install systems and mentorship to break through their current ceiling. If you're pre-revenue, we recommend starting with the free content vault first.",
  },
  {
    value: "what-happens-after",
    question: "What happens after the call?",
    answer:
      "After the call you'll have a clear 90-day roadmap regardless of whether we work together. If there's a fit for a deeper engagement, we'll outline exactly how that works — pricing, structure, timeline. There's never any pressure to commit on the call itself.",
  },
  {
    value: "how-long",
    question: "How long is the strategy call?",
    answer:
      "Sessions are blocked for 45 minutes. In most cases the value comes within the first 30 minutes — the rest is Q&A and planning. We run on time and respect yours.",
  },
  {
    value: "is-it-free",
    question: "Is the strategy call really free?",
    answer:
      "Yes, completely free. There's no catch, hidden fee, or upsell pressure baked into the call. We offer these because the best clients come from people who've seen the quality of thinking first — it's how we've built a business on referrals and results.",
  },
  {
    value: "spots-available",
    question: "Why are spots limited each month?",
    answer:
      "Every call is conducted personally — not delegated to a junior coach or sales rep. We cap the calendar at a number that allows genuine, high-quality attention on each call. When the slots fill, the next opening is the following month.",
  },
];

const SPOTS_REMAINING = 3;

// ─── Calendly Placeholder ─────────────────────────────────────────────────────

function CalendlyWidget() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      style={{ outline: "1px solid rgba(212,175,55,0.25)" }}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />

      {/* Calendly iframe */}
      <iframe
        src="https://calendly.com/placeholder/strategy-call"
        width="100%"
        height="680"
        frameBorder="0"
        title="Book a Strategy Call"
        className="block bg-[#171B22]"
        style={{ minHeight: "680px" }}
      />

      {/* Fallback overlay if iframe fails */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#171B22] pointer-events-none opacity-0 [iframe:not([src])_~_&]:opacity-100">
        <Calendar size={40} className="text-[#D4AF37]/40 mb-4" />
        <p className="text-[#A8A8A8] text-sm text-center" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
          Booking calendar loading...
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Booking() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section
      id="book"
      className="relative overflow-hidden py-28 lg:py-36"
      style={{ backgroundColor: "#0D1015" }}
    >
      {/* Background — cinematic gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(212,175,55,0.05) 0%, transparent 55%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(212,175,55,0.03) 0%, transparent 60%)",
        }}
      />

      {/* Noise */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.025]" aria-hidden="true">
        <filter id="noise-book">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-book)" />
      </svg>

      {/* Top gold line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-[#D4AF37]/25"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Urgency bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-14"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 border border-red-500/30 bg-red-500/5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
            <span
              className="text-red-400 text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Only {SPOTS_REMAINING} Strategy Call Spots Available This Month
            </span>
          </div>
        </motion.div>

        {/* Header */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#D4AF37] text-[10px] tracking-[0.35em] uppercase font-semibold mb-5"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Book a Call
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#F8F8F8] text-4xl lg:text-5xl xl:text-[60px] font-bold tracking-tight leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            READY TO BUILD{" "}
            <span className="text-[#D4AF37]">YOUR EMPIRE?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#A8A8A8] text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Book a free 45-minute strategy call. Walk away with a custom
            90-day plan to break through your revenue ceiling — regardless of
            whether we work together.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-8"
          >
            {TRUST_BADGES.map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 bg-[#171B22] border border-[#2C2F36]"
              >
                <span className="text-[#D4AF37]">{badge.icon}</span>
                <span
                  className="text-[#A8A8A8] text-[11px] font-semibold uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {badge.label}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="w-16 h-[1px] bg-[#D4AF37]/60 mt-8 origin-center mx-auto"
          />
        </div>

        {/* Two-column: Calendly + What to Expect */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 xl:gap-16 mb-20">
          {/* Calendly */}
          <CalendlyWidget />

          {/* What to Expect */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase font-semibold mb-6"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              What to Expect
            </motion.p>

            <div className="space-y-6">
              {CALL_EXPECTATIONS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-4 p-5 bg-[#171B22]"
                  style={{ outline: "1px solid rgba(212,175,55,0.12)" }}
                >
                  <div className="w-10 h-10 bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                    {item.icon}
                  </div>
                  <div>
                    <h3
                      className="text-[#F8F8F8] text-sm font-semibold mb-1.5"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-[#A8A8A8] text-xs leading-relaxed"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Guarantee note */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 p-5 bg-[#D4AF37]/6 border border-[#D4AF37]/20"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <p
                  className="text-[#F8F8F8] text-xs leading-relaxed"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  <span className="font-semibold">Our guarantee:</span> If you
                  implement the advice from our call and don't see measurable
                  progress within 60 days, we'll give you another session free.
                </p>
              </div>
            </motion.div>

            {/* CTA below widget */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6"
            >
              <a
                href="#book"
                className="group relative w-full flex items-center justify-center gap-3 bg-[#D4AF37] px-8 py-4 text-[#0D1015] font-semibold text-sm uppercase tracking-widest overflow-hidden transition-opacity duration-200 hover:opacity-90"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                <motion.div
                  className="absolute inset-0 -translate-x-full skew-x-12 bg-white/20"
                  animate={{ translateX: ["−100%", "200%"] }}
                  transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                />
                <Calendar size={16} className="relative z-10" />
                <span className="relative z-10">Claim Your Spot</span>
                <ArrowRight
                  size={15}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <p
                className="text-center text-[11px] text-[#A8A8A8]/60 mt-3"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                <Clock size={10} className="inline mr-1" />
                45-minute session · Completely free · No obligation
              </p>
            </motion.div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-10"
          >
            <h2
              className="text-[#F8F8F8] text-2xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Common Questions
            </h2>
            <div className="flex-1 h-px bg-[#2C2F36]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-[#171B22]"
            style={{ outline: "1px solid rgba(212,175,55,0.12)" }}
          >
            <Accordion type="single" collapsible className="px-6">
              {FAQ_ITEMS.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger className="text-[#F8F8F8] text-sm font-semibold py-5 hover:text-[#D4AF37] transition-colors duration-200">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p
                      className="text-[#A8A8A8] text-sm leading-relaxed pb-2"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
