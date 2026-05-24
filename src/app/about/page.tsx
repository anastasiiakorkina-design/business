"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Award,
  ChevronLeft,
  ChevronRight,
  Quote,
  TrendingUp,
  Globe,
  Zap,
  Users,
  Target,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const TIMELINE = [
  {
    year: "2009",
    title: "First Business — $0 to $100K",
    description:
      "Launched a bootstrapped e-commerce brand out of a spare bedroom. Hit $100K in 14 months with no outside capital, learning the hard truth about operations and cash flow.",
  },
  {
    year: "2012",
    title: "First Exit — $2.4M Acquisition",
    description:
      "Built and sold a B2B SaaS business to a private equity-backed buyer. The process taught me everything about valuation, due diligence, and building systems that outlast the founder.",
  },
  {
    year: "2014",
    title: "Fortune 500 Consulting",
    description:
      "Spent two years inside McKinsey's growth practice, advising C-suite leaders across technology and consumer sectors. Discovered that elite companies operate from identical first-principles frameworks.",
  },
  {
    year: "2016",
    title: "Second Venture — $0 to $12M ARR",
    description:
      "Co-founded a growth agency serving Series A–C startups. Scaled to 60 employees and $12M ARR in 36 months, then successfully sold majority stake to a strategic partner.",
  },
  {
    year: "2018",
    title: "Apex Coaching Founded",
    description:
      "Codified everything learned into a repeatable methodology and launched Apex Coaching. Took on the first cohort of 12 founders. All 12 doubled revenue within 12 months.",
  },
  {
    year: "2021",
    title: "$500M in Client Revenue Milestone",
    description:
      "The Apex community crossed half a billion dollars in aggregate client revenue—validated by third-party audit. Expanded the team to 18 coaches and launched the Apex Inner Circle mastermind.",
  },
  {
    year: "2023",
    title: "Apex Method — The Book",
    description:
      "Published 'The Apex Method: How Elite Entrepreneurs Build Unstoppable Companies' — #1 Wall Street Journal Business Bestseller in its first week. Over 200,000 copies sold.",
  },
  {
    year: "2024",
    title: "2,000+ Clients Across 47 Countries",
    description:
      "Expanded coaching operations globally. Launched the AI-powered Apex Blueprint tool and the Apex Certification program for coaches. The next chapter begins.",
  },
];

const VALUES = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Radical Clarity",
    description:
      "Ambiguity is the enemy of execution. We ruthlessly identify the one constraint standing between you and your next level—then remove it.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Uncommon Execution",
    description:
      "Ideas are worthless. Execution compounds. We build the habits, systems, and accountability structures that make extraordinary output your default.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Systems Over Heroics",
    description:
      "The best businesses are built on repeatable systems, not individual genius. We engineer your company so it scales without you becoming the bottleneck.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Truth Over Comfort",
    description:
      "Growth demands honest feedback. We say what other coaches won't. Real transformation requires the courage to hear—and act on—the whole truth.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Long-Term Thinking",
    description:
      "We optimize for legacy, not hacks. Every strategy we deploy is designed to compound over a decade, not spike your revenue for one quarter.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Client Obsession",
    description:
      "Your wins are our wins. We measure our success exclusively by your results, not by the number of workshops we run or frameworks we create.",
  },
];

const AWARDS = [
  { title: "WSJ #1 Bestselling Author", year: "2023", org: "Wall Street Journal" },
  { title: "Top 10 Business Coaches", year: "2022", org: "Inc. Magazine" },
  { title: "40 Under 40 — Entrepreneurs", year: "2021", org: "Forbes" },
  { title: "Best Executive Coaching Firm", year: "2022", org: "Entrepreneur Awards" },
  { title: "Most Innovative Coach", year: "2023", org: "CEO World Awards" },
  { title: "Speaker of the Year", year: "2023", org: "Growth Summit" },
];

