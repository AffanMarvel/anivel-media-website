"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { editorialEase } from "@/lib/motion";

export type ScrollRevealVariant = "fadeUp" | "textReveal" | "scaleUp" | "slideRight";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: ScrollRevealVariant | string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

/**
 * Editorial Scroll Reveal Component
 * Subtle, luxury upward glide and fade as sections cross the viewport.
 * Automatically disabled if user has reduced-motion enabled.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = "",
  variant = "fadeUp",
  delay = 0,
  duration = 0.7,
  yOffset = 20,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  const getInitial = () => {
    switch (variant) {
      case "textReveal":
        return { opacity: 0, clipPath: "inset(0 0 100% 0)" };
      case "scaleUp":
        return { opacity: 0, scale: 0.96 };
      case "slideRight":
        return { opacity: 0, x: -24 };
      case "fadeUp":
      default:
        return { opacity: 0, y: yOffset };
    }
  };

  const getAnimate = () => {
    if (!isInView) return getInitial();
    switch (variant) {
      case "textReveal":
        return { opacity: 1, clipPath: "inset(0 0 0% 0)" };
      case "scaleUp":
        return { opacity: 1, scale: 1 };
      case "slideRight":
        return { opacity: 1, x: 0 };
      case "fadeUp":
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={getAnimate()}
      transition={{
        duration,
        delay,
        ease: editorialEase,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};
