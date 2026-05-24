"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  Phone,
  Mail,
  Building2,
  User,
  DollarSign,
  Target,
  HelpCircle,
  Lightbulb,
  Calendar,
  Shield,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Step1Data {
  name: string;
  email: string;
  phone: string;
  company: string;
  revenue: string;
}

interface Step2Data {
  goals: string;
  challenges: string;
  howFound: string;
  whyApply: string;
}

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

const FAQS = [
  {
    question: "Who is this coaching program for?",
    answer:
      "Apex Coaching is designed for founders, CEOs, and entrepreneurs who are generating at least $250K annually and are ready to scale past $1M, $3M, or $10M. If you're just starting out, our free content and community are the right next step.",
  },
  {
    question: "What does the strategy call involve?",
    answer:
      "The 45-minute strategy call is a real working session — not a sales pitch. We'll map your current revenue model, identify your three biggest growth constraints, and give you specific action items you can implement immediately, regardless of whether we work together.",
  },
  {
    question: "Is there any cost for the strategy call?",
    answer:
      "No. The strategy call is completely free. We offer it because the founders who get a taste of the Apex Method almost always choose to go deeper — but there's zero obligation.",
  },
  {
    question: "How quickly will I see results?",
    answer:
      "Most clients see measurable results within 60 days. Our fastest result was a client who added $400K in revenue within 30 days of implementing their Apex Offer Architecture.",
  },
  {
    question: "What's the investment for coaching?",
    answer:
      "Our programs range from $6,000 for our accelerator program to $60,000+ for Elite 1:1 coaching. Pricing is discussed after the strategy call, once we understand your specific goals and determine the right program for your situation.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We stand behind our results. If you complete the full program, implement the strategies as designed, and don't see measurable progress, we'll work with you at no additional cost until you do.",
  },
];

// ─── Revenue Options ─────────────────────────────────────────────────────────

const REVENUE_OPTIONS = [
  "Under $100K",
  "$100K – $500K",
  "$500K – $1M",
  "$1M – $3M",
  "$3M – $10M",
  "$10M+",
];

