"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Play,
  ArrowRight,
  Eye,
  Clock,
  Headphones,
  BookOpen,
  Youtube,
  Calendar,
  TrendingUp,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterTab = "all" | "youtube" | "podcast" | "articles";

interface YoutubeVideo {
  id: number;
  title: string;
  views: string;
  duration: string;
  category: string;
  gradient: string;
}

interface PodcastEpisode {
  id: number;
  title: string;
  episode: string;
  duration: string;
  date: string;
  description: string;
}

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  gradient: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const YOUTUBE_VIDEOS: YoutubeVideo[] = [
  {
    id: 1,
    title: "How I Built a $10M Business in 18 Months (Full Breakdown)",
    views: "1.2M",
    duration: "42:17",
    category: "youtube",
    gradient: "from-[#1a1a2e] via-[#16213e] to-[#0d1015]",
  },
  {
    id: 2,
    title: "The Only Business Model That Scales Without You",
    views: "847K",
    duration: "28:44",
    category: "youtube",
    gradient: "from-[#1a1f0e] via-[#141a0a] to-[#0d1015]",
  },
  {
    id: 3,
    title: "Why 97% of Entrepreneurs Stay Broke (Truth No One Tells You)",
    views: "2.1M",
    duration: "35:02",
    category: "youtube",
    gradient: "from-[#1f1a0e] via-[#1a140a] to-[#0d1015]",
  },
];

const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 1,
    episode: "EP. 147",
    title: "Operator Mindset: How Top Earners Think Differently",
    duration: "1:02:14",
    date: "May 18, 2026",
    description:
      "The mental frameworks separating 7-figure entrepreneurs from the rest.",
  },
  {
    id: 2,
    episode: "EP. 146",
    title: "Capital Allocation — Where Your First $100K Should Go",
    duration: "48:33",
    date: "May 11, 2026",
    description:
      "A ruthless framework for deploying early capital for maximum compounding.",
  },
  {
    id: 3,
    episode: "EP. 145",
    title: "Building Distribution Before Product",
    duration: "55:08",
    date: "May 4, 2026",
    description:
      "Why audience-first beats product-first every single time in the modern economy.",
  },
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Leverage Stack: 5 Systems That Run My Business While I Sleep",
    category: "Systems",
    date: "May 20, 2026",
    readTime: "8 min read",
    excerpt:
      "Most founders work in their business. Elite operators work on systems that make the business work for them.",
    gradient: "from-[#1a1f28] to-[#0d1015]",
  },
  {
    id: 2,
    title: "Positioning for Premium: How to Command 10x Prices",
    category: "Pricing Strategy",
    date: "May 14, 2026",
    readTime: "6 min read",
    excerpt:
      "Competing on price is a race to the bottom. Here's the exact positioning framework to become the only logical choice.",
    gradient: "from-[#1c1a14] to-[#0d1015]",
  },
  {
    id: 3,
    title: "The Acquisition Engine: Building a Scalable Lead Machine",
    category: "Marketing",
    date: "May 7, 2026",
    readTime: "10 min read",
    excerpt:
      "Stop relying on referrals and hope. Build a repeatable system that turns cold traffic into qualified buyers.",
    gradient: "from-[#141c1a] to-[#0d1015]",
  },
];

// ─── Filter Tab ────────────────────────────────────────────────────────────────

const TABS: { id: FilterTab; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All", icon: <TrendingUp size={13} /> },
  { id: "youtube", label: "YouTube", icon: <Youtube size={13} /> },
  { id: "podcast", label: "Podcast", icon: <Headphones size={13} /> },
  { id: "articles", label: "Articles", icon: <BookOpen size={13} /> },
];

// ─── YouTube Card ─────────────────────────────────────────────────────────────

