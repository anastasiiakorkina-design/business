/**
 * Prisma Seed — Entrepreneur Coaching
 * Run: npm run db:seed
 */

import { PrismaClient, Role, PostStatus, LeadStatus, BookingStatus, VideoPlatform, SubStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱  Starting database seed…");

  // ─── Admin User ──────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("Admin1234!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@entrepreneurcoaching.com" },
    update: {},
    create: {
      name: "Alex Monroe",
      email: "admin@entrepreneurcoaching.com",
      password: hashedPassword,
      role: Role.ADMIN,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    },
  });
  console.log("✅  Admin user:", admin.email);

  // ─── Categories ──────────────────────────────────────────────────────────
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "mindset" },
      update: {},
      create: {
        name: "Mindset",
        slug: "mindset",
        description: "Mental frameworks and psychological foundations for entrepreneurial success.",
        color: "#D4AF37",
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: "business-strategy" },
      update: {},
      create: {
        name: "Business Strategy",
        slug: "business-strategy",
        description: "Frameworks and tactics for building sustainable, scalable businesses.",
        color: "#7C3AED",
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: "sales-marketing" },
      update: {},
      create: {
        name: "Sales & Marketing",
        slug: "sales-marketing",
        description: "Proven systems for attracting clients and converting leads.",
        color: "#0EA5E9",
        sortOrder: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: "leadership" },
      update: {},
      create: {
        name: "Leadership",
        slug: "leadership",
        description: "Building high-performance teams and leading with vision.",
        color: "#10B981",
        sortOrder: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: "productivity" },
      update: {},
      create: {
        name: "Productivity",
        slug: "productivity",
        description: "Systems, habits, and routines that compound over time.",
        color: "#F59E0B",
        sortOrder: 5,
      },
    }),
    prisma.category.upsert({
      where: { slug: "finance" },
      update: {},
      create: {
        name: "Finance & Wealth",
        slug: "finance",
        description: "Cash flow mastery, investment strategy, and wealth building.",
        color: "#EF4444",
        sortOrder: 6,
      },
    }),
  ]);
  console.log("✅  Categories:", categories.length);

  // ─── Tags ─────────────────────────────────────────────────────────────────
  const tagData = [
    { name: "Entrepreneurship", slug: "entrepreneurship", color: "#D4AF37" },
    { name: "Scaling", slug: "scaling", color: "#7C3AED" },
    { name: "Revenue", slug: "revenue", color: "#10B981" },
    { name: "Mindset", slug: "mindset-tag", color: "#F59E0B" },
    { name: "Leadership", slug: "leadership-tag", color: "#0EA5E9" },
    { name: "Marketing", slug: "marketing", color: "#EC4899" },
    { name: "Sales", slug: "sales", color: "#EF4444" },
    { name: "Productivity", slug: "productivity-tag", color: "#8B5CF6" },
    { name: "Systems", slug: "systems", color: "#06B6D4" },
    { name: "Wealth", slug: "wealth", color: "#D97706" },
    { name: "Vision", slug: "vision", color: "#6366F1" },
    { name: "Habits", slug: "habits", color: "#059669" },
  ];

  const tags = await Promise.all(
    tagData.map((tag) =>
      prisma.tag.upsert({
        where: { slug: tag.slug },
        update: {},
        create: tag,
      })
    )
  );
  console.log("✅  Tags:", tags.length);

  // ─── Services ─────────────────────────────────────────────────────────────
  const services = await Promise.all([
    prisma.service.upsert({
      where: { slug: "strategy-session" },
      update: {},
      create: {
        name: "Strategy Intensive",
        slug: "strategy-session",
        description:
          "A deep-dive 90-minute private session where we dissect your business, identify the precise bottlenecks holding you back, and map out a clear 90-day action plan. You leave with total clarity, momentum, and a roadmap you can execute immediately.",
        shortDesc: "90-minute intensive to unblock your growth.",
        price: 997,
        priceLabel: "$997",
        features: [
          "90-minute 1:1 deep-dive session",
          "Pre-session business diagnostic questionnaire",
          "Custom 90-day action plan document",
          "Recording of the full session",
          "14-day follow-up email support",
          "Resource library access (90 days)",
        ],
        icon: "Zap",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop",
        active: true,
        featured: true,
        sortOrder: 1,
      },
    }),
    prisma.service.upsert({
      where: { slug: "90-day-accelerator" },
      update: {},
      create: {
        name: "90-Day Accelerator",
        slug: "90-day-accelerator",
        description:
          "Three months of focused, high-intensity coaching designed to break through the 7-figure ceiling. Weekly 1:1 calls, daily Voxer access, and a complete business transformation system covering mindset, sales, team, and operations. This is the fastest path from stuck to scaling.",
        shortDesc: "3 months of weekly 1:1 coaching + daily access.",
        price: 9997,
        priceLabel: "$9,997",
        features: [
          "12 weekly 1:1 coaching sessions (60 min each)",
          "Daily Voxer / voice message access",
          "Complete business audit + strategic roadmap",
          "Sales system installation and script review",
          "Team hiring and delegation frameworks",
          "Private dashboard with all tools & templates",
          "Access to all recorded masterclasses",
          "Monthly group Q&A with other clients",
          "Emergency SOS calls (up to 2)",
        ],
        icon: "TrendingUp",
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
        active: true,
        featured: true,
        sortOrder: 2,
      },
    }),
    prisma.service.upsert({
      where: { slug: "mastermind" },
      update: {},
      create: {
        name: "The Inner Circle Mastermind",
        slug: "mastermind",
        description:
          "An exclusive 12-month peer mastermind for 7-figure entrepreneurs ready to play at the highest level. Monthly live events, a curated community of non-competing peers, bi-weekly hot seats, and strategic introductions. Accepted by application only — this is for serious operators.",
        shortDesc: "12-month mastermind for 7-figure entrepreneurs.",
        price: 25000,
        priceLabel: "$25,000 / yr",
        features: [
          "Monthly 2-day live mastermind events (12 total)",
          "Bi-weekly group hot seat calls",
          "Private community platform (Slack + Portal)",
          "Strategic introductions and deal flow",
          "Annual VIP retreat (2 nights, fully hosted)",
          "1:1 quarterly private strategy sessions (4 total)",
          "Speaker fees & media opportunities",
          "Peer accountability pods (groups of 4)",
          "Lifetime alumni network access",
        ],
        icon: "Crown",
        imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop",
        active: true,
        featured: true,
        sortOrder: 3,
      },
    }),
    prisma.service.upsert({
      where: { slug: "vip-day" },
      update: {},
      create: {
        name: "VIP Day Experience",
        slug: "vip-day",
        description:
          "A full day (up to 8 hours) of exclusive 1:1 access — in person or virtual. We work through your most pressing challenges, build out key business assets together in real time, and install the systems you need to move fast. Includes meals, a strategy book, and 30-day follow-up.",
        shortDesc: "Full-day private intensive, in-person or virtual.",
        price: 4997,
        priceLabel: "$4,997",
        features: [
          "Up to 8 hours of 1:1 focused time",
          "In-person (travel to you) or virtual",
          "Pre-day questionnaire and preparation",
          "Live asset building during the day",
          "Custom strategy guide delivered within 48 hours",
          "30-day post-day email support",
          "All meals provided (in-person)",
          "Session recording and transcription",
        ],
        icon: "Star",
        imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
        active: true,
        featured: false,
        sortOrder: 4,
      },
    }),
  ]);
  console.log("✅  Services:", services.length);

  // ─── Testimonials ─────────────────────────────────────────────────────────
  const testimonials = await Promise.all([
    prisma.testimonial.create({
      data: {
        name: "Sarah Chen",
        title: "Founder & CEO",
        company: "Momentum Marketing Co.",
        content:
          "Working with Alex completely changed how I think about business. In 90 days, we went from $22k/month to $87k/month — without me burning out. The clarity I got in our Strategy Intensive alone was worth 10x the investment. If you're serious about growth, stop hesitating.",
        rating: 5,
        photoUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop",
        published: true,
        featured: true,
        sortOrder: 1,
      },
    }),
    prisma.testimonial.create({
      data: {
        name: "Marcus Williams",
        title: "Managing Director",
        company: "Apex Consulting Group",
        content:
          "I was stuck at $350k/year for three years. My second month with Alex I crossed $500k. By month six we had eclipsed my entire previous year's revenue. The 90-Day Accelerator is simply the best ROI decision I've made in my business career.",
        rating: 5,
        photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
        published: true,
        featured: true,
        sortOrder: 2,
      },
    }),
    prisma.testimonial.create({
      data: {
        name: "Priya Patel",
        title: "Co-Founder",
        company: "Bloom Studio",
        content:
          "I joined the Inner Circle skeptical — I'd been burned by masterminds before. What I found was a room full of people actually doing the work, plus Alex's ability to see your business more clearly than you can. We landed our first $500k contract from an introduction made at our third event.",
        rating: 5,
        photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop",
        published: true,
        featured: true,
        sortOrder: 3,
      },
    }),
    prisma.testimonial.create({
      data: {
        name: "James Okafor",
        title: "Serial Entrepreneur",
        company: "Okafor Ventures",
        content:
          "Three businesses, two exits, and I still got more from one VIP Day with Alex than from any other coaching experience. The frameworks are battle-tested, the execution plan was crystal clear, and the 30-day follow-up kept me accountable. Highly recommend.",
        rating: 5,
        photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
        published: true,
        featured: false,
        sortOrder: 4,
      },
    }),
    prisma.testimonial.create({
      data: {
        name: "Elena Torres",
        title: "Founder",
        company: "Torres Digital Agency",
        content:
          "Before the Accelerator, I was doing everything myself and making $18k/month. 90 days later I have a team of 6, a productized offer, and $74k in recurring monthly revenue. Alex didn't just coach me — he fundamentally rewired how I see my role as a CEO.",
        rating: 5,
        photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
        published: true,
        featured: true,
        sortOrder: 5,
      },
    }),
    prisma.testimonial.create({
      data: {
        name: "David Kim",
        title: "Founder & Head Coach",
        company: "Peak Performance Lab",
        content:
          "The Strategy Intensive paid for itself in the first week. Alex spotted a positioning problem in 20 minutes that I'd been blind to for two years. My close rate on sales calls jumped from 22% to 61% after implementing his framework. Genuinely astonishing.",
        rating: 5,
        photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
        published: true,
        featured: false,
        sortOrder: 6,
      },
    }),
  ]);
  console.log("✅  Testimonials:", testimonials.length);

  // ─── Blog Posts ───────────────────────────────────────────────────────────
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: "The 5 Mental Shifts That Separate 6-Figure from 7-Figure Entrepreneurs",
        slug: "5-mental-shifts-6-to-7-figure-entrepreneurs",
        excerpt:
          "The gap between $100k and $1M isn't about tactics — it's about the stories you tell yourself. Here are the five mindset upgrades that change everything.",
        content: `<h2>Introduction</h2>
<p>Every entrepreneur I've ever worked with who broke through to seven figures made the same observation afterward: "The business didn't change as much as I did."</p>
<p>That's not a motivational cliché. It's a pattern I've observed across dozens of transformations, and it's backed by the neuroscience of high performance. The strategies matter. The systems matter. But none of them work until the operator behind them upgrades their mental operating system.</p>
<p>Here are the five shifts that separate the top 1% from everyone else.</p>
<h2>Shift 1: From Technician to Architect</h2>
<p>Most entrepreneurs got into business because they were the best at something — writing, design, sales, fitness coaching, whatever. They built their first $100k by being excellent at that craft. Then they hit a ceiling, because excellence in your craft doesn't scale.</p>
<p>The shift is from being the best player on the field to being the best designer of the game itself. Your job is to build systems, not to be in them. This sounds simple. Most people nod along. Almost nobody actually does it.</p>
<h2>Shift 2: From Scarcity-Based Pricing to Value-Based Pricing</h2>
<p>Six-figure entrepreneurs price based on what the market will bear, what competitors charge, or — worst of all — what they feel comfortable charging. Seven-figure entrepreneurs price based on the transformation they deliver.</p>
<p>When Sarah in my program raised her premium offer from $5k to $15k, she expected to lose clients. Instead, she attracted higher-quality clients who got better results and gave her stronger testimonials. Her close rate increased because premium pricing signals premium outcomes.</p>
<h2>Shift 3: From Time-Trading to Leverage</h2>
<p>You cannot multiply time. You can only multiply impact per hour. The moment you accept this, you stop asking "how do I do more?" and start asking "how do I build systems that do this without me?"</p>
<p>This shift triggers real investment in hiring, automation, and infrastructure — which initially feels like spending money to make less. It's actually the most profitable thing you'll ever do.</p>
<h2>Shift 4: From Reactive to Proactive</h2>
<p>Six-figure operators manage their calendar. Seven-figure operators design their calendar. There's a massive difference. One is always responding to what's urgent. The other is always moving toward what's important.</p>
<p>Weekly planning rituals, daily deep work blocks, and ruthless prioritization frameworks are not productivity hacks — they're CEO competencies.</p>
<h2>Shift 5: From Solopreneur Identity to CEO Identity</h2>
<p>This is the deepest one. If you see yourself as a freelancer who got busy, you'll always feel more comfortable doing the work than leading the people who do the work. CEOs don't apologize for their margins, for their leadership, or for making hard calls.</p>
<p>Adopting the CEO identity before you feel qualified is how you accelerate the qualification process.</p>
<h2>The Integration</h2>
<p>None of these shifts happen in isolation, and none of them happen overnight. But every client who has broken through to seven figures can point to each of these five turning points in their journey.</p>
<p>The question isn't whether you'll need to make these shifts. You will. The question is whether you'll make them intentionally or by accident — and how long it'll take.</p>`,
        status: PostStatus.PUBLISHED,
        category: "mindset",
        tags: ["mindset", "scaling", "entrepreneurship", "leadership"],
        authorName: "Alex Monroe",
        authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
        readTime: 8,
        publishedAt: new Date("2024-10-15"),
        seoTitle: "5 Mental Shifts: 6-Figure to 7-Figure Entrepreneurs | Alex Monroe",
        seoDesc: "The gap between $100k and $1M is mental, not tactical. Here are the five mindset shifts that every 7-figure entrepreneur made first.",
        viewCount: 4821,
        coverImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=630&fit=crop",
      },
    }),
    prisma.blogPost.create({
      data: {
        title: "How to Build a Sales System That Works Without You",
        slug: "build-sales-system-without-you",
        excerpt:
          "Your business shouldn't stop growing when you stop selling. Here's the exact framework I use with clients to install a repeatable, scalable sales engine.",
        content: `<h2>The Problem with Personality-Dependent Sales</h2>
<p>If the only person who can close deals in your company is you, you don't have a business — you have a job with extra steps. This is the single biggest bottleneck I see in founder-led companies between $200k and $2M.</p>
<p>The solution isn't to clone yourself. It's to extract your sales methodology and install it into systems and people that can run without you in the room.</p>
<h2>Step 1: Document the Winning Conversation</h2>
<p>Before you can install a sales system, you need to know what's actually working. Record your next 20 sales calls. Transcribe them. Look for patterns: What questions do you ask? What objections come up? How do you handle them? What stories do you tell? What's the exact sequence of moves that leads to a yes?</p>
<p>This is your raw material. Most founders have never done this. Most founders are also the bottleneck in their own business.</p>
<h2>Step 2: Build the Discovery Framework</h2>
<p>Discovery is where deals are won or lost — not in the close. Your discovery framework should surface: the prospect's most painful problem, how long they've had it, what they've tried, what it's costing them, and what success looks like to them specifically.</p>
<p>This isn't a script. It's a map. The questions can vary. The destination — a fully qualified prospect who has articulated their own pain — must be consistent.</p>
<h2>Step 3: Install Your Offer Presentation Framework</h2>
<p>A great offer presentation doesn't just explain what you do — it mirrors the language the prospect just used in discovery. When they hear their own words reflected back in your solution, the cognitive dissonance that causes objections disappears.</p>
<p>This is the Empathy Bridge: transition from "here's what you told me" directly into "here's exactly how we solve that."</p>
<h2>Step 4: Build the Objection Protocol</h2>
<p>There are really only five objections in any B2B or coaching sale: price, time, trust, urgency, and authority. Every objection is a variant of one of these. Map your responses. Roleplay them. Make them automatic.</p>
<h2>Step 5: Hire and Train to the System</h2>
<p>Now you can hire. And you can train your hire to the documented system, not to your intuition. This is the difference between a salesperson who succeeds because they're talented and a sales process that works because it's designed.</p>
<p>The goal isn't a great sales rep. The goal is a repeatable process that a good sales rep can execute predictably.</p>`,
        status: PostStatus.PUBLISHED,
        category: "sales-marketing",
        tags: ["sales", "systems", "scaling", "revenue"],
        authorName: "Alex Monroe",
        authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
        readTime: 10,
        publishedAt: new Date("2024-11-02"),
        seoTitle: "Build a Sales System That Works Without You | Alex Monroe",
        seoDesc: "Stop being the bottleneck in your sales process. Here's the exact framework to build a repeatable sales engine that scales without you.",
        viewCount: 3210,
        coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop",
      },
    }),
    prisma.blogPost.create({
      data: {
        title: "The CEO Morning Routine That Drives 7-Figure Decisions",
        slug: "ceo-morning-routine-7-figure-decisions",
        excerpt:
          "How you start your morning determines the quality of every decision you make that day. Here's the exact routine I've refined over 7 years of high-performance coaching.",
        content: `<h2>Your Decisions Are Your Destiny</h2>
<p>CEOs make an average of 35,000 decisions per day. The quality of those decisions — especially the strategic ones in the first hour of your morning — determines the trajectory of your business over the next 12 months.</p>
<p>A bad morning routine doesn't just make you tired. It makes you reactive, short-sighted, and emotionally driven. A great morning routine installs clarity, intention, and strategic thinking before the world starts demanding things from you.</p>
<h2>Phase 1: Body Activation (30 minutes)</h2>
<p>Before any screen, any email, any input — move. Not because it's healthy (though it is), but because physical activation increases BDNF, dopamine, and norepinephrine — the exact neurochemicals that drive executive function and pattern recognition.</p>
<p>The format doesn't matter. Walk, lift, swim, do yoga. What matters is sustained elevation of heart rate for at least 20 minutes. Do this before you touch your phone.</p>
<h2>Phase 2: Solitude and Reflection (20 minutes)</h2>
<p>This is where most high-performers fall short. They optimize for input — podcasts, news, emails — when they should be optimizing for output: their own thoughts, uncontaminated by external noise.</p>
<p>Sit in silence. Write in a journal. Ask yourself: What matters most today? What am I avoiding? What decision have I been postponing that, if I made it, would change everything?</p>
<h2>Phase 3: Strategic Review (15 minutes)</h2>
<p>Look at your 90-day plan. Look at your weekly priorities. Confirm that what you're about to work on today is connected to what actually matters this quarter. Most people skip this and spend the day being busy instead of being effective.</p>
<h2>Phase 4: Most Important Work (90–120 minutes)</h2>
<p>Before any meeting, any message, any reactive task — do your most important creative or strategic work. This is your deep work block. It's protected. It's non-negotiable. It's also where the real value in your business gets created.</p>
<h2>The Non-Negotiable Rule</h2>
<p>No screens for the first 30 minutes. Every time you violate this, you've handed the agenda of your morning to someone else. This one rule, consistently applied, changes everything.</p>`,
        status: PostStatus.PUBLISHED,
        category: "productivity",
        tags: ["productivity", "habits", "mindset", "leadership"],
        authorName: "Alex Monroe",
        authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
        readTime: 7,
        publishedAt: new Date("2024-11-20"),
        seoTitle: "CEO Morning Routine That Drives 7-Figure Decisions | Alex Monroe",
        seoDesc: "The morning routine that separates reactive operators from strategic CEOs. Refined over 7 years of high-performance entrepreneurial coaching.",
        viewCount: 5104,
        coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop",
      },
    }),
    prisma.blogPost.create({
      data: {
        title: "Why Most Entrepreneurs Stay Stuck (And the One Thing That Changes It)",
        slug: "why-entrepreneurs-stay-stuck",
        excerpt:
          "After coaching hundreds of entrepreneurs, I can spot the pattern within 10 minutes. Here's the real reason growth stalls — and exactly what to do about it.",
        content: `<h2>The Invisible Ceiling</h2>
<p>I've worked with hundreds of entrepreneurs across dozens of industries. The number one thing they all have in common when they first come to me? They're working harder than ever and making less progress than they should be.</p>
<p>They've read the books. They've been to the conferences. They have the strategies. And yet — stuck.</p>
<p>The problem is almost never the strategy. It's almost always the story.</p>
<h2>The Story That's Keeping You Small</h2>
<p>Every entrepreneur who's stuck is operating from a limiting identity story. It's so familiar they don't even see it. It sounds like: "I can't charge more than X," or "I'm not good enough to work with that caliber of client," or "If I hire someone, they'll mess it up," or "I need to do everything myself to make sure it's done right."</p>
<p>These stories masquerade as practical constraints. They're not. They're psychological ceilings dressed up as reality.</p>
<h2>The One Thing That Changes It</h2>
<p>Evidence. Specifically — targeted, intentional collection of evidence that contradicts your limiting story.</p>
<p>When Marcus came to me stuck at $350k, his story was "my market won't pay premium prices." So the first thing we did was raise his prices — before anything else changed. He signed three clients at the higher price within 30 days. The story shattered.</p>
<p>The story doesn't die from argument. It dies from experience.</p>
<h2>How to Apply This Right Now</h2>
<p>Identify your constraint. Write it down as a belief statement: "I believe that ___." Now ask: what one small action, if I took it this week, would generate evidence that contradicts this belief?</p>
<p>Do that one thing. Collect the evidence. Let reality overwrite the story.</p>
<p>Repeat.</p>
<p>This is not complicated. It is hard. But it's the shortest path from stuck to scaling that I've ever found — and I've tried everything else first.</p>`,
        status: PostStatus.PUBLISHED,
        category: "mindset",
        tags: ["mindset", "entrepreneurship", "scaling"],
        authorName: "Alex Monroe",
        authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
        readTime: 6,
        publishedAt: new Date("2024-12-05"),
        seoTitle: "Why Entrepreneurs Stay Stuck (And What Changes It) | Alex Monroe",
        seoDesc: "The real reason growth stalls isn't strategy — it's the story you're telling yourself. Here's how to break through the invisible ceiling.",
        viewCount: 6792,
        coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop",
      },
    }),
  ]);
  console.log("✅  Blog posts:", blogPosts.length);

  // ─── Videos ───────────────────────────────────────────────────────────────
  const videos = await Promise.all([
    prisma.video.create({
      data: {
        title: "The 3 Systems Every 7-Figure Business Needs",
        slug: "3-systems-every-7-figure-business-needs",
        description:
          "In this masterclass, I break down the three core operating systems — client delivery, lead generation, and financial management — that every entrepreneur needs to install before hitting 7 figures.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnailUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=640&h=360&fit=crop",
        platform: VideoPlatform.YOUTUBE,
        duration: 2847,
        published: true,
        featured: true,
        sortOrder: 1,
        viewCount: 12400,
        tags: ["systems", "scaling", "business-strategy"],
        category: "business-strategy",
      },
    }),
    prisma.video.create({
      data: {
        title: "How to Price Your Offers for Premium Clients",
        slug: "how-to-price-offers-premium-clients",
        description:
          "Stop leaving money on the table. This training walks through the exact value-based pricing framework I've used with 200+ entrepreneurs to double and triple their effective hourly rate.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnailUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=640&h=360&fit=crop",
        platform: VideoPlatform.YOUTUBE,
        duration: 1923,
        published: true,
        featured: true,
        sortOrder: 2,
        viewCount: 9800,
        tags: ["sales", "revenue", "pricing"],
        category: "sales-marketing",
      },
    }),
    prisma.video.create({
      data: {
        title: "Building Your A-Team: Hire Slow, Fire Fast",
        slug: "building-your-a-team-hire-slow-fire-fast",
        description:
          "Your business can only grow as fast as your team. In this session, I share the exact hiring scorecard, interview process, and onboarding system I teach all my clients to build world-class teams.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnailUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=640&h=360&fit=crop",
        platform: VideoPlatform.YOUTUBE,
        duration: 3156,
        published: true,
        featured: false,
        sortOrder: 3,
        viewCount: 7320,
        tags: ["leadership", "systems", "scaling"],
        category: "leadership",
      },
    }),
  ]);
  console.log("✅  Videos:", videos.length);

  // ─── Sample Leads ─────────────────────────────────────────────────────────
  const leads = await Promise.all([
    prisma.lead.create({
      data: {
        name: "Jordan Blake",
        email: "jordan.blake@example.com",
        phone: "+1 (555) 234-5678",
        message: "I run a $180k/year consulting practice and I've been stuck at this level for 18 months. I'm interested in learning more about the 90-Day Accelerator.",
        source: "organic-search",
        status: LeadStatus.QUALIFIED,
        notes: "Strong candidate. Has clear pain point and budget. Follow up by Friday.",
      },
    }),
    prisma.lead.create({
      data: {
        name: "Megan Foster",
        email: "megan.foster@example.com",
        phone: "+1 (555) 345-6789",
        message: "I heard about you from Sarah Chen's podcast interview. I want to understand if the Mastermind is the right fit for me.",
        source: "podcast-referral",
        status: LeadStatus.CONTACTED,
      },
    }),
    prisma.lead.create({
      data: {
        name: "Ryan Ortiz",
        email: "ryan.ortiz@example.com",
        message: "Just downloaded the free guide. Interested in a strategy session.",
        source: "content-lead-magnet",
        status: LeadStatus.NEW,
      },
    }),
  ]);
  console.log("✅  Leads:", leads.length);

  // ─── Sample Bookings ──────────────────────────────────────────────────────
  const bookings = await Promise.all([
    prisma.booking.create({
      data: {
        name: "Jordan Blake",
        email: "jordan.blake@example.com",
        phone: "+1 (555) 234-5678",
        service: "strategy-session",
        message: "Looking forward to our call. I'll have my P&L and last 6 months of metrics ready.",
        preferredAt: new Date("2025-01-15T14:00:00Z"),
        status: BookingStatus.CONFIRMED,
      },
    }),
    prisma.booking.create({
      data: {
        name: "Amy Laurent",
        email: "amy.laurent@example.com",
        service: "vip-day",
        message: "Preferably a Thursday or Friday, either virtual or London in-person.",
        status: BookingStatus.PENDING,
      },
    }),
  ]);
  console.log("✅  Bookings:", bookings.length);

  // ─── Newsletter Subscribers ───────────────────────────────────────────────
  const subscribers = await Promise.all([
    prisma.newsletterSubscriber.create({
      data: {
        email: "subscriber1@example.com",
        name: "Chris Donovan",
        status: SubStatus.ACTIVE,
        source: "homepage-popup",
      },
    }),
    prisma.newsletterSubscriber.create({
      data: {
        email: "subscriber2@example.com",
        name: "Lisa Park",
        status: SubStatus.ACTIVE,
        source: "blog-inline",
      },
    }),
    prisma.newsletterSubscriber.create({
      data: {
        email: "subscriber3@example.com",
        name: "Tom Ashby",
        status: SubStatus.ACTIVE,
        source: "lead-magnet",
      },
    }),
  ]);
  console.log("✅  Newsletter subscribers:", subscribers.length);

  console.log("\n🎉  Seed complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌  Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
