"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundDepthProps {
  children?: React.ReactNode;
  showGlowTop?: boolean;
  showGlowCenter?: boolean;
  showGlowBottom?: boolean;
  showGrid?: boolean;
  className?: string;
}

/**
 * BackgroundDepth:
 * Strictly dark-first visual depth system for ANIVEL MEDIA.
 * Integrates very soft crimson radial gradients (low opacity 0.08–0.12),
 * black vignettes, fine grid lines, and noise without brightening the canvas.
 */
export const BackgroundDepth: React.FC<BackgroundDepthProps> = ({
  children,
  showGlowTop = true,
  showGlowCenter = false,
  showGlowBottom = false,
  showGrid = true,
  className,
}) => {
  return (
    <div className={cn("relative w-full bg-black overflow-hidden", className)}>
      {/* Soft Crimson Ambient Radial Glow Top (Low opacity 0.09) */}
      {showGlowTop && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[800px] rounded-full bg-crimson/[0.09] blur-[150px] -z-10"
        />
      )}

      {/* Soft Crimson Ambient Radial Glow Center */}
      {showGlowCenter && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-crimson/[0.07] blur-[160px] -z-10"
        />
      )}

      {/* Soft Crimson Ambient Radial Glow Bottom */}
      {showGlowBottom && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/3 -translate-x-1/2 h-[500px] w-[750px] rounded-full bg-crimson/[0.08] blur-[140px] -z-10"
        />
      )}

      {/* Ultra-subtle Architectural Grid Lines */}
      {showGrid && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20 -z-20"
        />
      )}

      {children}
    </div>
  );
};
