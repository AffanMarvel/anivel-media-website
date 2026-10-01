"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { editorialEase } from "@/lib/motion";

export type CardRadius = "sharp" | "sm" | "md" | "lg";
export type CardSurface = "surface-1" | "surface-2" | "surface-3" | "glass";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  surface?: CardSurface;
  radius?: CardRadius;
  hoverEffect?: "lift" | "glow" | "none";
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  surface = "surface-1",
  radius = "md",
  hoverEffect = "lift",
  interactive = true,
  className,
  children,
  ...props
}) => {
  // Editorial corner radii (8px–18px, avoiding generic 24px+ round bubbles)
  const radiusStyles: Record<CardRadius, string> = {
    sharp: "rounded-[6px]", // Crisp editorial / technical
    sm: "rounded-[8px]",    // Editorial sharp
    md: "rounded-[12px]",   // Standard editorial card
    lg: "rounded-[16px]",   // Hero / featured card
  };

  const surfaceStyles: Record<CardSurface, string> = {
    "surface-1": "bg-[#08080A] border-white/[0.08]",
    "surface-2": "bg-[#0D0D11] border-white/[0.08]",
    "surface-3": "bg-[#131318] border-white/[0.1]",
    glass: "bg-[#0A0A0E]/80 backdrop-blur-xl border-white/[0.08]",
  };

  const hoverStyles = {
    lift: "hover:-translate-y-1 hover:border-crimson/40 hover:shadow-[0_12px_35px_-10px_rgba(203,41,87,0.2)]",
    glow: "hover:border-crimson/50 hover:shadow-[0_0_30px_rgba(203,41,87,0.25)]",
    none: "",
  };

  return (
    <motion.div
      className={cn(
        "relative border transition-all duration-300",
        radiusStyles[radius],
        surfaceStyles[surface],
        interactive && hoverStyles[hoverEffect],
        className
      )}
      transition={{ duration: 0.3, ease: editorialEase }}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
};

/**
 * Editorial Card Header
 */
export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("p-6 sm:p-8 pb-4", className)} {...props}>
      {children}
    </div>
  );
};

/**
 * Editorial Card Body
 */
export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("px-6 sm:px-8 py-2", className)} {...props}>
      {children}
    </div>
  );
};

/**
 * Editorial Card Footer with thin border
 */
export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("p-6 sm:p-8 pt-4 border-t border-white/[0.06]", className)} {...props}>
      {children}
    </div>
  );
};
