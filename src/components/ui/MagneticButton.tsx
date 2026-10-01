"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  strength?: number;
  showArrow?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children = "START A PROJECT",
  onClick,
  href,
  className,
  strength = 0.35,
  showArrow = true,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  // Smooth springs for magnetic attraction
  const springConfig = { stiffness: 350, damping: 25, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    // Cap magnetic delta to prevent detachment
    const maxDelta = 14;
    const clampedX = Math.max(Math.min(distanceX, maxDelta), -maxDelta);
    const clampedY = Math.max(Math.min(distanceY, maxDelta), -maxDelta);

    x.set(clampedX);
    y.set(clampedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <motion.div
      ref={buttonRef}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2.5 rounded-[10px] bg-crimson px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-display font-extrabold uppercase tracking-wider text-white shadow-crimson-glow transition-colors duration-300 hover:bg-crimson-600 hover:shadow-crimson-lg cursor-pointer border border-crimson/80 select-none",
        className
      )}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <div onClick={onClick} role="button" tabIndex={0}>
      {content}
    </div>
  );
};
