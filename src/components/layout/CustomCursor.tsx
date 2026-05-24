"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "text" | "link";

const SPRING_DOT = { stiffness: 800, damping: 40, mass: 0.3 };
const SPRING_RING = { stiffness: 120, damping: 18, mass: 0.8 };

const MAGNETIC_RADIUS = 72; // px — how close the cursor must be to trigger pull

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function CustomCursor() {
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  // Raw mouse position
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Dot follows immediately
  const dotX = useSpring(mouseX, SPRING_DOT);
  const dotY = useSpring(mouseY, SPRING_DOT);

  // Ring lags behind
  const ringX = useSpring(mouseX, SPRING_RING);
  const ringY = useSpring(mouseY, SPRING_RING);

  const rawPos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    // Hide default cursor globally
    document.documentElement.classList.add("custom-cursor-active");

    const style = document.createElement("style");
    style.id = "custom-cursor-style";
    style.textContent = `.custom-cursor-active, .custom-cursor-active * { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      document.getElementById("custom-cursor-style")?.remove();
    };
  }, []);

  useEffect(() => {
    const MAGNETIC_SELECTORS = 'a[href], button, [role="button"], input, textarea, select';

    const onMouseMove = (e: MouseEvent) => {
      rawPos.current = { x: e.clientX, y: e.clientY };

      // Magnetic pull: find nearest button/link
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>(MAGNETIC_SELECTORS)
      );
      let pulled = false;

      for (const el of targets) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy);

        if (dist < MAGNETIC_RADIUS) {
          const strength = 1 - dist / MAGNETIC_RADIUS;
          const tx = lerp(e.clientX, cx, strength * 0.4);
          const ty = lerp(e.clientY, cy, strength * 0.35);
          mouseX.set(tx);
          mouseY.set(ty);
          pulled = true;
          break;
        }
      }

      if (!pulled) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }

      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    // State detection via delegation
    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        'a, button, [role="button"]'
      );
      if (target) {
        setState("link");
        return;
      }
      const text = (e.target as HTMLElement).closest("p, h1, h2, h3, h4, h5, span");
      if (text) {
        setState("text");
        return;
      }
      setState("default");
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [mouseX, mouseY, visible]);

  // Visibility: only show on non-touch devices
  const [isTouch, setIsTouch] = useState(true);
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  if (isTouch) return null;

  const isHover = state === "link";
  const isText = state === "text";

  return (
    <>
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          top: 0,
          left: 0,
          width: isHover ? 8 : 6,
          height: isHover ? 8 : 6,
          backgroundColor: isHover ? "#D4AF37" : "#F8F8F8",
          opacity: visible ? 1 : 0,
          transition: "width 0.2s, height 0.2s, background-color 0.2s, opacity 0.3s",
        }}
      />

      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          top: 0,
          left: 0,
          width: isHover ? 44 : isText ? 28 : 36,
          height: isHover ? 44 : isText ? 28 : 36,
          border: isHover
            ? "1.5px solid #D4AF37"
            : "1.5px solid rgba(248,248,248,0.35)",
          backgroundColor: isHover ? "rgba(212,175,55,0.06)" : "transparent",
          opacity: visible ? 1 : 0,
          transition: "width 0.25s cubic-bezier(0.22,1,0.36,1), height 0.25s cubic-bezier(0.22,1,0.36,1), border-color 0.2s, background-color 0.2s, opacity 0.3s",
        }}
      />
    </>
  );
}
