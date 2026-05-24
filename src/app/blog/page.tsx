"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  ChevronRight,
  Mail,
  BookOpen,
  TrendingUp,
  Lightbulb,
  Briefcase,
  BarChart2,
} from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "All" | "Business" | "Marketing" | "Mindset" | "Case Studies";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  readTime: number;
  featured: boolean;
  imageBg: string;
  author: string;
  authorRole: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = ["All", "Business", "Marketing", "Mindset", "Case Studies"];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Business: <Briefcase className="w-3.5 h-3.5" />,
  Marketing: <TrendingUp className="w-3.5 h-3.5" />,
  Mindset: <Lightbulb className="w-3.5 h-3.5" />,
  "Case Studies": <BarChart2 className="w-3.5 h-3.5" />,
};

const BLOG_POSTS: BlogPost[] = [
  {
    slug: "zero-to-ten-million-systems-that-scale",
    title: "Zero to $10M: The 7 Systems Every Founder Must Build Before Hiring",
    excerpt:
      "Most founders hire before they have systems. That's why 80% of hires fail. Here's the exact framework that scales a business from $0 to $10M without chaos.",
    category: "Business",
    date: "2026-05-18",
    readTime: 12,
    featured: true,
    imageBg: "from-[#1a1f28] via-[#252b35] to-[#0D1015]",
    author: "James Alcott",
    authorRole: "Founder, Apex Coaching",
  },
  {
    slug: "the-offer-stack-that-converts",
    title: "The Offer Stack That Converts Cold Traffic Into $10K Clients",
    excerpt:
      "Your offer is doing the heavy lifting your sales team can't. Learn how to architect a value ladder that commands premium prices and produces genuine buyer urgency.",
    category: "Marketing",
    date: "2026-05-12",
    readTime: 9,
    featured: false,
    imageBg: "from-[#1e232c] via-[#171B22] to-[#0D1015]",
    author: "James Alcott",
    authorRole: "Founder, Apex Coaching",
  },
  {
    slug: "identity-shift-seven-figure-founder",
    title: "The Identity Shift That Separates 6-Figure Owners from 7-Figure CEOs",
    excerpt:
      "Revenue plateaus are almost never a strategy problem. They're an identity problem. Here's how to rewire the belief system that's capping your growth.",
    category: "Mindset",
    date: "2026-05-06",
    readTime: 8,
    featured: false,
    imageBg: "from-[#1a1f28] via-[#1e232c] to-[#0D1015]",
    author: "James Alcott",
    authorRole: "Founder, Apex Coaching",
  },
  {
    slug: "ecommerce-brand-from-800k-to-4m",
    title: "Case Study: How Marcus Took His E-commerce Brand from $800K to $4.2M in 14 Months",
    excerpt:
      "Marcus was maxed out running a solo operation. After implementing the Apex Offer Architecture and hiring system, he tripled his team and 5x'd revenue without working more hours.",
    category: "Case Studies",
    date: "2026-04-28",
    readTime: 11,
    featured: false,
    imageBg: "from-[#252b35] via-[#1e232c] to-[#0D1015]",
    author: "James Alcott",
    authorRole: "Founder, Apex Coaching",
  },
  {
    slug: "pricing-psychology-premium",
    title: "Pricing Psychology: Why Raising Your Prices Will Get You More Clients",
    excerpt:
      "Every founder I've worked with who doubled their prices saw an immediate uptick in close rates. Here's the counterintuitive science behind premium positioning.",
    category: "Marketing",
    date: "2026-04-20",
    readTime: 7,
    featured: false,
    imageBg: "from-[#1e232c] via-[#1a1f28] to-[#0D1015]",
    author: "James Alcott",
    authorRole: "Founder, Apex Coaching",
  },
  {
    slug: "ceo-daily-operating-system",
    title: "The CEO Daily Operating System: How Elite Founders Manage Time at Scale",
    excerpt:
      "There's a reason top-tier CEOs move with rare decisiveness. It's not talent — it's a rigorously designed daily structure. Here's the system behind the system.",
    category: "Business",
    date: "2026-04-14",
    readTime: 10,
    featured: false,
    imageBg: "from-[#1a1f28] via-[#252b35] to-[#0D1015]",
    author: "James Alcott",
    authorRole: "Founder, Apex Coaching",
  },
  {
    slug: "consulting-firm-case-study",
    title: "Case Study: From Burnout Consultant to $1.8M Boutique Firm in 18 Months",
    excerpt:
      "Sarah was billing by the hour and drowning. We rebuilt her firm around productized services, a clear positioning statement, and a referral engine. The result was transformational.",
    category: "Case Studies",
    date: "2026-04-07",
    readTime: 13,
    featured: false,
    imageBg: "from-[#252b35] via-[#1e232c] to-[#0D1015]",
    author: "James Alcott",
    authorRole: "Founder, Apex Coaching",
  },
  {
    slug: "overcome-fear-of-delegation",
    title: "The Delegation Trap: Why Smart Founders Refuse to Let Go (And How to Fix It)",
    excerpt:
      "Delegation anxiety is the single biggest growth blocker I see in founders between $500K and $2M. Here's a proven protocol for transferring ownership without losing quality.",
    category: "Mindset",
    date: "2026-03-31",
    readTime: 8,
    featured: false,
    imageBg: "from-[#1e232c] via-[#1a1f28] to-[#0D1015]",
    author: "James Alcott",
    authorRole: "Founder, Apex Coaching",
  },
  {
    slug: "content-flywheel-authority",
    title: "The Content Flywheel: How to Become the Most Trusted Voice in Your Niche",
    excerpt:
      "Authority isn't proclaimed — it's engineered. This 5-part content flywheel system positions you as the definitive expert in your space and turns content into a 24/7 sales channel.",
    category: "Marketing",
    date: "2026-03-24",
    readTime: 9,
    featured: false,
    imageBg: "from-[#1a1f28] via-[#1e232c] to-[#0D1015]",
    author: "James Alcott",
    authorRole: "Founder, Apex Coaching",
  },
];

