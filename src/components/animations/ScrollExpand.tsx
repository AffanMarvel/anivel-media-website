"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollExpandProps {
  children: React.ReactNode;
  startScale?: number;
  endScale?: number;
  startRadius?: number;
  endRadius?: number;
  className?: string;
  enableContractOnExit?: boolean;
}

export const ScrollExpand: React.FC<ScrollExpandProps> = ({
  children,
  startScale = 0.95,
  endScale = 1.0,
  startRadius = 16,
  endRadius = 0,
  className = "",
  enableContractOnExit = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the section relative to viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: enableContractOnExit
      ? ["start end", "end start"]
      : ["start end", "start 25%"],
  });

  // Direct GPU transform - zero layout recalculations, 120 FPS
  const scale = useTransform(
    scrollYProgress,
    enableContractOnExit ? [0, 0.25, 0.75, 1] : [0, 1],
    enableContractOnExit
      ? [startScale, endScale, endScale, startScale]
      : [startScale, endScale]
  );

  const borderRadius = useTransform(
    scrollYProgress,
    enableContractOnExit ? [0, 0.25, 0.75, 1] : [0, 1],
    enableContractOnExit
      ? [startRadius, endRadius, endRadius, startRadius]
      : [startRadius, endRadius]
  );

  return (
    <div ref={containerRef} className={`relative overflow-x-clip w-full py-1 ${className}`}>
      <motion.div
        style={{
          scale,
          borderRadius,
        }}
        className="w-full transform-gpu origin-center overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
};
