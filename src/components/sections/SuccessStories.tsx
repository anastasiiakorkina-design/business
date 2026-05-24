"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Play, ArrowRight, Quote } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CaseStudy {
  id: number;
  name: string;
  role: string;
  beforeRevenue: number;
  afterRevenue: number;
  timeframe: string;
  quote: string;
  initials: string;
  accentHue: string;
}

interface VideoTestimonial {
  id: number;
  name: string;
  role: string;
  duration: string;
  thumbnail: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    name: "Marcus Chen",
    role: "E-Commerce Founder",
    beforeRevenue: 42000,
    afterRevenue: 890000,
    timeframe: "11 months",
    quote:
      "The framework didn't just scale my revenue. It rebuilt every broken system in my business and gave me my time back.",
    initials: "MC",
    accentHue: "oklch(78% 0.17 85)",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Agency Owner",
    beforeRevenue: 120000,
    afterRevenue: 2400000,
    timeframe: "14 months",
    quote:
      "I went from trading hours for dollars to a leveraged model. The mindset shift alone was worth 10x the investment.",
    initials: "PS",
    accentHue: "oklch(78% 0.17 85)",
  },
  {
    id: 3,
    name: "James Okafor",
    role: "SaaS Entrepreneur",
    beforeRevenue: 8000,
    afterRevenue: 480000,
    timeframe: "9 months",
    quote:
      "Every decision I made before was based on guesswork. Now I have a repeatable system that compounds every quarter.",
    initials: "JO",
    accentHue: "oklch(78% 0.17 85)",
  },
];

const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 1,
    name: "Sarah Whitfield",
    role: "Brand Consultant",
    duration: "4:12",
    thumbnail: "from-[#1a1f28] to-[#0d1015]",
  },
  {
    id: 2,
    name: "David Reyes",
    role: "Online Educator",
    duration: "6:44",
    thumbnail: "from-[#1c1a14] to-[#0d1015]",
  },
  {
    id: 3,
    name: "Amara Osei",
    role: "Fitness Coach",
    duration: "3:58",
    thumbnail: "from-[#141a1c] to-[#0d1015]",
  },
];

// ─── Number counter hook ───────────────────────────────────────────────────────

function useCountUp(target: number, inView: boolean) {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 40, damping: 18 });
  const [display, setDisplay] = useState(0);

  spring.on("change", (v) => setDisplay(Math.round(v)));

  if (inView && motionVal.get() === 0) {
    motionVal.set(target);
  }

  return display;
}

