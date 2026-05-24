import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ─── Class Name Utility ─────────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Date & Time ────────────────────────────────────────────────────────────

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  }).format(new Date(date));
}

export function formatDateLong(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatRelativeTime(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffWeek < 4) return `${diffWeek}w ago`;
  if (diffMonth < 12) return `${diffMonth}mo ago`;
  return `${diffYear}y ago`;
}

export function formatReadTime(minutes: number): string {
  return `${minutes} min read`;
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}

// ─── Currency & Numbers ─────────────────────────────────────────────────────

export function formatCurrency(amount: number, currency = "USD", compact = false): string {
  if (compact && amount >= 1000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(amount);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(n: number, compact = false): string {
  if (compact && n >= 1000) {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(n);
  }
  return new Intl.NumberFormat("en-US").format(n);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

// ─── Strings ────────────────────────────────────────────────────────────────

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateExcerpt(content: string, maxLength = 160): string {
  const plain = content
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= maxLength) return plain;
  return plain.slice(0, maxLength).replace(/\s+\S*$/, "") + "…";
}

export function truncate(text: string, maxLength: number, suffix = "…"): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + suffix;
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function titleCase(text: string): string {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}

export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}

// ─── Validation ─────────────────────────────────────────────────────────────

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidPhone(phone: string): boolean {
  return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(
    phone.replace(/\s/g, "")
  );
}

// ─── Pagination ─────────────────────────────────────────────────────────────

export function paginate(page: number, perPage: number) {
  const p = Math.max(1, page);
  const pp = Math.min(100, Math.max(1, perPage));
  return {
    skip: (p - 1) * pp,
    take: pp,
    page: p,
    perPage: pp,
  };
}

export function paginationMeta(total: number, page: number, perPage: number) {
  const totalPages = Math.ceil(total / perPage);
  return {
    total,
    page,
    perPage,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

// ─── URL & Query ─────────────────────────────────────────────────────────────

export function buildUrl(base: string, params: Record<string, string | number | boolean | undefined>): string {
  const url = new URL(base, "https://placeholder.com");
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });
  return url.search ? `${base}${url.search}` : base;
}

export function getBaseUrl(): string {
  if (typeof window !== "undefined") return "";
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

// ─── Arrays & Objects ───────────────────────────────────────────────────────

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (acc, item) => {
      const group = String(item[key]);
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}

export function unique<T>(array: T[], key?: keyof T): T[] {
  if (!key) return [...new Set(array)];
  const seen = new Set();
  return array.filter((item) => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
}

export function sortBy<T>(array: T[], key: keyof T, direction: "asc" | "desc" = "asc"): T[] {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

export function chunk<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
}

export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce(
    (acc, key) => ({ ...acc, [key]: obj[key] }),
    {} as Pick<T, K>
  );
}

// ─── Async ──────────────────────────────────────────────────────────────────

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function retry<T>(
  fn: () => Promise<T>,
  attempts = 3,
  delayMs = 300
): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < attempts - 1) await sleep(delayMs * Math.pow(2, i));
    }
  }
  throw lastError;
}

// ─── DOM / React ─────────────────────────────────────────────────────────────

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function isReducedMotion(): boolean {
  if (!isBrowser()) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToTop(behavior: ScrollBehavior = "smooth"): void {
  if (isBrowser()) window.scrollTo({ top: 0, behavior });
}

export function scrollToElement(id: string, offset = 80): void {
  if (!isBrowser()) return;
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) return navigator.clipboard.writeText(text);
  const el = document.createElement("textarea");
  el.value = text;
  el.style.position = "fixed";
  el.style.opacity = "0";
  document.body.appendChild(el);
  el.focus();
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  return Promise.resolve();
}

// ─── SEO / Meta ──────────────────────────────────────────────────────────────

export function buildMetaTitle(pageTitle: string, siteName?: string): string {
  const site = siteName ?? process.env.NEXT_PUBLIC_SITE_NAME ?? "Entrepreneur Coaching";
  if (!pageTitle) return site;
  return `${pageTitle} | ${site}`;
}

export function buildMetaDescription(description: string, maxLength = 160): string {
  return truncate(description, maxLength);
}

// ─── Color ───────────────────────────────────────────────────────────────────

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function hexToRgba(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

// ─── Environment ─────────────────────────────────────────────────────────────

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function isProd(): boolean {
  return process.env.NODE_ENV === "production";
}

export function isTest(): boolean {
  return process.env.NODE_ENV === "test";
}

// ─── Random / ID ─────────────────────────────────────────────────────────────

export function generateId(prefix?: string): string {
  const rand = Math.random().toString(36).substring(2, 10);
  const ts = Date.now().toString(36);
  return prefix ? `${prefix}_${ts}${rand}` : `${ts}${rand}`;
}

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomItem<T>(array: T[]): T {
  return array[randomBetween(0, array.length - 1)];
}
