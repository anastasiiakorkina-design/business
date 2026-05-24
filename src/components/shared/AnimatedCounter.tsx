"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

type FormatMode = "number" | "currency" | "compact" | "percent" | "custom";

interface AnimatedCounterProps {
  /** Final value to count to */
  to: number;
  /** Starting value (default 0) */
  from?: number;
  /** Animation duration in ms (default 2000) */
  duration?: number;
  /** How to format the number */
  format?: FormatMode;
  /** Currency code when format="currency" (default "USD") */
  currency?: string;
  /** Decimal places for compact mode (default 1) */
  decimals?: number;
  /** Prefix string (e.g. "$") */
  prefix?: string;
  /** Suffix string (e.g. "%", "K+") */
  suffix?: string;
  /** Custom formatter — overrides format prop */
  formatter?: (value: number) => string;
  /** Extra classes on the root span */
  className?: string;
  /** Trigger once or every time it enters view */
  once?: boolean;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function formatValue(
  value: number,
  format: FormatMode,
  currency: string,
  decimals: number,
  prefix: string,
  suffix: string,
  formatter?: (v: number) => string
): string {
  if (formatter) return formatter(value);

  let formatted: string;

  switch (format) {
    case "currency":
      formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        notation: value >= 1_000_000 ? "compact" : "standard",
        compactDisplay: "short",
      }).format(value);
      return formatted + suffix;

    case "compact": {
      if (value >= 1_000_000_000) {
        formatted = (value / 1_000_000_000).toFixed(decimals) + "B";
      } else if (value >= 1_000_000) {
        formatted = (value / 1_000_000).toFixed(decimals) + "M";
      } else if (value >= 1_000) {
        formatted = (value / 1_000).toFixed(decimals) + "K";
      } else {
        formatted = value.toFixed(0);
      }
      return prefix + formatted + suffix;
    }

    case "percent":
      return prefix + value.toFixed(decimals) + "%" + suffix;

    case "number":
    default:
      return (
        prefix +
        new Intl.NumberFormat("en-US").format(
          parseFloat(value.toFixed(decimals))
        ) +
        suffix
      );
  }
}

export default function AnimatedCounter({
  to,
  from = 0,
  duration = 2000,
  format = "number",
  currency = "USD",
  decimals = 1,
  prefix = "",
  suffix = "",
  formatter,
  className,
  once = true,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(
    formatValue(from, format, currency, decimals, prefix, suffix, formatter)
  );
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const hasAnimated = useRef(false);

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: once,
  });

  useEffect(() => {
    if (!inView) return;
    if (once && hasAnimated.current) return;
    hasAnimated.current = true;

    cancelAnimationFrame(rafRef.current);
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const current = from + (to - from) * eased;

      setDisplay(
        formatValue(current, format, currency, decimals, prefix, suffix, formatter)
      );

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplay(
          formatValue(to, format, currency, decimals, prefix, suffix, formatter)
        );
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, to, from, duration, format, currency, decimals, prefix, suffix, formatter, once]);

  return (
    <span
      ref={ref}
      className={cn(
        "tabular-nums font-heading font-bold",
        className
      )}
      aria-live="polite"
      aria-label={`${display}`}
    >
      {display}
    </span>
  );
}