// ─── Case study card ──────────────────────────────────────────────────────────

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const beforeCount = useCountUp(study.beforeRevenue, inView);
  const afterCount = useCountUp(study.afterRevenue, inView);

  const formatRevenue = (v: number) =>
    v >= 1_000_000
      ? `$${(v / 1_000_000).toFixed(v % 1_000_000 === 0 ? 1 : 2)}M`
      : v >= 1_000
      ? `$${(v / 1_000).toFixed(0)}K`
      : `$${v.toLocaleString()}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col bg-[#171B22] group cursor-default"
      style={{ outline: "1px solid rgba(212,175,55,0.18)" }}
    >
      {/* Gold top bar animates in on view */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-[#D4AF37]"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: index * 0.15 + 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="p-8 flex flex-col gap-6 flex-1">
        {/* Avatar + identity */}
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center
                        border border-[#D4AF37]/30 bg-[#D4AF37]/8 flex-shrink-0"
          >
            <span
              className="text-[#D4AF37] font-montserrat font-bold text-base tracking-widest"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              {study.initials}
            </span>
          </div>
          <div>
            <p
              className="text-[#F8F8F8] font-semibold text-[15px] leading-tight"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {study.name}
            </p>
            <p
              className="text-[#A8A8A8] text-xs tracking-wide mt-0.5"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {study.role}
            </p>
          </div>
        </div>

        {/* Revenue before/after */}
        <div className="flex items-center gap-0">
          <div className="flex-1 bg-[#0D1015] p-4">
            <p
              className="text-[#A8A8A8] text-[10px] uppercase tracking-[0.18em] font-semibold mb-1.5"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Before
            </p>
            <p
              className="text-[#A8A8A8] text-2xl font-bold"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              {formatRevenue(beforeCount)}
            </p>
          </div>

          {/* Arrow divider */}
          <div className="flex flex-col items-center px-3">
            <div className="w-[1px] h-3 bg-[#D4AF37]/30" />
            <ArrowRight size={14} className="text-[#D4AF37] my-1" />
            <div className="w-[1px] h-3 bg-[#D4AF37]/30" />
          </div>

          <div className="flex-1 bg-[#0D1015] p-4">
            <p
              className="text-[#A8A8A8] text-[10px] uppercase tracking-[0.18em] font-semibold mb-1.5"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              After
            </p>
            <p
              className="text-[#D4AF37] text-2xl font-bold"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              {formatRevenue(afterCount)}
            </p>
          </div>
        </div>

        {/* Timeframe badge */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-[1px] bg-[#D4AF37]/50" />
          <span
            className="text-[#D4AF37] text-[11px] tracking-[0.2em] uppercase font-semibold"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {study.timeframe}
          </span>
        </div>

        {/* Quote */}
        <div className="flex gap-3 mt-auto">
          <Quote size={16} className="text-[#D4AF37]/50 flex-shrink-0 mt-0.5" />
          <p
            className="text-[#A8A8A8] text-sm leading-relaxed italic"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {study.quote}
          </p>
        </div>
      </div>

      {/* Bottom hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.04) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}

// ─── Video testimonial card ────────────────────────────────────────────────────

function VideoCard({ video, index }: { video: VideoTestimonial; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-video bg-[#171B22] cursor-pointer group overflow-hidden"
      style={{ outline: "1px solid rgba(212,175,55,0.14)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Simulated video thumbnail */}
      <div className={`absolute inset-0 bg-gradient-to-br ${video.thumbnail}`} />

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "150px",
        }}
      />

      {/* Duration badge */}
      <div className="absolute top-3 right-3 z-10">
        <span
          className="bg-[#0D1015]/80 text-[#A8A8A8] text-[10px] px-2 py-1 tracking-wide font-medium"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {video.duration}
        </span>
      </div>

      {/* Play button */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center
                      border border-[#D4AF37]/60 bg-[#D4AF37]/10 backdrop-blur-sm
                      group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/20
                      transition-all duration-300"
        >
          <Play
            size={20}
            className="text-[#D4AF37] ml-1"
            fill="rgba(212,175,55,0.9)"
            strokeWidth={0}
          />
        </div>
      </motion.div>

      {/* Bottom identity strip */}
      <div
        className="absolute bottom-0 left-0 right-0 px-4 py-3 z-10"
        style={{ background: "linear-gradient(to top, rgba(13,16,21,0.92) 0%, transparent 100%)" }}
      >
        <p
          className="text-[#F8F8F8] text-sm font-semibold"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {video.name}
        </p>
        <p
          className="text-[#A8A8A8] text-[11px] tracking-wide"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {video.role}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────────

export default function SuccessStories() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section
      id="success-stories"
      className="relative bg-[#0D1015] py-28 lg:py-36 overflow-hidden"
    >
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(212,175,55,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div ref={headingRef} className="mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#D4AF37] text-[10px] tracking-[0.35em] uppercase font-semibold mb-5"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Results
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#F8F8F8] text-4xl lg:text-5xl xl:text-[56px] font-bold tracking-tight leading-[1.05]"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            PROOF THAT THE{" "}
            <span className="text-[#D4AF37]">SYSTEM WORKS</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-[1px] bg-[#D4AF37]/60 mt-6 origin-left"
          />
        </div>

        {/* Case studies grid */}
        <div className="grid md:grid-cols-3 gap-px bg-[#D4AF37]/10 mb-16 lg:mb-20">
          {CASE_STUDIES.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>

        {/* Video testimonials */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[#A8A8A8] text-xs tracking-[0.25em] uppercase font-semibold mb-8"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Video testimonials
          </motion.p>
          <div className="grid sm:grid-cols-3 gap-4">
            {VIDEO_TESTIMONIALS.map((v, i) => (
              <VideoCard key={v.id} video={v} index={i} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <a
            href="/success-stories"
            className="group relative inline-flex items-center gap-3 px-8 py-4
                       border border-[#D4AF37]/50 text-[#D4AF37] overflow-hidden
                       hover:border-[#D4AF37] transition-colors duration-300"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            <span className="relative z-10 font-semibold text-sm tracking-widest uppercase">
              Read All Success Stories
            </span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight size={16} />
            </motion.span>

            {/* Hover fill */}
            <span
              className="absolute inset-0 bg-[#D4AF37]/6 scale-x-0 origin-left
                           group-hover:scale-x-100 transition-transform duration-300"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
