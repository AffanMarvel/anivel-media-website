"use client";

import React, { useState } from "react";
import { Eyebrow } from "@/components/ui/Typography";
import { CheckCircle2, ArrowRight, Sparkles, Layers } from "lucide-react";
import { ScrollStack, ScrollStackItem } from "@/components/animations/ScrollStack";

interface ProcessStage {
  number: string;
  title: string;
  description: string;
  sprint: string;
  sprintId: "ALL" | "S1" | "S2" | "S3" | "S4";
  category: string;
  keyAction: string;
  output: string;
  kpi: string;
}

const PROCESS_STAGES: ProcessStage[] = [
  {
    number: "01",
    title: "BRAND ANALYSIS",
    description: "Understand the brand, audience and positioning.",
    sprint: "SPRINT 01 // FOUNDATION",
    sprintId: "S1",
    category: "Forensics & Identity",
    keyAction: "Deep-dive audit into existing equity, voice & audience psychographics",
    output: "Brand DNA & Audience Blueprint",
    kpi: "Strategic Foundation",
  },
  {
    number: "02",
    title: "COMPETITOR ANALYSIS",
    description: "Study competitors, market patterns and opportunities.",
    sprint: "SPRINT 01 // FOUNDATION",
    sprintId: "S1",
    category: "Market Forensics",
    keyAction: "Deconstruct top category competitors, ad libraries & viral patterns",
    output: "Competitor Vulnerability Matrix",
    kpi: "Market Differentiation",
  },
  {
    number: "03",
    title: "GROWTH PLAN",
    description: "Define objectives and direction.",
    sprint: "SPRINT 01 // FOUNDATION",
    sprintId: "S1",
    category: "Strategic Direction",
    keyAction: "Formulate quantifiable milestones, KPIs & 90-day distribution trajectory",
    output: "Executable Growth Roadmap",
    kpi: "90-Day Trajectory",
  },
  {
    number: "04",
    title: "GROWTH IDEAS",
    description: "Develop creative opportunities and campaign ideas.",
    sprint: "SPRINT 02 // ARCHITECTURE",
    sprintId: "S2",
    category: "Creative Ideation",
    keyAction: "Brainstorm high-converting angles, trend capitalizations & story arcs",
    output: "Campaign Concept Deck",
    kpi: "Viral Angle Velocity",
  },
  {
    number: "05",
    title: "CONTENT PILLARS",
    description: "Create the content architecture.",
    sprint: "SPRINT 02 // ARCHITECTURE",
    sprintId: "S2",
    category: "Editorial Structure",
    keyAction: "Establish core brand pillars, recurring formats & grid aesthetic rules",
    output: "30-Day Content Pillar Map",
    kpi: "100% Format Repeatability",
  },
  {
    number: "06",
    title: "SCRIPTING",
    description: "Turn ideas into strong hooks and scripts.",
    sprint: "SPRINT 02 // ARCHITECTURE",
    sprintId: "S2",
    category: "Retention Writing",
    keyAction: "Craft 3-second visual hooks, psychological payoffs & precise voiceover scripts",
    output: "Production-Ready Hook Bank",
    kpi: "45%+ Avg Hook Hold",
  },
  {
    number: "07",
    title: "SHOOTING",
    description: "Plan and guide the production process.",
    sprint: "SPRINT 03 // STUDIO CRAFT",
    sprintId: "S3",
    category: "On-Ground Production",
    keyAction: "Deploy cinema 4K camera gear, professional lighting & on-location direction",
    output: "Raw 4K Cinema Footage Library",
    kpi: "Cinema-Grade Assets",
  },
  {
    number: "08",
    title: "EDITING",
    description: "Create polished Reels, videos and creative assets.",
    sprint: "SPRINT 03 // STUDIO CRAFT",
    sprintId: "S3",
    category: "Post-Production",
    keyAction: "Execute high-tempo pacing, sound design, color grading & motion graphics",
    output: "Master Exported Dynamic Reels",
    kpi: "42%+ Avg Watch Time",
  },
  {
    number: "09",
    title: "DELIVERY",
    description: "Deliver organized content ready for publishing.",
    sprint: "SPRINT 03 // STUDIO CRAFT",
    sprintId: "S3",
    category: "Asset Logistics",
    keyAction: "Organize categorized deliverables with metadata, captions & cover stills",
    output: "Structured Cloud Asset Vault",
    kpi: "Zero Friction Handoff",
  },
  {
    number: "10",
    title: "PAGE MANAGEMENT",
    description: "Manage the agreed social presence.",
    sprint: "SPRINT 04 // SYNDICATION",
    sprintId: "S4",
    category: "Daily Operations",
    keyAction: "Publish at optimal algorithm windows, moderate comments & route inbound DMs",
    output: "Active Social Command Center",
    kpi: "24/7 Community Velocity",
  },
  {
    number: "11",
    title: "ADS & BOOSTING",
    description: "Run and optimize promotional campaigns.",
    sprint: "SPRINT 04 // SYNDICATION",
    sprintId: "S4",
    category: "Paid Performance",
    keyAction: "Amplify proven creative assets through Meta ad funnels & retargeting",
    output: "High-ROAS Acquisition Funnel",
    kpi: "3.5x+ Target ROAS",
  },
  {
    number: "12",
    title: "ANALYSIS & NEXT PLAN",
    description: "Review performance and improve the next cycle.",
    sprint: "SPRINT 04 // SYNDICATION",
    sprintId: "S4",
    category: "Optimization Loop",
    keyAction: "Analyze retention drops, ROAS & inquiry lift to calibrate the next sprint",
    output: "Monthly Strategy Evolution Brief",
    kpi: "Continuous Growth Compound",
  },
];

