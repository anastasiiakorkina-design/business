"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  result: string;
  quote: string;
  initials: string;
  avatarHue: number;
  rating: number;
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const LOGOS = [
  "Forbes",
  "Entrepreneur",
  "Inc. Magazine",
  "Bloomberg",
  "Fast Company",
  "Business Insider",
  "TechCrunch",
  "The Wall Street Journal",
  "Forbes",
  "Entrepreneur",
  "Inc. Magazine",
  "Bloomberg",
  "Fast Company",
  "Business Insider",
];

const STATS = [
  { value: 2847, suffix: "", label: "Clients Transformed", prefix: "" },
  { value: 500, suffix: "M+", label: "Revenue Generated", prefix: "$" },
  { value: 4.9, suffix: "/5", label: "Star Rating", prefix: "" },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Marcus Chen",
    title: "Founder & CEO",
    company: "Axiom Commerce",
    result: "$42K → $890K in 11 months",
    quote:
      "The framework didn't just scale my revenue — it rebuilt every broken system in my business and gave me my life back. I'd recommend this to any entrepreneur serious about building something that lasts.",
    initials: "MC",
    avatarHue: 38,
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    title: "Agency Owner",
    company: "Elevate Digital",
    result: "$120K → $2.4M in 14 months",
    quote:
      "I went from trading hours for dollars to a fully leveraged model. The mindset shift alone was worth 10x the investment. The community and direct access to the coaching team is unlike anything I've experienced.",
    initials: "PS",
    avatarHue: 52,
    rating: 5,
  },
  {
    id: 3,
    name: "James Okafor",
    title: "SaaS Entrepreneur",
    company: "Loopstack Inc.",
    result: "$8K MRR → $480K ARR in 9 months",
    quote:
      "Every decision I made before was based on guesswork. Now I have a repeatable system that compounds every quarter. The ROI is incalculable — this is the investment I wish I had made three years earlier.",
    initials: "JO",
    avatarHue: 28,
    rating: 5,
  },
  {
    id: 4,
    name: "Sarah Whitfield",
    title: "Brand Consultant",
    company: "Whitfield Creative",
    result: "Launched 7-figure consulting firm",
    quote:
      "Working with this program gave me the confidence and the tools to charge premium prices and attract premium clients. My entire positioning transformed within 60 days of joining.",
    initials: "SW",
    avatarHue: 45,
    rating: 5,
  },
  {
    id: 5,
    name: "David Reyes",
    title: "Online Educator",
    company: "Reyes Academy",
    result: "$0 → $340K first 6 months",
    quote:
      "I had the knowledge but not the system to monetise it. Within six months I had a six-figure course business with a growing audience. The step-by-step methodology is extraordinary.",
    initials: "DR",
    avatarHue: 60,
    rating: 5,
  },
];

const PRESS_QUOTES = [
  {
    publication: "Forbes",
    quote:
      '"Redefining what modern business coaching looks like at scale — results speak for themselves."',
  },
];

// ─── Animated counter ──────────────────────────────────────────────────────────

