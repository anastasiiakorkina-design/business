# APEX Coaching — Elite Entrepreneur Coaching Website

A premium, production-ready fullstack entrepreneur coaching website built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and PostgreSQL.

> **Design Philosophy:** Dark cinematic UI • Gold accents • Luxury minimal aesthetic • Conversion-focused architecture

**Design System tokens:**
- Background `#0D1015` · Gold `#D4AF37` · White `#F8F8F8` · Grey `#A8A8A8`
- Headings: Montserrat Bold · Body: Inter · CTAs: Poppins SemiBold

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS |
| Animations | Framer Motion, GSAP |
| UI Components | Radix UI, Shadcn/ui |
| Icons | Lucide React |
| Database | PostgreSQL + Prisma ORM |
| Authentication | NextAuth v5 (Credentials) |
| Payments | Stripe |
| Email | Nodemailer |
| Analytics | Vercel Analytics |
| Deployment | Vercel (frontend) + Railway/Supabase (DB) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (pages)/          # Public pages
│   │   ├── about/
│   │   ├── blog/
│   │   ├── book/
│   │   ├── community/
│   │   ├── content/
│   │   ├── services/
│   │   └── success-stories/
│   ├── admin/            # Admin dashboard
│   │   ├── blog/
│   │   ├── bookings/
│   │   ├── leads/
│   │   ├── newsletter/
│   │   ├── services/
│   │   ├── settings/
│   │   ├── testimonials/
│   │   └── videos/
│   └── api/              # API routes
│       ├── auth/
│       ├── blog/
│       ├── bookings/
│       ├── contact/
│       ├── leads/
│       ├── newsletter/
│       ├── services/
│       ├── testimonials/
│       └── videos/
├── components/
│   ├── layout/           # Navbar, Footer, CustomCursor
│   ├── sections/         # Page sections (Hero, Services, etc.)
│   ├── shared/           # Reusable components
│   └── ui/               # Base UI components (Button, Card, etc.)
├── lib/                  # Utilities (prisma, auth, stripe, utils)
└── types/                # TypeScript type definitions
prisma/
├── schema.prisma         # Database schema
└── seed.ts               # Seed data
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- PostgreSQL database (local or hosted)
- npm or yarn

### 1. Clone & Install

```bash
git clone <your-repo>
cd entrepreneur-coaching
npm install
```

### 2. Configure Environment

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/apex_coaching"

# NextAuth
NEXTAUTH_SECRET="your-secret-here"         # openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your@email.com"
SMTP_PASS="your-app-password"
EMAIL_FROM="APEX Coaching <hello@apexcoaching.com>"

# Optional: Mailchimp
MAILCHIMP_API_KEY=""
MAILCHIMP_AUDIENCE_ID=""
MAILCHIMP_SERVER_PREFIX=""
```

### 3. Database Setup

```bash
# Push schema to database
npm run db:push

# Generate Prisma client
npm run db:generate

# Seed with sample data
npm run db:seed
```

### 4. Create Admin User

After seeding, an admin user is created with:
- **Email:** `admin@apexcoaching.com`  
- **Password:** `Admin@123456`  

⚠️ **Change this immediately in production!**

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🗄️ Database Models

| Model | Description |
|-------|-------------|
| `User` | Admin users with role-based access |
| `Lead` | Prospect leads from contact/booking forms |
| `Booking` | Strategy call booking requests |
| `Testimonial` | Client testimonials with rich metadata |
| `BlogPost` | Blog articles with SEO fields |
| `Service` | Coaching offers and programs |
| `Video` | Video content library |
| `NewsletterSubscriber` | Email list subscribers |

---

## 🌐 Pages

| Route | Description |
|-------|-------------|
| `/` | Home page (Hero → Social Proof → About → Services → Success Stories → Content → Community → Booking) |
| `/about` | Full founder story with timeline |
| `/services` | All coaching programs with pricing |
| `/services/[slug]` | Individual service detail page |
| `/success-stories` | Client case studies and testimonials |
| `/content` | YouTube, podcast, and blog content hub |
| `/blog` | Blog listing |
| `/blog/[slug]` | Individual blog post |
| `/book` | Multi-step strategy call application |
| `/community` | Community/lead magnet page |
| `/admin` | Admin dashboard |

---

## 🔌 Integrations

### Calendly
Set `NEXT_PUBLIC_CALENDLY_URL` in your env. The booking section embeds your Calendly widget.

### Stripe
Configure price IDs in `.env.local`:
```env
STRIPE_PRICE_STRATEGY_SESSION="price_..."
STRIPE_PRICE_90_DAY_ACCELERATOR="price_..."
STRIPE_PRICE_MASTERMIND="price_..."
```

### Mailchimp
Set your API key, audience ID, and server prefix for automatic newsletter list sync.

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Add all environment variables in your Vercel dashboard under **Settings → Environment Variables**.

### Database (Railway / Supabase)

1. Create a PostgreSQL database on [Railway](https://railway.app) or [Supabase](https://supabase.com)
2. Copy the connection string to `DATABASE_URL`
3. Run `npm run db:push` to push the schema

---

## 📊 Admin Dashboard

Access at `/admin/login`

Features:
- 📋 **Leads** — View and manage prospect inquiries
- ✅ **Testimonials** — Add/edit/publish client testimonials  
- 📝 **Blog** — Create, edit, and publish blog posts
- 💼 **Services** — Manage coaching offers
- 🎥 **Videos** — Content library management
- 📅 **Bookings** — Strategy call application management
- 📧 **Newsletter** — Subscriber list management
- ⚙️ **Settings** — Site-wide configuration

---

## 🎨 Design System

```
Colors:
  Background:  #0D1015  (Midnight Black)
  Surface:     #171B22  (Dark Graphite)
  Gold:        #D4AF37  (Luxury Gold)
  White:       #F8F8F8  (Soft White)
  Grey:        #A8A8A8  (Muted Silver)

Typography:
  Headings:    Montserrat Bold
  Body:        Inter Regular
  CTAs:        Poppins SemiBold
```

---

## 📄 License

Private — All rights reserved.

Built for elite entrepreneur coaching brands.
