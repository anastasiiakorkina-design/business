"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  Star,
  FileText,
  Briefcase,
  Video,
  Calendar,
  Mail,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Nav items ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { href: "/admin",             label: "Dashboard",    icon: LayoutDashboard, exact: true },
  { href: "/admin/leads",       label: "Leads",        icon: Users },
  { href: "/admin/testimonials",label: "Testimonials", icon: Star },
  { href: "/admin/blog",        label: "Blog",         icon: FileText },
  { href: "/admin/services",    label: "Services",     icon: Briefcase },
  { href: "/admin/videos",      label: "Videos",       icon: Video },
  { href: "/admin/bookings",    label: "Bookings",     icon: Calendar },
  { href: "/admin/newsletter",  label: "Newsletter",   icon: Mail },
  { href: "/admin/settings",    label: "Settings",     icon: Settings },
] as const;

// ─── Sidebar content ──────────────────────────────────────────────────────────

function SidebarContent({
  collapsed,
  mobile,
  onMobileClose,
  onCollapse,
}: {
  collapsed: boolean;
  mobile: boolean;
  onMobileClose: () => void;
  onCollapse: (v: boolean) => void;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href) && href !== "/admin";
  };

  return (
    <div className="flex h-full flex-col">
      {/* ── Logo ── */}
      <div
        className={cn(
          "flex items-center gap-3 border-b border-white/5 px-5 py-[18px]",
          collapsed && !mobile && "justify-center px-3"
        )}
      >
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.35)]">
          <span className="text-sm font-black tracking-wider text-[#0D1015]">A</span>
        </div>
        {(!collapsed || mobile) && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-black tracking-[0.2em] text-white">APEX</p>
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#D4AF37]/60">
              Admin Panel
            </p>
          </div>
        )}
        {mobile && (
          <button
            onClick={onMobileClose}
            className="ml-auto rounded p-1 text-white/40 transition-colors hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2.5 py-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon, ...rest }) => {
          const exact = 'exact' in rest ? rest.exact : undefined;
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              onClick={mobile ? onMobileClose : undefined}
              title={collapsed && !mobile ? label : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                active
                  ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                  : "text-white/50 hover:bg-white/[0.05] hover:text-white/90",
                collapsed && !mobile && "justify-center px-2.5"
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-[#D4AF37]" />
              )}
              <Icon
                size={17}
                className={cn(
                  "flex-shrink-0 transition-colors",
                  active ? "text-[#D4AF37]" : "text-white/35 group-hover:text-white/65"
                )}
              />
              {(!collapsed || mobile) && (
                <span className="truncate">{label}</span>
              )}
              {active && (!collapsed || mobile) && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── User / Logout ── */}
      <div className="border-t border-white/5 p-2.5">
        {(!collapsed || mobile) ? (
          <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2">
            <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-[#D4AF37]/20">
              {session?.user?.image ? (
                <Image src={session.user.image} alt="Avatar" fill className="object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-xs font-bold text-[#D4AF37]">
                  {session?.user?.name?.[0]?.toUpperCase() ?? "A"}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-white/85">
                {session?.user?.name ?? "Admin"}
              </p>
              <p className="truncate text-[10px] text-white/35">
                {session?.user?.email ?? "admin@apex.com"}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="rounded p-1 text-white/25 transition-colors hover:text-red-400"
              title="Sign out"
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex w-full items-center justify-center rounded-lg p-2.5 text-white/25 transition-colors hover:text-red-400"
            title="Sign out"
          >
            <LogOut size={15} />
          </button>
        )}

        {/* Collapse toggle — desktop only */}
        {!mobile && (
          <button
            onClick={() => onCollapse(!collapsed)}
            className="mt-1 flex w-full items-center justify-center rounded-lg p-2 text-white/15 transition-colors hover:bg-white/5 hover:text-white/45"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Sidebar shell ────────────────────────────────────────────────────────────

function Sidebar({
  collapsed,
  onCollapse,
  mobile,
  mobileOpen,
  onMobileClose,
}: {
  collapsed: boolean;
  onCollapse: (v: boolean) => void;
  mobile: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  return (
    <>
      {/* Desktop */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-[#171B22] border-r border-white/[0.06] transition-all duration-300 ease-in-out h-screen sticky top-0 z-20",
          collapsed ? "w-[60px]" : "w-[240px]"
        )}
      >
        <SidebarContent
          collapsed={collapsed}
          mobile={false}
          onMobileClose={onMobileClose}
          onCollapse={onCollapse}
        />
      </aside>

      {/* Mobile overlay + drawer */}
      {mobile && mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={onMobileClose}
          />
          <aside className="fixed left-0 top-0 z-50 flex h-full w-[265px] flex-col bg-[#171B22] border-r border-white/[0.06] shadow-2xl lg:hidden">
            <SidebarContent
              collapsed={false}
              mobile
              onMobileClose={onMobileClose}
              onCollapse={onCollapse}
            />
          </aside>
        </>
      )}
    </>
  );
}

// ─── Top bar ──────────────────────────────────────────────────────────────────

function Topbar({ onMobileMenuOpen }: { onMobileMenuOpen: () => void }) {
  const pathname = usePathname();

  const pageTitle = (() => {
    const segments = pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    if (!last || last === "admin") return "Dashboard";
    return last.charAt(0).toUpperCase() + last.slice(1);
  })();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-white/[0.06] bg-[#0D1015]/80 px-4 backdrop-blur-md">
      <button
        onClick={onMobileMenuOpen}
        className="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white lg:hidden"
      >
        <Menu size={19} />
      </button>

      <div className="flex items-center gap-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/25">
          Admin
        </span>
        <span className="text-white/15">/</span>
        <h1 className="text-sm font-semibold text-white/75">{pageTitle}</h1>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="relative rounded-lg p-1.5 text-white/35 transition-colors hover:bg-white/[0.06] hover:text-white">
          <Bell size={17} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
        </button>
      </div>
    </header>
  );
}

// ─── Inner layout (authenticated) ────────────────────────────────────────────

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0D1015] text-[#F8F8F8]">
      <Sidebar
        collapsed={collapsed}
        onCollapse={setCollapsed}
        mobile={isMobile}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMobileMenuOpen={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

import AdminProviders from "./providers";

function AdminLayoutAuthenticated({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [status, pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0D1015]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#D4AF37]" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return <AdminLayoutInner>{children}</AdminLayoutInner>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProviders>
      <AdminLayoutAuthenticated>{children}</AdminLayoutAuthenticated>
    </AdminProviders>
  );
}