function AnimatedCounter({
  target,
  suffix,
  prefix,
  isDecimal,
  inView,
  delay = 0,
}: {
  target: number;
  suffix: string;
  prefix: string;
  isDecimal: boolean;
  inView: boolean;
  delay?: number;
}) {
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const timeout = setTimeout(() => {
      const duration = 2000;
      let startTime: number | null = null;

      const step = (ts: number) => {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setVal(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else setVal(target);
      };

      requestAnimationFrame(step);
    }, delay);

    return () => clearTimeout(timeout);
  }, [inView, target, delay]);

  const display = isDecimal ? val.toFixed(1) : Math.floor(val).toLocaleString();

  return (
    <span className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

// ─── Logo marquee ──────────────────────────────────────────────────────────────

function LogoMarquee() {
  return (
    <div className="relative overflow-hidden">
      {/* Fade masks */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-32"
        style={{
          background:
            "linear-gradient(90deg, #0D1015 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-32"
        style={{
          background:
            "linear-gradient(270deg, #0D1015 0%, transparent 100%)",
        }}
      />

      <div className="flex animate-marquee whitespace-nowrap">
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <div
            key={i}
            className="mx-10 flex items-center gap-2 select-none"
          >
            {/* Publication "logo" rendered as styled text */}
            <span
              className="text-sm font-bold tracking-[0.18em] uppercase opacity-30
                         transition-opacity duration-300 hover:opacity-60"
              style={{
                fontFamily: "Montserrat, sans-serif",
                color: "#F8F8F8",
              }}
            >
              {logo}
            </span>
            <span
              className="h-[3px] w-[3px] rounded-full opacity-20"
              style={{ backgroundColor: "#D4AF37" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Star rating ───────────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star
          key={i}
          size={12}
          fill="#D4AF37"
          stroke="none"
          className="text-[#D4AF37]"
        />
      ))}
    </div>
  );
}

// ─── Testimonial slide ─────────────────────────────────────────────────────────

function TestimonialSlide({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col h-full">
      {/* Quote mark */}
      <div className="mb-6">
        <Quote
          size={32}
          fill="rgba(212,175,55,0.12)"
          stroke="rgba(212,175,55,0.3)"
          strokeWidth={1}
        />
      </div>

      {/* Stars */}
      <div className="mb-5">
        <StarRating count={testimonial.rating} />
      </div>

      {/* Quote text */}
      <p
        className="flex-1 text-base leading-[1.85] italic mb-8"
        style={{
          fontFamily: "Inter, sans-serif",
          color: "#A8A8A8",
          fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
        }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Result pill */}
      <div
        className="mb-6 inline-flex self-start items-center gap-2 px-3 py-1.5 text-[10px]
                   tracking-[0.18em] uppercase font-semibold"
        style={{
          backgroundColor: "rgba(212,175,55,0.08)",
          border: "1px solid rgba(212,175,55,0.2)",
          color: "#D4AF37",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <span
          className="h-[5px] w-[5px] rounded-full"
          style={{ backgroundColor: "#D4AF37" }}
        />
        {testimonial.result}
      </div>

      {/* Identity */}
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full
                     border border-[#D4AF37]/25"
          style={{
            background: `radial-gradient(circle at 35% 35%, hsl(${testimonial.avatarHue}, 35%, 30%) 0%, hsl(${testimonial.avatarHue}, 20%, 15%) 100%)`,
          }}
        >
          <span
            className="text-xs font-bold tracking-wider"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#D4AF37" }}
          >
            {testimonial.initials}
          </span>
        </div>
        <div>
          <p
            className="text-sm font-semibold leading-tight"
            style={{ fontFamily: "Inter, sans-serif", color: "#F8F8F8" }}
          >
            {testimonial.name}
          </p>
          <p
            className="text-xs tracking-wide mt-0.5"
            style={{ fontFamily: "Inter, sans-serif", color: "#A8A8A8" }}
          >
            {testimonial.title}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────────

export default function SocialProof() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-120px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  const goTo = (idx: number, dir: 1 | -1) => {
    setDirection(dir);
    setActiveIdx((idx + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const prev = () => goTo(activeIdx - 1, -1);
  const next = () => goTo(activeIdx + 1, 1);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => goTo(activeIdx + 1, 1), 6500);
    return () => clearInterval(id);
  }, [activeIdx]);

  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (d: number) => ({
      x: d > 0 ? -60 : 60,
      opacity: 0,
      transition: { duration: 0.35, ease: [0.4, 0, 0.8, 0] },
    }),
  };

  const fadeUpVariants = {
    hidden: { y: 32, opacity: 0 },
    visible: (delay: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="social-proof"
      className="relative overflow-hidden py-28 lg:py-36"
      style={{ backgroundColor: "#0D1015" }}
    >
      {/* Background accents */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% 0%, rgba(212,175,55,0.025) 0%, transparent 65%)",
        }}
      />

      {/* Subtle grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.8) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Section header ──────────────────────────────────── */}
        <div className="mb-16 text-center">
          <motion.p
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-[10px] font-semibold tracking-[0.35em] uppercase mb-4"
            style={{ color: "#D4AF37", fontFamily: "Poppins, sans-serif" }}
          >
            As Seen In &amp; Trusted By
          </motion.p>
          <motion.h2
            custom={0.1}
            variants={fadeUpVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-black tracking-tight leading-[1.05]"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              color: "#F8F8F8",
            }}
          >
            THE WORLD&apos;S LEADING{" "}
            <span style={{ color: "#D4AF37" }}>ENTREPRENEURS</span>
            <br className="hidden sm:block" /> TRUST OUR PROCESS
          </motion.h2>
          <motion.div
            custom={0.25}
            variants={fadeUpVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mx-auto mt-5 h-px w-14 origin-center"
            style={{ backgroundColor: "rgba(212,175,55,0.5)" }}
          />
        </div>

        {/* ── Logo marquee ────────────────────────────────────── */}
        <motion.div
          custom={0.2}
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-20"
        >
          <LogoMarquee />
        </motion.div>

        {/* ── Stat counters ────────────────────────────────────── */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-3 mb-24"
          style={{
            border: "1px solid rgba(212,175,55,0.12)",
            backgroundColor: "#171B22",
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center justify-center px-8 py-10 relative"
              style={{
                borderRight:
                  i < 2 ? "1px solid rgba(212,175,55,0.1)" : undefined,
              }}
            >
              {/* Decorative corner accents */}
              {i === 1 && (
                <>
                  <div
                    className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] origin-center"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)",
                      opacity: 0.5,
                    }}
                  />
                  <div
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] origin-center"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)",
                      opacity: 0.2,
                    }}
                  />
                </>
              )}

              <div
                className="font-black leading-none mb-2"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "clamp(2.4rem, 4vw, 3.5rem)",
                  color: i === 1 ? "#D4AF37" : "#F8F8F8",
                }}
              >
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  isDecimal={stat.value % 1 !== 0}
                  inView={statsInView}
                  delay={i * 120}
                />
              </div>
              <p
                className="text-[11px] tracking-[0.2em] uppercase font-medium text-center"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  color: "#A8A8A8",
                }}
              >
                {stat.label}
              </p>

              {/* Star row under rating */}
              {i === 2 && (
                <div className="mt-2">
                  <StarRating count={5} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* ── Testimonial slider ──────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
          {/* Left – heading & controls */}
          <div className="lg:sticky lg:top-28">
            <motion.p
              custom={0.3}
              variants={fadeUpVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-5"
              style={{ color: "#D4AF37", fontFamily: "Poppins, sans-serif" }}
            >
              Client Testimonials
            </motion.p>
            <motion.h3
              custom={0.4}
              variants={fadeUpVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-black tracking-tight leading-[1.08] mb-6"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                color: "#F8F8F8",
              }}
            >
              REAL RESULTS FROM{" "}
              <span style={{ color: "#D4AF37" }}>REAL PEOPLE</span>
            </motion.h3>
            <motion.p
              custom={0.5}
              variants={fadeUpVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="mb-10 leading-relaxed"
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#A8A8A8",
                fontSize: "0.95rem",
                maxWidth: "480px",
              }}
            >
              Our clients are not exceptional people who got lucky. They are
              ordinary entrepreneurs who applied an extraordinary system. Here is
              what they have to say.
            </motion.p>

            {/* Navigation */}
            <motion.div
              custom={0.6}
              variants={fadeUpVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex items-center gap-4"
            >
              <button
                onClick={prev}
                className="flex h-11 w-11 items-center justify-center border transition-all duration-300
                           hover:border-[#D4AF37] hover:bg-[#D4AF37]/8 group"
                style={{
                  borderColor: "rgba(212,175,55,0.25)",
                  color: "#A8A8A8",
                }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft
                  size={18}
                  className="transition-colors duration-300 group-hover:text-[#D4AF37]"
                />
              </button>
              <button
                onClick={next}
                className="flex h-11 w-11 items-center justify-center border transition-all duration-300
                           hover:border-[#D4AF37] hover:bg-[#D4AF37]/8 group"
                style={{
                  borderColor: "rgba(212,175,55,0.25)",
                  color: "#A8A8A8",
                }}
                aria-label="Next testimonial"
              >
                <ChevronRight
                  size={18}
                  className="transition-colors duration-300 group-hover:text-[#D4AF37]"
                />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2 ml-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > activeIdx ? 1 : -1)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === activeIdx ? "20px" : "6px",
                      height: "6px",
                      backgroundColor:
                        i === activeIdx
                          ? "#D4AF37"
                          : "rgba(212,175,55,0.25)",
                    }}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right – testimonial card */}
          <motion.div
            custom={0.45}
            variants={fadeUpVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative min-h-[400px]"
          >
            <div
              className="relative overflow-hidden p-8 sm:p-10 min-h-[400px]"
              style={{
                backgroundColor: "#171B22",
                border: "1px solid rgba(212,175,55,0.15)",
              }}
            >
              {/* Animated top border */}
              <motion.div
                key={activeIdx}
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ backgroundColor: "#D4AF37" }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Gold corner accent */}
              <div
                className="pointer-events-none absolute bottom-0 right-0"
                style={{
                  width: "120px",
                  height: "120px",
                  background:
                    "radial-gradient(circle at 100% 100%, rgba(212,175,55,0.06) 0%, transparent 70%)",
                }}
              />

              {/* Slide content */}
              <motion.div
                key={`slide-${activeIdx}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <TestimonialSlide testimonial={TESTIMONIALS[activeIdx]} />
              </motion.div>
            </div>

            {/* Pagination counter */}
            <div className="mt-4 flex justify-end">
              <span
                className="text-xs tabular-nums"
                style={{ color: "#A8A8A8", fontFamily: "Poppins, sans-serif" }}
              >
                <span style={{ color: "#D4AF37" }}>
                  {String(activeIdx + 1).padStart(2, "0")}
                </span>{" "}
                / {String(TESTIMONIALS.length).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Press feature quote ─────────────────────────────── */}
        <motion.div
          custom={0.5}
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div
            className="relative px-8 py-8 sm:px-12 sm:py-10"
            style={{
              border: "1px solid rgba(212,175,55,0.14)",
              backgroundColor: "rgba(23,27,34,0.6)",
            }}
          >
            {/* Left gold accent bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px]"
              style={{ backgroundColor: "#D4AF37" }}
            />

            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div
                className="flex-shrink-0 text-xs font-bold tracking-[0.22em] uppercase"
                style={{
                  color: "#D4AF37",
                  fontFamily: "Montserrat, sans-serif",
                  writingMode: "horizontal-tb",
                }}
              >
                {PRESS_QUOTES[0].publication}
              </div>
              <div
                className="h-8 w-px hidden sm:block"
                style={{ backgroundColor: "rgba(212,175,55,0.2)" }}
              />
              <p
                className="text-sm sm:text-base leading-relaxed italic"
                style={{ color: "#F8F8F8", fontFamily: "Inter, sans-serif" }}
              >
                {PRESS_QUOTES[0].quote}
              </p>
            </div>

            {/* Press mention badges */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span
                className="text-[9px] tracking-[0.25em] uppercase"
                style={{ color: "#A8A8A8", fontFamily: "Poppins, sans-serif" }}
              >
                As featured in
              </span>
              {["Forbes", "Entrepreneur", "Inc.", "Bloomberg", "Fast Company"].map(
                (pub) => (
                  <span
                    key={pub}
                    className="px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase
                               transition-colors duration-300 hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                    style={{
                      border: "1px solid rgba(212,175,55,0.15)",
                      color: "#A8A8A8",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {pub}
                  </span>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
