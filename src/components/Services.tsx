"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Eyebrow } from "@/components/ui/Typography";
import { editorialEase } from "@/lib/motion";

interface ServicesProps {
  onOpenInquiry: (initialService?: string) => void;
}

interface ServiceCardItem {
  number: string;
  title: string;
  description: string;
  scopeTags: string[];
  desktopSpan: string; // e.g. "lg:col-span-7"
  patternType: "grid" | "diagonal" | "dots" | "circuit" | "radial";
}

const SERVICES: ServiceCardItem[] = [
  {
    number: "01",
    title: "SOCIAL MEDIA",
    description: "Page management, content planning, publishing and growth.",
    scopeTags: ["Page Management", "Content Planning", "Publishing", "Growth"],
    desktopSpan: "lg:col-span-6",
    patternType: "grid",
  },
  {
    number: "02",
    title: "CONTENT CREATION",
    description: "Reels, posts, thumbnails, scripts and creative concepts.",
    scopeTags: ["Reels", "Static Posts", "Thumbnails", "Scripts", "Concepts"],
    desktopSpan: "lg:col-span-6",
    patternType: "radial",
  },
  {
    number: "03",
    title: "GROWTH & ADS",
    description: "Meta Ads, boosting, campaign planning and optimization.",
    scopeTags: ["Meta Ads", "Audience Targeting", "Budget Scaling", "Optimization"],
    desktopSpan: "lg:col-span-4",
    patternType: "diagonal",
  },
  {
    number: "04",
    title: "STRATEGY",
    description: "Brand analysis, competitor research, audience research and growth planning.",
    scopeTags: ["Brand Analysis", "Competitor Forensics", "Audience Research", "Growth Roadmap"],
    desktopSpan: "lg:col-span-4",
    patternType: "dots",
  },
  {
    number: "05",
    title: "WEBSITE DEVELOPMENT",
    description: "Static websites, business websites and full-stack websites.",
    scopeTags: ["Next.js", "Business Websites", "Full-Stack Web Apps", "Performance SEO"],
    desktopSpan: "lg:col-span-4",
    patternType: "circuit",
  },
  {
    number: "06",
    title: "BRANDING",
    description: "Logo design, visual identity, social profile optimization and creative direction.",
    scopeTags: ["Logo Design", "Visual Identity", "Profile Revamp", "Creative Direction"],
    desktopSpan: "lg:col-span-4",
    patternType: "dots",
  },
  {
    number: "07",
    title: "PROFESSIONAL SHOOTS",
    description: "Product shoots, event shoots, campaign shoots and Reel production.",
    scopeTags: ["4K Cinema Shoots", "Product Stills", "Campaign Films", "Reel Production"],
    desktopSpan: "lg:col-span-4",
    patternType: "radial",
  },
  {
    number: "08",
    title: "EVENT CONTENT",
    description: "Event coverage, short-form content and promotional campaigns.",
    scopeTags: ["On-Ground Coverage", "Fast-Turnaround Drops", "Event Promos", "Social Teasers"],
    desktopSpan: "lg:col-span-4",
    patternType: "diagonal",
  },
];