const PRESS_QUOTES = [
  {
    quote:
      "The most effective business coach operating today. His methodology doesn't just grow revenue—it transforms the operator behind the company.",
    source: "Forbes",
    author: "Senior Contributor",
  },
  {
    quote:
      "In a sea of business gurus selling recycled frameworks, Apex stands apart. The results speak louder than any testimonial ever could.",
    source: "Inc. Magazine",
    author: "Staff Writer",
  },
  {
    quote:
      "We've profiled hundreds of coaching programs. None deliver the consistency and depth of outcome that Apex Coaching produces.",
    source: "Entrepreneur",
    author: "Senior Editor",
  },
  {
    quote:
      "If you're serious about building a company that lasts, there is no better investment than the Apex method.",
    source: "Harvard Business Review",
    author: "Contributing Author",
  },
  {
    quote:
      "The data is unambiguous: Apex clients outperform their peers by a factor of 3x on every key metric we track.",
    source: "Business Insider",
    author: "Growth Desk",
  },
];

function NoiseTexture() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]"
      aria-hidden="true"
    >
      <filter id="noise-about">
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise-about)" />
    </svg>
  );
}

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeQuote, setActiveQuote] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const nextQuote = () => setActiveQuote((p) => (p + 1) % PRESS_QUOTES.length);
  const prevQuote = () => setActiveQuote((p) => (p - 1 + PRESS_QUOTES.length) % PRESS_QUOTES.length);

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="bg-[#0D1015] text-[#F8F8F8]">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
        style={{ backgroundColor: "#0D1015" }}
      >
        <motion.div className="absolute inset-0 scale-110" style={{ y: heroY }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=2400&q=80&fit=crop&crop=face')",
              backgroundSize: "cover",
              backgroundPosition: "center 20%",
              filter: "brightness(0.18) saturate(0.5)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(13,16,21,0.95) 40%, rgba(13,16,21,0.3) 100%)",
            }}
          />
        </motion.div>
        <NoiseTexture />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-20 grid lg:grid-cols-2 gap-16 items-center py-24">
          {/* Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
              <div className="h-px w-10 bg-[#D4AF37]" />
              <span
                className="text-xs font-semibold tracking-[0.28em] uppercase text-[#D4AF37]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                The Founder
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-black tracking-tight mb-6 leading-[0.95]"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                color: "#F8F8F8",
              }}
            >
              Built From
              <br />
              <span style={{ color: "#D4AF37" }}>Scratch.</span>
              <br />
              Proven at Scale.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-[#A8A8A8] leading-relaxed mb-10 max-w-lg"
              style={{ fontFamily: "Inter, sans-serif", fontSize: "1.1rem" }}
            >
              James Alcott is a 4x founder, Wall Street Journal bestselling author, and the creator
              of the Apex Method — a proven framework that has generated over $500M in client
              revenue across 47 countries.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/book">
                  Book a Strategy Call <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/services">View Services</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Photo card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[3/4] max-w-md ml-auto overflow-hidden">
              <div
                className="absolute inset-0 rounded-sm"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80&fit=crop&crop=face')",
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                  filter: "brightness(0.9) saturate(0.85)",
                }}
              />
              {/* Gold accent corner */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#D4AF37]" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#D4AF37]" />
              {/* Stat overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#171B22]/90 backdrop-blur-sm border border-[#D4AF37]/20 p-4 rounded-sm">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { v: "4x", l: "Founder" },
                    { v: "$500M+", l: "Generated" },
                    { v: "2,000+", l: "Clients" },
                  ].map((s) => (
                    <div key={s.l}>
                      <div
                        className="font-black text-[#D4AF37] text-xl leading-none mb-1"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {s.v}
                      </div>
                      <div className="text-[#A8A8A8] text-xs tracking-wide uppercase" style={{ fontFamily: "Poppins, sans-serif" }}>
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0D1015] to-transparent" />
      </section>

      {/* ─── PERSONAL STORY ─────────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="sticky top-28">
              <Badge variant="gold" className="mb-6">The Story</Badge>
              <h2
                className="font-black tracking-tight leading-[0.95] mb-8"
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#F8F8F8" }}
              >
                The Journey That
                <br />
                <span style={{ color: "#D4AF37" }}>Forged the Method</span>
              </h2>
              <div
                className="h-1 w-16"
                style={{ background: "linear-gradient(90deg, #D4AF37, transparent)" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 text-[#A8A8A8] leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "1.05rem" }}
          >
            <p>
              I grew up in a working-class household in Cleveland. My parents ran a small dry-cleaning
              business — long hours, thin margins, constant stress. I watched them trade every waking
              hour for a paycheck that barely kept pace with the bills. I swore I would find a better way.
            </p>
            <p>
              At 22, I launched my first e-commerce brand with $800 in savings and a laptop. Eighteen months
              later, I had crossed $100,000 in revenue. It felt like everything. Then I hit my first
              real wall: I was the business. Every decision, every client call, every problem —
              all of it ran through me. I was exhausted and had no idea how to build beyond myself.
            </p>
            <p>
              The first breakthrough came when I stopped asking "how do I work harder" and started
              asking "how do I build a system that works without me." That question changed everything.
              I rebuilt the business around processes, metrics, and people. Then I sold it for
              <span style={{ color: "#F8F8F8" }}> $2.4M</span> — at age 27.
            </p>
            <p>
              I spent the next two years inside McKinsey, studying how the world's best-run companies
              actually operate. I discovered that elite organizations are not special because of genius
              founders — they're special because of the clarity, systems, and culture their founders
              build. That insight became the seed of the Apex Method.
            </p>
            <p>
              Since founding Apex Coaching in 2018, I've worked directly with over 2,000 entrepreneurs
              across every industry imaginable. The results have exceeded anything I expected. Not because
              I have magic answers, but because I've developed a rigorous process for identifying the
              exact lever each founder needs to pull — and holding them accountable to pulling it.
            </p>
            <p style={{ color: "#F8F8F8" }} className="font-medium">
              My mission is simple: to help founders build companies that compound — businesses that
              create real wealth, real impact, and real freedom for the people who build them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── TIMELINE ─────────────────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-20 relative" style={{ backgroundColor: "#0D1015" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <Badge variant="gold" className="mb-6">Career Timeline</Badge>
            <h2
              className="font-black tracking-tight"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F8F8F8" }}
            >
              15 Years. 4 Ventures. <span style={{ color: "#D4AF37" }}>One Method.</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Center line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block"
              style={{ background: "linear-gradient(180deg, transparent, #D4AF37/30, transparent)", backgroundColor: "rgba(212,175,55,0.15)" }}
            />

            <div className="space-y-12">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    i % 2 === 0 ? "" : "lg:direction-rtl"
                  }`}
                >
                  {/* Year indicator — center dot */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div
                      className="w-3 h-3 rounded-full border-2 border-[#D4AF37]"
                      style={{ backgroundColor: "#0D1015" }}
                    />
                  </div>

                  {i % 2 === 0 ? (
                    <>
                      {/* Year left */}
                      <div className="text-right hidden lg:block">
                        <span
                          className="font-black text-5xl"
                          style={{ fontFamily: "Montserrat, sans-serif", color: "rgba(212,175,55,0.15)" }}
                        >
                          {item.year}
                        </span>
                      </div>
                      {/* Content right */}
                      <div
                        className="border border-[#D4AF37]/10 bg-[#171B22] p-6 rounded-sm hover:border-[#D4AF37]/30 transition-colors duration-300"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="gold" className="lg:hidden">{item.year}</Badge>
                          <span
                            className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase hidden lg:block"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {item.year}
                          </span>
                        </div>
                        <h3
                          className="font-bold text-lg text-[#F8F8F8] mb-2"
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-[#A8A8A8] text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                          {item.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Content left */}
                      <div
                        className="border border-[#D4AF37]/10 bg-[#171B22] p-6 rounded-sm hover:border-[#D4AF37]/30 transition-colors duration-300 lg:order-1"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="gold" className="lg:hidden">{item.year}</Badge>
                          <span
                            className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase hidden lg:block"
                            style={{ fontFamily: "Poppins, sans-serif" }}
                          >
                            {item.year}
                          </span>
                        </div>
                        <h3
                          className="font-bold text-lg text-[#F8F8F8] mb-2"
                          style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-[#A8A8A8] text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                          {item.description}
                        </p>
                      </div>
                      {/* Year right */}
                      <div className="text-left hidden lg:block lg:order-2">
                        <span
                          className="font-black text-5xl"
                          style={{ fontFamily: "Montserrat, sans-serif", color: "rgba(212,175,55,0.15)" }}
                        >
                          {item.year}
                        </span>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY / CORE VALUES ─────────────────────────── */}
      <section className="py-32 px-6 lg:px-20" style={{ backgroundColor: "#171B22" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <Badge variant="gold" className="mb-6">Core Philosophy</Badge>
            <h2
              className="font-black tracking-tight mb-6"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F8F8F8" }}
            >
              What We Believe
            </h2>
            <p className="text-[#A8A8A8] max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              These aren't corporate values we hang on a wall. They're the operating principles that
              determine every coaching conversation, every framework, and every outcome we pursue.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Card variant="gold" padding="lg" className="h-full group hover:-translate-y-1 transition-transform duration-300">
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center mb-5 border border-[#D4AF37]/20 text-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-colors duration-300"
                    style={{ backgroundColor: "rgba(212,175,55,0.06)" }}
                  >
                    {v.icon}
                  </div>
                  <h3
                    className="font-bold text-lg text-[#F8F8F8] mb-3"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-[#A8A8A8] text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                    {v.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AWARDS & ACHIEVEMENTS ──────────────────────────────── */}
      <section className="py-32 px-6 lg:px-20" style={{ backgroundColor: "#0D1015" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge variant="gold" className="mb-6">Recognition</Badge>
            <h2
              className="font-black tracking-tight"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F8F8F8" }}
            >
              Awards & <span style={{ color: "#D4AF37" }}>Achievements</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AWARDS.map((award, i) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="border border-[#D4AF37]/15 bg-[#171B22] p-6 rounded-sm flex items-start gap-4 hover:border-[#D4AF37]/40 transition-colors duration-300 group">
                  <div className="shrink-0 w-10 h-10 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3
                      className="font-bold text-[#F8F8F8] text-sm mb-1 leading-tight"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {award.title}
                    </h3>
                    <p className="text-[#A8A8A8] text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                      {award.org}
                    </p>
                    <span className="text-[#D4AF37] text-xs font-semibold" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {award.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRESS QUOTES SLIDER ────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-20 relative overflow-hidden" style={{ backgroundColor: "#171B22" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="gold" className="mb-6">Press</Badge>
            <h2
              className="font-black tracking-tight"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F8F8F8" }}
            >
              What They're <span style={{ color: "#D4AF37" }}>Saying</span>
            </h2>
          </motion.div>

          <div className="relative min-h-[220px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuote}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-center px-8"
              >
                <Quote className="w-10 h-10 text-[#D4AF37] mx-auto mb-6 opacity-60" />
                <p
                  className="text-[#F8F8F8] text-xl leading-relaxed mb-8 italic"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  "{PRESS_QUOTES[activeQuote].quote}"
                </p>
                <div>
                  <span
                    className="text-[#D4AF37] font-bold text-sm tracking-widest uppercase"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {PRESS_QUOTES[activeQuote].source}
                  </span>
                  <span className="text-[#A8A8A8] text-sm ml-2">
                    — {PRESS_QUOTES[activeQuote].author}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prevQuote}
              className="w-10 h-10 rounded-sm border border-[#D4AF37]/20 flex items-center justify-center text-[#A8A8A8] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {PRESS_QUOTES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveQuote(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeQuote ? "w-8 bg-[#D4AF37]" : "w-2 bg-[#A8A8A8]/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextQuote}
              className="w-10 h-10 rounded-sm border border-[#D4AF37]/20 flex items-center justify-center text-[#A8A8A8] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-20 relative overflow-hidden" style={{ backgroundColor: "#0D1015" }}>
        <NoiseTexture />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-3xl mx-auto relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="h-px w-24 mx-auto mb-10" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
            <h2
              className="font-black tracking-tight mb-6 leading-[0.95]"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2.2rem, 5vw, 4rem)", color: "#F8F8F8" }}
            >
              Ready to Build Your
              <br />
              <span style={{ color: "#D4AF37" }}>Next Chapter?</span>
            </h2>
            <p
              className="text-[#A8A8A8] text-lg leading-relaxed mb-12"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              A single strategy call could be the turning point you've been looking for.
              No sales pressure. Just clarity.
            </p>
            <Button size="lg" className="text-base px-10 py-5 h-auto" asChild>
              <Link href="/book">
                Book Your Free Strategy Call <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
            <p className="mt-4 text-[#A8A8A8] text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              Limited spots available. No obligation.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
