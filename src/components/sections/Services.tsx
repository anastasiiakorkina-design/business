"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Crown, Users, BarChart3, BookOpen, Check } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface ServiceCard {
  id: number;
  tier: "elite" | "featured" | "standard";
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  priceLabel: string;
  features: string[];
  cta: string;
  href: string;
  badge?: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const SERVICES: ServiceCard[] = [
  {
    id: 1,
    tier: "elite",
    icon: <Crown size={22} />,
    eyebrow: "Most Exclusive",
    title: "1-on-1 Elite Coaching",
    subtitle: "Direct access. No filters.",
    description:
      "Complete immersion in your business. Weekly private calls, unlimited Voxer access, deep-dive audits of your systems, and a bespoke 90-day growth roadmap built around your exact goals.",
    price: "$4,997",
    priceLabel: "/ month",
    features: [
      "Weekly 60-minute private calls",
      "Unlimited async support via Voxer",
      "Full business system audit",
      "Bespoke 90-day growth roadmap",
      "Priority access to new programmes",
      "Direct founder mentorship",
    ],
    cta: "Apply Now",
    href: "#contact",
    badge: "Limited Spots",
  },
  {
    id: 2,
    tier: "featured",
    icon: <Users size={22} />,
    eyebrow: "Most Popular",
    title: "Mastermind Group",
    subtitle: "Peers who push you forward.",
    description:
      "An intimate cohort of eight to twelve non-competing entrepreneurs at the same level. Monthly live calls, hot-seat coaching, shared accountability, and access to the full resource vault.",
    price: "$1,497",
    priceLabel: "/ month",
    features: [
      "Monthly live mastermind calls",
      "Hot-seat coaching sessions",
      "Private Slack community access",
      "Full resource & template vault",
      "Quarterly in-person retreats",
      "Peer accountability partnerships",
    ],
    cta: "Join the Mastermind",
    href: "#contact",
    badge: "Next Cohort: June",
  },
  {
    id: 3,
    tier: "standard",
    icon: <BarChart3 size={22} />,
    eyebrow: "Business Consulting",
    title: "Strategic Consulting",
    subtitle: "External eyes. Unfair leverage.",
    description:
      "A focused engagement for founders who need a seasoned strategic partner. Ideal for pivots, launch preparation, fundraising strategy, and operational restructuring.",
    price: "$2,497",
    priceLabel: "/ engagement",
    features: [
      "2-day intensive deep-dive",
      "Full operational audit & report",
      "90-day strategic action plan",
      "30 days of email support",
      "Monthly check-in call",
      "Referral to specialist network",
    ],
    cta: "Book a Consult",
    href: "#contact",
  },
  {
    id: 4,
    tier: "standard",
    icon: <BookOpen size={22} />,
    eyebrow: "Self-Paced",
    title: "Digital Programmes",
    subtitle: "The system. On your terms.",
    description:
      "Proven frameworks packaged into self-paced courses and implementation guides. Build the foundation every serious entrepreneur needs at a fraction of the live coaching investment.",
    price: "$497",
    priceLabel: "/ programme",
    features: [
      "Lifetime access to all content",
      "Fortnightly live Q&A sessions",
      "Private student community",
      "Bi-annual content updates",
      "Completion certificate",
      "Bonus implementation templates",
    ],
    cta: "Browse Programmes",
    href: "#programmes",
  },
];

// ─── Card component ────────────────────────────────────────────────────────────

