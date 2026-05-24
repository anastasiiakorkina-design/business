"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const PAGE_VARIANTS = {
  initial: {
    opacity: 0,
    y: 18,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
};

/* Loading bar that fires on route changes */
function LoadingBar({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="loading-bar"
          className="fixed top-[2px] left-0 z-[70] h-[2px]"
          style={{ background: "#D4AF37" }}
          initial={{ width: "0%", opacity: 1 }}
          animate={{
            width: ["0%", "35%", "70%", "85%", "92%"],
            transition: {
              duration: 1.6,
              ease: "easeInOut",
              times: [0, 0.25, 0.55, 0.75, 1],
            },
          }}
          exit={{
            width: "100%",
            opacity: 0,
            transition: { duration: 0.25, ease: "easeOut" },
          }}
        />
      )}
    </AnimatePresence>
  );
}

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== prevPath) {
      setLoading(true);
      const t = setTimeout(() => {
        setLoading(false);
        setPrevPath(pathname);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [pathname, prevPath]);

  return (
    <>
      <LoadingBar active={loading} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          variants={PAGE_VARIANTS}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
