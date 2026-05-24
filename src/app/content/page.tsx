"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Search,
  Clock,
  Eye,
  Calendar,
  ChevronRight,
  Youtube,
  Mic,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type ContentType = "All" | "YouTube" | "Podcast" | "Articles";

interface VideoItem {
  id: string;
  type: "video";
  platform: "YouTube" | "Podcast";
  title: string;
  description: string;
  thumbnail: string;
  views: string;
  duration: string;
  date: string;
  category: string;
  href: string;
}

interface ArticleItem {
  id: string;
  type: "article";
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  imageBg: string;
  href: string;
}

type ContentItem = VideoItem | ArticleItem;

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONTENT_ITEMS: ContentItem[] = [
  {
    id: "v1",
    type: "video",
    platform: "YouTube",
    title: "The $10M Founder Framework: What I Wish I Knew at $500K",
    description: "The exact systems framework that separates 7-figure operators from 6-figure hustlers.",
    thumbnail: "from-[#1a1f28] via-[#252b35] to-[#0D1015]",
    views: "284K",
    duration: "48:32",
    date: "2026-05-15",
    category: "Business",
    href: "#",
  },
  {
    id: "v2",
    type: "video",
    platform: "YouTube",
    title: "Pricing Your Coaching Offer at $15K: Step-by-Step Breakdown",
    description: "How to structure, price, and position a high-ticket offer that sells without pressure.",
    thumbnail: "from-[#1e232c] via-[#171B22] to-[#0D1015]",
    views: "167K",
    duration: "34:18",
    date: "2026-05-08",
    category: "Marketing",
    href: "#",
  },
  {
    id: "v3",
    type: "video",
    platform: "YouTube",
    title: "Why 90% of Founders Never Break $2M (The Real Reason)",
    description: "It's not strategy. It's not marketing. Here's the identity constraint keeping you stuck.",
    thumbnail: "from-[#252b35] via-[#1a1f28] to-[#0D1015]",
    views: "412K",
    duration: "22:05",
    date: "2026-04-30",
    category: "Mindset",
    href: "#",
  },
  {
    id: "p1",
    type: "video",
    platform: "Podcast",
    title: "Ep. 142: Building a $5M Consulting Firm with Marcus Webb",
    description: "Marcus went from $300K freelancer to $5M consulting firm owner in 36 months. Here's how.",
    thumbnail: "from-[#1e232c] via-[#252b35] to-[#0D1015]",
    views: "94K",
    duration: "1:02:14",
    date: "2026-05-12",
    category: "Case Studies",
    href: "#",
  },
  {
    id: "p2",
    type: "video",
    platform: "Podcast",
    title: "Ep. 141: The Delegation Code — Hiring Your First True Team",
    description: "The exact process for hiring, onboarding, and empowering your first five employees.",
    thumbnail: "from-[#1a1f28] via-[#1e232c] to-[#0D1015]",
    views: "71K",
    duration: "58:47",
    date: "2026-05-05",
    category: "Business",
    href: "#",
  },
  {
    id: "a1",
    type: "article",
    title: "Zero to $10M: The 7 Systems Every Founder Must Build Before Hiring",
    excerpt: "Most founders hire before they have systems. That's why 80% of hires fail.",
    category: "Business",
    date: "2026-05-18",
    readTime: 12,
    imageBg: "from-[#1a1f28] via-[#252b35] to-[#0D1015]",
    href: "/blog/zero-to-ten-million-systems-that-scale",
  },
  {
    id: "v4",
    type: "video",
    platform: "YouTube",
    title: "My Entire Content Strategy in 30 Minutes (That Built 500K Subscribers)",
    description: "The exact content system behind consistent growth without burning out.",
    thumbnail: "from-[#171B22] via-[#1e232c] to-[#0D1015]",
    views: "198K",
    duration: "29:44",
    date: "2026-04-22",
    category: "Marketing",
    href: "#",
  },
  {
    id: "a2",
    type: "article",
    title: "The Offer Stack That Converts Cold Traffic Into $10K Clients",
    excerpt: "Your offer is doing the heavy lifting your sales team can't. Here's the architecture.",
    category: "Marketing",
    date: "2026-05-12",
    readTime: 9,
    imageBg: "from-[#1e232c] via-[#171B22] to-[#0D1015]",
    href: "/blog/the-offer-stack-that-converts",
  },
  {
    id: "p3",
    type: "video",
    platform: "Podcast",
    title: "Ep. 140: How I Turned a Burnout into a $3M Business Pivot",
    description: "Sometimes hitting rock bottom is the best business strategy you never planned.",
    thumbnail: "from-[#252b35] via-[#171B22] to-[#0D1015]",
    views: "53K",
    duration: "45:22",
    date: "2026-04-28",
    category: "Mindset",
    href: "#",
  },
  {
    id: "v5",
    type: "video",
    platform: "YouTube",
    title: "How to Build an A-Player Team Without a Big Budget",
    description: "Attract, hire, and retain top talent at every stage of your growth journey.",
    thumbnail: "from-[#1a1f28] via-[#1e232c] to-[#0D1015]",
    views: "143K",
    duration: "41:18",
    date: "2026-04-14",
    category: "Business",
    href: "#",
  },
  {
    id: "a3",
    type: "article",
    title: "The Identity Shift That Separates 6-Figure Owners from 7-Figure CEOs",
    excerpt: "Revenue plateaus are almost never a strategy problem. They're an identity problem.",
    category: "Mindset",
    date: "2026-05-06",
    readTime: 8,
    imageBg: "from-[#1a1f28] via-[#1e232c] to-[#0D1015]",
    href: "/blog/identity-shift-seven-figure-founder",
  },
  {
    id: "p4",
    type: "video",
    platform: "Podcast",
    title: "Ep. 139: Scaling to $10M with an Ops-First Mindset — Dr. Priya Patel",
    description: "How Dr. Priya transformed her consulting practice into a scalable, system-driven firm.",
    thumbnail: "from-[#1e232c] via-[#252b35] to-[#0D1015]",
    views: "47K",
    duration: "52:06",
    date: "2026-04-21",
    category: "Case Studies",
    href: "#",
  },
];

