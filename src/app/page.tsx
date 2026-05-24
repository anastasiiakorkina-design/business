import { Suspense, lazy } from "react";
import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";

// Lazy-loaded sections — each loads as it scrolls into view
const SuccessStories = lazy(
  () => import("@/components/sections/SuccessStories")
);
const ContentHub = lazy(() => import("@/components/sections/ContentHub"));
const Community = lazy(() => import("@/components/sections/Community"));
const Booking = lazy(() => import("@/components/sections/Booking"));

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Apex Coaching — Build a Business That Compounds",
  description:
    "Join 2,000+ entrepreneurs who've scaled to 6 and 7 figures with proven systems and elite mentorship. Book your free strategy call today.",
  alternates: { canonical: "/" },
};

// ─── Skeleton fallbacks ───────────────────────────────────────────────────────

function SectionSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden py-28 lg:py-36 bg-[#0D1015]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-6">
        {/* Eyebrow */}
        <div className="h-3 w-24 rounded-sm bg-[#D4AF37]/10 animate-pulse" />
        {/* Heading */}
        <div className="space-y-3">
          <div className="h-10 w-3/4 rounded-sm bg-[#F8F8F8]/5 animate-pulse" />
          <div className="h-10 w-1/2 rounded-sm bg-[#F8F8F8]/5 animate-pulse" />
        </div>
        {/* Cards row */}
        <div className="grid sm:grid-cols-3 gap-4 pt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-sm bg-[#171B22] animate-pulse"
              style={{
                animationDelay: `${i * 150}ms`,
                outline: "1px solid rgba(212,175,55,0.08)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/*
       * Enable CSS smooth scrolling for anchor nav links.
       * This is applied at the <html> level via globals.css but we also
       * reinforce it here as a scroll-behavior class.
       */}
      {/* ── Hero (eager — above the fold) ─────────────────────────────────── */}
      <Hero />

      {/* ── Success Stories ───────────────────────────────────────────────── */}
      <Suspense fallback={<SectionSkeleton />}>
        <SuccessStories />
      </Suspense>

      {/* ── Divider ───────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="max-w-7xl mx-auto px-6 lg:px-10"
      >
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.15) 30%, rgba(212,175,55,0.25) 50%, rgba(212,175,55,0.15) 70%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Content Hub ───────────────────────────────────────────────────── */}
      <Suspense fallback={<SectionSkeleton />}>
        <ContentHub />
      </Suspense>

      {/* ── Divider ───────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="max-w-7xl mx-auto px-6 lg:px-10"
      >
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.15) 30%, rgba(212,175,55,0.25) 50%, rgba(212,175,55,0.15) 70%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Community / Lead Magnet ───────────────────────────────────────── */}
      <Suspense fallback={<SectionSkeleton />}>
        <Community />
      </Suspense>

      {/* ── Divider ───────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="max-w-7xl mx-auto px-6 lg:px-10"
      >
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.15) 30%, rgba(212,175,55,0.25) 50%, rgba(212,175,55,0.15) 70%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Booking / CTA ─────────────────────────────────────────────────── */}
      <Suspense fallback={<SectionSkeleton />}>
        <Booking />
      </Suspense>
    </>
  );
}
