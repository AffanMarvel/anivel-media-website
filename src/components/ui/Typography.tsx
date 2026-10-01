"use client";

import React from "react";
import { motion } from "framer-motion";
import { textRevealVariants } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Display XL: For massive editorial hero statements and brutalist brand anchors.
 * Tight line-height (0.88), heavy weight, tracking-tighter.
 */
export const DisplayXL: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "h1",
  ...props
}) => {
  return (
    <Component
      className={cn(
        "font-display font-black uppercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[115px] leading-[0.88] tracking-tighter text-[#EEEEEE]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Display Large: For key section headers with high typographic weight.
 */
export const DisplayLarge: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "h2",
  ...props
}) => {
  return (
    <Component
      className={cn(
        "font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] tracking-tight text-[#EEEEEE]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * H1: Major section headlines
 */
export const H1: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "h1",
  ...props
}) => {
  return (
    <Component
      className={cn(
        "font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-[#EEEEEE]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * H2: Card group titles, modal headlines, feature section headers
 */
export const H2: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "h2",
  ...props
}) => {
  return (
    <Component
      className={cn(
        "font-display font-bold text-2xl sm:text-3xl md:text-4xl leading-[1.15] tracking-tight text-[#EEEEEE]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * H3: Feature subheads, deliverable group titles
 */
export const H3: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "h3",
  ...props
}) => {
  return (
    <Component
      className={cn(
        "font-display font-semibold text-lg sm:text-xl md:text-2xl leading-[1.25] tracking-normal text-[#EEEEEE]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Body Large: Editorial introductions and lead text
 */
export const BodyLarge: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "p",
  ...props
}) => {
  return (
    <Component
      className={cn(
        "font-sans text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[#DDDDDD]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Body: Standard content, descriptions, and feature items
 */
export const Body: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "p",
  ...props
}) => {
  return (
    <Component
      className={cn(
        "font-sans text-sm sm:text-base font-normal leading-relaxed text-[#DDDDDD]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Small: Captions, timeline notes, legal disclaimers
 */
export const Small: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "p",
  ...props
}) => {
  return (
    <Component
      className={cn(
        "font-sans text-xs sm:text-sm font-normal leading-normal text-zinc-400",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Eyebrow / Label: Category tags, phase indicators, mono metadata
 */
export const Eyebrow: React.FC<TypographyProps> = ({
  children,
  className,
  as: Component = "span",
  ...props
}) => {
  return (
    <Component
      className={cn(
        "font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-crimson inline-flex items-center gap-2",
        className
      )}
      {...props}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-crimson shadow-[0_0_8px_#CB2957]" />
      {children}
    </Component>
  );
};

/**
 * EditorialHeadline:
 * Multi-line stacked headline with tight line-height and smooth text reveal.
 * Example visual language:
 * WE
 * BUILD
 * BRANDS.
 * or
 * MAKE
 * YOUR BRAND
 * MOVE.
 */
interface EditorialHeadlineProps {
  lines: string[];
  highlightIndex?: number;
  highlightClass?: string;
  size?: "xl" | "lg" | "md";
  className?: string;
  animate?: boolean;
}

export const EditorialHeadline: React.FC<EditorialHeadlineProps> = ({
  lines,
  highlightIndex,
  highlightClass = "text-crimson",
  size = "xl",
  className,
  animate = true,
}) => {
  const sizeClasses = {
    xl: "text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.88] tracking-tighter",
    lg: "text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight",
    md: "text-3xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight",
  };

  return (
    <div className={cn("flex flex-col font-display font-black text-[#EEEEEE]", className)}>
      {lines.map((line, idx) => {
        const isHighlight = highlightIndex === idx;
        const content = (
          <span className={cn(sizeClasses[size], isHighlight ? highlightClass : "text-[#EEEEEE]")}>
            {line}
          </span>
        );

        if (!animate) {
          return <div key={idx}>{content}</div>;
        }

        return (
          <motion.div
            key={idx}
            variants={textRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={idx * 0.12}
            className="overflow-hidden"
          >
            {content}
          </motion.div>
        );
      })}
    </div>
  );
};
