"use client";

import Link from "next/link";
import { useState } from "react";
import { Instagram, Youtube, Twitter, Linkedin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Content", href: "/content" },
  { label: "Community", href: "/community" },
  { label: "Book a Call", href: "/book" },
];

const SERVICES = [
  { label: "1-on-1 Coaching", href: "/services/coaching" },
  { label: "Mastermind Group", href: "/services/mastermind" },
  { label: "Business Accelerator", href: "/services/accelerator" },
  { label: "Strategy Intensive", href: "/services/intensive" },
  { label: "Online Courses", href: "/services/courses" },
  { label: "Speaking", href: "/services/speaking" },
];

const SOCIAL = [
  { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { Icon: Youtube, label: "YouTube", href: "https://youtube.com" },
  { Icon: Twitter, label: "X / Twitter", href: "https://x.com" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="relative bg-[#0D1015] text-[#F8F8F8]">
      {/* Top gold gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #D4AF37 30%, #F0D060 50%, #D4AF37 70%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-14">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-0.5 group w-fit">
              <span
                className="font-montserrat font-bold text-2xl tracking-[0.12em] text-[#F8F8F8] uppercase"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                APEX
              </span>
              <span className="block w-[6px] h-[6px] rounded-full bg-[#D4AF37] mb-[14px] ml-[2px]" />
            </Link>

            <p
              className="text-[#A8A8A8] text-sm leading-relaxed max-w-[260px]"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Helping driven entrepreneurs build businesses that compound. Clarity, systems, and uncommon execution.
            </p>

            <div className="flex items-center gap-3 pt-1">
              {SOCIAL.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="w-9 h-9 flex items-center justify-center rounded-sm border border-white/10
                             text-[#A8A8A8] hover:text-[#D4AF37] hover:border-[#D4AF37]/40
                             transition-colors duration-200"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-[11px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold"
              style={{ fontFamily: "var(--font-poppins), sans-serif" }}
            >
              Navigate
            </h4>
            <ul className="flex flex-col gap-2.5">
              {NAV.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[#A8A8A8] text-sm hover:text-[#F8F8F8] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-[11px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold"
              style={{ fontFamily: "var(--font-poppins), sans-serif" }}
            >
              Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[#A8A8A8] text-sm hover:text-[#F8F8F8] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h4
              className="text-[11px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold"
              style={{ fontFamily: "var(--font-poppins), sans-serif" }}
            >
              Weekly Insights
            </h4>
            <p
              className="text-[#A8A8A8] text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              One actionable idea for building your empire. No noise.
            </p>

            {submitted ? (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#D4AF37] text-sm font-medium"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                You're in. Watch your inbox.
              </motion.p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-[#171B22] border border-white/10 rounded-sm px-4 py-2.5
                             text-sm text-[#F8F8F8] placeholder:text-[#A8A8A8]/50
                             focus:outline-none focus:border-[#D4AF37]/50 transition-colors duration-200"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-sm
                             bg-transparent border border-[#D4AF37]/60 text-[#D4AF37]
                             text-sm font-poppins font-semibold tracking-wide
                             hover:bg-[#D4AF37] hover:text-[#0D1015] hover:border-[#D4AF37]
                             transition-all duration-300 group"
                  style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                >
                  Subscribe
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-[1px] w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.35) 50%, transparent 100%)",
          }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p
            className="text-[#A8A8A8]/60 text-xs"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            &copy; {new Date().getFullYear()} Apex Coaching. All rights reserved.
          </p>

          <nav className="flex items-center gap-6">
            {LEGAL.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-[#A8A8A8]/60 text-xs hover:text-[#A8A8A8] transition-colors duration-200"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
