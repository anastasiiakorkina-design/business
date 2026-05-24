"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: "button" | "div" | "span";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
}

const SPRING_CONFIG = { stiffness: 260, damping: 22, mass: 0.6 };

export default function MagneticButton({
  children,
  className,
  strength = 0.38,
  radius = 90,
  as: Tag = "button",
  onClick,
  type = "button",
  disabled = false,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  // Subtle scale: 1 at rest, 1.04 at peak pull
  const scale = useTransform(
    [x, y],
    ([lx, ly]: number[]) => {
      const dist = Math.hypot(lx, ly);
      return 1 + (dist / 40) * 0.04;
    }
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (disabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        rawX.set(dx * strength);
        rawY.set(dy * strength);
        setActive(true);
      }
    },
    [disabled, radius, strength, rawX, rawY]
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    setActive(false);
  }, [rawX, rawY]);

  const sharedClassName = cn(
    "relative inline-flex items-center justify-center select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60",
    "disabled:pointer-events-none disabled:opacity-50",
    className
  );

  if (Tag === "button") {
    return (
      <motion.button
        ref={ref as React.RefObject<HTMLButtonElement>}
        className={sharedClassName}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        aria-label={ariaLabel}
        style={{ x, y, scale }}
        type={type}
        disabled={disabled}
        data-magnetic={active ? "active" : "idle"}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={sharedClassName}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      aria-label={ariaLabel}
      style={{ x, y, scale }}
      role="button"
      tabIndex={disabled ? -1 : 0}
      data-magnetic={active ? "active" : "idle"}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onClick) onClick();
      }}
    >
      {children}
    </motion.div>
  );
}
