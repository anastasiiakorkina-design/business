"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface CTAProps {
  label: string;
  href?: string;
  onClick?: () => void;
  /** Render as solid gold fill vs. outline (default: outline) */
  variant?: "outline" | "solid";
}

interface SectionHeaderProps {
  /** Small uppercase overline in gold, e.g. "THE RESULTS" */
  overline?: string;
  /** Main heading */
  heading: string;
  /** Optional body copy below heading */
  body?: string;
  /** Optional CTA */
  cta?: CTAProps;
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Extra class on the root element */
  className?: string;
  /** Animate in from below on enter (default true) */
  animate?: boolean;
  /** Max width for body copy */
  bodyMaxWidth?: string;
  /** Override heading size class */
  headingSize?: string;
}

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SectionHeader({
  overline,
  heading,
  body,
  cta,
  align = "center",
  className,
  animate = true,
  bodyMaxWidth = "max-w-[56ch]",
  headingSize = "text-4xl lg:text-5xl",
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const alignClass =
    align === "center"
      ? "items-center text-center"
      : align === "right"
      ? "items-end text-right"
      : "items-start text-left";

  const content = (
    <div
      ref={ref}
      className={cn("flex flex-col gap-4", alignClass, className)}
    >
      {overline && (
        <motion.span
          variants={animate ? CHILD_VARIANTS : undefined}
          className="inline-block text-[11px] tracking-[0.22em] uppercase font-semibold text-[#D4AF37]"
          style={{ fontFamily: "var(--font-poppins), sans-serif" }}
        >
          {overline}
        </motion.span>
      )}

      <motion.h2
        variants={animate ? CHILD_VARIANTS : undefined}
        className={cn(
          "font-heading font-bold text-[#F8F8F8] leading-tight",
          headingSize
        )}
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        {heading}
      </motion.h2>

      {body && (
        <motion.p
          variants={animate ? CHILD_VARIANTS : undefined}
          className={cn(
            "text-[#A8A8A8] text-base lg:text-lg leading-relaxed",
            bodyMaxWidth,
            align === "center" && "mx-auto"
          )}
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          {body}
        </motion.p>
      )}

      {cta && (
        <motion.div
          variants={animate ? CHILD_VARIANTS : undefined}
          className="pt-2"
        >
          {cta.href ? (
            <Link
              href={cta.href}
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3 rounded-sm text-sm font-semibold tracking-wide transition-all duration-300",
                cta.variant === "solid"
                  ? "bg-[#D4AF37] text-[#0D1015] hover:bg-[#e8c84a]"
                  : "border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0D1015]"
              )}
              style={{ fontFamily: "var(--font-poppins), sans-serif" }}
            >
              {cta.label}
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <button
              onClick={cta.onClick}
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3 rounded-sm text-sm font-semibold tracking-wide transition-all duration-300",
                cta.variant === "solid"
                  ? "bg-[#D4AF37] text-[#0D1015] hover:bg-[#e8c84a]"
                  : "border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0D1015]"
              )}
              style={{ fontFamily: "var(--font-poppins), sans-serif" }}
            >
              {cta.label}
              <ArrowRight size={15} />
            </button>
          )}
        </motion.div>
      )}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="w-full"
    >
      {content}
    </motion.div>
  );
}
