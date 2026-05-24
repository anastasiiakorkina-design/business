"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Quote,
  Play,
  Star,
  Filter,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type Industry = "All Industries" | "E-commerce" | "Consulting" | "Coaching" | "Agency";

interface CaseStudy {
  id: string;
  name: string;
  role: string;
  company: string;
  industry: Industry;
  photo: string;
  revenueBefore: string;
  revenueAfter: string;
  timeframe: string;
  quote: string;
  keyWin: string;
  featured: boolean;
}

interface VideoTestimonial {
  name: string;
  role: string;
  thumbnail: string;
  revenue: string;
  duration: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const INDUSTRIES: Industry[] = ["All Industries", "E-commerce", "Consulting", "Coaching", "Agency"];

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "marcus",
    name: "Marcus Webb",
    role: "CEO",
    company: "Elevate E-commerce",
    industry: "E-commerce",
    photo: "MW",
    revenueBefore: "$800K",
    revenueAfter: "$4.2M",
    timeframe: "14 months",
    quote: "James identified a constraint in my fulfillment ops that was costing me 30% of potential revenue. Fixed it in 6 weeks. Revenue compounded from there.",
    keyWin: "Hired ops director + rebuilt warehouse system",
    featured: true,
  },
  {
    id: "sarah",
    name: "Sarah Chen",
    role: "Founder",
    company: "NovaBrand Agency",
    industry: "Agency",
    photo: "SC",
    revenueBefore: "$380K",
    revenueAfter: "$1.4M",
    timeframe: "12 months",
    quote: "The Apex Offer Architecture completely changed how I priced my services. I went from 22 small clients to 6 premium clients and more than tripled revenue.",
    keyWin: "Productized service model + premium pricing",
    featured: true,
  },
  {
    id: "priya",
    name: "Dr. Priya Patel",
    role: "Founder",
    company: "Patel Consulting Group",
    industry: "Consulting",
    photo: "PP",
    revenueBefore: "$250K",
    revenueAfter: "$1.1M",
    timeframe: "18 months",
    quote: "I was the business. James helped me see that clearly and build a team around documented processes. Now the firm runs without my daily presence.",
    keyWin: "Built first leadership team of 4 directors",
    featured: false,
  },
  {
    id: "james-r",
    name: "James Rivera",
    role: "Owner",
    company: "Scale Fitness Coaching",
    industry: "Coaching",
    photo: "JR",
    revenueBefore: "$120K",
    revenueAfter: "$680K",
    timeframe: "10 months",
    quote: "From $10K months to $50K+ months. The group coaching model James designed for me changed everything about the economics of my business.",
    keyWin: "Launched group coaching program from 1:1",
    featured: false,
  },
  {
    id: "nina",
    name: "Nina Okafor",
    role: "CEO",
    company: "Okafor Digital",
    industry: "Agency",
    photo: "NO",
    revenueBefore: "$600K",
    revenueAfter: "$2.8M",
    timeframe: "20 months",
    quote: "We were stuck at $600K for two years. The Apex team helped us crack the $1M barrier and we haven't slowed down since.",
    keyWin: "Expanded from 1 to 3 service lines",
    featured: false,
  },
  {
    id: "david",
    name: "David Kim",
    role: "Founder",
    company: "KoraTech Commerce",
    industry: "E-commerce",
    photo: "DK",
    revenueBefore: "$1.2M",
    revenueAfter: "$5.7M",
    timeframe: "24 months",
    quote: "James pushed me to hire a CMO 18 months before I felt ready. That single hire was worth $2M in revenue over the next year.",
    keyWin: "Hired executive team ahead of growth curve",
    featured: true,
  },
  {
    id: "elena",
    name: "Elena Martinez",
    role: "Director",
    company: "Vertex Strategy",
    industry: "Consulting",
    photo: "EM",
    revenueBefore: "$450K",
    revenueAfter: "$1.9M",
    timeframe: "16 months",
    quote: "The referral engine Apex designed for us now generates 60% of new business. We've completely cut paid ads and our margins are the best they've ever been.",
    keyWin: "Built automated referral and partnership engine",
    featured: false,
  },
  {
    id: "tyler",
    name: "Tyler Brooks",
    role: "Founder",
    company: "Apex Performance Coaching",
    industry: "Coaching",
    photo: "TB",
    revenueBefore: "$85K",
    revenueAfter: "$520K",
    timeframe: "8 months",
    quote: "I didn't believe I could charge $5,000 for coaching. James showed me exactly why I was wrong, and my clients are getting 10x that in results.",
    keyWin: "Repackaged offer + 4x price increase",
    featured: false,
  },
];

