"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, ChevronDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Static data ───────────────────────────────────────────────────────────────

const STATS = [
  { value: "2,000+", label: "Clients" },
  { value: "$500M+", label: "Revenue Generated" },
  { value: "47", label: "Countries" },
  { value: "98%", label: "Success Rate" },
];

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  duration: Math.random() * 14 + 10,
  delay: Math.random() * 8,
  opacity: Math.random() * 0.35 + 0.08,
}));

// ─── Noise texture ─────────────────────────────────────────────────────────────

function NoiseTexture() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.028]"
      aria-hidden="true"
    >
      <filter id="hero-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.68"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#hero-noise)" />
    </svg>
  );
}

// ─── Animated stat counter ─────────────────────────────────────────────────────

function StatCounter({ value, delay }: { value: string; delay: number }) {
  const [displayed, setDisplayed] = useState("0");
  const numericPart = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");

  useEffect(() => {
    const timer = setTimeout(() => {
      let startTime = 0;
      const end = numericPart;
      const totalDuration = 1800;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / totalDuration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = eased * end;
        if (progress < 1) {
          setDisplayed(
            current < 10 ? current.toFixed(1) : Math.floor(current).toLocaleString()
          );
          requestAnimationFrame(step);
        } else {
          setDisplayed(numericPart.toLocaleString() + suffix);
        }
      };
      requestAnimationFrame(step);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [value, delay, numericPart, suffix]);

  return (
    <span
      className="font-black tabular-nums leading-none"
      style={{
        fontFamily: "Montserrat, sans-serif",
        fontSize: "clamp(1.35rem, 2.4vw, 1.9rem)",
        color: "#F8F8F8",
      }}
    >
      {displayed}
    </span>
  );
}

// ─── Hero component ────────────────────────────────────────────────────────────

const headlineWords1 = ["BUILD", "AN", "EMPIRE."];
const headlineWords2 = ["LIVE", "ON", "YOUR", "TERMS."];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.65], [0, 0.55]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Parallax on the background image via GSAP ScrollTrigger
      gsap.to(bgRef.current, {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Stats bar entrance
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.querySelectorAll(".stat-item"),
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 92%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.075, delayChildren: 0.25 } },
  };

  const wordVariants = {
    hidden: { y: "115%", opacity: 0, rotateX: 8 },
    visible: {
      y: "0%",
      opacity: 1,
      rotateX: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const line2WordVariants = (i: number) => ({
    hidden: { y: "115%", opacity: 0, rotateX: 8 },
    visible: {
      y: "0%",
      opacity: 1,
      rotateX: 0,
      transition: { duration: 1, delay: i * 0.05 + 0.38, ease: [0.16, 1, 0.3, 1] },
    },
  });

  const fadeUp = {
    hidden: { y: 28, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{ backgroundColor: "#0D1015" }}
    >
      {/* ── Background layer ──────────────────────────────────── */}
      <motion.div
        ref={bgRef}
        className="absolute inset-[-10%] will-change-transform"
        style={{ y: bgY }}
      >
        {/* Hero image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2400&q=85&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            filter: "brightness(0.18) saturate(0.5)",
          }}
        />

        {/* Cinematic gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,16,21,0.25) 0%, rgba(13,16,21,0.05) 35%, rgba(13,16,21,0.65) 78%, rgba(13,16,21,1) 100%)",
          }}
        />

        {/* Subtle gold radial glow at top-center */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 48% 25%, rgba(212,175,55,0.05) 0%, transparent 68%)",
          }}
        />

        {/* Vignette – edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 55%, rgba(13,16,21,0.6) 100%)",
          }}
        />
      </motion.div>

      {/* ── Scroll-driven darkening ────────────────────────────── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: "#0D1015", opacity: overlayOpacity }}
      />

      {/* ── Noise texture ─────────────────────────────────────── */}
      <NoiseTexture />

      {/* ── Gold top accent line ──────────────────────────────── */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ backgroundColor: "rgba(212,175,55,0.45)" }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      />

      {/* ── Floating particles ────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: "#D4AF37",
              opacity: p.opacity,
            }}
            animate={{
              y: [0, -38, 0],
              x: [0, p.id % 2 === 0 ? 8 : -8, 0],
              opacity: [p.opacity, p.opacity * 0.25, p.opacity],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── Diagonal decorative lines ─────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.035]">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute border-r border-[#D4AF37]"
            style={{
              left: `${18 + i * 16}%`,
              top: 0,
              bottom: 0,
              transform: `rotate(${12 + i * 2}deg) translateX(-50%)`,
              transformOrigin: "center",
            }}
          />
        ))}
      </div>

      {/* ── Main content ──────────────────────────────────────── */}
      <motion.div
        className="relative z-10 flex flex-1 flex-col items-start justify-center
                   px-6 pt-28 pb-44 sm:px-10 lg:px-20 xl:px-32 max-w-[1600px]"
        style={{ y: contentY }}
      >
        {/* Eyebrow */}
        <motion.div
          className="mb-8 flex items-center gap-3"
          initial={{ opacity: 0, x: -22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="h-px w-12" style={{ backgroundColor: "#D4AF37" }} />
          <span
            className="text-[11px] font-semibold tracking-[0.3em] uppercase"
            style={{ color: "#D4AF37", fontFamily: "Poppins, sans-serif" }}
          >
            Elite Entrepreneur Coaching
          </span>
        </motion.div>

        {/* Headline line 1 */}
        <div className="overflow-hidden mb-1" style={{ perspective: "800px" }}>
          <motion.div
            className="flex flex-wrap gap-x-[0.3em]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {headlineWords1.map((word, i) => (
              <div key={i} className="overflow-hidden leading-none">
                <motion.span
                  variants={wordVariants}
                  className="block font-black"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "clamp(3rem, 9.5vw, 9rem)",
                    color: "#F8F8F8",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Headline line 2 */}
        <div className="overflow-hidden mb-10" style={{ perspective: "800px" }}>
          <div className="flex flex-wrap gap-x-[0.3em]">
            {headlineWords2.map((word, i) => (
              <div key={i} className="overflow-hidden leading-none">
                <motion.span
                  variants={line2WordVariants(i)}
                  initial="hidden"
                  animate="visible"
                  className="block font-black"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "clamp(3rem, 9.5vw, 9rem)",
                    color: "#D4AF37",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>
        </div>

        {/* Subheadline */}
        <motion.p
          className="mb-12 max-w-[640px]"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
            color: "#A8A8A8",
            lineHeight: 1.75,
          }}
        >
          Join 2,000+ entrepreneurs who&apos;ve scaled to 6 and 7 figures with proven
          systems and elite mentorship.
        </motion.p>

        {/* CTA group */}
        <motion.div
          className="flex flex-wrap items-center gap-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.82 }}
        >
          {/* Primary CTA – gold fill */}
          <motion.a
            href="#contact"
            className="group relative inline-flex items-center gap-3 overflow-hidden px-9 py-4"
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            style={{ backgroundColor: "#D4AF37" }}
          >
            {/* Shimmer sweep */}
            <motion.span
              className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12"
              style={{ background: "rgba(255,255,255,0.18)" }}
              animate={{ translateX: ["-100%", "220%"] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                repeatDelay: 3.5,
                ease: "easeInOut",
              }}
            />
            <span
              className="relative z-10 font-semibold uppercase tracking-[0.12em] text-sm"
              style={{ fontFamily: "Poppins, sans-serif", color: "#0D1015" }}
            >
              Book Your Strategy Call
            </span>
            <ArrowRight
              size={15}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5"
              style={{ color: "#0D1015" }}
            />
          </motion.a>

          {/* Secondary CTA – ghost */}
          <motion.a
            href="#testimonials"
            className="group inline-flex items-center gap-3 border px-9 py-4 transition-colors duration-300"
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            style={{
              borderColor: "rgba(248,248,248,0.22)",
              color: "#F8F8F8",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(248,248,248,0.22)";
            }}
          >
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full border
                         transition-all duration-300 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10"
              style={{ borderColor: "rgba(248,248,248,0.28)" }}
            >
              <Play
                size={9}
                className="translate-x-px transition-colors duration-300 group-hover:fill-[#D4AF37] group-hover:stroke-[#D4AF37]"
                fill="#F8F8F8"
                stroke="#F8F8F8"
                strokeWidth={0}
              />
            </div>
            <span
              className="font-semibold text-sm uppercase tracking-[0.12em] transition-colors duration-300
                         group-hover:text-[#D4AF37]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Watch Success Stories
            </span>
          </motion.a>
        </motion.div>

        {/* Trust badge */}
        <motion.div
          className="mt-10 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.8 }}
        >
          <div className="flex -space-x-2">
            {["MC", "PS", "JO", "SR"].map((initials, i) => (
              <div
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0D1015]
                           text-[9px] font-bold"
                style={{
                  backgroundColor: `hsl(${40 + i * 15}, 40%, ${20 + i * 5}%)`,
                  color: "#D4AF37",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {initials}
              </div>
            ))}
          </div>
          <span
            className="text-[11px] tracking-wide"
            style={{ color: "#A8A8A8", fontFamily: "Inter, sans-serif" }}
          >
            Joined by{" "}
            <span style={{ color: "#F8F8F8" }}>2,000+ entrepreneurs</span> this year
          </span>
        </motion.div>
      </motion.div>

      {/* ── Stats bar ─────────────────────────────────────────── */}
      <motion.div
        ref={statsRef}
        className="relative z-10 w-full border-t"
        style={{ borderColor: "rgba(212,175,55,0.14)" }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Glassmorphism background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(23,27,34,0.82)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        />

        <div className="relative grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="stat-item flex flex-col items-center justify-center px-6 py-6 md:py-7
                         border-[#D4AF37]/10"
              style={{
                borderRight: i < 3 ? "1px solid rgba(212,175,55,0.1)" : undefined,
                borderTop: i >= 2 ? "1px solid rgba(212,175,55,0.1)" : undefined,
              }}
            >
              <StatCounter value={stat.value} delay={1.3 + i * 0.1} />
              <span
                className="mt-1.5 text-[10px] tracking-[0.22em] uppercase"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  color: "#A8A8A8",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────────────── */}
      <motion.div
        className="absolute bottom-[7.8rem] left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.9 }}
      >
        <span
          className="text-[9px] tracking-[0.28em] uppercase"
          style={{ color: "rgba(168,168,168,0.45)", fontFamily: "Poppins, sans-serif" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={15} style={{ color: "rgba(212,175,55,0.55)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
