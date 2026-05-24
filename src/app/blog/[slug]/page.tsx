import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: number;
  author: string;
  authorRole: string;
  authorBio: string;
  coverGradient: string;
  tags: string[];
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const POSTS: Record<string, BlogPostData> = {
  "zero-to-ten-million-systems-that-scale": {
    slug: "zero-to-ten-million-systems-that-scale",
    title: "Zero to $10M: The 7 Systems Every Founder Must Build Before Hiring",
    excerpt:
      "Most founders hire before they have systems. That's why 80% of hires fail. Here's the exact framework that scales a business from $0 to $10M without chaos.",
    content: `
      <h2>Why Founders Fail at $1M</h2>
      <p>I've coached over 2,000 entrepreneurs across every industry imaginable. The founders who plateau at $1M share one universal trait: they built a job, not a business. They are the business. Every decision, every relationship, every deliverable flows through them.</p>
      <p>Before you add headcount, you must have systems that can carry weight independently. Otherwise, each hire just creates more coordination cost and more dependency on you as the interpreter of "how we do things here."</p>

      <blockquote>
        "A business that can't run without you isn't a business — it's a prison with good marketing."
      </blockquote>

      <h2>System 1: The Offer Architecture</h2>
      <p>Your offer is the core economic engine of your business. Most founders offer too many things to too many people. Before you hire, you need a single, clearly defined flagship offer with documented outcomes, a defined delivery method, and a price point that supports your margin goals at scale.</p>
      <p>The offer architecture includes: the promise, the mechanism, the proof, and the price. When these four elements are documented and battle-tested, you can hand the offer to a sales hire without reinventing the pitch every time.</p>

      <h2>System 2: The Lead Engine</h2>
      <p>Your lead generation cannot live in your personal network. Before you hit $3M, you need at least one repeatable, documented channel that produces qualified leads without your personal time. This could be content marketing, paid acquisition, partnerships, or referrals — but it must be a system, not a hustle.</p>

      <h2>System 3: The Sales Playbook</h2>
      <p>The moment you decide to hire a salesperson, you'll discover whether you actually have a sales process — or just personal charisma. The sales playbook documents every stage of your pipeline: the qualifying questions, the objection responses, the follow-up sequences, and the close frameworks. Without this, your second salesperson will perform 40% of what you do.</p>

      <h2>System 4: The Delivery Engine</h2>
      <p>How does your product or service get delivered? Every step, every touchpoint, every quality gate must be documented and transferable. This is the system that lets you hire and onboard delivery staff without a constant quality cliff.</p>

      <h2>System 5: The Metrics Dashboard</h2>
      <p>You cannot manage what you don't measure. Before scaling headcount, build a real-time dashboard covering: revenue, margin, pipeline velocity, customer acquisition cost, lifetime value, and NPS. When these numbers are visible to your leadership team, decisions get faster and better.</p>

      <h2>System 6: The Hiring Protocol</h2>
      <p>Most founders hire reactively — a pain point builds up, they post a job description, and they hire the first person who doesn't scare them in an interview. This is how bad hires happen. The hiring protocol defines the exact role, the scorecard of success, the interview process, and the 90-day onboarding plan before you ever post the job.</p>

      <h2>System 7: The Leadership Operating System</h2>
      <p>Weekly team meetings, 1-on-1 cadences, quarterly planning, and annual goal-setting. These aren't bureaucracy — they're the infrastructure that keeps a growing team aligned, accountable, and moving in the same direction. Without a leadership OS, your company becomes a collection of individual contributors who occasionally share a Slack channel.</p>

      <h2>The Sequence Matters</h2>
      <p>Build these systems in order. Most founders try to build System 6 (Hiring) before they've built Systems 1–5. That's why their hires fail. Give your new team members something solid to stand on.</p>
      <p>If you're serious about scaling past $3M, the most valuable thing you can do this quarter is spend two weeks documenting and testing each of these seven systems. The clarity and leverage you'll gain is worth more than any hire.</p>
    `,
    category: "Business",
    date: "2026-05-18",
    readTime: 12,
    author: "James Alcott",
    authorRole: "Founder, Apex Coaching",
    authorBio:
      "James Alcott is a 4x founder, WSJ bestselling author, and the creator of the Apex Method. He has coached over 2,000 entrepreneurs across 47 countries, generating $500M+ in verified client revenue.",
    coverGradient: "from-[#1a1f28] via-[#252b35] to-[#0D1015]",
    tags: ["Systems", "Scaling", "Hiring", "Operations"] },
  "the-offer-stack-that-converts": {
    slug: "the-offer-stack-that-converts",
    title: "The Offer Stack That Converts Cold Traffic Into $10K Clients",
    excerpt:
      "Your offer is doing the heavy lifting your sales team can't. Learn how to architect a value ladder that commands premium prices and produces genuine buyer urgency.",
    content: `
      <h2>The Problem With Most Offers</h2>
      <p>Most service businesses have a single offer: "Hire me to do X." That's it. There's no path, no progression, and no way to serve a prospect who isn't ready to commit immediately. You're forcing cold traffic to make a maximum-commitment decision on first contact.</p>
      <p>The solution is an offer stack — a sequenced set of products and services that move a prospect from skeptic to client to raving advocate in a natural, low-friction way.</p>

      <blockquote>
        "The offer is not the product. The offer is the transformation — and you need to make it feel inevitable."
      </blockquote>

      <h2>The Four Layers of an Elite Offer Stack</h2>
      <p>Every high-converting offer stack has four layers, each serving a distinct purpose in the buyer journey.</p>

      <h2>Layer 1: The Lead Magnet (Free)</h2>
      <p>This is your proof of competence. A single, highly specific piece of content that demonstrates you understand your ideal client's problem better than they do. Not a 50-page eBook no one reads. A 10-minute video or a one-page framework that solves one specific problem immediately.</p>

      <h2>Layer 2: The Entry Offer ($97–$497)</h2>
      <p>The entry offer converts skeptics into buyers. It should deliver a quick win — something the client can implement in 48 hours and see a result from. When someone pays you $197 and gets a result worth $2,000, they are psychologically primed to invest at the next level.</p>

      <h2>Layer 3: The Core Offer ($3K–$15K)</h2>
      <p>This is where your primary revenue lives. The core offer is your main coaching program, consulting package, or service. It should be outcome-specific ("go from $500K to $2M in 12 months"), time-bounded, and priced at a level that feels premium but justified given the transformation promised.</p>

      <h2>Layer 4: The Inner Circle ($25K–$100K+)</h2>
      <p>Reserved for your best clients who want more access, more accountability, and more speed. This could be a mastermind, a VIP day, or a done-with-you implementation program. Not everyone will buy here — but having this layer creates aspirational pull across your entire offer stack.</p>
    `,
    category: "Marketing",
    date: "2026-05-12",
    readTime: 9,
    author: "James Alcott",
    authorRole: "Founder, Apex Coaching",
    authorBio:
      "James Alcott is a 4x founder, WSJ bestselling author, and the creator of the Apex Method. He has coached over 2,000 entrepreneurs across 47 countries, generating $500M+ in verified client revenue.",
    coverGradient: "from-[#1e232c] via-[#171B22] to-[#0D1015]",
    tags: ["Offers", "Pricing", "Sales", "Marketing"] } };

