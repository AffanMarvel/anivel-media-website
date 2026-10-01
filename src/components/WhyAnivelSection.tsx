"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/Typography";
import { ArrowRight, Sparkles } from "lucide-react";
import { editorialEase } from "@/lib/motion";
import { GlareHover } from "@/components/animations/GlareHover";

interface PrincipleItem {
  number: string;
  word: string;
  tagline: string;
  description: string;
  detailPoints: string[];
}

const PRINCIPLES: PrincipleItem[] = [
  {
    number: "01",
    word: "THINK",
    tagline: "Research before creating.",
    description:
      "We never shoot blind or post without intent. Every creative sprint begins with ruthless audience analysis, competitor deconstruction, and gap identification.",
    detailPoints: ["Audience Psychographics", "Competitor Ad Library Audits", "Cultural & Algorithmic Timing"],
  },
  {
    number: "02",
    word: "CREATE",
    tagline: "Turn strategy into content people want to watch.",
    description:
      "Data without creative craft is ignored. We translate cold market research into visceral 3-second visual hooks, dynamic sound design, and cinema-grade aesthetics.",
    detailPoints: ["Retention-Engineered Scripting", "Bespoke Editorial Aesthetics", "Story Arcs with Payoffs"],
  },
  {
    number: "03",
    word: "EXECUTE",
    tagline: "Actually produce, publish and promote.",
    description:
      "Ideas are cheap; execution is the differentiator. We handle the full operational grind: 4K camera gear, daily syndication, comment routing, and Meta ad bidding.",
    detailPoints: ["On-Location 4K Cinema Shoots", "Daily Publishing Calendars", "Live Meta Performance Funnels"],
  },
  {
    number: "04",
    word: "IMPROVE",
    tagline: "Analyze what happened and adjust the next move.",
    description:
      "We study drop-off graphs, ROAS efficiency, and organic shares every week. What works is scaled with paid budget; what fails is eliminated immediately.",
    detailPoints: ["Weekly Retention Drop Analysis", "Creative Fatigue Refresh", "Predictable Compounding Growth"],
  },
];

export const WhyAnivelSection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0);

  return (
    <section className="relative py-20 lg:py-28 bg-black overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[950px] rounded-full bg-crimson/[0.06] blur-[170px] -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <Eyebrow>Agency Philosophy // Core Operating Principles</Eyebrow>

            {/* Exact Requested Headline */}
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.92]">
              Why <span className="text-crimson">Anivel?</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            No empty claims like &quot;we are the best.&quot; We are governed by four non-negotiable operational principles that turn raw effort into measurable market authority.
          </p>
        </div>

        {/* Animated Connecting Timeline Line Between All 4 Principles */}
        <div className="relative hidden lg:flex items-center justify-between px-12 mb-4">
          <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-[1px] bg-zinc-800 -z-10" />
          <motion.div
            className="absolute left-12 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-crimson to-rose-400 shadow-[0_0_8px_#CB2957] -z-10"
            animate={{
              width: hoveredIdx !== null ? `${((hoveredIdx + 1) / 4) * 88}%` : "25%",
            }}
            transition={{ duration: 0.4, ease: editorialEase }}
          />

          {PRINCIPLES.map((_, pIdx) => (
            <div
              key={pIdx}
              className={`flex h-6 w-6 items-center justify-center rounded-[4px] border bg-black transition-all duration-300 ${
                hoveredIdx === pIdx
                  ? "border-crimson bg-crimson text-white shadow-crimson-glow scale-110"
                  : hoveredIdx !== null && hoveredIdx > pIdx
                  ? "border-crimson text-crimson"
                  : "border-zinc-800 text-zinc-600"
              }`}
            >
              <span className="font-mono text-[9px] font-bold">{pIdx + 1}</span>
            </div>
          ))}
        </div>

        {/* Four Large Interactive Typography Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
          {PRINCIPLES.map((item, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <GlareHover
                key={item.word}
                borderRadius="16px"
                glareColor="#CB2957"
                glareOpacity={0.25}
                glareSize={260}
                className="h-full"
              >
                <div
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className={`group relative rounded-[16px] border transition-all duration-500 cursor-pointer p-6 sm:p-8 flex flex-col justify-between h-full overflow-hidden select-none ${
                    isHovered
                      ? "border-crimson/70 bg-[#0E090D] shadow-[0_20px_50px_-10px_rgba(203,41,87,0.3)] lg:-translate-y-2"
                      : "border-white/[0.08] bg-[#08080C] hover:border-white/20"
                  }`}
                >
                  {/* Crimson Top Accent Line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-crimson to-transparent transition-opacity duration-300 ${
                      isHovered ? "opacity-100 shadow-[0_0_10px_#CB2957]" : "opacity-0"
                    }`}
                  />

                  <div className="space-y-4">
                    {/* Number & Crimson Indicator */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-sm font-black transition-colors duration-300 ${
                          isHovered ? "text-crimson" : "text-zinc-600"
                        }`}
                      >
                        {item.number}
                      </span>

                      {/* Crimson Visual Indicator (Activates on hover) */}
                      <span
                        className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                          isHovered
                            ? "bg-crimson shadow-[0_0_10px_#CB2957] scale-125"
                            : "bg-zinc-800 scale-75 opacity-40"
                        }`}
                      />
                    </div>

                    {/* Large Typography Block Title */}
                    <h3
                      className={`font-display text-4xl sm:text-5xl font-black uppercase tracking-tight transition-colors duration-300 ${
                        isHovered ? "text-white" : "text-zinc-400"
                      }`}
                    >
                      {item.word}
                    </h3>

                    {/* Tagline */}
                    <p
                      className={`font-mono text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                        isHovered ? "text-rose-200" : "text-zinc-400"
                      }`}
                    >
                      {item.tagline}
                    </p>

                    {/* Description - always visible on mobile, revealed on hover for desktop */}
                    <div
                      className={`text-xs font-sans leading-relaxed transition-all duration-500 overflow-hidden pt-2 ${
                        isHovered
                          ? "text-zinc-300 opacity-100 max-h-48"
                          : "text-zinc-400 opacity-100 max-h-48 lg:opacity-0 lg:max-h-0 lg:pt-0"
                      }`}
                    >
                      <p>{item.description}</p>

                      <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-1.5 font-mono text-[10px] text-zinc-400">
                        {item.detailPoints.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-1.5">
                            <span className="h-1 w-1 rounded-full bg-crimson" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Expansion Cue */}
                  <div className="pt-6 mt-4 border-t border-white/[0.05] flex items-center justify-between text-xs font-mono text-zinc-500">
                    <span>Principle {item.number}</span>
                    <ArrowRight
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        isHovered ? "text-crimson translate-x-1" : "text-zinc-700"
                      }`}
                    />
                  </div>

                </div>
              </GlareHover>
            );
          })}
        </div>

      </div>
    </section>
  );
};
