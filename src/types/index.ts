/**
 * Entrepreneur Coaching — TypeScript Types
 * Central type definitions aligned with Prisma schema and application models.
 */

// ─── Enums (mirrored from Prisma) ─────────────────────────────────────────────

export type Role = "USER" | "ADMIN";

export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "CONVERTED" | "DISQUALIFIED";

export type SubStatus = "ACTIVE" | "UNSUBSCRIBED" | "BOUNCED";

export type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export type VideoPlatform = "YOUTUBE" | "VIMEO" | "WISTIA" | "CLOUDINARY" | "SELF_HOSTED";

// ─── Core Entity Types ────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password?: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string | null;
  company: string | null;
  content: string;
  rating: number;
  photoUrl: string | null;
  videoUrl: string | null;
  published: boolean;
  featured: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: string | null;
  status: LeadStatus;
  notes: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string | null;
  status: SubStatus;
  source: string | null;
  mailchimpId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  status: PostStatus;
  category: string | null;
  tags: string[];
  authorName: string | null;
  authorImage: string | null;
  readTime: number | null;
  publishedAt: Date | null;
  seoTitle: string | null;
  seoDesc: string | null;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string | null;
  price: number | null;
  priceLabel: string | null;
  features: string[];
  icon: string | null;
  imageUrl: string | null;
  active: boolean;
  featured: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Video {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  videoUrl: string;
  thumbnailUrl: string | null;
  platform: VideoPlatform;
  duration: number | null;       // seconds
  published: boolean;
  featured: boolean;
  sortOrder: number;
  viewCount: number;
  tags: string[];
  category: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string | null;
  preferredAt: Date | null;
  status: BookingStatus;
  notes: string | null;
  ipAddress: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  color: string | null;
  sortOrder: number;
  parentId: string | null;
  parent?: Category | null;
  children?: Category[];
  createdAt: Date;
  updatedAt: Date;
}

// ─── Partial / Summary Views ──────────────────────────────────────────────────
// Lighter types for list views and cards

export type BlogPostSummary = Pick<
  BlogPost,
  | "id"
  | "title"
  | "slug"
  | "excerpt"
  | "coverImage"
  | "category"
  | "tags"
  | "readTime"
  | "publishedAt"
  | "viewCount"
  | "authorName"
  | "authorImage"
>;

export type ServiceSummary = Pick<
  Service,
  "id" | "name" | "slug" | "shortDesc" | "price" | "priceLabel" | "icon" | "imageUrl" | "featured"
>;

export type TestimonialSummary = Pick<
  Testimonial,
  "id" | "name" | "title" | "company" | "content" | "rating" | "photoUrl" | "featured"
>;

export type VideoSummary = Pick<
  Video,
  "id" | "title" | "slug" | "thumbnailUrl" | "duration" | "platform" | "viewCount" | "category"
>;

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginationParams {
  page?: number;
  perPage?: number;
  sort?: string;
  order?: "asc" | "desc";
  search?: string;
}

// ─── Form Types ───────────────────────────────────────────────────────────────

export interface ContactFormValues {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source?: string;
}

export interface BookingFormValues {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  preferredDate?: string;
  preferredTime?: string;
}

export interface NewsletterFormValues {
  email: string;
  name?: string;
}

export interface LeadFormValues {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source?: string;
}

// ─── Navigation Types ─────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  badge?: string;
  external?: boolean;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ─── Component Prop Types ─────────────────────────────────────────────────────

export interface SectionHeaderProps {
  overline?: string;
  heading: string;
  subheading?: string;
  centered?: boolean;
  className?: string;
  overlineClassName?: string;
  headingClassName?: string;
  subheadingClassName?: string;
  as?: "h1" | "h2" | "h3";
}

export interface TestimonialCardProps {
  testimonial: TestimonialSummary;
  variant?: "default" | "featured" | "minimal" | "video";
  className?: string;
}

export interface ServiceCardProps {
  service: ServiceSummary | Service;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

export interface BlogCardProps {
  post: BlogPostSummary;
  variant?: "default" | "featured" | "minimal" | "horizontal";
  className?: string;
}

export interface VideoCardProps {
  video: VideoSummary;
  variant?: "default" | "featured";
  className?: string;
  autoPlay?: boolean;
}

// ─── Stats / Metrics ──────────────────────────────────────────────────────────

export interface StatItem {
  value: string | number;
  label: string;
  prefix?: string;
  suffix?: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface MetricItem {
  label: string;
  value: number;
  previousValue?: number;
  format?: "number" | "currency" | "percent";
  trend?: "up" | "down" | "neutral";
}

// ─── Animation Types ──────────────────────────────────────────────────────────

export type AnimationVariant =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "slideInLeft"
  | "slideInRight"
  | "scaleIn"
  | "stagger";

export interface AnimationConfig {
  variant: AnimationVariant;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  once?: boolean;
}

// ─── SEO / Meta ───────────────────────────────────────────────────────────────

export interface PageMeta {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  noIndex?: boolean;
}

export interface OpenGraphMeta {
  title: string;
  description: string;
  url: string;
  image: string;
  type: string;
  siteName?: string;
  locale?: string;
}

// ─── Email Types ──────────────────────────────────────────────────────────────

export interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}

export interface EmailAttachment {
  filename: string;
  content: string | Buffer;
  contentType?: string;
}

// ─── Feature Flags ────────────────────────────────────────────────────────────

export interface FeatureFlags {
  blog: boolean;
  booking: boolean;
  community: boolean;
  shop: boolean;
  chat: boolean;
  maintenanceMode: boolean;
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  convertedLeads: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  totalSubscribers: number;
  activeSubscribers: number;
  totalBlogPosts: number;
  publishedBlogPosts: number;
  totalRevenue?: number;
}

export interface AdminTableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
}

// ─── Utility Types ────────────────────────────────────────────────────────────

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  { [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>> }[Keys];

export type StringRecord = Record<string, string>;
export type NumberRecord = Record<string, number>;
export type AnyRecord = Record<string, unknown>;

// ─── Next.js / React ──────────────────────────────────────────────────────────

export interface PageProps {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export interface LayoutProps {
  children: React.ReactNode;
  params?: Promise<Record<string, string>>;
}

export type ServerActionResult<T = void> = Promise<
  | { success: true; data?: T; message?: string }
  | { success: false; error: string; errors?: Record<string, string[]> }
>;