const RELATED_POSTS = [
  {
    slug: "pricing-psychology-premium",
    title: "Pricing Psychology: Why Raising Your Prices Will Get You More Clients",
    category: "Marketing",
    readTime: 7,
    date: "2026-04-20" },
  {
    slug: "ceo-daily-operating-system",
    title: "The CEO Daily Operating System: How Elite Founders Manage Time at Scale",
    category: "Business",
    readTime: 10,
    date: "2026-04-14" },
  {
    slug: "content-flywheel-authority",
    title: "The Content Flywheel: How to Become the Most Trusted Voice in Your Niche",
    category: "Marketing",
    readTime: 9,
    date: "2026-03-24" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric" });
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params }: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return { title: "Article Not Found | Apex Coaching" };
  return {
    title: `${post.title} | Apex Coaching`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author] } };
}

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params }: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  return (
    <div className="bg-[#0D1015] text-[#F8F8F8] min-h-screen">

      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-0 overflow-hidden">
        {/* Cover image area */}
        <div
          className={`relative w-full h-[50vh] min-h-[320px] max-h-[520px] bg-gradient-to-br ${post.coverGradient} overflow-hidden`}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
          />
          {/* Noise */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]" aria-hidden="true">
            <filter id="noise-post">
              <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise-post)" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-20 h-20 text-[#D4AF37]/12" />
          </div>
          {/* Category badge */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2">
            <span
              className="inline-flex items-center text-xs font-semibold tracking-[0.18em] uppercase text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/25 rounded-full px-4 py-1.5"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {post.category}
            </span>
          </div>
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0D1015] to-transparent" />
        </div>

        {/* Title block */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8 -mt-8 relative z-10 pb-10">
          <h1
            className="font-black text-[#F8F8F8] leading-[1.05] mb-6"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-sm text-[#6b6b6b] pb-8 border-b border-[#2C2F36]"
            style={{ fontFamily: "Inter, sans-serif" }}>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime} min read
            </span>
            <span className="text-[#A8A8A8]">By <strong className="text-[#F8F8F8]">{post.author}</strong></span>
          </div>
        </div>
      </section>

      {/* ─── ARTICLE BODY ─────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Excerpt / lead */}
          <p
            className="text-[#F8F8F8] text-lg leading-relaxed mb-10 pb-10 border-b border-[#2C2F36] italic"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {post.excerpt}
          </p>

          {/* Article content */}
          <div
            className="prose-article"
            style={{ fontFamily: "Inter, sans-serif" }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 pt-10 border-t border-[#2C2F36]">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold text-[#A8A8A8] bg-[#171B22] border border-[#2C2F36] px-3 py-1 rounded-full"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AUTHOR BIO ───────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-5 bg-[#171B22] border border-[#D4AF37]/15 rounded-sm p-6">
            <div className="shrink-0 w-14 h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] font-black text-lg"
              style={{ fontFamily: "Montserrat, sans-serif" }}>
              JA
            </div>
            <div>
              <p className="text-[#F8F8F8] font-bold mb-0.5" style={{ fontFamily: "Montserrat, sans-serif" }}>
                {post.author}
              </p>
              <p className="text-[#D4AF37] text-xs font-semibold tracking-wider uppercase mb-3"
                style={{ fontFamily: "Poppins, sans-serif" }}>
                {post.authorRole}
              </p>
              <p className="text-[#A8A8A8] text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                {post.authorBio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-8 pb-24">
        <div className="max-w-3xl mx-auto">
          <div
            className="relative rounded-sm overflow-hidden p-10 text-center"
            style={{
              background: "linear-gradient(135deg, #1a1f28 0%, #171B22 100%)",
              border: "1px solid rgba(212,175,55,0.25)" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)" }}
            />
            <div className="relative">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-px w-8 bg-[#D4AF37]/50" />
                <span className="text-xs font-semibold tracking-[0.22em] uppercase text-[#D4AF37]"
                  style={{ fontFamily: "Poppins, sans-serif" }}>
                  Take the Next Step
                </span>
                <div className="h-px w-8 bg-[#D4AF37]/50" />
              </div>
              <h3
                className="font-black text-[#F8F8F8] mb-4 leading-[1.1]"
                style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
              >
                Ready to Apply These Insights?
              </h3>
              <p className="text-[#A8A8A8] leading-relaxed mb-8 max-w-md mx-auto"
                style={{ fontFamily: "Inter, sans-serif" }}>
                Book a free 45-minute strategy call and we'll map out the exact actions that will
                have the highest leverage in your business right now.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D4AF37] text-[#0D1015] font-bold text-sm tracking-wider uppercase rounded-sm hover:bg-[#e8c84a] transition-colors duration-200"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Book a Strategy Call <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#D4AF37]/40 text-[#D4AF37] font-semibold text-sm tracking-wider uppercase rounded-sm hover:bg-[#D4AF37]/08 transition-colors duration-200"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RELATED POSTS ────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-20 pb-32" style={{ backgroundColor: "#171B22" }}>
        <div className="max-w-7xl mx-auto py-20">
          <div className="flex items-center justify-between mb-10">
            <h2
              className="font-black text-[#F8F8F8]"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
            >
              Related <span style={{ color: "#D4AF37" }}>Articles</span>
            </h2>
            <Link
              href="/blog"
              className="flex items-center gap-2 text-[#D4AF37] text-sm font-semibold hover:gap-3 transition-all duration-200"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RELATED_POSTS.map((rp) => (
              <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                <div className="group border border-[#D4AF37]/12 bg-[#0D1015] rounded-sm p-6 hover:border-[#D4AF37]/35 hover:-translate-y-1 transition-all duration-400">
                  <span className="inline-flex items-center text-[10px] font-semibold tracking-[0.18em] uppercase text-[#D4AF37] bg-[#D4AF37]/08 border border-[#D4AF37]/18 rounded-full px-3 py-1 mb-4"
                    style={{ fontFamily: "Poppins, sans-serif" }}>
                    {rp.category}
                  </span>
                  <h3
                    className="font-bold text-[#F8F8F8] leading-[1.2] mb-4 group-hover:text-[#D4AF37] transition-colors duration-200 line-clamp-2"
                    style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1rem" }}
                  >
                    {rp.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[#6b6b6b]" style={{ fontFamily: "Inter, sans-serif" }}>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(rp.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {rp.readTime}m
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Inline prose styles */}
      <style>{`
        .prose-article h2 {
          font-family: Montserrat, sans-serif;
          font-weight: 800;
          font-size: clamp(1.3rem, 2.5vw, 1.75rem);
          color: #F8F8F8;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .prose-article p {
          color: #A8A8A8;
          font-size: 1.05rem;
          line-height: 1.8;
          margin-bottom: 1.25rem;
          max-width: 65ch;
        }
        .prose-article blockquote {
          border-left: 3px solid #D4AF37;
          padding: 1rem 1.5rem;
          margin: 2rem 0;
          background: rgba(212,175,55,0.04);
          border-radius: 0 4px 4px 0;
          font-style: italic;
          color: #F8F8F8;
          font-size: 1.1rem;
          line-height: 1.7;
        }
        .prose-article strong { color: #F8F8F8; }
        .prose-article a { color: #D4AF37; text-decoration: underline; text-decoration-color: rgba(212,175,55,0.35); }
        .prose-article ul { list-style: none; padding: 0; margin-bottom: 1.25rem; }
        .prose-article ul li { color: #A8A8A8; padding-left: 1.5rem; position: relative; margin-bottom: 0.5rem; }
        .prose-article ul li::before { content: "→"; position: absolute; left: 0; color: #D4AF37; }
      `}</style>
    </div>
  );
}
