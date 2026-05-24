import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  [
    "w-full bg-surface-raised border transition-all duration-200",
    "text-ink placeholder:text-ink-faint",
    "font-body text-sm",
    "focus:outline-none focus:ring-1",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    "rounded-sm",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "border-graphite",
          "focus:border-gold focus:ring-gold/30",
          "hover:border-graphite-light",
        ].join(" "),
        error: [
          "border-error/60",
          "focus:border-error focus:ring-error/20",
        ].join(" "),
        success: [
          "border-success/60",
          "focus:border-success focus:ring-success/20",
        ].join(" "),
      },
      inputSize: {
        sm: "h-8 px-3 text-xs",
        default: "h-11 px-4",
        lg: "h-13 px-5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  hint?: string;
  error?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      label,
      hint,
      error,
      leftElement,
      rightElement,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId();
    const resolvedVariant = error ? "error" : variant;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-ink-muted uppercase tracking-widest"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftElement && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none">
              {leftElement}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({ variant: resolvedVariant, inputSize }),
              leftElement && "pl-9",
              rightElement && "pr-9",
              className
            )}
            {...props}
          />
          {rightElement && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint">
              {rightElement}
            </span>
          )}
        </div>
        {(hint || error) && (
          <p
            className={cn(
              "text-xs",
              error ? "text-error" : "text-ink-faint"
            )}
          >
            {error ?? hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// Textarea variant
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, id, ...props }, ref) => {
    const inputId = id ?? React.useId();

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-ink-muted uppercase tracking-widest"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full bg-surface-raised border border-graphite rounded-sm px-4 py-3",
            "text-ink placeholder:text-ink-faint font-body text-sm",
            "transition-all duration-200 resize-none",
            "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30",
            "hover:border-graphite-light",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            error && "border-error/60 focus:border-error focus:ring-error/20",
            className
          )}
          {...props}
        />
        {(hint || error) && (
          <p className={cn("text-xs", error ? "text-error" : "text-ink-faint")}>
            {error ?? hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Input, Textarea };