const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    name: "Marcus Webb",
    role: "CEO, Elevate E-commerce",
    thumbnail: "from-[#1a1f28] via-[#252b35] to-[#0D1015]",
    revenue: "$800K → $4.2M",
    duration: "8:32",
  },
  {
    name: "Sarah Chen",
    role: "Founder, NovaBrand Agency",
    thumbnail: "from-[#1e232c] via-[#171B22] to-[#0D1015]",
    revenue: "$380K → $1.4M",
    duration: "6:17",
  },
  {
    name: "David Kim",
    role: "Founder, KoraTech Commerce",
    thumbnail: "from-[#252b35] via-[#1a1f28] to-[#0D1015]",
    revenue: "$1.2M → $5.7M",
    duration: "10:44",
  },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-black leading-none mb-2"
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
          color: "#D4AF37",
        }}
      >
        {value}
      </motion.div>
      <div className="text-[#A8A8A8] text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
        {label}
      </div>
    </div>
  );
}

// ─── Case Study Card ──────────────────────────────────────────────────────────

function CaseStudyCard({ cs, index }: { cs: CaseStudy; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`group bg-[#171B22] border rounded-sm p-6 flex flex-col gap-5 hover:-translate-y-1 transition-all duration-400 ${
        cs.featured ? "border-[#D4AF37]/30 hover:border-[#D4AF37]/55" : "border-[#D4AF37]/12 hover:border-[#D4AF37]/30"
      }`}
    >
      {cs.featured && (
        <div className="flex justify-end">
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/25 px-2.5 py-1 rounded-full"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Featured
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-black text-sm shrink-0"
          style={{ fontFamily: "Montserrat, sans-serif" }}>
          {cs.photo}
        </div>
        <div>
          <div className="text-[#F8F8F8] font-bold text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {cs.name}
          </div>
          <div className="text-[#6b6b6b] text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
            {cs.role}, {cs.company}
          </div>
        </div>
        <div className="ml-auto text-right">
          <div className="inline-flex items-center gap-1 text-[9px] font-semibold tracking-[0.15em] uppercase text-[#D4AF37]/70 bg-[#D4AF37]/06 border border-[#D4AF37]/15 px-2 py-0.5 rounded-full"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            {cs.industry}
          </div>
        </div>
      </div>

      {/* Before/After revenue */}
      <div className="flex items-center gap-3 bg-[#0D1015] rounded-sm p-4">
        <div className="text-center flex-1">
          <div className="text-xs text-[#6b6b6b] mb-1 uppercase tracking-wider" style={{ fontFamily: "Poppins, sans-serif" }}>Before</div>
          <div className="font-bold text-[#A8A8A8]" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.1rem" }}>
            {cs.revenueBefore}
          </div>
        </div>
        <div className="text-[#D4AF37]">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div className="text-center flex-1">
          <div className="text-xs text-[#6b6b6b] mb-1 uppercase tracking-wider" style={{ fontFamily: "Poppins, sans-serif" }}>After</div>
          <div className="font-black text-[#D4AF37]" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.3rem" }}>
            {cs.revenueAfter}
          </div>
        </div>
        <div className="text-center flex-1">
          <div className="text-xs text-[#6b6b6b] mb-1 uppercase tracking-wider" style={{ fontFamily: "Poppins, sans-serif" }}>Time</div>
          <div className="font-bold text-[#F8F8F8] text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {cs.timeframe}
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="flex gap-3">
        <Quote className="w-4 h-4 text-[#D4AF37]/40 shrink-0 mt-0.5" />
        <p className="text-[#A8A8A8] text-sm leading-relaxed italic line-clamp-3"
          style={{ fontFamily: "Inter, sans-serif" }}>
          {cs.quote}
        </p>
      </div>

      {/* Key win */}
      <div className="flex items-center gap-2 text-xs text-[#D4AF37] bg-[#D4AF37]/06 border border-[#D4AF37]/15 rounded-sm px-3 py-2">
        <Star className="w-3 h-3 fill-[#D4AF37] shrink-0" />
        <span style={{ fontFamily: "Poppins, sans-serif" }}>{cs.keyWin}</span>
      </div>

      {/* Read story link */}
      <Link
        href="/book"
        className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-semibold tracking-wider uppercase mt-auto group-hover:gap-3 transition-all duration-200"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Book a Call to Learn More <ChevronRight className="w-3.5 h-3.5" />
      </Link>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SuccessStoriesPage() {
  const [activeIndustry, setActiveIndustry] = useState<Industry>("All Industries");

  const filtered = CASE_STUDIES.filter(
    (cs) => activeIndustry === "All Industries" || cs.industry === activeIndustry
  );

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
          <filter id="noise-stories">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise-stories)" />
        </svg>

        <div className="max-w-7xl mx-auto relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <div className="h-px w-8 bg-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-[0.28em] uppercase text-[#D4AF37]"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              Verified Results
            </span>
            <div className="h-px w-8 bg-[#D4AF37]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-black tracking-tight leading-[0.9] mb-6"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              color: "#F8F8F8",
            }}
          >
            SUCCESS
            <br />
            <span style={{ color: "#D4AF37" }}>STORIES</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#A8A8A8] text-xl leading-relaxed max-w-2xl mx-auto mb-14"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Real founders. Real numbers. Real transformations. Over $500M in verified client revenue
            across 2,000+ entrepreneurs in 47 countries.
          </motion.p>

          {/* Hero metrics */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              ["$500M+", "Client Revenue Generated"],
              ["2,000+", "Entrepreneurs Coached"],
              ["94%", "Client Satisfaction Rate"],
              ["3.2x", "Avg Revenue Increase"],
            ].map(([v, l]) => (
              <AnimatedCounter key={l} value={v} label={l} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── INDUSTRY FILTER ──────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center items-center">
            <Filter className="w-4 h-4 text-[#6b6b6b]" />
            {INDUSTRIES.map((ind) => (
              <button
                key={ind}
                onClick={() => setActiveIndustry(ind)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  activeIndustry === ind
                    ? "bg-[#D4AF37] text-[#0D1015]"
                    : "bg-[#171B22] border border-[#2C2F36] text-[#A8A8A8] hover:border-[#D4AF37]/40 hover:text-[#F8F8F8]"
                }`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CASE STUDIES GRID ────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 pb-28">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {filtered.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((cs, i) => (
                    <CaseStudyCard key={cs.id} cs={cs} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-[#A8A8A8]" style={{ fontFamily: "Inter, sans-serif" }}>
                  No case studies in this category yet.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── VIDEO TESTIMONIALS ───────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-28" style={{ backgroundColor: "#171B22" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-semibold tracking-[0.28em] uppercase text-[#D4AF37] mb-4 block"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              Video Testimonials
            </span>
            <h2
              className="font-black text-[#F8F8F8] tracking-tight"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              Hear it <span style={{ color: "#D4AF37" }}>Directly</span> from Them
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEO_TESTIMONIALS.map((vt, i) => (
              <motion.div
                key={vt.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className={`relative aspect-video rounded-sm overflow-hidden bg-gradient-to-br ${vt.thumbnail} mb-4`}>
                  <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(212,175,55,0.06) 0%, transparent 70%)" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{ boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}>
                      <Play className="w-5 h-5 text-[#0D1015] fill-[#0D1015] ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-[#0D1015]/70 text-[#F8F8F8] text-xs font-semibold px-2 py-0.5 rounded"
                    style={{ fontFamily: "Poppins, sans-serif" }}>
                    {vt.duration}
                  </div>
                </div>
                <div className="font-bold text-[#F8F8F8] text-sm mb-0.5" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {vt.name}
                </div>
                <div className="text-[#6b6b6b] text-xs mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
                  {vt.role}
                </div>
                <div className="text-[#D4AF37] text-xs font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {vt.revenue}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APPLY CTA ────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)" }}
        />
        <div className="max-w-3xl mx-auto relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="h-px w-24 mx-auto mb-10" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
            <div className="flex gap-1 justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
              ))}
            </div>
            <h2
              className="font-black text-[#F8F8F8] tracking-tight mb-5 leading-[0.95]"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Your Success Story
              <br />
              <span style={{ color: "#D4AF37" }}>Starts Here</span>
            </h2>
            <p className="text-[#A8A8A8] text-lg leading-relaxed mb-10" style={{ fontFamily: "Inter, sans-serif" }}>
              Every story above started with a single strategy call. Book yours today and let's figure
              out exactly what's between you and your next level.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#D4AF37] text-[#0D1015] font-bold tracking-wider uppercase rounded-sm hover:bg-[#e8c84a] transition-colors duration-200 text-sm"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Book Your Free Strategy Call <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="mt-4 text-xs text-[#6b6b6b]" style={{ fontFamily: "Inter, sans-serif" }}>
              No obligation. Real strategy. 45 minutes.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
