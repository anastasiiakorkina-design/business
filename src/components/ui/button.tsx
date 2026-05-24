"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2",
    "font-cta font-semibold tracking-wide",
    "transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian",
    "disabled:pointer-events-none disabled:opacity-40",
    "select-none overflow-hidden",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-gold text-obsidian",
          "before:absolute before:inset-0 before:bg-white/0 before:transition-colors before:duration-200",
          "hover:before:bg-white/10 active:before:bg-white/20",
          "shadow-gold-sm hover:shadow-gold",
        ].join(" "),
        outline: [
          "border border-gold text-gold bg-transparent",
          "before:absolute before:inset-0 before:bg-gold before:origin-left before:scale-x-0",
          "before:transition-transform before:duration-300",
          "hover:before:scale-x-100 hover:text-obsidian",
        ].join(" "),
        ghost: [
          "bg-transparent text-ink-muted",
          "hover:bg-white/5 hover:text-ink",
          "active:bg-white/10",
        ].join(" "),
        destructive: [
          "bg-error text-ink",
          "hover:bg-error/90 active:bg-error/80",
        ].join(" "),
        secondary: [
          "bg-surface text-ink",
          "border border-graphite",
          "hover:bg-surface-raised hover:border-graphite-light",
          "active:bg-surface",
        ].join(" "),
        link: [
          "bg-transparent text-gold underline-offset-4",
          "hover:underline hover:text-gold-bright",
          "p-0 h-auto",
        ].join(" "),
      },
      size: {
        sm: "h-8 px-4 text-xs rounded-sm",
        default: "h-11 px-6 text-sm rounded-sm",
        lg: "h-13 px-8 text-base rounded-sm",
        xl: "h-15 px-10 text-lg rounded-sm",
        icon: "h-10 w-10 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : leftIcon ? (
            <span className="shrink-0">{leftIcon}</span>
          ) : null}
          {children}
          {!loading && rightIcon ? (
            <span className="shrink-0">{rightIcon}</span>
          ) : null}
        </span>
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