function ServiceCard({ card, index }: { card: ServiceCard; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const isElite = card.tier === "elite";
  const isFeatured = card.tier === "featured";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Badge ─────────────────────────────────────────────── */}
      {card.badge && (
        <div className="absolute -top-3.5 left-6 z-20">
          <span
            className="px-3 py-1 text-[9px] font-semibold tracking-[0.2em] uppercase"
            style={{
              backgroundColor: isElite ? "#D4AF37" : "#171B22",
              color: isElite ? "#0D1015" : "#D4AF37",
              border: isElite ? "none" : "1px solid rgba(212,175,55,0.4)",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {card.badge}
          </span>
        </div>
      )}

      {/* ── Card body ─────────────────────────────────────────── */}
      <motion.div
        className="relative flex flex-col flex-1 overflow-hidden transition-all duration-500"
        animate={
          hovered
            ? {
                y: -6,
                boxShadow: isElite
                  ? "0 0 60px rgba(212,175,55,0.22), 0 20px 60px rgba(0,0,0,0.6)"
                  : isFeatured
                  ? "0 0 40px rgba(212,175,55,0.15), 0 20px 50px rgba(0,0,0,0.55)"
                  : "0 20px 50px rgba(0,0,0,0.5)",
              }
            : {
                y: 0,
                boxShadow: isFeatured
                  ? "0 0 30px rgba(212,175,55,0.08)"
                  : "none",
              }
        }
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backgroundColor: isElite
            ? "#111419"
            : isFeatured
            ? "#171B22"
            : "#0D1015",
          border: isElite
            ? hovered
              ? "1px solid rgba(212,175,55,0.55)"
              : "1px solid rgba(212,175,55,0.25)"
            : isFeatured
            ? hovered
              ? "1px solid rgba(212,175,55,0.4)"
              : "1px solid rgba(212,175,55,0.18)"
            : hovered
            ? "1px solid rgba(212,175,55,0.2)"
            : "1px solid rgba(248,248,248,0.06)",
        }}
      >
        {/* Top accent bar – featured gets gold, elite gets gradient */}
        {(isElite || isFeatured) && (
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: isElite
                ? "linear-gradient(90deg, #b8951e 0%, #D4AF37 50%, #e8c84a 100%)"
                : "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.7) 50%, transparent 100%)",
            }}
          />
        )}

        {/* Gold glow on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: isElite
                  ? "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 70%)"
                  : "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 70%)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 flex flex-col flex-1 p-7 sm:p-8">

          {/* Icon + eyebrow */}
          <div className="flex items-center justify-between mb-7">
            <div
              className="flex h-11 w-11 items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: hovered
                  ? "rgba(212,175,55,0.14)"
                  : "rgba(212,175,55,0.06)",
                border: "1px solid rgba(212,175,55,0.2)",
                color: "#D4AF37",
              }}
            >
              {card.icon}
            </div>
            <span
              className="text-[9px] font-semibold tracking-[0.25em] uppercase"
              style={{
                fontFamily: "Poppins, sans-serif",
                color: isElite ? "#D4AF37" : "#A8A8A8",
              }}
            >
              {card.eyebrow}
            </span>
          </div>

          {/* Title + subtitle */}
          <div className="mb-5">
            <h3
              className="font-black leading-tight mb-1.5"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
                color: "#F8F8F8",
              }}
            >
              {card.title}
            </h3>
            <p
              className="text-xs tracking-wide"
              style={{
                fontFamily: "Poppins, sans-serif",
                color: "#D4AF37",
                opacity: 0.85,
              }}
            >
              {card.subtitle}
            </p>
          </div>

          {/* Divider */}
          <div
            className="mb-5 h-px w-full"
            style={{ backgroundColor: "rgba(212,175,55,0.1)" }}
          />

          {/* Description */}
          <p
            className="mb-6 leading-[1.75] text-sm"
            style={{ fontFamily: "Inter, sans-serif", color: "#A8A8A8" }}
          >
            {card.description}
          </p>

          {/* Features – reveal on hover for standard, always visible for elite/featured */}
          <AnimatePresence>
            {(hovered || isElite || isFeatured) && (
              <motion.ul
                className="mb-7 flex flex-col gap-2.5"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {card.features.map((f, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2.5 text-sm"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: i * 0.045,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Check
                      size={12}
                      className="flex-shrink-0"
                      style={{ color: "#D4AF37" }}
                    />
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        color: "#A8A8A8",
                      }}
                    >
                      {f}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Pricing */}
          <div className="mb-6 flex items-baseline gap-1.5">
            <span
              className="font-black leading-none"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "clamp(1.6rem, 2.8vw, 2rem)",
                color: isElite ? "#D4AF37" : "#F8F8F8",
              }}
            >
              {card.price}
            </span>
            <span
              className="text-xs"
              style={{
                fontFamily: "Poppins, sans-serif",
                color: "#A8A8A8",
              }}
            >
              {card.priceLabel}
            </span>
          </div>

          {/* CTA button */}
          <a
            href={card.href}
            className="group relative inline-flex items-center justify-center gap-2.5
                       overflow-hidden px-6 py-3.5 transition-all duration-300"
            style={
              isElite
                ? { backgroundColor: "#D4AF37" }
                : isFeatured
                ? {
                    backgroundColor: "transparent",
                    border: "1px solid rgba(212,175,55,0.5)",
                    color: "#D4AF37",
                  }
                : {
                    backgroundColor: "transparent",
                    border: "1px solid rgba(248,248,248,0.12)",
                    color: "#A8A8A8",
                  }
            }
            onMouseEnter={(e) => {
              if (!isElite && !isFeatured) {
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)";
                e.currentTarget.style.color = "#D4AF37";
              }
            }}
            onMouseLeave={(e) => {
              if (!isElite && !isFeatured) {
                e.currentTarget.style.borderColor = "rgba(248,248,248,0.12)";
                e.currentTarget.style.color = "#A8A8A8";
              }
            }}
          >
            {/* Shimmer for elite */}
            {isElite && (
              <motion.span
                className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12"
                style={{ background: "rgba(255,255,255,0.15)" }}
                animate={{ translateX: ["-100%", "220%"] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut",
                }}
              />
            )}
            <span
              className="relative z-10 font-semibold text-sm uppercase tracking-[0.1em]"
              style={{
                fontFamily: "Poppins, sans-serif",
                color: isElite ? "#0D1015" : "inherit",
              }}
            >
              {card.cta}
            </span>
            <ArrowRight
              size={14}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: isElite ? "#0D1015" : "inherit" }}
            />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────────

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-100px" });

  const fadeUp = {
    hidden: { y: 30, opacity: 0 },
    visible: (delay: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden py-28 lg:py-36"
      style={{ backgroundColor: "#0D1015" }}
    >
      {/* Background texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.02]"
        aria-hidden="true"
      >
        <filter id="services-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#services-noise)" />
      </svg>

      {/* Radial gold accent – centre */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   h-[800px] w-[800px] rounded-full opacity-[0.035]"
        style={{
          background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Section header ──────────────────────────────────── */}
        <div ref={headerRef} className="mb-16 lg:mb-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <motion.p
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="text-[10px] font-semibold tracking-[0.35em] uppercase mb-5"
                style={{ color: "#D4AF37", fontFamily: "Poppins, sans-serif" }}
              >
                Elite Programs &amp; Services
              </motion.p>
              <motion.h2
                custom={0.1}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="font-black tracking-tight leading-[1.05]"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "clamp(2rem, 5vw, 3.75rem)",
                  color: "#F8F8F8",
                }}
              >
                CHOOSE YOUR{" "}
                <span style={{ color: "#D4AF37" }}>
                  PATH
                  <br className="hidden sm:block" />
                  TO MASTERY
                </span>
              </motion.h2>
              <motion.div
                custom={0.22}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="mt-5 h-px w-14 origin-left"
                style={{ backgroundColor: "rgba(212,175,55,0.5)" }}
              />
            </div>

            <motion.p
              custom={0.18}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="max-w-sm leading-relaxed"
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#A8A8A8",
                fontSize: "0.95rem",
              }}
            >
              Every engagement is designed to produce disproportionate results.
              Choose the level of access that matches your ambition.
            </motion.p>
          </div>
        </div>

        {/* ── Cards grid ──────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6 mb-16">
          {SERVICES.map((card, i) => (
            <ServiceCard key={card.id} card={card} index={i} />
          ))}
        </div>

        {/* ── Bottom trust strip ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-7"
          style={{
            border: "1px solid rgba(212,175,55,0.12)",
            backgroundColor: "rgba(23,27,34,0.5)",
          }}
        >
          {/* Trust signals */}
          <div className="flex flex-wrap items-center gap-6">
            {[
              "No long-term contracts",
              "Cancel anytime",
              "Results or full refund",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check size={12} style={{ color: "#D4AF37" }} />
                <span
                  className="text-xs tracking-wide"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    color: "#A8A8A8",
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-semibold
                       uppercase tracking-[0.1em] transition-colors duration-300 hover:text-[#D4AF37]"
            style={{
              fontFamily: "Poppins, sans-serif",
              color: "#F8F8F8",
              whiteSpace: "nowrap",
            }}
          >
            Not sure which is right for you?
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