const VISIBLE_INITIAL = 8;
const LOAD_MORE_COUNT = 4;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatViews(views: string) {
  return `${views} views`;
}

// ─── Card Components ──────────────────────────────────────────────────────────

function VideoCard({ item, index }: { item: VideoItem; index: number }) {
  const isYouTube = item.platform === "YouTube";
  const PlatformIcon = isYouTube ? Youtube : Mic;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group border border-[#D4AF37]/12 bg-[#171B22] rounded-sm overflow-hidden hover:border-[#D4AF37]/35 hover:-translate-y-1.5 transition-all duration-400"
    >
      <a href={item.href} target={item.href !== "#" ? "_blank" : undefined} rel="noopener noreferrer">
        {/* Thumbnail */}
        <div className={`relative w-full aspect-video bg-gradient-to-br ${item.thumbnail} overflow-hidden`}>
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(212,175,55,0.07) 0%, transparent 70%)",
            }}
          />
          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg"
              style={{ boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}>
              <Play className="w-5 h-5 text-[#0D1015] fill-[#0D1015] ml-0.5" />
            </div>
          </div>
          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-[#0D1015]/80 backdrop-blur-sm text-[#F8F8F8] text-xs font-semibold px-2 py-0.5 rounded"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            {item.duration}
          </div>
          {/* Platform badge */}
          <div className="absolute top-2 left-2">
            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border ${
              isYouTube
                ? "bg-red-500/15 border-red-500/30 text-red-400"
                : "bg-[#D4AF37]/12 border-[#D4AF37]/25 text-[#D4AF37]"
            }`} style={{ fontFamily: "Poppins, sans-serif" }}>
              <PlatformIcon className="w-3 h-3" />
              {item.platform}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <span className="inline-flex items-center text-[9px] font-semibold tracking-[0.18em] uppercase text-[#D4AF37] bg-[#D4AF37]/08 border border-[#D4AF37]/18 rounded-full px-2.5 py-1 mb-3"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            {item.category}
          </span>
          <h3
            className="font-bold text-[#F8F8F8] leading-[1.2] mb-3 group-hover:text-[#D4AF37] transition-colors duration-200 line-clamp-2"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.95rem" }}
          >
            {item.title}
          </h3>
          <p className="text-[#A8A8A8] text-xs leading-relaxed mb-4 line-clamp-2" style={{ fontFamily: "Inter, sans-serif" }}>
            {item.description}
          </p>
          <div className="flex items-center gap-3 text-xs text-[#6b6b6b]" style={{ fontFamily: "Inter, sans-serif" }}>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatViews(item.views)}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(item.date)}
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

function ArticleCard({ item, index }: { item: ArticleItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group border border-[#D4AF37]/12 bg-[#171B22] rounded-sm overflow-hidden hover:border-[#D4AF37]/35 hover:-translate-y-1.5 transition-all duration-400"
    >
      <Link href={item.href}>
        {/* Image placeholder */}
        <div className={`relative w-full aspect-video bg-gradient-to-br ${item.imageBg} overflow-hidden`}>
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 50% 50% at 50% 40%, rgba(212,175,55,0.06) 0%, transparent 70%)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-[#D4AF37]/15" />
          </div>
          <div className="absolute top-2 left-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase bg-[#171B22]/80 backdrop-blur-sm border border-[#2C2F36] text-[#A8A8A8] px-2.5 py-1 rounded-full"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              <BookOpen className="w-3 h-3" /> Article
            </span>
          </div>
        </div>

        <div className="p-5">
          <span className="inline-flex items-center text-[9px] font-semibold tracking-[0.18em] uppercase text-[#D4AF37] bg-[#D4AF37]/08 border border-[#D4AF37]/18 rounded-full px-2.5 py-1 mb-3"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            {item.category}
          </span>
          <h3
            className="font-bold text-[#F8F8F8] leading-[1.2] mb-3 group-hover:text-[#D4AF37] transition-colors duration-200 line-clamp-2"
            style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.95rem" }}
          >
            {item.title}
          </h3>
          <p className="text-[#A8A8A8] text-xs leading-relaxed mb-4 line-clamp-2" style={{ fontFamily: "Inter, sans-serif" }}>
            {item.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-[#6b6b6b]" style={{ fontFamily: "Inter, sans-serif" }}>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(item.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {item.readTime} min read
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContentPage() {
  const [activeFilter, setActiveFilter] = useState<ContentType>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(VISIBLE_INITIAL);

  const filtered = useMemo(() => {
    let items = CONTENT_ITEMS;

    if (activeFilter !== "All") {
      items = items.filter((item) => {
        if (activeFilter === "YouTube") return item.type === "video" && (item as VideoItem).platform === "YouTube";
        if (activeFilter === "Podcast") return item.type === "video" && (item as VideoItem).platform === "Podcast";
        if (activeFilter === "Articles") return item.type === "article";
        return true;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((item) =>
        item.title.toLowerCase().includes(q) ||
        (item.type === "video" ? item.description : item.excerpt).toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }

    return items;
  }, [activeFilter, searchQuery]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const FILTERS: ContentType[] = ["All", "YouTube", "Podcast", "Articles"];

  const FILTER_ICONS: Record<string, React.ReactNode> = {
    All: <TrendingUp className="w-3.5 h-3.5" />,
    YouTube: <Youtube className="w-3.5 h-3.5" />,
    Podcast: <Mic className="w-3.5 h-3.5" />,
    Articles: <BookOpen className="w-3.5 h-3.5" />,
  };

  return (
    <div className="bg-[#0D1015] text-[#F8F8F8] min-h-screen">

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-6 lg:px-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(212,175,55,0.08) 0%, transparent 65%)",
          }}
        />
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.025]" aria-hidden="true">
          <filter id="noise-content">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise-content)" />
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
              Free Education
            </span>
            <div className="h-px w-8 bg-[#D4AF37]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-black tracking-tight leading-[0.92] mb-5"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              color: "#F8F8F8",
            }}
          >
            CONTENT
            <br />
            <span style={{ color: "#D4AF37" }}>HUB</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#A8A8A8] text-lg leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Videos, podcast episodes, and articles covering everything from offer architecture to CEO
            mindset. All free. All actionable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {[
              ["500K+", "YouTube Subscribers"],
              ["142", "Podcast Episodes"],
              ["200+", "Published Articles"],
            ].map(([stat, label]) => (
              <div key={label} className="text-center">
                <div className="text-xl font-bold text-[#D4AF37]" style={{ fontFamily: "Montserrat, sans-serif" }}>{stat}</div>
                <div className="text-xs uppercase tracking-wider text-[#A8A8A8] mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FILTERS + SEARCH ──────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 mb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Filter tabs */}
            <div className="flex gap-2 flex-wrap justify-center">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setActiveFilter(f);
                    setVisibleCount(VISIBLE_INITIAL);
                  }}
                  className={`relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    activeFilter === f
                      ? "bg-[#D4AF37] text-[#0D1015]"
                      : "bg-[#171B22] border border-[#2C2F36] text-[#A8A8A8] hover:border-[#D4AF37]/40 hover:text-[#F8F8F8]"
                  }`}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {FILTER_ICONS[f]}
                  {f}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b6b]" />
              <input
                type="text"
                placeholder="Search content…"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(VISIBLE_INITIAL);
                }}
                className="w-full bg-[#171B22] border border-[#2C2F36] rounded-full pl-9 pr-4 py-2.5 text-sm text-[#F8F8F8] placeholder-[#6b6b6b] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/12 transition-all duration-200"
                style={{ fontFamily: "Inter, sans-serif" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTENT GRID ─────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeFilter}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {visible.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {visible.map((item, i) =>
                    item.type === "video" ? (
                      <VideoCard key={item.id} item={item as VideoItem} index={i} />
                    ) : (
                      <ArticleCard key={item.id} item={item as ArticleItem} index={i} />
                    )
                  )}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Search className="w-10 h-10 text-[#2C2F36] mx-auto mb-4" />
                  <p className="text-[#A8A8A8]" style={{ fontFamily: "Inter, sans-serif" }}>
                    No content matches your search. Try a different term.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Load more */}
          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#D4AF37]/40 text-[#D4AF37] text-sm font-semibold tracking-wider uppercase rounded-sm hover:bg-[#D4AF37]/08 hover:border-[#D4AF37] transition-all duration-300"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Load More <ChevronRight className="w-4 h-4" />
              </button>
              <p className="mt-3 text-xs text-[#6b6b6b]" style={{ fontFamily: "Inter, sans-serif" }}>
                Showing {visible.length} of {filtered.length} items
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
