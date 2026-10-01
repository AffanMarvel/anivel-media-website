"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { editorialEase } from "@/lib/motion";
import { Eyebrow } from "@/components/ui/Typography";

interface StageData {
  number: string;
  code: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  metrics: string;
}

const STAGES: StageData[] = [
  {
    number: "01",
    code: "DIAGNOSTIC",
    title: "RESEARCH",
    tagline: "Forensic Market Intelligence & Competitor Teardown",
    description:
      "Before creating content or spending ad dollars, we dissect market gaps, examine competitor conversion funnels, audit profile health, and define your Ideal Customer Profile (ICP).",
    deliverables: ["Competitor Ad Library Teardown", "Audience Psychographic Analysis", "Content Gap Matrix"],
    metrics: "Data-backed strategic baseline",
  },
  {
    number: "02",
    code: "BLUEPRINT",
    title: "STRATEGY",
    tagline: "Narrative Positioning & Content Architecture",
    description:
      "We design the complete operational playbook: hook frameworks, brand voice standards, 30-day editorial roadmaps, and cross-platform syndication timing calibrated for algorithmic lift.",
    deliverables: ["Monthly Content Playbook", "Viral Hook Script Bank", "Channel Distribution Model"],
    metrics: "Structured 90-day trajectory",
  },
  {
    number: "03",
    code: "PRODUCTION",
    title: "CONTENT",
    tagline: "Cinema-Grade 4K Visuals & High-Tempo Editing",
    description:
      "Our directors, camera crew, motion artists, and editors execute the creative blueprint. From on-location commercial shoots to sound-designed reels that command human attention.",
    deliverables: ["4K Cinema Video Shoots", "Dynamic 9:16 Retention Reels", "Editorial Graphic Spreads"],
    metrics: "40%+ average retention rate",
  },
  {
    number: "04",
    code: "SYNDICATION",
    title: "SOCIAL",
    tagline: "Active Page Operations & Profile Conversion Funnels",
    description:
      "We run your brand presence as a high-authority publication. Daily publishing, comment engagement, DM routing, bio optimization, and community momentum that converts viewers into followers.",
    deliverables: ["Daily Profile Management", "Community Inbound Routing", "Grid & Story Curation"],
    metrics: "3.4x average organic reach lift",
  },
  {
    number: "05",
    code: "ACQUISITION",
    title: "ADS",
    tagline: "Meta Performance Marketing & Scientific Testing",
    description:
      "We pair scroll-stopping creative assets with rigorous media buying on Meta. Continuous A/B testing of angles, hooks, and audiences scales revenue while maintaining CAC efficiency.",
    deliverables: ["Creative Sandbox Testing", "Conversion API (CAPI) Tracking", "Retargeting Architecture"],
    metrics: "4.2x ROAS benchmark target",
  },
  {
    number: "06",
    code: "EXPANSION",
    title: "GROWTH",
    tagline: "Algorithmic Compounding & Digital Dominance",
    description:
      "The stages unite into an evergreen flywheel. High-performing organic reels become paid ad winners; ad insights refine creative scripts; your digital footprint scales predictably.",
    deliverables: ["Omnichannel Flywheel Sync", "Executive Growth Dashboards", "Conversion Rate Optimization"],
    metrics: "Predictable, compounding revenue",
  },
];

interface StageNodeProps {
  stage: StageData;
  index: number;
  isLast: boolean;
}

