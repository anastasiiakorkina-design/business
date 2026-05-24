"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "border-b border-graphite/60 last:border-0",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    hideIcon?: boolean;
  }
>(({ className, children, hideIcon = false, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between py-5 gap-4",
        "font-heading font-bold text-base text-ink",
        "text-left transition-colors duration-200",
        "hover:text-gold",
        "data-[state=open]:text-gold",
        "focus-visible:outline-none focus-visible:text-gold",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {!hideIcon && (
        <span className="shrink-0 h-6 w-6 rounded-sm border border-graphite flex items-center justify-center transition-all duration-200 group-data-[state=open]:border-gold group-data-[state=open]:bg-gold/10">
          <Plus
            className="h-3.5 w-3.5 text-ink-muted transition-all duration-300 group-data-[state=open]:opacity-0 group-data-[state=open]:scale-75"
            aria-hidden
          />
          <Minus
            className="h-3.5 w-3.5 text-gold absolute opacity-0 scale-75 transition-all duration-300 group-data-[state=open]:opacity-100 group-data-[state=open]:scale-100"
            aria-hidden
          />
        </span>
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div
      className={cn(
        "pb-5 text-sm text-ink-muted leading-relaxed",
        className
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