const VISIBLE_INITIAL = 6;
const LOAD_MORE_COUNT = 3;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Components ───────────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.18em] uppercase text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full px-3 py-1"
      style={{ fontFamily: "Poppins, sans-serif" }}>
      {CATEGORY_ICONS[category]}
      {category}
    </span>
  );
}

function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative group overflow-hidden rounded-sm border border-[#D4AF37]/15 bg-[#171B22] hover:border-[#D4AF37]/40 transition-all duration-500"
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-col lg:flex-row">
        {/* Image placeholder */}
        <div className={`relative w-full lg:w-1/2 aspect-video lg:aspect-auto min-h-[280px] bg-gradient-to-br ${post.imageBg} flex-shrink-0 overflow-hidden`}>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(ellipse 60% 60% at 60% 40%, rgba(212,175,55,0.12) 0%, transparent 70%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-[#D4AF37]/20" />
          </div>
          <div className="absolute top-4 left-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-3 py-1.5 rounded-full"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              Featured
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#171B22]/60 hidden lg:block" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-5">
            <CategoryBadge category={post.category} />
          </div>
          <h2
            className="font-black text-[#F8F8F8] leading-[1.1] mb-4 group-hover:text-[#D4AF37] transition-colors duration-300"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
            }}
          >
            {post.title}
          </h2>
          <p className="text-[#A8A8A8] leading-relaxed mb-8 max-w-xl" style={{ fontFamily: "Inter, sans-serif" }}>
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-[#6b6b6b]" style={{ fontFamily: "Inter, sans-serif" }}>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime} min read
              </span>
            </div>
            <span className="flex items-center gap-2 text-[#D4AF37] text-sm font-semibold group-hover:gap-3 transition-all duration-300"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              Read Article <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group border border-[#D4AF37]/12 bg-[#171B22] rounded-sm overflow-hidden hover:border-[#D4AF37]/35 hover:-translate-y-1.5 transition-all duration-500"
    >
      <Link href={`/blog/${post.slug}`}>
        {/* Image placeholder */}
        <div className={`relative w-full aspect-[16/9] bg-gradient-to-br ${post.imageBg} overflow-hidden`}>
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 50% 50% at 50% 40%, rgba(212,175,55,0.08) 0%, transparent 70%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-[#D4AF37]/15" />
          </div>
          <div className="absolute top-3 left-3">
            <CategoryBadge category={post.category} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3
            className="font-bold text-[#F8F8F8] leading-[1.2] mb-3 group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-2"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.1rem" }}
          >
            {post.title}
          </h3>
          <p className="text-[#A8A8A8] text-sm leading-relaxed mb-5 line-clamp-3" style={{ fontFamily: "Inter, sans-serif" }}>
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-[#2C2F36]/60">
            <div className="flex items-center gap-3 text-xs text-[#6b6b6b]" style={{ fontFamily: "Inter, sans-serif" }}>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}m
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [visibleCount, setVisibleCount] = useState(VISIBLE_INITIAL);
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const filtered = BLOG_POSTS.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );
  const featuredPost = filtered.find((p) => p.featured);
  const gridPosts = filtered.filter((p) => !p.featured || activeCategory !== "All");
  const visiblePosts = gridPosts.slice(0, visibleCount);
  const hasMore = visibleCount < gridPosts.length;

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubStatus("success");
        setEmail("");
      } else {
        setSubStatus("error");
      }
    } catch {
      setSubStatus("error");
    }
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <div className="bg-[#0D1015] text-[#F8F8F8] min-h-screen">

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-6 lg:px-20 overflow-hidden">
        {/* Background radial */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(212,175,55,0.09) 0%, transparent 65%)",
          }}
        />
        {/* Noise */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.025]" aria-hidden="true">
          <filter id="noise-blog">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise-blog)" />
        </svg>

        <div className="max-w-7xl mx-auto relative text-center">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-[#D4AF37]" />
            <span
              className="text-xs font-semibold tracking-[0.28em] uppercase text-[#D4AF37]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Apex Editorial
            </span>
            <div className="h-px w-8 bg-[#D4AF37]" />
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-black tracking-tight leading-[0.92] mb-6"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              color: "#F8F8F8",
            }}
          >
            KNOWLEDGE
            <br />
            <span style={{ color: "#D4AF37" }}>VAULT</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[#A8A8A8] text-lg leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Unfiltered frameworks, case studies, and strategic insight from 15 years of building
            and coaching elite businesses. No fluff. No recycled advice. Just execution-grade content.
          </motion.p>

          {/* Stats row */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center justify-center gap-8 text-sm text-[#6b6b6b]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {[
              ["200+", "Articles Published"],
              ["50K+", "Monthly Readers"],
              ["4.9/5", "Reader Rating"],
            ].map(([stat, label]) => (
              <div key={label} className="text-center">
                <div className="text-xl font-bold text-[#D4AF37]" style={{ fontFamily: "Montserrat, sans-serif" }}>{stat}</div>
                <div className="text-xs uppercase tracking-wider text-[#A8A8A8] mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CATEGORY FILTER ───────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 mb-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(VISIBLE_INITIAL);
                }}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#D4AF37] text-[#0D1015]"
                    : "bg-[#171B22] border border-[#2C2F36] text-[#A8A8A8] hover:border-[#D4AF37]/40 hover:text-[#F8F8F8]"
                }`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="activeCategoryBlog"
                    className="absolute inset-0 rounded-full bg-[#D4AF37]"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTENT ───────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {/* Featured Post */}
              {featuredPost && activeCategory === "All" && (
                <div className="mb-12">
                  <FeaturedPostCard post={featuredPost} />
                </div>
              )}

              {/* Grid */}
              {visiblePosts.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visiblePosts.map((post, i) => (
                    <PostCard key={post.slug} post={post} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-[#A8A8A8]" style={{ fontFamily: "Inter, sans-serif" }}>
                  No articles in this category yet. Check back soon.
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Load More */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-14"
            >
              <button
                onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#D4AF37]/40 text-[#D4AF37] text-sm font-semibold tracking-wider uppercase rounded-sm hover:bg-[#D4AF37]/08 hover:border-[#D4AF37] transition-all duration-300"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Load More Articles <ChevronRight className="w-4 h-4" />
              </button>
              <p className="mt-3 text-xs text-[#6b6b6b]" style={{ fontFamily: "Inter, sans-serif" }}>
                Showing {visiblePosts.length} of {gridPosts.length} articles
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── NEWSLETTER CTA ────────────────────────────────────────────────── */}
      <section className="py-28 px-6 lg:px-20 relative overflow-hidden" style={{ backgroundColor: "#171B22" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-2xl mx-auto relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25">
              <Mail className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h2
              className="font-black tracking-tight mb-4 leading-[1.1]"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#F8F8F8" }}
            >
              Never Miss a Breakthrough
              <br />
              <span style={{ color: "#D4AF37" }}>Insight</span>
            </h2>
            <p className="text-[#A8A8A8] leading-relaxed mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
              Join 18,000+ founders who get our best frameworks, case studies, and strategic
              deep-dives delivered every Tuesday. No spam. Unsubscribe anytime.
            </p>

            {subStatus === "success" ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/25 text-[#22c55e] px-6 py-3 rounded-sm text-sm font-semibold"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                You're in! Check your inbox for a confirmation email.
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your best email address"
                  required
                  className="flex-1 bg-[#0D1015] border border-[#2C2F36] rounded-sm px-4 py-3 text-[#F8F8F8] text-sm placeholder-[#6b6b6b] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/12 transition-all duration-200"
                  style={{ fontFamily: "Inter, sans-serif" }}
                />
                <button
                  type="submit"
                  disabled={subStatus === "loading"}
                  className="shrink-0 px-6 py-3 bg-[#D4AF37] text-[#0D1015] text-sm font-bold tracking-wider uppercase rounded-sm hover:bg-[#e8c84a] disabled:opacity-60 transition-colors duration-200"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {subStatus === "loading" ? "Subscribing…" : "Subscribe Free"}
                </button>
              </form>
            )}

            {subStatus === "error" && (
              <p className="mt-3 text-xs text-[#ef4444]" style={{ fontFamily: "Inter, sans-serif" }}>
                Something went wrong. Please try again.
              </p>
            )}

            <p className="mt-4 text-xs text-[#6b6b6b]" style={{ fontFamily: "Inter, sans-serif" }}>
              No spam. Unsubscribe in one click. Read by 18,000+ founders.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
