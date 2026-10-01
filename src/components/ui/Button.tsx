"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { editorialEase } from "@/lib/motion";

export type ButtonVariant = "primary" | "primary-white" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  showArrow?: boolean;
  arrowType?: "right" | "up-right";
  href?: string;
  isExternal?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  showArrow = true,
  arrowType = "right",
  href,
  isExternal = false,
  className,
  children,
  onClick,
  disabled,
  type = "button",
  ...props
}) => {
  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-xs gap-2 rounded-[8px]",
    md: "px-6 py-3 text-xs sm:text-sm gap-2.5 rounded-[10px]",
    lg: "px-8 py-4 text-sm sm:text-base gap-3 rounded-[12px]",
  };

  const variantStyles: Record<ButtonVariant, string> = {
    // Primary: Crimson with subtle glow and upward lift
    primary:
      "bg-crimson text-white border border-crimson shadow-[0_0_20px_-4px_rgba(203,41,87,0.4)] hover:bg-crimson-600 hover:shadow-[0_0_30px_-4px_rgba(203,41,87,0.6)] hover:-translate-y-0.5 active:translate-y-0",
    
    // Primary-White: Alternate high-contrast monochrome
    "primary-white":
      "bg-[#EEEEEE] text-black border border-white font-bold hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 active:translate-y-0",
    
    // Secondary: Transparent with thin border, transitions toward #CB2957 on hover
    secondary:
      "bg-transparent text-[#EEEEEE] border border-white/15 hover:border-crimson hover:bg-crimson/10 hover:text-white hover:shadow-[0_0_20px_rgba(203,41,87,0.2)] hover:-translate-y-0.5 active:translate-y-0",
    
    // Ghost: Clean text with animated arrow hover
    ghost:
      "bg-transparent text-zinc-300 hover:text-white hover:bg-white/5 border border-transparent",
  };

  const ArrowIcon = arrowType === "up-right" ? ArrowUpRight : ArrowRight;

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="font-display font-extrabold uppercase tracking-wider">
        {children}
      </span>
      {showArrow && (
        <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  const baseClasses = cn(
    "group inline-flex items-center justify-center font-display select-none transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: editorialEase }}
      {...(props as any)}
    >
      {content}
    </motion.button>
  );
};

/**
 * Standard Primary Call-to-Action
 * Preconfigured with: START A PROJECT →
 */
export const PrimaryCTA: React.FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <Button variant="primary" showArrow={true} {...props}>
      START A PROJECT
    </Button>
  );
};