function YouTubeCard({ video, index }: { video: YoutubeVideo; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div
        className="relative aspect-video overflow-hidden mb-4"
        style={{ outline: "1px solid rgba(212,175,55,0.12)" }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${video.gradient} transition-transform duration-700 ${hovered ? "scale-105" : "scale-100"}`} />

        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "160px",
          }}
        />

        {/* YouTube badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-[#0D1015]/80 px-2 py-1">
          <Youtube size={10} className="text-red-500" />
          <span
            className="text-[10px] font-semibold uppercase tracking-wide text-[#A8A8A8]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            YouTube
          </span>
        </div>

        {/* Duration */}
        <div className="absolute top-3 right-3 z-10 bg-[#0D1015]/80 px-2 py-1">
          <span
            className="text-[10px] text-[#A8A8A8] font-medium"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {video.duration}
          </span>
        </div>

        {/* Play button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center border border-[#D4AF37]/50 bg-[#D4AF37]/10 backdrop-blur-sm transition-all duration-300 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/20"
          >
            <Play size={18} fill="rgba(212,175,55,0.95)" strokeWidth={0} className="ml-0.5 text-[#D4AF37]" />
          </div>
        </motion.div>

        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: "linear-gradient(to top, rgba(13,16,21,0.8) 0%, transparent 100%)" }}
        />
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center gap-1.5 text-[#A8A8A8]">
          <Eye size={12} />
          <span className="text-[11px]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            {video.views} views
          </span>
        </div>
        <span className="text-[#2C2F36]">•</span>
        <span
          className="text-[11px] text-[#D4AF37] font-semibold uppercase tracking-wide"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          Free
        </span>
      </div>

      <h3
        className="text-[#F8F8F8] text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-300"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {video.title}
      </h3>
    </motion.div>
  );
}

// ─── Podcast Card ─────────────────────────────────────────────────────────────

function PodcastCard({ episode, index }: { episode: PodcastEpisode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group flex items-start gap-5 p-5 bg-[#171B22] cursor-pointer hover:bg-[#1e232c] transition-colors duration-300"
      style={{ outline: "1px solid rgba(212,175,55,0.12)" }}
      onClick={() => setPlaying(!playing)}
    >
      {/* Play button */}
      <div className="flex-shrink-0 mt-0.5">
        <motion.div
          className="w-11 h-11 rounded-full flex items-center justify-center border border-[#D4AF37]/40 bg-[#D4AF37]/8 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/15 transition-all duration-300"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {playing ? (
              <motion.div
                key="pause"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex gap-0.5"
              >
                <div className="w-1 h-3.5 bg-[#D4AF37] rounded-sm" />
                <div className="w-1 h-3.5 bg-[#D4AF37] rounded-sm" />
              </motion.div>
            ) : (
              <motion.div key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Play size={14} fill="rgba(212,175,55,0.95)" strokeWidth={0} className="ml-0.5 text-[#D4AF37]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="text-[10px] font-bold text-[#D4AF37] tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {episode.episode}
          </span>
          <span className="text-[#2C2F36]">·</span>
          <span
            className="text-[10px] text-[#A8A8A8]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {episode.date}
          </span>
        </div>
        <h3
          className="text-[#F8F8F8] text-sm font-semibold leading-snug mb-1.5 group-hover:text-[#D4AF37] transition-colors duration-300"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {episode.title}
        </h3>
        <p
          className="text-[#A8A8A8] text-xs leading-relaxed line-clamp-1"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {episode.description}
        </p>
      </div>

      {/* Duration */}
      <div className="flex-shrink-0 flex items-center gap-1 self-center">
        <Clock size={11} className="text-[#A8A8A8]" />
        <span
          className="text-[11px] text-[#A8A8A8] tabular-nums"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {episode.duration}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Blog Card ─────────────────────────────────────────────────────────────────

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer flex flex-col bg-[#171B22] overflow-hidden"
      style={{ outline: "1px solid rgba(212,175,55,0.12)" }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} transition-transform duration-700 group-hover:scale-105`} />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "160px",
          }}
        />

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] px-2.5 py-1 font-semibold uppercase tracking-wide"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {post.category}
          </span>
        </div>

        {/* Gold top accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-[#D4AF37]"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.12 + 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1.5 text-[#A8A8A8]">
            <Calendar size={11} />
            <span className="text-[11px]" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              {post.date}
            </span>
          </div>
          <span className="text-[#2C2F36]">·</span>
          <span
            className="text-[11px] text-[#A8A8A8]"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {post.readTime}
          </span>
        </div>

        <h3
          className="text-[#F8F8F8] text-sm font-semibold leading-snug mb-2 group-hover:text-[#D4AF37] transition-colors duration-300"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {post.title}
        </h3>

        <p
          className="text-[#A8A8A8] text-xs leading-relaxed line-clamp-2 flex-1"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {post.excerpt}
        </p>

        <div className="mt-4 pt-4 border-t border-[#2C2F36]/60 flex items-center gap-2 text-[#D4AF37]">
          <span
            className="text-[11px] font-semibold uppercase tracking-wide"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Read Article
          </span>
          <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ContentHub() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  const showYouTube = activeTab === "all" || activeTab === "youtube";
  const showPodcast = activeTab === "all" || activeTab === "podcast";
  const showArticles = activeTab === "all" || activeTab === "articles";

  return (
    <section
      id="content"
      className="relative bg-[#0D1015] py-28 lg:py-36 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(212,175,55,0.025) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={headingRef} className="mb-12 lg:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#D4AF37] text-[10px] tracking-[0.35em] uppercase font-semibold mb-5"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Knowledge
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#F8F8F8] text-4xl lg:text-5xl xl:text-[56px] font-bold tracking-tight leading-[1.05] mb-4"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            FREE{" "}
            <span className="text-[#D4AF37]">KNOWLEDGE VAULT</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#A8A8A8] text-base max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Hundreds of hours of elite business knowledge — completely free. No
            opt-in required.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-16 h-[1px] bg-[#D4AF37]/60 mt-6 origin-left"
          />
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center gap-2 mb-12"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                activeTab === tab.id
                  ? "text-[#0D1015] bg-[#D4AF37]"
                  : "text-[#A8A8A8] bg-transparent border border-[#2C2F36] hover:border-[#D4AF37]/40 hover:text-[#F8F8F8]"
              }`}
              style={{ fontFamily: "var(--font-poppins), sans-serif" }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content Blocks */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-16"
          >
            {/* YouTube */}
            {showYouTube && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Youtube size={15} className="text-red-500" />
                  <h3
                    className="text-[#F8F8F8] text-xs font-bold uppercase tracking-[0.25em]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Featured Videos
                  </h3>
                  <div className="flex-1 h-px bg-[#2C2F36]" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {YOUTUBE_VIDEOS.map((v, i) => (
                    <YouTubeCard key={v.id} video={v} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* Podcast */}
            {showPodcast && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Headphones size={15} className="text-[#D4AF37]" />
                  <h3
                    className="text-[#F8F8F8] text-xs font-bold uppercase tracking-[0.25em]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Latest Episodes
                  </h3>
                  <div className="flex-1 h-px bg-[#2C2F36]" />
                </div>
                <div className="flex flex-col gap-2">
                  {PODCAST_EPISODES.map((ep, i) => (
                    <PodcastCard key={ep.id} episode={ep} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* Blog */}
            {showArticles && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <BookOpen size={15} className="text-[#D4AF37]" />
                  <h3
                    className="text-[#F8F8F8] text-xs font-bold uppercase tracking-[0.25em]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Recent Articles
                  </h3>
                  <div className="flex-1 h-px bg-[#2C2F36]" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {BLOG_POSTS.map((post, i) => (
                    <BlogCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mt-16"
        >
          <a
            href="/content"
            className="group relative inline-flex items-center gap-3 px-8 py-4 border border-[#D4AF37]/50 text-[#D4AF37] overflow-hidden hover:border-[#D4AF37] transition-colors duration-300"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            <span className="relative z-10 font-semibold text-sm tracking-widest uppercase">
              Explore All Content
            </span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight size={16} />
            </motion.span>
            <span className="absolute inset-0 bg-[#D4AF37]/6 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
