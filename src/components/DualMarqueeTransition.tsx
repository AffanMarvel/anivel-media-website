"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const MARQUEE_WORDS = [
  { word: "STRATEGY", highlight: false },
  { word: "CONTENT", highlight: false },
  { word: "SOCIAL", highlight: false },
  { word: "ADS", highlight: true },
  { word: "WEB", highlight: false },
  { word: "BRANDING", highlight: false },
  { word: "GROWTH", highlight: true },
  { word: "CREATIVE", highlight: true },
];

export const DualMarqueeTransition: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden bg-[#030305] py-8 sm:py-12 border-y border-white/[0.08] select-none group"
    >
      {/* Edge Gradient Vignettes */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-24 sm:w-48 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-24 sm:w-48 bg-gradient-to-l from-black to-transparent" />

      {/* Subtle Central Crimson Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-96 rounded-full bg-crimson/[0.1] blur-3xl -z-10"
      />

      <div className="flex flex-col space-y-3 sm:space-y-4">
        
        {/* Layer 1: Moves LEFT (Normal Pace, Filled Typography) */}
        <div className="flex overflow-hidden whitespace-nowrap">
          <div
            className={`flex items-center transition-all duration-700 ease-out ${
              isHovered ? "[animation-duration:55s]" : "[animation-duration:28s]"
            } animate-marquee will-change-transform`}
          >
            {[...Array(4)].map((_, loopIdx) => (
              <div key={loopIdx} className="flex items-center">
                {MARQUEE_WORDS.map((item, idx) => (
                  <div key={idx} className="flex items-center mx-4 sm:mx-6">
                    <span
                      className={`font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight transition-colors duration-300 ${
                        item.highlight
                          ? "text-crimson drop-shadow-[0_0_15px_rgba(203,41,87,0.4)]"
                          : "text-zinc-200 group-hover:text-white"
                      }`}
                    >
                      {item.word}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-crimson shadow-[0_0_8px_#CB2957] ml-8 sm:ml-12" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Layer 2: Moves RIGHT (Slower Pace, Outlined / Editorial Typography) */}
        <div className="flex overflow-hidden whitespace-nowrap">
          <div
            className={`flex items-center transition-all duration-700 ease-out ${
              isHovered ? "[animation-duration:70s]" : "[animation-duration:42s]"
            } animate-marquee-reverse will-change-transform`}
          >
            {[...Array(4)].map((_, loopIdx) => (
              <div key={loopIdx} className="flex items-center">
                {MARQUEE_WORDS.map((item, idx) => (
                  <div key={idx} className="flex items-center mx-4 sm:mx-6">
                    <span
                      className={`font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight transition-colors duration-300 ${
                        item.highlight
                          ? "text-transparent [-webkit-text-stroke:1.5px_#CB2957] drop-shadow-[0_0_12px_rgba(203,41,87,0.3)]"
                          : "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)] group-hover:[-webkit-text-stroke:1px_rgba(255,255,255,0.45)]"
                      }`}
                    >
                      {item.word}
                    </span>
                    <span className="font-mono text-sm sm:text-base text-crimson font-bold ml-8 sm:ml-12">
                      •
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
