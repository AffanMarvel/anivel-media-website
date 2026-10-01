"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
  Video,
  Film,
  Scissors,
  Lightbulb,
  Users,
  Calendar,
  Layers,
  HelpCircle,
  Star,
  Zap,
  Table,
  LayoutGrid,
  Info,
  CheckCircle2,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/Typography";
import { WheelSelector } from "@/components/WheelSelector";
import { ElectricBorder } from "@/components/animations/ElectricBorder";
import { GlareHover } from "@/components/animations/GlareHover";
import dynamic from "next/dynamic";

const TearTicket = dynamic(() => import("@/components/micro/TearTicket"), {
  ssr: false,
});

interface PackagesSectionProps {
  onOpenInquiry: (packageName?: string) => void;
}

type CategoryType = "ALL" | "BRAND" | "CREATIVE" | "COMBOS" | "DEMO" | "TABLE";

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onOpenInquiry }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("ALL");
  const [isAdvanceBilling, setIsAdvanceBilling] = useState<boolean>(true);
  const [matrixTab, setMatrixTab] = useState<"brand" | "creative">("brand");

  return (
    <section id="pricing" className="relative py-20 lg:py-28 bg-black overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[750px] w-[1100px] rounded-full bg-crimson/[0.07] blur-[190px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-10 h-[500px] w-[500px] rounded-full bg-blue-500/[0.03] blur-[160px] -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <Eyebrow>Official Plans &amp; Transparent Rate Card // Anivel Media</Eyebrow>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.92]">
              Choose Your <span className="text-crimson">Growth Stage.</span>
            </h2>
          </div>

          <div className="max-w-md space-y-2.5 text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            <p>
              Engineered for measurable commercial outcomes. From single video sprints to high-velocity creative cadences and full brand ecosystem retainers.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-crimson/40 bg-crimson/15 px-3 py-1 font-mono text-[10px] text-rose-200 uppercase font-bold tracking-wider">
                <Sparkles className="h-3 w-3 text-crimson" />
                <span>We Also Offer Custom Plans</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-zinc-300">
                <Info className="h-3 w-3 text-zinc-400" />
                <span>Zero Hidden Fees</span>
              </span>
            </div>
          </div>
        </div>

        {/* Global Policy Notice Banner directly from Official Plan Document */}
        <div className="rounded-[14px] border border-crimson/30 bg-[#0E060A] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-crimson/20 border border-crimson/40 text-crimson">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-200 block">
                Official Plan Policy &amp; Notice:
              </span>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                <strong>Boost and Ad Costs</strong> are not included in the plan fees and are paid directly by the customer through their ad account.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-zinc-300 shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
            <span>Event Shoots: Custom Plans Available</span>
          </div>
        </div>

        {/* Category Switcher Tabs & Kinetic Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {[
              { id: "ALL", label: "All Plans View", badge: "Complete" },
              { id: "BRAND", label: "Brand Retainers", badge: "3 Tiers" },
              { id: "CREATIVE", label: "Creative Plans", badge: "5 Tiers" },
              { id: "COMBOS", label: "Combos & A La Carte", badge: "Video Packs" },
              { id: "DEMO", label: "Demo Plan", badge: "₹850 Trial" },
              { id: "TABLE", label: "Full Spec Table", badge: "Matrix" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as CategoryType)}
                className={`shrink-0 rounded-[10px] px-3.5 sm:px-4 py-2.5 min-h-[44px] font-display text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeCategory === tab.id
                    ? "bg-crimson text-white shadow-crimson-glow border border-crimson"
                    : "bg-surface-card text-zinc-400 border border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[9px] tracking-normal ${
                      activeCategory === tab.id
                        ? "bg-black/30 text-white"
                        : "bg-white/5 text-zinc-400"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Kinetic 3D Selector (Desktop / Tablet) */}
          <div className="hidden sm:flex items-center gap-5 self-start lg:self-center">
            <div className="text-right">
              <span className="font-mono text-[10px] font-bold tracking-widest text-crimson uppercase block">
                KINETIC SELECTOR
              </span>
              <span className="font-display text-[11px] text-zinc-400 uppercase tracking-wider">
                Dial Tier
              </span>
            </div>
            <WheelSelector
              activeTier={activeCategory}
              onSelect={(tier) => setActiveCategory(tier as CategoryType)}
            />
          </div>
        </div>

        {/* =========================================================================
            TIER 01: BRAND PLANS (High Growth & Retainer)
        ========================================================================= */}
        {(activeCategory === "ALL" || activeCategory === "BRAND") && (
          <div className="space-y-8 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-crimson/40 bg-crimson/15 px-3 py-1 font-mono text-[10px] text-rose-200 uppercase tracking-wider font-bold mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
                  <span>Category 01 &bull; Full Ecosystem Retainers</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white">
                  Brand Growth Retainers
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl font-sans leading-relaxed">
                  End-to-end partner retainers: full brand analysis, 4K camera shoots, post-production edits, custom thumbnails, ad campaign management, and weekly/bi-weekly leadership strategy calls.
                </p>
              </div>

              {/* 3-Month Advance Discount Switcher */}
              <div className="p-1.5 rounded-xl border border-white/10 bg-[#09090E] inline-flex items-center gap-2 self-start sm:self-auto shrink-0 shadow-lg">
                <button
                  onClick={() => setIsAdvanceBilling(true)}
                  className={`rounded-lg px-3 py-2 font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isAdvanceBilling
                      ? "bg-crimson text-white shadow-crimson-glow"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>3-Month Advance (Save ₹2,500/mo)</span>
                </button>
                <button
                  onClick={() => setIsAdvanceBilling(false)}
                  className={`rounded-lg px-3 py-2 font-mono text-xs font-bold transition-all ${
                    !isAdvanceBilling
                      ? "bg-white/10 text-white border border-white/20"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Standard Monthly
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              
              {/* BRAND PLAN 01: ₹7,500 Regular / ₹5,000 Advance */}
              <GlareHover
                borderRadius="16px"
                glareColor="#FFFFFF"
                glareOpacity={0.2}
                glareSize={250}
                className="h-full"
              >
                <div className="group rounded-[16px] border border-white/10 bg-[#08080C] p-6 sm:p-8 flex flex-col justify-between h-full transition-all duration-300 hover:border-white/30">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                        BRAND PLAN 01
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-zinc-300">
                        Steady Growth
                      </span>
                    </div>

                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-4xl sm:text-5xl font-black text-white">
                          ₹{isAdvanceBilling ? "5,000" : "7,500"}
                        </span>
                        <span className="font-mono text-xs text-zinc-400 uppercase">
                          / month
                        </span>
                      </div>
                      <p className="font-mono text-xs mt-1.5 text-zinc-400">
                        {isAdvanceBilling ? (
                          <>
                            <span className="text-emerald-400 font-bold">3-Month Advance Purchase</span> &bull; Regular:{" "}
                            <span className="line-through text-zinc-500">₹7,500/mo</span>
                          </>
                        ) : (
                          "Standard monthly billing &bull; Switch to 3-month advance to save ₹2,500/mo"
                        )}
                      </p>
                    </div>

                    {/* Core Deliverable Metric Chips */}
                    <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-[10px] border border-white/5 bg-white/[0.02] text-center font-mono text-xs">
                      <div>
                        <span className="block font-bold text-white text-base">8</span>
                        <span className="text-[10px] text-zinc-400 uppercase">Reels</span>
                      </div>
                      <div>
                        <span className="block font-bold text-white text-base">2</span>
                        <span className="text-[10px] text-zinc-400 uppercase">Ads</span>
                      </div>
                      <div>
                        <span className="block font-bold text-white text-base">7</span>
                        <span className="text-[10px] text-zinc-400 uppercase">Posts</span>
                      </div>
                    </div>

                    {/* Inclusions List - Exact PDF Specifications */}
                    <div className="space-y-2 pt-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-bold block">
                        Included In Plan 01:
                      </span>
                      {[
                        "5 Video Concepts + 10 Extra Topics with script",
                        "20 Total Scripts (Retention hooks & CTAs)",
                        "10 Total Video Shoots & 10 Total Video Edits",
                        "10 Custom Thumbnail Covers",
                        "2+ Ads Run & Ad Campaign Management",
                        "4 Weeks (28 Days) Page Handling",
                        "Basic Brand Research & Analysis",
                        "Basic Content Quality & All Reports/Analysis",
                        "Simple Performance Marketing",
                        "2 Strategy Review Meetings per Month",
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <Check className="h-3.5 w-3.5 text-crimson shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 mt-6 border-t border-white/[0.06]">
                    <button
                      onClick={() => onOpenInquiry("Brand Growth Plan 01 (₹7,500 / ₹5,000 Advance)")}
                      className="w-full rounded-[10px] border border-white/30 bg-white/10 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-crimson hover:bg-crimson shadow-sm"
                    >
                      Select Plan 01 &rarr;
                    </button>
                  </div>
                </div>
              </GlareHover>

              {/* BRAND PLAN 02: ₹10,000 Regular / ₹7,500 Advance (Electric Border Flagship Highlight) */}
              <ElectricBorder
                color="#CB2957"
                speed={1.1}
                chaos={0.12}
                borderRadius={16}
                className="h-full"
              >
                <div className="relative group rounded-[16px] border border-crimson/60 bg-[#0E090D] p-6 sm:p-8 flex flex-col justify-between h-full shadow-[0_15px_50px_-10px_rgba(203,41,87,0.35)]">
                  {/* Highlight Badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-[6px] bg-crimson px-4 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-crimson-glow flex items-center gap-1.5 z-10">
                    <Sparkles className="h-3 w-3" />
                    <span>Most Selected Brand Retainer</span>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-crimson">
                        BRAND PLAN 02
                      </span>
                      <span className="rounded-full border border-crimson/40 bg-crimson/20 px-2.5 py-0.5 font-mono text-[10px] text-rose-200">
                        Flagship
                      </span>
                    </div>

                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-4xl sm:text-5xl font-black text-white">
                          ₹{isAdvanceBilling ? "7,500" : "10,000"}
                        </span>
                        <span className="font-mono text-xs text-rose-200 uppercase">
                          / month
                        </span>
                      </div>
                      <p className="font-mono text-xs mt-1.5 text-rose-300">
                        {isAdvanceBilling ? (
                          <>
                            <span className="text-emerald-400 font-bold">3-Month Advance Purchase</span> &bull; Regular:{" "}
                            <span className="line-through text-zinc-400">₹10,000/mo</span>
                          </>
                        ) : (
                          "Standard monthly billing &bull; Save ₹2,500/mo with 3-month advance"
                        )}
                      </p>
                    </div>

                    {/* Core Deliverable Metric Chips */}
                    <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-[10px] border border-crimson/30 bg-crimson/15 text-center font-mono text-xs text-white">
                      <div>
                        <span className="block font-extrabold text-white text-base">12</span>
                        <span className="text-[10px] text-rose-200 uppercase">Reels</span>
                      </div>
                      <div>
                        <span className="block font-extrabold text-white text-base">3</span>
                        <span className="text-[10px] text-rose-200 uppercase">Ads</span>
                      </div>
                      <div>
                        <span className="block font-extrabold text-white text-base">7</span>
                        <span className="text-[10px] text-rose-200 uppercase">Posts</span>
                      </div>
                    </div>

                    {/* Inclusions List - Exact PDF Specifications */}
                    <div className="space-y-2 pt-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-rose-300 font-bold block">
                        Included In Plan 02:
                      </span>
                      {[
                        "7 Video Concepts + 10 Extra Topics with script",
                        "25 Total Scripts (Retention hooks & storyboards)",
                        "15 Total Video Shoots & 15 Total Video Edits",
                        "15 Custom Click-Optimized Thumbnails",
                        "3+ Ads Run & Ad Campaign Management",
                        "4 Weeks (28 Days) Dedicated Page Handling",
                        "Standard Brand Research & Audience Forensics",
                        "Standard Content Quality & Full Reporting",
                        "Standard Performance Marketing Strategy",
                        "3 Strategy Review Meetings per Month",
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-100">
                          <Check className="h-3.5 w-3.5 text-crimson shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 mt-6 border-t border-white/10">
                    <button
                      onClick={() => onOpenInquiry("Brand Growth Plan 02 (₹10,000 / ₹7,500 Advance)")}
                      className="w-full rounded-[10px] bg-crimson py-3.5 font-display text-xs font-extrabold uppercase tracking-wider text-white shadow-crimson-glow transition-all hover:bg-crimson-600 hover:shadow-crimson-lg"
                    >
                      Apply For Plan 02 &rarr;
                    </button>
                  </div>
                </div>
              </ElectricBorder>

              {/* BRAND PLAN 03: ₹12,500 Regular / ₹10,000 Advance */}
              <GlareHover
                borderRadius="16px"
                glareColor="#FFFFFF"
                glareOpacity={0.2}
                glareSize={250}
                className="h-full"
              >
                <div className="group rounded-[16px] border border-white/10 bg-[#08080C] p-6 sm:p-8 flex flex-col justify-between h-full transition-all duration-300 hover:border-white/30">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                        BRAND PLAN 03
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-zinc-300">
                        Full Dominance
                      </span>
                    </div>

                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-4xl sm:text-5xl font-black text-white">
                          ₹{isAdvanceBilling ? "10,000" : "12,500"}
                        </span>
                        <span className="font-mono text-xs text-zinc-400 uppercase">
                          / month
                        </span>
                      </div>
                      <p className="font-mono text-xs mt-1.5 text-zinc-400">
                        {isAdvanceBilling ? (
                          <>
                            <span className="text-emerald-400 font-bold">3-Month Advance Purchase</span> &bull; Regular:{" "}
                            <span className="line-through text-zinc-500">₹12,500/mo</span>
                          </>
                        ) : (
                          "Standard monthly billing &bull; Save ₹2,500/mo with 3-month advance"
                        )}
                      </p>
                    </div>

                    {/* Core Deliverable Metric Chips */}
                    <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-[10px] border border-white/5 bg-white/[0.02] text-center font-mono text-xs">
                      <div>
                        <span className="block font-bold text-white text-base">17</span>
                        <span className="text-[10px] text-zinc-400 uppercase">Reels</span>
                      </div>
                      <div>
                        <span className="block font-bold text-white text-base">5</span>
                        <span className="text-[10px] text-zinc-400 uppercase">Ads</span>
                      </div>
                      <div>
                        <span className="block font-bold text-white text-base">10</span>
                        <span className="text-[10px] text-zinc-400 uppercase">Posts</span>
                      </div>
                    </div>

                    {/* Inclusions List - Exact PDF Specifications */}
                    <div className="space-y-2 pt-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-bold block">
                        Included In Plan 03:
                      </span>
                      {[
                        "10 Video Concepts + 10 Extra Topics with script",
                        "32 Total Scripts (Advanced viral scripting)",
                        "22 Total Video Shoots & 22 Total Video Edits",
                        "22 Custom Thumbnails & Carousels",
                        "5+ Ads Run & Ad Campaign Management",
                        "1 Calendar Month Dedicated Account Handling",
                        "Advanced Brand Research & In-Depth Forensics",
                        "Advanced Content Quality & Complete Analysis",
                        "Advanced Performance Marketing & Funnel Optimization",
                        "Weekly Meeting Every Week on a Fixed Day",
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <Check className="h-3.5 w-3.5 text-crimson shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 mt-6 border-t border-white/[0.06]">
                    <button
                      onClick={() => onOpenInquiry("Brand Growth Plan 03 (₹12,500 / ₹10,000 Advance)")}
                      className="w-full rounded-[10px] border border-white/30 bg-white/10 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-crimson hover:bg-crimson shadow-sm"
                    >
                      Scale With Plan 03 &rarr;
                    </button>
                  </div>
                </div>
              </GlareHover>

            </div>

            {/* Note on Extra Topics with Script from PDF */}
            <div className="rounded-[12px] border border-white/10 bg-[#07070B] p-4 text-xs font-mono text-zinc-400 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-crimson shrink-0" />
              <span>
                <strong>Extra Topics with Script:</strong> If the customer needs Video Shoot and Edit for these extra topics, we charge extra according to the shoot. This charge is discounted compared to individual plans.
              </span>
            </div>
          </div>
        )}

        {/* =========================================================================
            TIER 02: CREATIVE PLANS (All 5 Tiers: ₹1,100 to ₹4,500)
        ========================================================================= */}
        {(activeCategory === "ALL" || activeCategory === "CREATIVE") && (
          <div className="space-y-8 pt-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-crimson/40 bg-crimson/15 px-3 py-1 font-mono text-[10px] text-rose-200 uppercase tracking-wider font-bold mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
                <span>Category 02 &bull; High Frequency Monthly Content (5 Tiers)</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white">
                Creative Plans
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl font-sans leading-relaxed">
                Structured monthly content creation packs with scriptwriting, shoots, edits, cover thumbnails, boost ad setup, and social page improvements.
              </p>
            </div>

            {/* 5-Column Grid for All 5 Creative Tiers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
              {[
                {
                  price: "₹1,100",
                  title: "Creative 1",
                  reels: "2 Reels",
                  ads: "1 Ad",
                  posts: "5 Posts",
                  concepts: "3 Concepts",
                  topics: "5 New Topics",
                  scripts: "3 + 1 Scripts",
                  shoots: "3 Video Shoots",
                  edits: "3 Video Edits",
                  boost: "1 + 1 Boost Ads",
                  handling: "Basic Page Handling & Improvement",
                  popular: false,
                },
                {
                  price: "₹1,200",
                  title: "Creative 2",
                  reels: "3 Reels",
                  ads: "1 Ad",
                  posts: "5 Posts",
                  concepts: "3 Concepts",
                  topics: "5 New Topics",
                  scripts: "4 + 1 Scripts",
                  shoots: "4 Video Shoots",
                  edits: "4 Video Edits",
                  boost: "1 + 1 Boost Ads",
                  handling: "Basic Page Handling & Improvement",
                  popular: false,
                },
                {
                  price: "₹2,100",
                  title: "Creative 3",
                  reels: "4 Reels",
                  ads: "1 Ad",
                  posts: "7 Posts",
                  concepts: "4 Concepts",
                  topics: "5 New Topics",
                  scripts: "5 + 2 Scripts",
                  shoots: "5 Video Shoots",
                  edits: "5 Video Edits",
                  boost: "1 + 2 Boost Ads",
                  handling: "Standard Page Handling & Improvement",
                  popular: false,
                },
                {
                  price: "₹3,100",
                  title: "Creative 4",
                  reels: "6 Reels",
                  ads: "2 Ads",
                  posts: "10 Posts",
                  concepts: "5 Concepts",
                  topics: "7 New Topics",
                  scripts: "8 + 3 Scripts",
                  shoots: "8 Video Shoots",
                  edits: "8 Video Edits",
                  boost: "2 + 3 Boost Ads",
                  handling: "Standard Page Handling & Improvement",
                  popular: true,
                },
                {
                  price: "₹4,500",
                  title: "Creative 5",
                  reels: "8 Reels",
                  ads: "3 Ads",
                  posts: "15 Posts",
                  concepts: "6 Concepts",
                  topics: "10 New Topics",
                  scripts: "11 + 4 Scripts",
                  shoots: "11 Video Shoots",
                  edits: "11 Video Edits",
                  boost: "3 + 4 Boost Ads",
                  handling: "Advanced Page Handling & Improvement",
                  popular: false,
                },
              ].map((plan, idx) => (
                <div
                  key={idx}
                  className={`group rounded-[14px] p-5 flex flex-col justify-between transition-all duration-300 relative ${
                    plan.popular
                      ? "border-2 border-crimson bg-[#0F080C] shadow-[0_10px_35px_-5px_rgba(203,41,87,0.3)] md:-translate-y-2"
                      : "border border-white/10 bg-[#08080C] hover:border-white/30 hover:-translate-y-1"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-crimson px-3 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-white shadow-crimson-glow flex items-center gap-1 z-10 whitespace-nowrap">
                      <Flame className="h-2.5 w-2.5" />
                      <span>Most Popular</span>
                    </div>
                  )}

                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                        {plan.title}
                      </span>
                      <span className="font-mono text-[10px] text-crimson font-bold">
                        Monthly
                      </span>
                    </div>

                    <div>
                      <span className="font-display text-3xl font-black text-white">
                        {plan.price}
                      </span>
                      <span className="font-mono text-[11px] text-zinc-500 uppercase ml-1">
                        / mo
                      </span>
                    </div>

                    {/* Quick Metric Pills */}
                    <div className="py-2.5 px-3 rounded-[8px] bg-white/[0.03] border border-white/5 font-mono text-xs text-zinc-300 space-y-1">
                      <div className="flex justify-between font-bold text-white">
                        <span>{plan.reels}</span>
                        <span className="text-crimson font-extrabold">{plan.ads}</span>
                      </div>
                      <div className="text-[10px] text-zinc-400">
                        {plan.posts} &bull; All Thumbnails
                      </div>
                    </div>

                    {/* Detailed Specifications from PDF */}
                    <div className="space-y-1.5 pt-2 border-t border-white/[0.06] text-xs text-zinc-300 font-sans">
                      <div className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-crimson shrink-0" />
                        <span>{plan.concepts}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-crimson shrink-0" />
                        <span>{plan.topics}</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-rose-200 font-bold">
                        <Check className="h-3.5 w-3.5 text-crimson shrink-0" />
                        <span>{plan.scripts}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-crimson shrink-0" />
                        <span>{plan.shoots}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-crimson shrink-0" />
                        <span>{plan.edits}</span>
                      </div>
                      <div className="flex items-center gap-2 text-rose-300 font-mono font-bold">
                        <Check className="h-3.5 w-3.5 text-crimson shrink-0" />
                        <span>{plan.boost}</span>
                      </div>
                      <div className="flex items-start gap-2 text-[11px] text-zinc-400 pt-2 border-t border-white/5">
                        <Zap className="h-3.5 w-3.5 text-crimson shrink-0 mt-0.5" />
                        <span>{plan.handling}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-white/[0.06]">
                    <button
                      onClick={() => onOpenInquiry(`Creative Plan ${plan.title} (${plan.price}/mo)`)}
                      className={`w-full rounded-[8px] py-2.5 font-display text-[11px] font-bold uppercase tracking-wider transition-all ${
                        plan.popular
                          ? "bg-crimson text-white shadow-crimson-glow hover:bg-crimson-600"
                          : "border border-white/20 bg-white/5 text-white hover:border-crimson hover:bg-crimson"
                      }`}
                    >
                      Select Plan &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TIER 03: COMBOS & A LA CARTE (Fast Turnaround Services)
        ========================================================================= */}
        {(activeCategory === "ALL" || activeCategory === "COMBOS") && (
          <div className="space-y-8 pt-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-crimson/40 bg-crimson/15 px-3 py-1 font-mono text-[10px] text-rose-200 uppercase tracking-wider font-bold mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
                <span>Category 03 &bull; Fast-Turnaround Video Sprints</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white">
                Combo Packs &amp; A La Carte
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl font-sans leading-relaxed">
                Need single video assets or bundled production stages without a recurring retainer? Choose our modular, flat-priced video packages.
              </p>
            </div>

            {/* Combos Row (3 Official Combos from Page 1 of PDF) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              
              {/* Combo 01: Concept + Shoot + Edit = RS 1000/- */}
              <div className="rounded-[16px] border border-crimson/50 bg-[#0E080C] p-6 sm:p-7 flex flex-col justify-between relative shadow-[0_8px_30px_rgba(203,41,87,0.15)] group hover:border-crimson transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-crimson uppercase">
                      Combo Plan 01 &bull; Full Stack
                    </span>
                    <span className="rounded-full bg-crimson/20 border border-crimson/40 px-2.5 py-0.5 font-mono text-[9px] text-rose-200 font-bold">
                      Save ₹300
                    </span>
                  </div>

                  <div>
                    <span className="font-display text-4xl font-black text-white">₹1,000</span>
                    <span className="font-mono text-xs text-zinc-400 ml-2">/ Video Asset</span>
                  </div>

                  <div className="p-3 rounded-lg bg-black/50 border border-crimson/30 space-y-1 font-mono text-xs text-rose-200 font-bold">
                    Video Concept + Video Shoot + Video Editing
                  </div>

                  <div className="space-y-2 text-xs text-zinc-300 pt-2 border-t border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-crimson shrink-0" />
                      <span>Angle Ideation, Hook Research &amp; Script</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-crimson shrink-0" />
                      <span>Cinema 4K Camera Shoot &amp; Lighting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-crimson shrink-0" />
                      <span>Full Post-Production Editing, Sound FX &amp; Captions</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06]">
                  <button
                    onClick={() => onOpenInquiry("Combo 01: Concept + Shoot + Edit (₹1,000)")}
                    className="w-full rounded-[8px] bg-crimson py-3 font-display text-xs font-bold uppercase tracking-wider text-white shadow-crimson-glow hover:bg-crimson-600 transition-all"
                  >
                    Select Full Stack Combo &rarr;
                  </button>
                </div>
              </div>

              {/* Combo 02: Shoot + Edit = RS 750/- */}
              <div className="rounded-[16px] border border-white/10 bg-[#08080C] p-6 sm:p-7 flex flex-col justify-between group hover:border-white/30 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-zinc-400 uppercase">
                      Combo Plan 02 &bull; Production
                    </span>
                    <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 font-mono text-[9px] text-zinc-300">
                      Save ₹250
                    </span>
                  </div>

                  <div>
                    <span className="font-display text-4xl font-black text-white">₹750</span>
                    <span className="font-mono text-xs text-zinc-400 ml-2">/ Video Asset</span>
                  </div>

                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1 font-mono text-xs text-zinc-300 font-bold">
                    Video Shoot + Video Editing
                  </div>

                  <div className="space-y-2 text-xs text-zinc-300 pt-2 border-t border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-crimson shrink-0" />
                      <span>Client Provides Script</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-crimson shrink-0" />
                      <span>Professional 4K Video Production Shoot</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-crimson shrink-0" />
                      <span>High-Pacing Video Editing &amp; Color Grade</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06]">
                  <button
                    onClick={() => onOpenInquiry("Combo 02: Shoot + Edit (₹750)")}
                    className="w-full rounded-[8px] border border-white/20 bg-white/5 py-3 font-display text-xs font-bold uppercase tracking-wider text-white hover:border-crimson hover:bg-crimson transition-all"
                  >
                    Select Shoot + Edit &rarr;
                  </button>
                </div>
              </div>

              {/* Combo 03: Concept + Edit = RS 700/- */}
              <div className="rounded-[16px] border border-white/10 bg-[#08080C] p-6 sm:p-7 flex flex-col justify-between group hover:border-white/30 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-zinc-400 uppercase">
                      Combo Plan 03 &bull; Creative &amp; Post
                    </span>
                    <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 font-mono text-[9px] text-zinc-300">
                      Save ₹100
                    </span>
                  </div>

                  <div>
                    <span className="font-display text-4xl font-black text-white">₹700</span>
                    <span className="font-mono text-xs text-zinc-400 ml-2">/ Video Asset</span>
                  </div>

                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1 font-mono text-xs text-zinc-300 font-bold">
                    Video Concept + Video Editing
                  </div>

                  <div className="space-y-2 text-xs text-zinc-300 pt-2 border-t border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-crimson shrink-0" />
                      <span>Concept Ideation &amp; Retention Script</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-crimson shrink-0" />
                      <span>Client Provides Raw Video Footage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-crimson shrink-0" />
                      <span>High-Pacing Video Editing, Audio Polish &amp; Captions</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06]">
                  <button
                    onClick={() => onOpenInquiry("Combo 03: Concept + Edit (₹700)")}
                    className="w-full rounded-[8px] border border-white/20 bg-white/5 py-3 font-display text-xs font-bold uppercase tracking-wider text-white hover:border-crimson hover:bg-crimson transition-all"
                  >
                    Select Concept + Edit &rarr;
                  </button>
                </div>
              </div>

            </div>

            {/* Individual Video Plans (A La Carte from Page 1 of PDF) */}
            <div className="rounded-[16px] border border-white/10 bg-[#09090E] p-6 sm:p-8 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-crimson block">
                    A La Carte Menu
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl font-black uppercase text-white mt-0.5">
                    Individual Video Plans
                  </h4>
                </div>
                <span className="font-mono text-xs text-zinc-400">
                  Flat transparent rates per individual asset
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between hover:border-white/20 transition-all">
                  <div className="space-y-1">
                    <h5 className="font-display font-bold text-sm text-white uppercase">Video Concept</h5>
                    <p className="text-xs text-zinc-400">Angle ideation, hook research &amp; script</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <span className="font-display text-2xl font-black text-white">₹300/-</span>
                    <button
                      onClick={() => onOpenInquiry("A La Carte: Video Concept (₹300)")}
                      className="block font-mono text-[10px] text-crimson hover:underline mt-1 font-bold text-right"
                    >
                      Book Concept &rarr;
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between hover:border-white/20 transition-all">
                  <div className="space-y-1">
                    <h5 className="font-display font-bold text-sm text-white uppercase">Video Shoot</h5>
                    <p className="text-xs text-zinc-400">Camera gear, framing &amp; lighting setup</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <span className="font-display text-2xl font-black text-white">₹500/-</span>
                    <button
                      onClick={() => onOpenInquiry("A La Carte: Video Shoot (₹500)")}
                      className="block font-mono text-[10px] text-crimson hover:underline mt-1 font-bold text-right"
                    >
                      Book Shoot &rarr;
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between hover:border-white/20 transition-all">
                  <div className="space-y-1">
                    <h5 className="font-display font-bold text-sm text-white uppercase">Video Editing</h5>
                    <p className="text-xs text-zinc-400">Retention pacing, sound FX, color grade</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <span className="font-display text-2xl font-black text-white">₹500/-</span>
                    <button
                      onClick={() => onOpenInquiry("A La Carte: Video Editing (₹500)")}
                      className="block font-mono text-[10px] text-crimson hover:underline mt-1 font-bold text-right"
                    >
                      Book Edit &rarr;
                    </button>
                  </div>
                </div>
              </div>

              {/* Event Shoots Note from PDF */}
              <div className="pt-2 text-xs font-mono text-rose-300 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
                <span>
                  <strong>For Event Shoots:</strong> Contact us directly for custom plans and quotes based on venue and crew.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TIER 04: DEMO TRIAL (Try Anivel Flat ₹850)
        ========================================================================= */}
        {(activeCategory === "ALL" || activeCategory === "DEMO") && (
          <div className="space-y-6 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-crimson/40 bg-crimson/15 px-3 py-1 font-mono text-[10px] text-rose-200 uppercase tracking-wider font-bold mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
                  <span>Category 04 &bull; 1-Time VIP Test Drive</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-white">
                  Demo Plan // Try Anivel
                </h3>
              </div>
              <span className="font-mono text-xs text-zinc-400">
                Experience our creative speed and strategic rigor before committing
              </span>
            </div>

            <div className="flex flex-col xl:flex-row items-stretch gap-6 sm:gap-8 justify-between">
              {/* Interactive TearTicket Pass */}
              <div className="w-full xl:w-auto flex justify-center items-center py-2 shrink-0">
                <TearTicket
                  image="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop"
                  imageAlt="Anivel Media 4K Production"
                  width={480}
                  height={250}
                  stubSize={150}
                  radius={16}
                  holes={10}
                  roughness={1}
                  tilt={true}
                  background="#0A0A0E"
                  stubBackground="#160810"
                  borderColor="rgba(203, 41, 87, 0.45)"
                  onTear={() => onOpenInquiry("Try Anivel (₹850 Demo Pass)")}
                  stub={
                    <div className="flex flex-col justify-between h-full p-3.5 text-center select-none">
                      <div className="space-y-0.5">
                        <span className="font-mono text-[9px] text-crimson font-black uppercase tracking-widest block">
                          DEMO PASS
                        </span>
                        <span className="font-mono text-[9px] text-zinc-300 uppercase tracking-wider block font-bold">
                          ADMIT ONE
                        </span>
                      </div>
                      <div>
                        <span className="font-display text-2xl sm:text-3xl font-black text-white">
                          ₹850/-
                        </span>
                        <span className="block font-mono text-[9px] text-rose-300 uppercase mt-0.5 font-bold">
                          Flat 1-Time
                        </span>
                      </div>
                      <div className="rounded-[6px] border border-crimson/50 bg-crimson/20 py-1 px-2 font-mono text-[9px] text-white font-bold tracking-wider uppercase">
                        Drag To Tear &rarr;
                      </div>
                    </div>
                  }
                >
                  <div className="p-4 sm:p-5 h-full flex flex-col justify-between select-none">
                    <div>
                      <div className="inline-flex items-center gap-1.5 rounded-[6px] border border-crimson/40 bg-crimson/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-rose-200">
                        <Sparkles className="h-3 w-3 text-crimson" />
                        <span>Official Demo Deliverables</span>
                      </div>
                      <h4 className="font-display text-xl sm:text-2xl font-black uppercase text-white mt-1.5">
                        DEMO SPRINT
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                        Proof-of-concept sprint: 2 reels, 1 ad, video concepts with scripts &amp; brand research.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono text-zinc-300 pt-2 border-t border-white/[0.08]">
                      <span>✓ 2 Reels</span>
                      <span>✓ 1 Targeted Ad</span>
                      <span>✓ 3 Concepts + Scripts</span>
                      <span>✓ Brand Research</span>
                    </div>
                  </div>
                </TearTicket>
              </div>

              {/* Exact Deliverables from Page 1 of PDF */}
              <div className="w-full xl:flex-1 rounded-[16px] border border-white/10 bg-[#08080C] p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-crimson font-bold block">
                    Fast-Track Proof of Concept &bull; RS 850/-
                  </span>
                  <h4 className="font-display text-2xl sm:text-3xl font-black uppercase text-white">
                    Official Demo Plan Deliverables:
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                    Designed for founders and brands who want to evaluate our script hooks, video edits, and research before committing to a larger plan.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/[0.06]">
                  {[
                    { label: "Price", val: "RS 850/- (Flat 1-Time)" },
                    { label: "Reels", val: "2 High-Retention Dynamic Reels" },
                    { label: "Ads", val: "1 Targeted Ad Campaign" },
                    { label: "Video Concept", val: "3 Videos With Scripts" },
                    { label: "Insta Page Guide", val: "Basic Changes to Improve Profile & Bio" },
                    { label: "Brand Research", val: "Find Pain Areas & Content Strategy" },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-white/5 bg-white/[0.02] flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-crimson shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <span className="font-mono text-zinc-400 block text-[10px] uppercase font-bold">{item.label}</span>
                        <span className="text-zinc-200 font-sans font-medium">{item.val}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={() => onOpenInquiry("Try Anivel (₹850 Demo Pass)")}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-crimson px-8 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white hover:bg-crimson-600 transition-colors shadow-crimson-glow"
                  >
                    <span>Claim Demo Plan (₹850) &rarr;</span>
                  </button>
                  <span className="font-mono text-[11px] text-zinc-500">
                    Or drag and tear the VIP pass on the left
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TIER 05: FULL SPEC MATRIX TABLE VIEW (Official PDF Side-by-Side Comparison)
        ========================================================================= */}
        {(activeCategory === "ALL" || activeCategory === "TABLE") && (
          <div className="space-y-6 pt-6 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-crimson/40 bg-crimson/15 px-3 py-1 font-mono text-[10px] text-rose-200 uppercase tracking-wider font-bold mb-2">
                  <Table className="h-3 w-3 text-crimson" />
                  <span>Comprehensive Matrix &bull; Official Document View</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white">
                  Side-By-Side Spec Matrix
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl font-sans">
                  Direct specification breakdown matching the official Anivel Media rate card. Compare deliverables across all tiers.
                </p>
              </div>

              {/* Table Mode Switcher: Brand Plans vs Creative Plans */}
              <div className="p-1 rounded-xl border border-white/10 bg-[#09090E] inline-flex items-center gap-1 self-start sm:self-auto shrink-0">
                <button
                  onClick={() => setMatrixTab("brand")}
                  className={`rounded-lg px-4 py-2 font-display text-xs font-bold uppercase tracking-wider transition-all ${
                    matrixTab === "brand"
                      ? "bg-crimson text-white shadow-crimson-glow"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Brand Plans Matrix
                </button>
                <button
                  onClick={() => setMatrixTab("creative")}
                  className={`rounded-lg px-4 py-2 font-display text-xs font-bold uppercase tracking-wider transition-all ${
                    matrixTab === "creative"
                      ? "bg-crimson text-white shadow-crimson-glow"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Creative Plans Matrix (5 Tiers)
                </button>
              </div>
            </div>

            {/* BRAND PLANS MATRIX TABLE */}
            {matrixTab === "brand" && (
              <div className="rounded-[16px] border border-white/10 bg-[#07070A] overflow-hidden shadow-2xl">
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-[#0D090E]">
                        <th className="p-4 sm:p-5 font-mono text-[11px] uppercase tracking-wider text-zinc-400 w-1/4">
                          Specification
                        </th>
                        <th className="p-4 sm:p-5 font-display text-base uppercase text-white tracking-wider w-1/4">
                          <div>Brand Plan 01</div>
                          <div className="font-mono text-xs text-zinc-400 font-normal">RS 7,500/-</div>
                        </th>
                        <th className="p-4 sm:p-5 font-display text-base uppercase text-crimson tracking-wider w-1/4 bg-crimson/[0.08] border-x border-crimson/30">
                          <div className="flex items-center gap-1.5">
                            <span>Brand Plan 02</span>
                            <span className="rounded-full bg-crimson px-2 py-0.2 font-mono text-[8px] text-white">FLAGSHIP</span>
                          </div>
                          <div className="font-mono text-xs text-rose-200 font-normal">RS 10,000/-</div>
                        </th>
                        <th className="p-4 sm:p-5 font-display text-base uppercase text-white tracking-wider w-1/4">
                          <div>Brand Plan 03</div>
                          <div className="font-mono text-xs text-zinc-400 font-normal">RS 12,500/-</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-zinc-300">
                      <tr className="bg-emerald-950/20 text-emerald-300 font-bold">
                        <td className="p-4 font-sans text-xs">Discounts (3-Mo Advance Purchase)</td>
                        <td className="p-4">RS 5,000/- /mo</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30 text-rose-200">RS 7,500/- /mo</td>
                        <td className="p-4">RS 10,000/- /mo</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Reels</td>
                        <td className="p-4">8</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30 font-bold text-white">12</td>
                        <td className="p-4 font-bold text-white">17</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Ads</td>
                        <td className="p-4">2</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30 text-crimson font-bold">3</td>
                        <td className="p-4 text-crimson font-bold">5</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Post</td>
                        <td className="p-4">7</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30">7</td>
                        <td className="p-4">10</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Video Concept</td>
                        <td className="p-4">5</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30 font-bold text-white">7</td>
                        <td className="p-4 font-bold text-white">10</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Extra Topics with script</td>
                        <td className="p-4">10</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30">10</td>
                        <td className="p-4">10</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Total Scripts</td>
                        <td className="p-4">20</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30 font-bold text-white">25</td>
                        <td className="p-4 font-bold text-white">32</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Total Video Shoots</td>
                        <td className="p-4">10</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30 font-bold text-white">15</td>
                        <td className="p-4 font-bold text-white">22</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Total Video Edits</td>
                        <td className="p-4">10</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30 font-bold text-white">15</td>
                        <td className="p-4 font-bold text-white">22</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Thumbnail</td>
                        <td className="p-4">10</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30 font-bold text-white">15</td>
                        <td className="p-4 font-bold text-white">22</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Ads Run</td>
                        <td className="p-4">2 + Customization</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30 text-rose-200 font-bold">3 + Customization</td>
                        <td className="p-4 text-rose-200 font-bold">5 + Customization</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Ad Handling</td>
                        <td className="p-4 text-emerald-400">All</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30 text-emerald-400 font-bold">All</td>
                        <td className="p-4 text-emerald-400 font-bold">All</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Page Handling</td>
                        <td className="p-4">4 Weeks (28 Days)</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30">4 Weeks (28 Days)</td>
                        <td className="p-4 font-bold text-white">1 Calendar Month</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Page Improvement</td>
                        <td className="p-4">Basic</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30">Standard</td>
                        <td className="p-4 font-bold text-crimson">Advanced</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Brand Research &amp; Analysis</td>
                        <td className="p-4">Basic</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30">Standard</td>
                        <td className="p-4 font-bold text-crimson">Advanced</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Content Quality</td>
                        <td className="p-4">Basic</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30">Standard</td>
                        <td className="p-4 font-bold text-crimson">Advanced</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">All Reports &amp; Analysis</td>
                        <td className="p-4">Basic</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30">Standard</td>
                        <td className="p-4 font-bold text-crimson">Advanced</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Performance Marketing</td>
                        <td className="p-4">Simple</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30">Standard</td>
                        <td className="p-4 font-bold text-crimson">Advanced</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Weekly Strategy Meeting</td>
                        <td className="p-4">2 Meetings / Month</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30 font-bold text-white">3 Meetings / Month</td>
                        <td className="p-4 font-bold text-rose-200">Every Week on a Fixed Day</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="bg-[#0A070D] border-t border-white/10">
                        <td className="p-4 font-sans font-bold text-white">Action</td>
                        <td className="p-4">
                          <button
                            onClick={() => onOpenInquiry("Brand Growth Plan 01")}
                            className="rounded-[6px] border border-white/20 bg-white/5 px-3 py-1.5 font-display text-[10px] font-bold uppercase text-white hover:border-crimson hover:bg-crimson transition-all"
                          >
                            Choose Plan 01
                          </button>
                        </td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30">
                          <button
                            onClick={() => onOpenInquiry("Brand Growth Plan 02")}
                            className="rounded-[6px] bg-crimson px-3 py-1.5 font-display text-[10px] font-bold uppercase text-white shadow-crimson-glow hover:bg-crimson-600 transition-all"
                          >
                            Choose Plan 02
                          </button>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => onOpenInquiry("Brand Growth Plan 03")}
                            className="rounded-[6px] border border-white/20 bg-white/5 px-3 py-1.5 font-display text-[10px] font-bold uppercase text-white hover:border-crimson hover:bg-crimson transition-all"
                          >
                            Choose Plan 03
                          </button>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {/* CREATIVE PLANS MATRIX TABLE */}
            {matrixTab === "creative" && (
              <div className="rounded-[16px] border border-white/10 bg-[#07070A] overflow-hidden shadow-2xl">
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-[#0D090E]">
                        <th className="p-4 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                          Specification
                        </th>
                        <th className="p-4 font-display text-sm uppercase text-white tracking-wider">
                          RS 1100/-
                        </th>
                        <th className="p-4 font-display text-sm uppercase text-white tracking-wider">
                          RS 1200/-
                        </th>
                        <th className="p-4 font-display text-sm uppercase text-white tracking-wider">
                          RS 2100/-
                        </th>
                        <th className="p-4 font-display text-sm uppercase text-crimson tracking-wider bg-crimson/[0.08] border-x border-crimson/30">
                          <div>RS 3100/-</div>
                          <span className="font-mono text-[8px] text-rose-200">POPULAR</span>
                        </th>
                        <th className="p-4 font-display text-sm uppercase text-white tracking-wider">
                          RS 4500/-
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-zinc-300">
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Reels</td>
                        <td className="p-4">2</td>
                        <td className="p-4">3</td>
                        <td className="p-4">4</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30 font-bold text-white">6</td>
                        <td className="p-4 font-bold text-white">8</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Ads</td>
                        <td className="p-4">1</td>
                        <td className="p-4">1</td>
                        <td className="p-4">1</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30 text-crimson font-bold">2</td>
                        <td className="p-4 text-crimson font-bold">3</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Post</td>
                        <td className="p-4">5</td>
                        <td className="p-4">5</td>
                        <td className="p-4">7</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30">10</td>
                        <td className="p-4">15</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Video Concept</td>
                        <td className="p-4">3</td>
                        <td className="p-4">3</td>
                        <td className="p-4">4</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30">5</td>
                        <td className="p-4">6</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">New Topics</td>
                        <td className="p-4">5</td>
                        <td className="p-4">5</td>
                        <td className="p-4">5</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30">7</td>
                        <td className="p-4">10</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Scripts</td>
                        <td className="p-4">3 + 1</td>
                        <td className="p-4">4 + 1</td>
                        <td className="p-4">5 + 2</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30 font-bold text-white">8 + 3</td>
                        <td className="p-4 font-bold text-white">11 + 4</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Video Shoots</td>
                        <td className="p-4">3</td>
                        <td className="p-4">4</td>
                        <td className="p-4">5</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30 font-bold text-white">8</td>
                        <td className="p-4 font-bold text-white">11</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Edits</td>
                        <td className="p-4">3</td>
                        <td className="p-4">4</td>
                        <td className="p-4">5</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30 font-bold text-white">8</td>
                        <td className="p-4 font-bold text-white">11</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Thumbnail</td>
                        <td className="p-4 text-emerald-400">All</td>
                        <td className="p-4 text-emerald-400">All</td>
                        <td className="p-4 text-emerald-400">All</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30 text-emerald-400 font-bold">All</td>
                        <td className="p-4 text-emerald-400 font-bold">All</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Ads Run</td>
                        <td className="p-4">1 + 1 Boost</td>
                        <td className="p-4">1 + 1 Boost</td>
                        <td className="p-4">1 + 2 Boost</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30 text-rose-200 font-bold">2 + 3 Boost</td>
                        <td className="p-4 text-rose-200 font-bold">3 + 4 Boost</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Ads Handling</td>
                        <td className="p-4" colSpan={5}>Only Ad Campaign Management across all plans</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Page Handling</td>
                        <td className="p-4">Basic</td>
                        <td className="p-4">Basic</td>
                        <td className="p-4">Standard</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30">Standard</td>
                        <td className="p-4 font-bold text-crimson">Advanced</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-sans font-medium text-white">Page Improvement</td>
                        <td className="p-4">Basic</td>
                        <td className="p-4">Basic</td>
                        <td className="p-4">Standard</td>
                        <td className="p-4 bg-crimson/[0.08] border-x border-crimson/30">Standard</td>
                        <td className="p-4 font-bold text-crimson">Advanced</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="bg-[#0A070D] border-t border-white/10">
                        <td className="p-4 font-sans font-bold text-white">Action</td>
                        {[
                          { title: "Creative 1", price: "₹1,100" },
                          { title: "Creative 2", price: "₹1,200" },
                          { title: "Creative 3", price: "₹2,100" },
                          { title: "Creative 4", price: "₹3,100", highlight: true },
                          { title: "Creative 5", price: "₹4,500" },
                        ].map((btn, bidx) => (
                          <td
                            key={bidx}
                            className={`p-4 ${btn.highlight ? "bg-crimson/[0.08] border-x border-crimson/30" : ""}`}
                          >
                            <button
                              onClick={() => onOpenInquiry(`Creative Plan ${btn.title} (${btn.price})`)}
                              className={`rounded-[6px] px-3 py-1.5 font-display text-[10px] font-bold uppercase transition-all ${
                                btn.highlight
                                  ? "bg-crimson text-white shadow-crimson-glow hover:bg-crimson-600"
                                  : "border border-white/20 bg-white/5 text-white hover:border-crimson hover:bg-crimson"
                              }`}
                            >
                              Choose {btn.price}
                            </button>
                          </td>
                        ))}
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            IMPORTANT POLICIES & TRANSPARENCY CONDITIONS
        ========================================================================= */}
        <div className="rounded-[16px] border border-white/10 bg-[#09090E] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-zinc-200 font-bold font-display uppercase tracking-wider text-sm">
            <ShieldCheck className="h-5 w-5 text-crimson" />
            <span>Important Engagement Disclosures &amp; Custom Plans</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-white/[0.06] text-xs text-zinc-400 font-sans leading-relaxed">
            <div className="space-y-1.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-white font-bold block">
                01 // Ad Spend &amp; Boost Policy
              </span>
              <p>
                Boost and Ad costs are not included in the plan fees and are paid directly by the customer through their ad account.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-white font-bold block">
                02 // Custom Tailored Plans
              </span>
              <p>
                Need higher reel volumes, specialized influencer collaborations, or omni-channel management? We construct custom bespoke plans.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-white font-bold block">
                03 // Event Shoots &amp; Commercials
              </span>
              <p>
                Full commercial on-location shoots, product launches, and event coverage are quoted separately based on production crew and gear requirements.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
