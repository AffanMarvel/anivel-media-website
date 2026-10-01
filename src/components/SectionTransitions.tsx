"use client";

import React from "react";
import { motion } from "framer-motion";
import { editorialEase } from "@/lib/motion";

/**
 * 01. HERO → POSITIONING TRANSITION
 * Large typography compresses slightly while the next section emerges underneath.
 */
export const HeroToPositioningTransition: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-t border-b border-white/10 py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse shrink-0" />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 truncate">
              01 &bull; SYSTEM ARCHITECTURE
            </span>
          </div>
          <div className="h-[1px] flex-1 mx-3 sm:mx-8 bg-gradient-to-r from-crimson/40 via-white/10 to-transparent" />
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 hidden sm:inline">
            SCROLL TO ENGAGE
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * 02. POSITIONING → SERVICES TRANSITION
 * A thin crimson frame expands across the viewport and becomes the service section border.
 */
export const PositioningToServicesTransition: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: editorialEase }}
          className="relative h-[1px] w-full bg-gradient-to-r from-transparent via-crimson to-transparent origin-center"
        >
          {/* Crimson Center Accent Indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-black px-4 py-1.5 border border-crimson/40 rounded-[6px]">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
            <span className="font-mono text-xs uppercase tracking-wider text-crimson font-bold">
              02 &bull; CAPABILITIES ENGINE
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/**
 * 03. PROCESS → WORK TRANSITION
 * The timeline line extends across the screen and transforms into the border of the portfolio gallery.
 */
export const ProcessToWorkTransition: React.FC = () => {
  return (
    <div className="relative w-full bg-black py-8 overflow-hidden">
      {/* Central vertical line continuing from process */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-[1px] h-12 bg-gradient-to-b from-crimson to-white/20" />
        <div className="my-2 flex items-center gap-2 rounded-[6px] border border-white/10 bg-[#0A0A0E] px-4 py-1.5 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
            03 &bull; EXECUTED WORK &amp; CASE STUDIES
          </span>
        </div>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-crimson" />
      </div>

      {/* Horizontal connector into portfolio */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>
    </div>
  );
};

/**
 * 04. WORK → PACKAGES TRANSITION
 * Portfolio images move upward while pricing cards rise into view.
 */
export const WorkToPackagesTransition: React.FC = () => {
  return (
    <div className="relative w-full bg-black py-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl border border-white/10 bg-gradient-to-r from-black via-[#0D0D12] to-black p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-crimson animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-semibold">
              04 &bull; TRANSPARENT TIERS
            </span>
          </div>
          <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider hidden md:block">
            TRY ₹850 DEMO &bull; STARTER &bull; GROWTH PARTNERSHIP
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 05. PACKAGES → CONTACT TRANSITION
 * A minimal separator with a directional cue leading into the contact form.
 */
export const PackagesToContactTransition: React.FC = () => {
  return (
    <div className="relative w-full bg-black py-8 overflow-hidden border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <div className="flex items-center gap-2 rounded-[6px] border border-crimson/30 bg-crimson/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-crimson font-bold">
              NEXT &bull; START YOUR PROJECT
            </span>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
      </div>
    </div>
  );
};
