import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface GoldDividerProps {
  /** Optional icon to center in the divider */
  icon?: LucideIcon;
  /** Extra className on the wrapper */
  className?: string;
  /** Width as a Tailwind class (default: full width) */
  width?: string;
  /** Opacity of the line (0-100 as Tailwind slash, e.g. "40" → opacity-40) */
  lineOpacity?: number;
  /** Vertical margin class */
  my?: string;
  /** Shows a short decorative dash variant instead of full-width line */
  short?: boolean;
}

export default function GoldDivider({
  icon: Icon,
  className,
  width = "w-full",
  lineOpacity = 30,
  my = "my-0",
  short = false,
}: GoldDividerProps) {
  const lineStyle: React.CSSProperties = {
    background: `linear-gradient(90deg, transparent 0%, rgba(212,175,55,${lineOpacity / 100}) 50%, transparent 100%)`,
  };

  if (short) {
    return (
      <div className={cn("flex items-center justify-center", my, className)}>
        <div className="flex items-center gap-2">
          <span
            className="block h-[1px] w-10"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(212,175,55,${lineOpacity / 100}))`,
            }}
          />
          {Icon ? (
            <Icon
              size={14}
              strokeWidth={1.5}
              className="text-[#D4AF37]"
              aria-hidden
            />
          ) : (
            <span
              className="block w-1.5 h-1.5 rounded-full"
              style={{ background: `rgba(212,175,55,${lineOpacity / 100 + 0.3})` }}
            />
          )}
          <span
            className="block h-[1px] w-10"
            style={{
              background: `linear-gradient(90deg, rgba(212,175,55,${lineOpacity / 100}), transparent)`,
            }}
          />
        </div>
      </div>
    );
  }

  if (!Icon) {
    return (
      <div
        className={cn("h-[1px]", width, my, className)}
        style={lineStyle}
        role="separator"
        aria-hidden
      />
    );
  }

  return (
    <div className={cn("flex items-center gap-4", width, my, className)} role="separator" aria-hidden>
      <div className="flex-1 h-[1px]" style={lineStyle} />
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          border: `1px solid rgba(212,175,55,${lineOpacity / 100 + 0.15})`,
          background: "rgba(212,175,55,0.06)",
        }}
      >
        <Icon
          size={14}
          strokeWidth={1.5}
          className="text-[#D4AF37]"
          aria-hidden
        />
      </div>
      <div className="flex-1 h-[1px]" style={lineStyle} />
    </div>
  );
}
