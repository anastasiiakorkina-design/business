"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Users,
  Zap,
  Globe,
  Star,
  ArrowRight,
  Mail,
  BookOpen,
  Video,
  MessageSquare,
  Award,
  Target,
  Lock } from "lucide-react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: <Users className="w-5 h-5" />,
    title: "Private Mastermind Community",
    description: "Access to a vetted community of 500+ serious founders. Real conversations, zero noise." },
  {
    icon: <Video className="w-5 h-5" />,
    title: "Weekly Live Coaching Calls",
    description: "Two live group coaching sessions per week with direct Q&A access to James and the Apex coaching team." },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: "Complete Resource Library",
    description: "Over 200 frameworks, templates, SOPs, and playbooks — everything you need to scale, organized by growth stage." },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Accountability Pods",
    description: "Get matched with 3–5 peers at your revenue level for weekly accountability check-ins and hot seat sessions." },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Annual In-Person Retreat",
    description: "Three-day immersive experience in a luxury location with 100 top members. Past retreats: Napa, Aspen, Tulum." },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: "Member Deal Network",
    description: "Exclusive discounts on software, services, and tools — negotiated by our team. Average member saves $12K/year." },
  {
    icon: <Target className="w-5 h-5" />,
    title: "Monthly Strategy Intensives",
    description: "Deep-dive workshops on specific topics: hiring, offer creation, pricing, systems, and more. Hot seats included." },
  {
    icon: <Award className="w-5 h-5" />,
    title: "Apex Certification",
    description: "Complete all program milestones and earn the Apex Certified Entrepreneur designation, recognized industry-wide." },
];

const STATS = [
  { value: "2,400+", label: "Active Members", sub: "Across 47 countries" },
  { value: "94%", label: "Satisfaction Rate", sub: "Based on quarterly surveys" },
  { value: "3.2x", label: "Avg Revenue Increase", sub: "Within first 12 months" },
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Founder, NovaBrand Agency",
    revenue: "$380K → $1.4M",
    quote:
      "The Inner Circle changed everything. Within 60 days of joining, I restructured my offer, fired two clients, and increased revenue by 40%. The community alone is worth 10x the investment.",
    avatar: "SC" },
  {
    name: "Marcus Johnson",
    role: "CEO, Elevate E-commerce",
    revenue: "$800K → $4.2M",
    quote:
      "I was skeptical. I'd been in other masterminds that were glorified group chats. The Apex Inner Circle is the opposite — it's the most results-focused community I've ever been part of.",
    avatar: "MJ" },
  {
    name: "Dr. Priya Patel",
    role: "Founder, Patel Consulting",
    revenue: "$250K → $1.1M",
    quote:
      "The accountability pods are what I didn't know I needed. Having four other ambitious founders checking on my progress every week is a level of accountability I could never replicate on my own.",
    avatar: "PP" },
];