const StageNode: React.FC<StageNodeProps> = ({ stage, index, isLast }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  // Stage activates when centered in the reading area of viewport
  const isInView = useInView(nodeRef, { margin: "-25% 0px -25% 0px", once: false });

  return (
    <div ref={nodeRef} className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start py-12 lg:py-16">
      
      {/* Left Column: Number, Title & Indicator */}
      <div className="lg:col-span-5 xl:col-span-6 flex items-start gap-4 sm:gap-6 min-w-0">
        {/* Monolithic Index Number */}
        <span
          className={`font-mono text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black transition-all duration-500 select-none shrink-0 ${
            isInView
              ? "text-white opacity-100"
              : "text-zinc-800 opacity-40"
          }`}
        >
          {stage.number}
        </span>

        {/* Title, Code & Indicator */}
        <div className="space-y-2 pt-1 min-w-0">
          <div className="flex items-center gap-2.5">
            {/* Crimson Active Indicator */}
            <span
              className={`h-2 w-2 rounded-full transition-all duration-500 ${
                isInView
                  ? "bg-crimson shadow-[0_0_12px_#CB2957] scale-125"
                  : "bg-zinc-800 scale-75"
              }`}
            />
            <span
              className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold transition-colors duration-500 ${
                isInView ? "text-crimson" : "text-zinc-600"
              }`}
            >
              PHASE_{stage.number} // {stage.code}
            </span>
          </div>

          <h3
            className={`font-display text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-black uppercase tracking-tight transition-all duration-500 break-words ${
              isInView
                ? "text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                : "text-zinc-700"
            }`}
          >
            {stage.title}
          </h3>

          <p
            className={`font-mono text-xs sm:text-sm leading-relaxed transition-colors duration-500 ${
              isInView ? "text-rose-200" : "text-zinc-600"
            }`}
          >
            {stage.tagline}
          </p>
        </div>
      </div>

      {/* Right Column: Narrative Breakdown & Tactical Outputs */}
      <div className="lg:col-span-7 xl:col-span-6 space-y-4">
        <div
          className={`rounded-[12px] border p-6 sm:p-8 backdrop-blur-xl transition-all duration-500 ${
            isInView
              ? "border-crimson/40 bg-[#0A0A0E] shadow-[0_10px_40px_-10px_rgba(203,41,87,0.2)]"
              : "border-white/[0.05] bg-[#070709]/50"
          }`}
        >
          <p
            className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
              isInView ? "text-zinc-200" : "text-zinc-500"
            }`}
          >
            {stage.description}
          </p>

          <div className="mt-6 pt-5 border-t border-white/[0.06] space-y-2">
            <span
              className={`font-mono text-[10px] uppercase tracking-wider block transition-colors duration-500 ${
                isInView ? "text-crimson font-bold" : "text-zinc-600"
              }`}
            >
              Tactical Deliverables:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {stage.deliverables.map((item, dIdx) => (
                <div key={dIdx} className="flex items-center gap-2">
                  <span
                    className={`h-1 w-2 rounded-full transition-colors duration-500 ${
                      isInView ? "bg-crimson" : "bg-zinc-700"
                    }`}
                  />
                  <span
                    className={`text-xs font-mono transition-colors duration-500 ${
                      isInView ? "text-zinc-300" : "text-zinc-600"
                    }`}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between font-mono text-[10px]">
            <span className="text-zinc-600">Benchmark Output</span>
            <span
              className={`font-bold transition-colors duration-500 ${
                isInView ? "text-white" : "text-zinc-600"
              }`}
            >
              {stage.metrics}
            </span>
          </div>
        </div>
      </div>

      {/* Vertical Animated Connecting Line to Next Stage */}
      {!isLast && (
        <div className="hidden lg:flex absolute left-8 bottom-0 transform -translate-x-1/2 translate-y-full h-12 sm:h-16 w-[1.5px] items-center justify-center">
          <div
            className={`h-full w-full transition-all duration-700 ${
              isInView
                ? "bg-gradient-to-b from-crimson via-crimson/60 to-zinc-800 shadow-[0_0_8px_#CB2957]"
                : "bg-zinc-800"
            }`}
          />
          <span
            className={`absolute bottom-0 text-[10px] font-mono transition-colors duration-500 ${
              isInView ? "text-crimson" : "text-zinc-700"
            }`}
          >
            ↓
          </span>
        </div>
      )}

    </div>
  );
};

export const BrandSystemSection: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-black overflow-hidden border-t border-white/5">
      {/* Subtle Radial Crimson Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-crimson/[0.07] blur-[170px] -z-10"
      />

      {/* Subtle Background Architectural Grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20 -z-20" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-20 space-y-5">
          <Eyebrow>The Anivel Operating System &bull; Systematic Execution</Eyebrow>

          {/* Exact Requested Headline */}
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[0.95]">
            We Don&apos;t Just Post.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-crimson">
              We Build The System Behind The Brand.
            </span>
          </h2>

          {/* Exact Requested Supporting Copy */}
          <p className="text-base sm:text-lg lg:text-xl text-zinc-300 font-sans leading-relaxed max-w-3xl">
            From research and strategy to content, social media management, advertising and digital experiences, Anivel Media brings the important pieces of your online presence together.
          </p>
        </div>

        {/* Visual Pipeline Header Bar */}
        <div className="mb-8 pb-4 border-b border-white/10 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
            <span>Interactive Pipeline Flow</span>
          </div>
          <span className="hidden sm:inline">6 Integrated Disciplines</span>
        </div>

        {/* The 6 Stages Pipeline */}
        <div className="divide-y divide-white/[0.04]">
          {STAGES.map((stage, idx) => (
            <StageNode
              key={stage.title}
              stage={stage}
              index={idx}
              isLast={idx === STAGES.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
