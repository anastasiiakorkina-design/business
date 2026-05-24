"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle2, Users, Shield, Download, Loader2 } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const BENEFITS = [
  "Weekly live Q&A with direct mentorship access",
  "Private deal-flow and partnership opportunities",
  "Peer accountability circles with vetted entrepreneurs",
  "Exclusive playbooks, templates & SOPs not sold anywhere",
  "Early access to new programs and community events",
  "Direct feedback on your offer, funnel, and positioning",
];

const MEMBER_AVATARS = [
  { initials: "MK", bg: "#1a2a1a" },
  { initials: "SR", bg: "#1a1a2a" },
  { initials: "JL", bg: "#2a1a1a" },
  { initials: "AP", bg: "#1a2828" },
  { initials: "DW", bg: "#281a28" },
];

const RESOURCE = {
  title: "The 7-Figure Operator Blueprint",
  description: "47-page PDF: the exact systems, frameworks, and SOPs used to build a business that scales without the founder.",
  pages: "47 pages",
  value: "$497 value",
};

// ─── Avatar Stack ─────────────────────────────────────────────────────────────

function AvatarStack() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2.5">
        {MEMBER_AVATARS.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#0D1015] relative z-10"
            style={{ backgroundColor: a.bg, zIndex: MEMBER_AVATARS.length - i }}
          >
            <span
              className="text-[10px] font-bold text-[#D4AF37]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {a.initials}
            </span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#0D1015] bg-[#D4AF37]/15"
        >
          <span
            className="text-[9px] font-bold text-[#D4AF37]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            +4K
          </span>
        </motion.div>
      </div>
      <div>
        <div className="flex gap-0.5 mb-0.5">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L7.5 4.5H11L8.5 6.5L9.5 10L6 8L2.5 10L3.5 6.5L1 4.5H4.5L6 1Z" fill="#D4AF37" />
            </svg>
          ))}
        </div>
        <span
          className="text-[11px] text-[#A8A8A8]"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          Join{" "}
          <span className="text-[#F8F8F8] font-semibold">4,200+ members</span>
        </span>
      </div>
    </div>
  );
}

// ─── Email Form ────────────────────────────────────────────────────────────────

function EmailForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [touched, setTouched] = useState({ name: false, email: false });

  const nameError = touched.name && name.trim().length < 2;
  const emailError =
    touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    if (nameError || emailError || !name || !email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source: "community_section" }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center py-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-5"
          >
            <CheckCircle2 size={28} className="text-[#D4AF37]" />
          </motion.div>
          <h3
            className="text-[#F8F8F8] text-xl font-bold mb-2"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Welcome to the Inner Circle
          </h3>
          <p
            className="text-[#A8A8A8] text-sm"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Check your inbox — your blueprint is on its way.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              placeholder="First Name"
              autoComplete="given-name"
              className={`w-full bg-[#0D1015] border px-5 py-3.5 text-[#F8F8F8] text-sm placeholder-[#A8A8A8]/50 outline-none transition-colors duration-300 focus:border-[#D4AF37]/60 ${
                nameError ? "border-red-500/60" : "border-[#2C2F36]"
              }`}
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            />
            {nameError && (
              <p className="mt-1.5 text-[11px] text-red-400" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                Please enter your name
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              placeholder="Email Address"
              autoComplete="email"
              className={`w-full bg-[#0D1015] border px-5 py-3.5 text-[#F8F8F8] text-sm placeholder-[#A8A8A8]/50 outline-none transition-colors duration-300 focus:border-[#D4AF37]/60 ${
                emailError ? "border-red-500/60" : "border-[#2C2F36]"
              }`}
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            />
            {emailError && (
              <p className="mt-1.5 text-[11px] text-red-400" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                Enter a valid email address
              </p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={status === "loading"}
            className="w-full relative overflow-hidden bg-[#D4AF37] px-8 py-4 text-[#0D1015] font-semibold text-sm uppercase tracking-widest disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 transition-opacity duration-200"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
            whileHover={{ scale: status === "loading" ? 1 : 1.01 }}
            whileTap={{ scale: status === "loading" ? 1 : 0.99 }}
          >
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 -translate-x-full skew-x-12 bg-white/20"
              animate={{ translateX: ["−100%", "200%"] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            />
            {status === "loading" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span className="relative z-10">Joining...</span>
              </>
            ) : (
              <>
                <Download size={16} className="relative z-10" />
                <span className="relative z-10">Get Free Access + Blueprint</span>
              </>
            )}
          </motion.button>

          {status === "error" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-[11px] text-red-400"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Something went wrong. Please try again.
            </motion.p>
          )}

          {/* Privacy note */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <Shield size={11} className="text-[#A8A8A8]/60" />
            <p
              className="text-[11px] text-[#A8A8A8]/60 text-center"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Zero spam. Unsubscribe anytime. Your data stays private.
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Community() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftRef, { once: true, margin: "-80px" });
  const rightInView = useInView(rightRef, { once: true, margin: "-80px" });

  return (
    <section
      id="community"
      ref={sectionRef}
      className="relative overflow-hidden py-28 lg:py-36"
      style={{ backgroundColor: "#0D1015" }}
    >
      {/* Background layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(212,175,55,0.025) 0%, transparent 50%, rgba(212,175,55,0.015) 100%)",
        }}
      />

      {/* Noise */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.025]" aria-hidden="true">
        <filter id="noise-comm">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-comm)" />
      </svg>

      {/* Top gold line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-[#D4AF37]/20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Member count bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-14"
        >
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 border border-[#D4AF37]/25 bg-[#D4AF37]/5"
          >
            <Users size={13} className="text-[#D4AF37]" />
            <span
              className="text-[#D4AF37] text-[11px] font-bold uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              4,200+ Active Members
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          {/* Left — Copy */}
          <div ref={leftRef}>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[#D4AF37] text-[10px] tracking-[0.35em] uppercase font-semibold mb-5"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Community
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#F8F8F8] text-4xl lg:text-5xl xl:text-[52px] font-bold tracking-tight leading-[1.05] mb-6"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              JOIN THE{" "}
              <span className="text-[#D4AF37]">APEX INNER CIRCLE</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-[#A8A8A8] text-base leading-relaxed mb-10 max-w-lg"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Stop building alone. The Apex Inner Circle is where serious
              entrepreneurs get access to the systems, community, and
              mentorship that compound results — week over week.
            </motion.p>

            {/* Benefits */}
            <div className="space-y-4 mb-10">
              {BENEFITS.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={leftInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.25 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3.5"
                >
                  <CheckCircle2
                    size={17}
                    className="text-[#D4AF37] flex-shrink-0 mt-0.5"
                  />
                  <span
                    className="text-[#F8F8F8] text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Avatar stack */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <AvatarStack />
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, y: 30 }}
            animate={rightInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Card */}
            <div
              className="relative bg-[#171B22] p-8 lg:p-10"
              style={{ outline: "1px solid rgba(212,175,55,0.2)" }}
            >
              {/* Top gold bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />

              {/* Resource offer */}
              <div
                className="mb-8 p-5 bg-[#0D1015] border border-[#D4AF37]/15"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                    <Download size={20} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-[0.2em]"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        Free Download
                      </span>
                      <span
                        className="text-[10px] text-[#A8A8A8] line-through"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        {RESOURCE.value}
                      </span>
                    </div>
                    <h3
                      className="text-[#F8F8F8] text-sm font-semibold leading-snug mb-1"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {RESOURCE.title}
                    </h3>
                    <p
                      className="text-[#A8A8A8] text-xs leading-relaxed"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {RESOURCE.description}
                    </p>
                    <span
                      className="inline-block mt-2 text-[10px] text-[#A8A8A8] bg-[#2C2F36]/60 px-2 py-0.5"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {RESOURCE.pages}
                    </span>
                  </div>
                </div>
              </div>

              {/* Form heading */}
              <h3
                className="text-[#F8F8F8] text-lg font-bold mb-2"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Get Free Instant Access
              </h3>
              <p
                className="text-[#A8A8A8] text-sm mb-6"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Enter your details below and we'll send it immediately.
              </p>

              <EmailForm />
            </div>

            {/* Ambient glow */}
            <div
              className="absolute -inset-px pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.06) 0%, transparent 70%)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