const FREE_RESOURCES = [
  { title: "The 7-System Scaling Blueprint", type: "PDF Framework", icon: <BookOpen className="w-4 h-4" /> },
  { title: "Offer Architecture Workshop (90 min)", type: "Video Training", icon: <Video className="w-4 h-4" /> },
  { title: "Hiring Your First A-Player", type: "PDF Checklist", icon: <BookOpen className="w-4 h-4" /> },
  { title: "CEO Daily Operating System", type: "Template Pack", icon: <Zap className="w-4 h-4" /> },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CommunityPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, source: "community-page" }) });
      setSubStatus(res.ok ? "success" : "error");
      if (res.ok) {
        setEmail("");
        setName("");
      }
    } catch {
      setSubStatus("error");
    }
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } }) };

  return (
    <div className="bg-[#0D1015] text-[#F8F8F8] min-h-screen">

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-28 px-6 lg:px-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(212,175,55,0.10) 0%, transparent 65%)" }}
        />
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.025]" aria-hidden="true">
          <filter id="noise-community">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise-community)" />
        </svg>

        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-center justify-center gap-3 mb-5"
            >
              <div className="h-px w-8 bg-[#D4AF37]" />
              <span className="text-xs font-semibold tracking-[0.28em] uppercase text-[#D4AF37]"
                style={{ fontFamily: "Poppins, sans-serif" }}>
                Membership Community
              </span>
              <div className="h-px w-8 bg-[#D4AF37]" />
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-black tracking-tight leading-[0.9] mb-6"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "clamp(3rem, 8vw, 7rem)",
                color: "#F8F8F8" }}
            >
              APEX
              <br />
              <span style={{ color: "#D4AF37" }}>INNER CIRCLE</span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[#A8A8A8] text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              The most results-driven entrepreneur mastermind on the planet. 2,400+ vetted founders,
              live coaching, a world-class resource library, and accountability systems that actually work.
            </motion.p>

            <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
              className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#0D1015] font-bold text-sm tracking-wider uppercase rounded-sm hover:bg-[#e8c84a] transition-colors duration-200"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Apply for Membership <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#resources"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#D4AF37]/40 text-[#D4AF37] font-semibold text-sm tracking-wider uppercase rounded-sm hover:bg-[#D4AF37]/08 transition-colors duration-200"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Free Resources First
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-16" style={{ backgroundColor: "#171B22" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <div
                  className="font-black leading-none mb-2"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                    color: "#D4AF37" }}
                >
                  {stat.value}
                </div>
                <div className="text-[#F8F8F8] font-bold text-sm mb-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {stat.label}
                </div>
                <div className="text-[#6b6b6b] text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-28">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold tracking-[0.28em] uppercase text-[#D4AF37] mb-4 block"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              What You Get
            </span>
            <h2
              className="font-black text-[#F8F8F8] tracking-tight"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Everything You Need to <span style={{ color: "#D4AF37" }}>Scale</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="group bg-[#171B22] border border-[#D4AF37]/12 rounded-sm p-6 hover:border-[#D4AF37]/35 hover:-translate-y-1 transition-all duration-400"
              >
                <div className="w-10 h-10 rounded-sm bg-[#D4AF37]/08 border border-[#D4AF37]/18 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:bg-[#D4AF37]/15 transition-colors duration-300">
                  {b.icon}
                </div>
                <h3 className="font-bold text-[#F8F8F8] text-sm mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {b.title}
                </h3>
                <p className="text-[#A8A8A8] text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  {b.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Gold checkmark list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-14 bg-[#171B22] border border-[#D4AF37]/15 rounded-sm p-8 lg:p-10"
          >
            <h3 className="font-black text-[#F8F8F8] mb-6" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.2rem" }}>
              Also Included with Every Membership:
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Direct messaging access to Apex coaches",
                "Monthly founder spotlight features",
                "Peer referral and partnership facilitation",
                "Speaker opportunities at Apex events",
                "Early access to new programs and research",
                "Lifetime access to all recorded sessions",
                "Member-only vendor and partner network",
                "Quarterly business health audits",
                "Access to Apex AI Blueprint tool (beta)",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="text-[#A8A8A8] text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── EMAIL SIGNUP ─────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-24 relative overflow-hidden" style={{ backgroundColor: "#171B22" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)" }}
        />
        <div className="max-w-xl mx-auto relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center">
              <Mail className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h2
              className="font-black text-[#F8F8F8] tracking-tight mb-4 leading-[1.1]"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              Join the Inner Circle
              <br />
              <span style={{ color: "#D4AF37" }}>Waitlist</span>
            </h2>
            <p className="text-[#A8A8A8] leading-relaxed mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
              Membership is application-only and currently waitlisted. Enter your email to be notified
              when a spot opens, plus get instant access to our free founder resource pack.
            </p>

            {subStatus === "success" ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#22c55e]/10 border border-[#22c55e]/25 text-[#22c55e] px-6 py-4 rounded-sm text-sm font-semibold"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <CheckCircle className="w-5 h-5 inline mr-2" />
                You're on the list! Check your email for your free resource pack.
              </motion.div>
            ) : (
              <form onSubmit={handleSignup} className="space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your first name"
                  className="w-full bg-[#0D1015] border border-[#2C2F36] rounded-sm px-4 py-3.5 text-[#F8F8F8] text-sm placeholder-[#6b6b6b] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/12 transition-all duration-200"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your best email address"
                  required
                  className="w-full bg-[#0D1015] border border-[#2C2F36] rounded-sm px-4 py-3.5 text-[#F8F8F8] text-sm placeholder-[#6b6b6b] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/12 transition-all duration-200"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
                <button
                  type="submit"
                  disabled={subStatus === "loading"}
                  className="w-full py-4 bg-[#D4AF37] text-[#0D1015] font-bold text-sm tracking-wider uppercase rounded-sm hover:bg-[#e8c84a] disabled:opacity-60 transition-colors duration-200"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {subStatus === "loading" ? "Joining…" : "Join the Waitlist — Free"}
                </button>
              </form>
            )}

            {subStatus === "error" && (
              <p className="mt-3 text-xs text-[#ef4444]" style={{ fontFamily: "Inter, sans-serif" }}>
                Something went wrong. Please try again.
              </p>
            )}

            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#6b6b6b]"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              <Lock className="w-3 h-3" /> No spam. Unsubscribe anytime.
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-28">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-xs font-semibold tracking-[0.28em] uppercase text-[#D4AF37] mb-4 block"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              Member Stories
            </span>
            <h2
              className="font-black text-[#F8F8F8] tracking-tight"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Real People, <span style={{ color: "#D4AF37" }}>Real Results</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-[#171B22] border border-[#D4AF37]/15 rounded-sm p-7 flex flex-col gap-5"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-[#A8A8A8] text-sm leading-relaxed italic flex-1"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#2C2F36]">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold text-xs"
                    style={{ fontFamily: "Montserrat, sans-serif" }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-[#F8F8F8] font-bold text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {t.name}
                    </div>
                    <div className="text-[#6b6b6b] text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                      {t.role}
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-[#D4AF37] text-xs font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {t.revenue}
                    </div>
                    <div className="text-[#6b6b6b] text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                      revenue growth
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FREE RESOURCES ───────────────────────────────────────────────── */}
      <section id="resources" className="px-6 lg:px-20 py-24 relative" style={{ backgroundColor: "#171B22" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold tracking-[0.28em] uppercase text-[#D4AF37] mb-4 block"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              Not Ready to Apply?
            </span>
            <h2
              className="font-black text-[#F8F8F8] tracking-tight mb-4"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
            >
              Start With Our <span style={{ color: "#D4AF37" }}>Free Resources</span>
            </h2>
            <p className="text-[#A8A8A8] max-w-xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
              Proven frameworks and training materials — no email required. Start building before you commit.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {FREE_RESOURCES.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link href="/blog" className="group flex items-center gap-4 bg-[#0D1015] border border-[#2C2F36] rounded-sm p-5 hover:border-[#D4AF37]/35 transition-all duration-300">
                  <div className="w-10 h-10 shrink-0 rounded-sm bg-[#D4AF37]/08 border border-[#D4AF37]/18 flex items-center justify-center text-[#D4AF37]">
                    {r.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-[#F8F8F8] font-semibold text-sm leading-tight mb-0.5" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {r.title}
                    </div>
                    <div className="text-[#6b6b6b] text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                      {r.type}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)" }}
        />
        <div className="max-w-2xl mx-auto relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="h-px w-24 mx-auto mb-8" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
            <h2
              className="font-black text-[#F8F8F8] tracking-tight mb-5 leading-[0.95]"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Your Next Level
              <br />
              <span style={{ color: "#D4AF37" }}>Is a Decision Away</span>
            </h2>
            <p className="text-[#A8A8A8] text-lg leading-relaxed mb-10" style={{ fontFamily: "Inter, sans-serif" }}>
              The founders in the Apex Inner Circle are building companies that outlast them.
              The question is whether you'll be one of them.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-10 py-4.5 bg-[#D4AF37] text-[#0D1015] font-bold tracking-wider uppercase rounded-sm hover:bg-[#e8c84a] transition-colors duration-200 text-sm"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Apply for Membership <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="mt-4 text-xs text-[#6b6b6b]" style={{ fontFamily: "Inter, sans-serif" }}>
              Application-only. Limited spots. No refunds on rejection of mediocrity.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