const HOW_FOUND_OPTIONS = [
  "Google / Search",
  "YouTube",
  "Podcast",
  "LinkedIn",
  "Instagram",
  "Referral from a friend",
  "Referral from a client",
  "Existing email subscriber",
  "Other",
];

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  void step; void total; // progress is shown via step indicators below
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        {Array.from({ length: total }).map((_, i) => {
          const isComplete = i < step - 1;
          const isActive = i === step - 1;
          return (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-400 ${
                  isComplete
                    ? "bg-[#D4AF37] text-[#0D1015]"
                    : isActive
                    ? "border-2 border-[#D4AF37] text-[#D4AF37] bg-transparent"
                    : "border border-[#2C2F36] text-[#6b6b6b] bg-transparent"
                }`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {isComplete ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              {i < total - 1 && (
                <div className="flex-1 h-px mx-2">
                  <motion.div
                    className="h-full bg-[#D4AF37]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isComplete ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "left" }}
                  />
                  <div className="h-full bg-[#2C2F36] -mt-px" style={{ display: isComplete ? "none" : "block" }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-[#6b6b6b]" style={{ fontFamily: "Poppins, sans-serif" }}>
        <span className={step >= 1 ? "text-[#D4AF37]" : ""}>Your Details</span>
        <span className={step >= 2 ? "text-[#D4AF37]" : ""}>Your Goals</span>
        <span className={step >= 3 ? "text-[#D4AF37]" : ""}>Confirmation</span>
      </div>
    </div>
  );
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#2C2F36]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full py-5 text-left gap-4"
      >
        <span className="text-[#F8F8F8] font-semibold text-sm leading-relaxed" style={{ fontFamily: "Montserrat, sans-serif" }}>
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-[#D4AF37]"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[#A8A8A8] text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [step1, setStep1] = useState<Step1Data>({
    name: "",
    email: "",
    phone: "",
    company: "",
    revenue: "",
  });

  const [step2, setStep2] = useState<Step2Data>({
    goals: "",
    challenges: "",
    howFound: "",
    whyApply: "",
  });

  function validateStep1() {
    return step1.name.trim() && step1.email.trim() && step1.revenue;
  }

  function validateStep2() {
    return step2.goals.trim() && step2.challenges.trim() && step2.whyApply.trim();
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError("");
    try {
      const payload = {
        name: step1.name,
        email: step1.email,
        phone: step1.phone,
        message: `Company: ${step1.company}\nRevenue: ${step1.revenue}\n\nGoals: ${step2.goals}\n\nChallenges: ${step2.challenges}\n\nHow found: ${step2.howFound}\n\nWhy apply: ${step2.whyApply}`,
        source: step2.howFound || "Website Application Form",
      };
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
        setStep(3);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.message || "Submission failed. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full bg-[#0D1015] border border-[#2C2F36] rounded-sm px-4 py-3.5 text-[#F8F8F8] text-sm placeholder-[#6b6b6b] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/12 transition-all duration-200";
  const labelClass = "block text-xs font-semibold text-[#A8A8A8] uppercase tracking-[0.12em] mb-1.5";
  const textareaClass = `${inputClass} resize-none min-h-[110px]`;

  return (
    <div className="bg-[#0D1015] text-[#F8F8F8] min-h-screen">

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 lg:px-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(212,175,55,0.08) 0%, transparent 65%)",
          }}
        />
        <div className="max-w-3xl mx-auto relative text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#D4AF37]" />
            <span className="text-xs font-semibold tracking-[0.28em] uppercase text-[#D4AF37]"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              Apply for Coaching
            </span>
            <div className="h-px w-8 bg-[#D4AF37]" />
          </div>
          <h1
            className="font-black tracking-tight leading-[0.92] mb-5"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              color: "#F8F8F8",
            }}
          >
            BOOK YOUR
            <br />
            <span style={{ color: "#D4AF37" }}>STRATEGY CALL</span>
          </h1>
          <p className="text-[#A8A8A8] text-lg leading-relaxed max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}>
            A free 45-minute working session to map your growth constraints and
            create a clear plan for your next level.
          </p>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-[#6b6b6b]"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            {[
              [<Shield className="w-3.5 h-3.5" />, "No obligation"],
              [<Calendar className="w-3.5 h-3.5" />, "45 min session"],
              [<CheckCircle className="w-3.5 h-3.5" />, "Real strategy, not a pitch"],
            ].map(([icon, label], i) => (
              <span key={i} className="flex items-center gap-1.5 text-[#A8A8A8]">
                <span className="text-[#D4AF37]">{icon as React.ReactNode}</span>
                {label as string}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORM ─────────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#171B22] border border-[#D4AF37]/15 rounded-sm p-8 lg:p-12">

            {/* Progress */}
            {!submitted && <ProgressBar step={step} total={3} />}

            <AnimatePresence mode="wait">

              {/* ── STEP 1 ── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="font-black text-[#F8F8F8] mb-2"
                    style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.5rem" }}>
                    Tell Us About You
                  </h2>
                  <p className="text-[#A8A8A8] text-sm mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
                    Step 1 of 3 — Basic information to get started.
                  </p>

                  <div className="space-y-5">
                    <div>
                      <label className={labelClass} style={{ fontFamily: "Poppins, sans-serif" }}>
                        <User className="w-3 h-3 inline mr-1.5" />Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="James Alcott"
                        value={step1.name}
                        onChange={(e) => setStep1((p) => ({ ...p, name: e.target.value }))}
                        className={inputClass}
                        style={{ fontFamily: "Inter, sans-serif" }}
                      />
                    </div>
                    <div>
                      <label className={labelClass} style={{ fontFamily: "Poppins, sans-serif" }}>
                        <Mail className="w-3 h-3 inline mr-1.5" />Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        value={step1.email}
                        onChange={(e) => setStep1((p) => ({ ...p, email: e.target.value }))}
                        className={inputClass}
                        style={{ fontFamily: "Inter, sans-serif" }}
                      />
                    </div>
                    <div>
                      <label className={labelClass} style={{ fontFamily: "Poppins, sans-serif" }}>
                        <Phone className="w-3 h-3 inline mr-1.5" />Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={step1.phone}
                        onChange={(e) => setStep1((p) => ({ ...p, phone: e.target.value }))}
                        className={inputClass}
                        style={{ fontFamily: "Inter, sans-serif" }}
                      />
                    </div>
                    <div>
                      <label className={labelClass} style={{ fontFamily: "Poppins, sans-serif" }}>
                        <Building2 className="w-3 h-3 inline mr-1.5" />Company / Business Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your Company LLC"
                        value={step1.company}
                        onChange={(e) => setStep1((p) => ({ ...p, company: e.target.value }))}
                        className={inputClass}
                        style={{ fontFamily: "Inter, sans-serif" }}
                      />
                    </div>
                    <div>
                      <label className={labelClass} style={{ fontFamily: "Poppins, sans-serif" }}>
                        <DollarSign className="w-3 h-3 inline mr-1.5" />Current Annual Revenue *
                      </label>
                      <select
                        value={step1.revenue}
                        onChange={(e) => setStep1((p) => ({ ...p, revenue: e.target.value }))}
                        className={`${inputClass} appearance-none`}
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        <option value="">Select your revenue range</option>
                        {REVENUE_OPTIONS.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => validateStep1() && setStep(2)}
                    disabled={!validateStep1()}
                    className="w-full mt-8 py-4 bg-[#D4AF37] text-[#0D1015] font-bold text-sm tracking-wider uppercase rounded-sm hover:bg-[#e8c84a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Continue to Step 2 <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* ── STEP 2 ── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="font-black text-[#F8F8F8] mb-2"
                    style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.5rem" }}>
                    Your Goals & Challenges
                  </h2>
                  <p className="text-[#A8A8A8] text-sm mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
                    Step 2 of 3 — Help us prepare for your call.
                  </p>

                  <div className="space-y-5">
                    <div>
                      <label className={labelClass} style={{ fontFamily: "Poppins, sans-serif" }}>
                        <Target className="w-3 h-3 inline mr-1.5" />What are your top 1–3 business goals? *
                      </label>
                      <textarea
                        placeholder="e.g. Hit $2M this year, build a team so I can step back from operations, launch a new service line..."
                        value={step2.goals}
                        onChange={(e) => setStep2((p) => ({ ...p, goals: e.target.value }))}
                        className={textareaClass}
                        style={{ fontFamily: "Inter, sans-serif" }}
                      />
                    </div>
                    <div>
                      <label className={labelClass} style={{ fontFamily: "Poppins, sans-serif" }}>
                        <HelpCircle className="w-3 h-3 inline mr-1.5" />What's your biggest challenge right now? *
                      </label>
                      <textarea
                        placeholder="e.g. I'm stuck doing everything myself, can't seem to break through $500K, my team isn't executing without me..."
                        value={step2.challenges}
                        onChange={(e) => setStep2((p) => ({ ...p, challenges: e.target.value }))}
                        className={textareaClass}
                        style={{ fontFamily: "Inter, sans-serif" }}
                      />
                    </div>
                    <div>
                      <label className={labelClass} style={{ fontFamily: "Poppins, sans-serif" }}>
                        How did you hear about Apex Coaching?
                      </label>
                      <select
                        value={step2.howFound}
                        onChange={(e) => setStep2((p) => ({ ...p, howFound: e.target.value }))}
                        className={`${inputClass} appearance-none`}
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        <option value="">Select an option</option>
                        {HOW_FOUND_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass} style={{ fontFamily: "Poppins, sans-serif" }}>
                        <Lightbulb className="w-3 h-3 inline mr-1.5" />Why are you applying now? *
                      </label>
                      <textarea
                        placeholder="What's happening in your business that made you decide to apply today? Be specific..."
                        value={step2.whyApply}
                        onChange={(e) => setStep2((p) => ({ ...p, whyApply: e.target.value }))}
                        className={textareaClass}
                        style={{ fontFamily: "Inter, sans-serif" }}
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="mt-4 text-xs text-[#ef4444] text-center" style={{ fontFamily: "Inter, sans-serif" }}>
                      {error}
                    </p>
                  )}

                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 border border-[#2C2F36] text-[#A8A8A8] font-semibold text-sm tracking-wider uppercase rounded-sm hover:border-[#D4AF37]/40 hover:text-[#F8F8F8] transition-colors duration-200 flex items-center justify-center gap-2"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting || !validateStep2()}
                      className="flex-1 py-4 bg-[#D4AF37] text-[#0D1015] font-bold text-sm tracking-wider uppercase rounded-sm hover:bg-[#e8c84a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {submitting ? "Submitting…" : <><CheckCircle className="w-4 h-4" /> Submit Application</>}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 3 — CONFIRMATION ── */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h2
                    className="font-black text-[#F8F8F8] mb-3 leading-[1.1]"
                    style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                  >
                    Application Received!
                  </h2>
                  <p className="text-[#A8A8A8] leading-relaxed mb-8 max-w-md mx-auto"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    Thank you, <strong className="text-[#F8F8F8]">{step1.name.split(" ")[0]}</strong>. We've received your application and will be in touch within 24 hours to schedule your strategy call.
                  </p>

                  {/* Calendly embed placeholder */}
                  <div className="bg-[#0D1015] border border-[#2C2F36] rounded-sm p-8 mb-6 text-left">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="w-5 h-5 text-[#D4AF37]" />
                      <span className="font-bold text-[#F8F8F8] text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        Schedule Your Call Now
                      </span>
                    </div>
                    <p className="text-[#A8A8A8] text-sm mb-5" style={{ fontFamily: "Inter, sans-serif" }}>
                      Pick a time that works for you. All calls are conducted via Zoom.
                    </p>
                    <a
                      href={process.env.NEXT_PUBLIC_CALENDLY_DISCOVERY_CALL_URL ?? "https://calendly.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0D1015] font-bold text-sm tracking-wider uppercase rounded-sm hover:bg-[#e8c84a] transition-colors duration-200"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Choose a Time <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="text-xs text-[#6b6b6b]" style={{ fontFamily: "Inter, sans-serif" }}>
                    A confirmation email has been sent to{" "}
                    <strong className="text-[#A8A8A8]">{step1.email}</strong>
                  </p>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 pb-32" style={{ backgroundColor: "#171B22" }}>
        <div className="max-w-2xl mx-auto py-20">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.28em] uppercase text-[#D4AF37] mb-4 block"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              Questions
            </span>
            <h2
              className="font-black text-[#F8F8F8] tracking-tight"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
            >
              Frequently Asked <span style={{ color: "#D4AF37" }}>Questions</span>
            </h2>
          </div>
          <div>
            {FAQS.map((faq) => (
              <FAQItem key={faq.question} q={faq.question} a={faq.answer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