const SPRINT_TABS = [
  { id: "ALL", label: "All 12 Stages" },
  { id: "S1", label: "01 // Foundation" },
  { id: "S2", label: "02 // Architecture" },
  { id: "S3", label: "03 // Studio Craft" },
  { id: "S4", label: "04 // Syndication" },
];

interface ProcessTimelineProps {
  onOpenInquiry: () => void;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ onOpenInquiry }) => {
  const [activeSprint, setActiveSprint] = useState<"ALL" | "S1" | "S2" | "S3" | "S4">("ALL");

  const displayedStages =
    activeSprint === "ALL"
      ? PROCESS_STAGES
      : PROCESS_STAGES.filter((s) => s.sprintId === activeSprint);

  return (
    <section id="methodology" className="relative py-20 lg:py-28 bg-black overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-1/4 h-[650px] w-[950px] rounded-full bg-crimson/[0.05] blur-[180px] -z-10"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="h-1.5 w-6 rounded-full bg-crimson" />
            <span className="font-mono text-xs uppercase tracking-widest text-crimson font-bold">
              12-Stage Methodology &bull; Scroll Stack
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.92]">
            From Idea <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-crimson">To Execution.</span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-zinc-400 font-sans leading-relaxed">
            A structured system designed to turn research into content, content into attention and attention into growth. Scroll down to stack and reveal each execution layer.
          </p>

          {/* Sprint Filtering Tabs */}
          <div className="flex items-center justify-center gap-2 pt-4 flex-wrap">
            {SPRINT_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSprint(tab.id as any)}
                className={`rounded-[8px] px-3.5 py-1.5 font-display text-xs font-bold uppercase tracking-wider transition-all select-none flex items-center gap-1.5 ${
                  activeSprint === tab.id
                    ? "border border-crimson bg-crimson text-white shadow-crimson-glow"
                    : "border border-white/10 bg-[#0B0B10] text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {tab.id === "ALL" && <Layers className="h-3 w-3" />}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ReactBits ScrollStack: Cards pin & stack in 3D depth in one dedicated showcase area */}
        <ScrollStack
          key={activeSprint}
          itemDistance={50}
          itemScale={0.04}
          itemStackDistance={24}
          stackPosition="12%"
          scaleEndPosition="6%"
          baseScale={0.88}
          rotationAmount={0.4}
          blurAmount={0.6}
          useWindowScroll={false}
          className="mx-auto"
        >
          {displayedStages.map((stage) => {
            const stepNum = parseInt(stage.number, 10);
            const progressPercent = Math.round((stepNum / 12) * 100);

            return (
              <ScrollStackItem
                key={stage.number}
                itemClassName="relative rounded-[24px] border border-white/10 bg-[#08080C] p-6 sm:p-8 md:p-10 shadow-[0_-10px_40px_-5px_rgba(0,0,0,0.9),0_20px_50px_-10px_rgba(0,0,0,0.95)] transition-colors hover:border-crimson/50"
              >
                {/* Top Card Bar: Sprint Badge, Glowing Dot, Step Counter */}
                <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-crimson animate-pulse shadow-[0_0_10px_#CB2957]" />
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-crimson font-bold">
                      {stage.sprint}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-zinc-400 font-bold bg-white/5 border border-white/10 px-3 py-1 rounded-[6px]">
                    STEP {stage.number} / 12
                  </span>
                </div>

                {/* Monolithic Number & Active Title */}
                <div className="py-6 space-y-3">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-5xl sm:text-7xl font-black text-crimson drop-shadow-[0_0_20px_rgba(203,41,87,0.45)]">
                      {stage.number}
                    </span>
                    <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-zinc-500 font-medium">
                      // {stage.category}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
                    {stage.title}
                  </h3>

                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
                    {stage.description}
                  </p>
                </div>

                {/* Execution Action & Deliverable Output Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/[0.06]">
                  <div className="rounded-[10px] border border-white/[0.08] bg-white/[0.02] p-4 space-y-1.5">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block font-bold">
                      Execution Action:
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-snug">
                      {stage.keyAction}
                    </p>
                  </div>

                  <div className="rounded-[10px] border border-crimson/40 bg-crimson/10 p-4 space-y-1.5">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-crimson font-bold block">
                      Deliverable Output:
                    </span>
                    <p className="text-xs sm:text-sm text-white font-semibold flex items-center gap-2 leading-snug">
                      <CheckCircle2 className="h-4 w-4 text-crimson shrink-0" />
                      <span>{stage.output}</span>
                    </p>
                  </div>
                </div>

                {/* Bottom Bar: Progress Gauge & Direct Action Button */}
                <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  {/* Progress Gauge */}
                  <div className="space-y-2 flex-1 max-w-xs">
                    <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400">
                      <span>Sprint Velocity Progress</span>
                      <span className="text-crimson font-bold">{progressPercent}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-[4px] bg-zinc-900 overflow-hidden relative">
                      <div
                        className="absolute top-0 bottom-0 left-0 bg-crimson shadow-[0_0_8px_#CB2957] transition-all duration-300 origin-left"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Direct Action Trigger */}
                  <button
                    onClick={onOpenInquiry}
                    className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-crimson hover:bg-crimson-600 px-6 py-3 font-display text-xs font-extrabold uppercase tracking-wider text-white shadow-crimson-glow transition-all"
                  >
                    <span>Initiate This Pipeline</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

              </ScrollStackItem>
            );
          })}
        </ScrollStack>

      </div>
    </section>
  );
};
