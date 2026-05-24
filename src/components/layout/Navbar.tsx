"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Content", href: "/content" },
  { label: "Community", href: "/community" },
] as const;

const MOBILE_VARIANTS = {
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};

const ITEM_VARIANTS = {
  closed: { x: -12, opacity: 0 },
  open: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: i * 0.055, duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #D4AF37 0%, #F0D060 100%)",
        }}
      />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#0D1015]/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(212,175,55,0.12)]"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0.5 group">
            <span
              className="font-montserrat font-bold text-2xl tracking-[0.12em] text-[#F8F8F8] uppercase"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              APEX
            </span>
            <span
              className="block w-[6px] h-[6px] rounded-full bg-[#D4AF37] mb-[14px] ml-[2px]
                         group-hover:scale-150 transition-transform duration-300"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "relative font-inter text-sm tracking-wide transition-colors duration-200",
                      "after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-full",
                      "after:origin-left after:scale-x-0 after:transition-transform after:duration-300",
                      "after:bg-[#D4AF37] hover:after:scale-x-100",
                      active
                        ? "text-[#D4AF37] after:scale-x-100"
                        : "text-[#A8A8A8] hover:text-[#F8F8F8]"
                    )}
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/book"
              className={cn(
                "hidden lg:inline-flex items-center px-5 py-2.5 rounded-sm",
                "border border-[#D4AF37] text-[#D4AF37] font-poppins font-semibold text-sm tracking-wide",
                "relative overflow-hidden transition-colors duration-300",
                "before:absolute before:inset-0 before:bg-[#D4AF37] before:origin-left before:scale-x-0",
                "before:transition-transform before:duration-300 hover:before:scale-x-100",
                "hover:text-[#0D1015]"
              )}
              style={{ fontFamily: "var(--font-poppins), sans-serif" }}
            >
              <span className="relative z-10">Book Strategy Call</span>
            </Link>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center text-[#F8F8F8]
                         hover:text-[#D4AF37] transition-colors duration-200"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} strokeWidth={1.75} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} strokeWidth={1.75} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              variants={MOBILE_VARIANTS}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden overflow-hidden bg-[#0D1015]/98 backdrop-blur-md
                         border-t border-[#D4AF37]/15"
            >
              <ul className="px-6 pt-4 pb-6 flex flex-col gap-1">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.li
                    key={href}
                    custom={i}
                    variants={ITEM_VARIANTS}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link
                      href={href}
                      className={cn(
                        "block py-3 text-base font-inter tracking-wide border-b border-white/5",
                        "transition-colors duration-200",
                        pathname === href
                          ? "text-[#D4AF37]"
                          : "text-[#A8A8A8] hover:text-[#F8F8F8]"
                      )}
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}

                <motion.li
                  custom={NAV_LINKS.length}
                  variants={ITEM_VARIANTS}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="pt-4"
                >
                  <Link
                    href="/book"
                    className="block w-full text-center py-3.5 border border-[#D4AF37]
                               text-[#D4AF37] font-poppins font-semibold text-sm tracking-wide
                               rounded-sm hover:bg-[#D4AF37] hover:text-[#0D1015] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                  >
                    Book Strategy Call
                  </Link>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
