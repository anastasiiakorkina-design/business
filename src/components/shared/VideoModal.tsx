"use client";

import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Full YouTube URL, Vimeo URL, or direct video URL */
  url: string;
  /** Optional title for accessibility */
  title?: string;
}

function getEmbedUrl(url: string): string {
  // YouTube: various formats
  const ytMatch =
    url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/) ||
    url.match(/youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/);
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1&color=white`;
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&color=D4AF37&title=0&byline=0&portrait=0`;
  }

  // Direct video — returned as-is (rendered as <video> tag)
  return url;
}

function isDirectVideo(url: string): boolean {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
}

const OVERLAY_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

const MODAL_VARIANTS = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 12,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
};

export default function VideoModal({ open, onClose, url, title = "Video" }: VideoModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Trap focus and handle Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Focus close button on open
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const embedUrl = getEmbedUrl(url);
  const direct = isDirectVideo(url);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="video-modal-overlay"
          variants={OVERLAY_VARIANTS}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
          style={{ background: "rgba(8,10,13,0.92)", backdropFilter: "blur(8px)" }}
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            key="video-modal-content"
            variants={MODAL_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gold accent line */}
            <div
              className="absolute -top-px left-8 right-8 h-[1px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(212,175,55,0.6) 40%, rgba(212,175,55,0.6) 60%, transparent)",
              }}
            />

            {/* Close button */}
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close video"
              className={cn(
                "absolute -top-4 -right-4 z-10",
                "w-10 h-10 rounded-full flex items-center justify-center",
                "bg-[#171B22] border border-white/10 text-[#A8A8A8]",
                "hover:text-[#D4AF37] hover:border-[#D4AF37]/40",
                "transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/60"
              )}
            >
              <X size={16} strokeWidth={1.75} />
            </button>

            {/* Video container — 16:9 */}
            <div
              className="relative w-full overflow-hidden rounded-sm"
              style={{
                paddingBottom: "56.25%",
                background: "#0D1015",
                border: "1px solid rgba(212,175,55,0.12)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 40px rgba(212,175,55,0.1)",
              }}
            >
              {direct ? (
                <video
                  src={url}
                  autoPlay
                  controls
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  title={title}
                />
              ) : (
                <iframe
                  src={embedUrl}
                  title={title}
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