export const Services: React.FC<ServicesProps> = ({ onOpenInquiry }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="services" className="relative py-20 lg:py-28 bg-black overflow-hidden border-t border-white/5">
      {/* Background Soft Crimson Radial Light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[1000px] rounded-full bg-crimson/[0.07] blur-[180px] -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <Eyebrow>Capabilities // Full-Spectrum Digital Unit</Eyebrow>

            {/* Exact Requested Headline */}
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.92]">
              One Creative Team.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-crimson">
                Multiple Digital Needs.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            Eliminate the friction of managing fragmented freelancers. ANIVEL MEDIA operates as an integrated creative, growth, and engineering squad calibrated for your brand.
          </p>
        </div>

        {/* Asymmetric Desktop Bento Grid (Varied Card Sizes) / Mobile Vertical Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          {SERVICES.map((service, idx) => {
            const isHovered = hoveredCard === service.number;

            return (
              <div
                key={service.number}
                onMouseEnter={() => setHoveredCard(service.number)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onOpenInquiry(service.title)}
                className={`group relative flex flex-col justify-between rounded-[14px] border transition-all duration-300 cursor-pointer overflow-hidden p-5 sm:p-8 select-none min-h-[200px] ${
                  service.desktopSpan
                } ${
                  isHovered
                    ? "scale-[1.015] border-crimson/60 bg-[#0E0E14] shadow-[0_15px_45px_-10px_rgba(203,41,87,0.3)] z-10"
                    : "border-white/[0.08] bg-[#08080C] hover:border-white/20"
                }`}
              >
                {/* Background Visual Patterns (Revealed on Hover) */}
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 -z-10 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {service.patternType === "grid" && (
                    <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                  )}
                  {service.patternType === "diagonal" && (
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, rgba(203, 41, 87, 0.15) 0, rgba(203, 41, 87, 0.15) 1px, transparent 0, transparent 16px)",
                      }}
                    />
                  )}
                  {service.patternType === "dots" && (
                    <div
                      className="absolute inset-0 opacity-25"
                      style={{
                        backgroundImage:
                          "radial-gradient(rgba(203, 41, 87, 0.4) 1px, transparent 1px)",
                        backgroundSize: "14px 14px",
                      }}
                    />
                  )}
                  {service.patternType === "radial" && (
                    <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-crimson/25 blur-2xl" />
                  )}
                  {service.patternType === "circuit" && (
                    <div className="absolute inset-0 bg-grid-pattern opacity-25" />
                  )}
                </div>

                {/* Crimson Visual Accent: Glowing top edge bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-crimson to-transparent transition-opacity duration-300 ${
                    isHovered ? "opacity-100 shadow-[0_0_10px_#CB2957]" : "opacity-0"
                  }`}
                />

                {/* Card Top: Number & Arrow */}
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <span
                      className={`font-mono text-sm sm:text-base font-black transition-colors duration-300 ${
                        isHovered ? "text-crimson" : "text-zinc-500"
                      }`}
                    >
                      {service.number}
                    </span>

                    {/* Arrow with subtle hover translation */}
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-[8px] border transition-all duration-300 ${
                        isHovered
                          ? "border-crimson bg-crimson text-white shadow-crimson-glow"
                          : "border-white/10 bg-white/5 text-zinc-400"
                      }`}
                    >
                      <ArrowUpRight
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isHovered ? "translate-x-0.5 -translate-y-0.5" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3
                    className={`font-display text-xl sm:text-2xl lg:text-[26px] font-black uppercase tracking-tight transition-colors duration-300 break-words leading-tight ${
                      isHovered ? "text-white" : "text-zinc-200"
                    }`}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Card Bottom: Description & Scope Tags (Always legible on mobile, interactive on desktop) */}
                <div className="mt-4 pt-4 border-t border-white/[0.05]">
                  <p
                    className={`text-xs sm:text-sm font-sans leading-relaxed transition-all duration-300 ${
                      isHovered
                        ? "text-zinc-200 opacity-100"
                        : "text-zinc-300 opacity-100 md:text-zinc-400 md:opacity-80 md:line-clamp-2"
                    }`}
                  >
                    {service.description}
                  </p>

                  {/* Scope Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5 pt-1">
                    {service.scopeTags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-[6px] border px-2 py-0.5 font-mono text-[10px] transition-colors duration-300 ${
                          isHovered
                            ? "border-crimson/30 bg-crimson/10 text-rose-200"
                            : "border-white/10 bg-white/5 text-zinc-300 md:border-white/5 md:bg-white/[0.02] md:text-zinc-500"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Final CTA Banner */}
        <div className="mt-16 rounded-[16px] border border-white/10 bg-gradient-to-r from-[#0C0C10] via-[#0E0A0D] to-[#0C0C10] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-crimson/20 blur-3xl" />

          <div className="space-y-2 text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-crimson font-bold">
              Bespoke Engagements &bull; Tailored Deliverables
            </span>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight">
              Need Something Custom?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              From standalone 4K shoot sessions to dedicated Next.js web platforms, we build modular scopes calibrated for your targets.
            </p>
          </div>

          <button
            onClick={() => onOpenInquiry("Custom Engagement")}
            className="shrink-0 inline-flex items-center gap-2.5 rounded-[10px] bg-crimson px-8 py-4 font-display text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white shadow-crimson-glow transition-all duration-300 hover:bg-crimson-600 hover:shadow-crimson-lg hover:-translate-y-0.5"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
