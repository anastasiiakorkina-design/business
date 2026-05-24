import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5",
    "font-body font-semibold text-xs tracking-wide",
    "rounded-sm px-2.5 py-1",
    "transition-colors duration-200",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        gold: "bg-gold/15 text-gold border border-gold/25",
        "gold-solid": "bg-gold text-obsidian",
        outline: "bg-transparent text-ink-muted border border-graphite",
        default: "bg-surface-raised text-ink-muted border border-graphite/50",
        success: "bg-success/15 text-success border border-success/25",
        warning: "bg-warning/15 text-warning border border-warning/25",
        error: "bg-error/15 text-error border border-error/25",
        ghost: "bg-white/5 text-ink-muted",
      },
      dot: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      dot: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dotColor?: string;
}

function Badge({
  className,
  variant,
  dot,
  dotColor,
  children,
  ...props
}: BadgeProps) {
  const dotColorMap: Record<string, string> = {
    gold: "bg-gold",
    "gold-solid": "bg-obsidian",
    outline: "bg-ink-muted",
    default: "bg-ink-faint",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
    ghost: "bg-ink-faint",
  };

  const resolvedDotColor =
    dotColor ??
    (variant ? dotColorMap[variant] : dotColorMap["default"]);

  return (
    <span
      className={cn(badgeVariants({ variant, dot, className }))}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "block h-1.5 w-1.5 rounded-full shrink-0",
            resolvedDotColor
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
