"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const ACHIEVEMENTS = [
  { metric: "5+", label: "Years building & mentoring entrepreneurs" },
  { metric: "2,847", label: "Clients across 47 countries" },
  { metric: "$500M+", label: "Revenue facilitated for clients" },
  { metric: "3×", label: "Forbes 30 Under 30 featured alumni" },
];

const PHILOSOPHY_QUOTE =
  '"Success is not an event. It is the inevitable outcome of systems compounded over time."';

const TIMELINE = [
  {
    year: "2016",
    title: "The Turning Point",
    description:
      "Left a six-figure corporate career to bet everything on building a business from scratch. Learned every lesson the hard way.",
  },
  {
    year: "2018",
    title: "First Million",
    description:
      "Crossed seven figures through obsessive iteration on a single offer. Began codifying the playbook that would become the flagship methodology.",
  },
  {
    year: "2020",
    title: "The Mastermind",
    description:
      "Launched the first private mastermind cohort. Twelve founders. Twelve success stories. The proof of concept became the product.",
  },
  {
    year: "2022",
    title: "Scale & Impact",
    description:
      "Expanded to a full coaching platform serving entrepreneurs in 47 countries. $100M+ in client revenue generated in a single calendar year.",
  },
  {
    year: "2024",
    title: "The New Standard",
    description:
      "Recognised as one of the most impactful entrepreneurship coaching programmes globally. Over 2,000 transformations and counting.",
  },
];

// ─── Timeline item ─────────────────────────────────────────────────────────────

function TimelineItem({
  item,
  index,
  isLast,
}: {
  item: (typeof TIMELINE)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative flex gap-6 sm:gap-10">
      {/* Left – year + line */}
      <div className="flex flex-col items-center">
        {/* Gold dot */}
        <motion.div
          className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
          style={{
            border: "1px solid rgba(212,175,55,0.35)",
            backgroundColor: "#0D1015",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{
            duration: 0.5,
            delay: index * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: "#D4AF37" }}
          />
        </motion.div>

        {/* Vertical connector */}
        {!isLast && (
          <motion.div
            className="mt-2 w-px flex-1"
            style={{ backgroundColor: "rgba(212,175,55,0.15)" }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: index * 0.12 + 0.3,
              ease: "easeOut",
            }}
          />
        )}
      </div>

      {/* Right – content */}
      <motion.div
        className="pb-10"
        initial={{ x: 24, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{
          duration: 0.65,
          delay: index * 0.12 + 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <span
          className="text-[11px] font-semibold tracking-[0.2em] uppercase"
          style={{ color: "#D4AF37", fontFamily: "Poppins, sans-serif" }}
        >
          {item.year}
        </span>
        <h4
          className="mt-1 mb-2 font-bold text-base leading-snug"
          style={{ fontFamily: "Montserrat, sans-serif", color: "#F8F8F8" }}
        >
          {item.title}
        </h4>
        <p
          className="leading-relaxed text-sm"
          style={{ fontFamily: "Inter, sans-serif", color: "#A8A8A8" }}
        >
          {item.description}
        </p>
      </motion.div>
    </div>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────────

export default function AboutFounder() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax on founder image
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Gold accent line draw animation
      gsap.fromTo(
        ".gold-accent-line",
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gold-accent-line",
            start: "top 85%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

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
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden py-28 lg:py-36"
      style={{ backgroundColor: "#171B22" }}
    >
      {/* Background texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.022]"
        aria-hidden="true"
      >
        <filter id="about-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#about-noise)" />
      </svg>

      {/* Radial gold glow – top right */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle, #D4AF37 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        {/* ── Main two-column layout ───────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_auto] xl:grid-cols-[1fr_420px] gap-16 lg:gap-20 items-start">

          {/* Left – text content */}
          <div>
            {/* Section label */}
            <motion.p
              ref={headerRef}
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-[10px] font-semibold tracking-[0.35em] uppercase mb-5"
              style={{ color: "#D4AF37", fontFamily: "Poppins, sans-serif" }}
            >
              The Founder
            </motion.p>

            {/* Main headline */}
            <motion.h2
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="font-black tracking-tight leading-[1.05] mb-8"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                color: "#F8F8F8",
              }}
            >
              FROM BROKE FOUNDER{" "}
              <br className="hidden md:block" />
              TO BUILDING{" "}
              <span style={{ color: "#D4AF37" }}>
                AN EIGHT-FIGURE
              </span>{" "}
              <br className="hidden md:block" />
              COACHING EMPIRE
            </motion.h2>

            {/* Story paragraphs with gold accent side bar */}
            <motion.div
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative mb-8 pl-6"
            >
              <div
                className="gold-accent-line absolute left-0 top-0 bottom-0 w-[3px]"
                style={{ backgroundColor: "#D4AF37", borderRadius: "2px" }}
              />
              <p
                className="leading-[1.85] text-base"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "#A8A8A8",
                  fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                }}
              >
                I was twenty-three with no contacts, no capital, and no clue —
                just an obsessive belief that the traditional path was designed
                for someone else. I left my corporate career, emptied my
                savings, and gave myself twelve months to figure it out.
              </p>
            </motion.div>

            <motion.p
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="mb-8 leading-[1.85]"
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#A8A8A8",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
              }}
            >
              Three years and countless iterations later, I crossed seven
              figures and began to codify exactly what worked. Not theory.
              Not motivation. A repeatable, battle-tested system that any
              serious entrepreneur could plug into their business and scale.
            </motion.p>

            <motion.p
              custom={0.38}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="mb-12 leading-[1.85]"
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#A8A8A8",
                fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
              }}
            >
              Today, over 2,847 entrepreneurs across 47 countries have used
              that same system to build businesses that generate freedom —
              financial, geographical, and personal. This is my life&apos;s work,
              and I&apos;m not done yet.
            </motion.p>

            {/* Philosophy quote */}
            <motion.blockquote
              custom={0.46}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="mb-12"
            >
              <p
                className="italic leading-[1.6]"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(1.15rem, 2vw, 1.5rem)",
                  color: "#D4AF37",
                }}
              >
                {PHILOSOPHY_QUOTE}
              </p>
            </motion.blockquote>

            {/* Achievement stats */}
            <motion.div
              custom={0.54}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-2 gap-px mb-12"
              style={{ backgroundColor: "rgba(212,175,55,0.08)" }}
            >
              {ACHIEVEMENTS.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1 px-5 py-5"
                  style={{ backgroundColor: "#171B22" }}
                >
                  <span
                    className="font-black leading-none"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                      color: "#D4AF37",
                    }}
                  >
                    {item.metric}
                  </span>
                  <span
                    className="text-xs leading-snug"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      color: "#A8A8A8",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              custom={0.62}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <a
                href="#story"
                className="group inline-flex items-center gap-3 border px-8 py-4
                           transition-all duration-300 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/5"
                style={{
                  borderColor: "rgba(212,175,55,0.25)",
                  color: "#D4AF37",
                }}
              >
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full border
                             transition-all duration-300 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/15"
                  style={{ borderColor: "rgba(212,175,55,0.3)" }}
                >
                  <Play
                    size={10}
                    fill="#D4AF37"
                    strokeWidth={0}
                    className="translate-x-px"
                  />
                </div>
                <span
                  className="font-semibold text-sm uppercase tracking-[0.12em]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Watch My Full Story
                </span>
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </motion.div>
          </div>

          {/* Right – founder image */}
          <div className="lg:self-start">
            <motion.div
              ref={imageRef}
              className="relative"
              style={{ y: imageY }}
              initial={{ opacity: 0, x: 32 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Corner bracket decorations */}
              <div
                className="absolute -top-3 -left-3 h-12 w-12 z-10"
                style={{
                  borderTop: "2px solid #D4AF37",
                  borderLeft: "2px solid #D4AF37",
                }}
              />
              <div
                className="absolute -bottom-3 -right-3 h-12 w-12 z-10"
                style={{
                  borderBottom: "2px solid #D4AF37",
                  borderRight: "2px solid #D4AF37",
                }}
              />

              {/* Image placeholder – editorial style */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "3/4", maxWidth: "420px" }}
              >
                {/* Placeholder background with editorial gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(160deg, #1e232c 0%, #131720 40%, #0d1015 100%)",
                  }}
                />

                {/* Simulated photo subject silhouette */}
                <div
                  className="absolute inset-0 flex items-end justify-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=840&q=85&fit=crop&crop=faces')",
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    filter: "brightness(0.55) saturate(0.4) contrast(1.1)",
                  }}
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(23,27,34,1) 0%, rgba(23,27,34,0.3) 50%, transparent 100%)",
                  }}
                />

                {/* Name / title overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 px-6 py-6 z-10">
                  <p
                    className="font-black text-lg leading-none mb-1"
                    style={{ fontFamily: "Montserrat, sans-serif", color: "#F8F8F8" }}
                  >
                    Alex Meridian
                  </p>
                  <p
                    className="text-xs tracking-[0.18em] uppercase"
                    style={{ fontFamily: "Poppins, sans-serif", color: "#D4AF37" }}
                  >
                    Founder &amp; Lead Mentor
                  </p>
                </div>
              </div>

              {/* Floating accolade badge */}
              <motion.div
                className="absolute -left-6 top-1/3 z-20 p-4"
                style={{
                  backgroundColor: "#0D1015",
                  border: "1px solid rgba(212,175,55,0.3)",
                  boxShadow: "0 0 40px rgba(0,0,0,0.6)",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="text-[9px] tracking-[0.2em] uppercase mb-1"
                  style={{ color: "#A8A8A8", fontFamily: "Poppins, sans-serif" }}
                >
                  Featured in
                </p>
                <p
                  className="font-bold text-sm"
                  style={{ color: "#D4AF37", fontFamily: "Montserrat, sans-serif" }}
                >
                  Forbes 30
                </p>
                <p
                  className="font-bold text-sm"
                  style={{ color: "#D4AF37", fontFamily: "Montserrat, sans-serif" }}
                >
                  Under 30
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── Career timeline ──────────────────────────────────── */}
        <div className="mt-28 lg:mt-36">
          {/* Timeline header */}
          <motion.div
            className="mb-14 text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-[10px] font-semibold tracking-[0.35em] uppercase mb-4"
              style={{ color: "#D4AF37", fontFamily: "Poppins, sans-serif" }}
            >
              The Journey
            </p>
            <h3
              className="font-black tracking-tight leading-[1.05]"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: "#F8F8F8",
              }}
            >
              FROM ZERO TO{" "}
              <span style={{ color: "#D4AF37" }}>EIGHT FIGURES</span>
            </h3>
            <div
              className="mx-auto mt-5 h-px w-12 origin-center"
              style={{ backgroundColor: "rgba(212,175,55,0.45)" }}
            />
          </motion.div>

          {/* Timeline items */}
          <div className="max-w-3xl mx-auto">
            {TIMELINE.map((item, i) => (
              <TimelineItem
                key={item.year}
                item={item}
                index={i}
                isLast={i === TIMELINE.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
