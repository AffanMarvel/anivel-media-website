"use client";

import React, { useState } from "react";
import { ArrowRight, Code2, Globe, Cpu, Check, Terminal, Layout, Shield } from "lucide-react";
import { Eyebrow } from "@/components/ui/Typography";

interface WebDevSectionProps {
  onOpenInquiry: (planName?: string) => void;
}

const WEB_PLANS = [
  {
    name: "BASIC WEBSITE",
    price: "₹1,100*",
    tagline: "Static Website",
    description: "Ultra-fast, clean modern single-page or multi-section landing page for direct brand credibility.",
    deliverables: [
      "Custom UI Design & Layout",
      "Mobile-First Responsive Build",
      "Speed Optimized & SEO Clean",
      "Direct WhatsApp / Call Routing",
    ],
    badge: "Static Architecture",
    codeSnippet: "// static_deploy.ts\nexport const site = {\n  speed: '0.3s',\n  seo: 'Clean Semantic'\n};",
  },
  {
    name: "BUSINESS WEBSITE",
    price: "₹2,200*",
    tagline: "Fully Functional Website",
    description: "Complete dynamic business website with dedicated pages, inquiry workflows, and 1-year support.",
    deliverables: [
      "Multi-Page Architecture",
      "Interactive Contact & Lead Forms",
      "Google Search Console & Analytics",
      "1-Year Support & Routine Content Changes",
    ],
    badge: "1-Year Support Included",
    codeSnippet: "// business_engine.tsx\nconst app = createSite({\n  support: '365 Days',\n  forms: 'Dynamic Routing'\n});",
    isPopular: true,
  },
  {
    name: "FULL-STACK",
    price: "₹3,500*",
    tagline: "Advanced Web Platform",
    description: "Enterprise-grade web application featuring an admin panel, dynamic content management, and 2-year warranty.",
    deliverables: [
      "Next.js App Router Full-Stack Engine",
      "Custom Secure Admin Management Panel",
      "Dynamic Database / CMS Integration",
      "2-Year Technical Support & Maintenance",
    ],
    badge: "2-Year Support Included",
    codeSnippet: "// fullstack_cluster.ts\nexport default async function Lab() {\n  return <AdminEngine auth={true} warranty='2y' />;\n}",
  },
];

export const WebDevSection: React.FC<WebDevSectionProps> = ({ onOpenInquiry }) => {
  const [activeTab, setActiveTab] = useState(1); // 0: STATIC, 1: FUNCTIONAL, 2: DYNAMIC, 3: FULL-STACK

  return (
    <section className="relative py-20 lg:py-28 bg-[#020204] overflow-hidden border-t border-white/5">
      {/* Background Tech Ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-crimson/[0.06] blur-[170px] -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <Eyebrow>Digital Engineering // Web Lab</Eyebrow>

            {/* Exact Requested Headline */}
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.92]">
              Your Brand Deserves A{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-crimson">
                Better Digital Home.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            We don&apos;t build bloated generic templates. We engineer high-performance web experiences with clean semantic code, sub-second loads, and conversion architecture.
          </p>
        </div>

        {/* Animated Architectural Progression: STATIC → FUNCTIONAL → DYNAMIC → FULL-STACK */}
        <div className="rounded-[14px] border border-white/10 bg-[#07070A] p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            <span>Engineering Evolution Spectrum</span>
            <span className="text-crimson font-bold">Lighthouse 95+ Standard</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
            {[
              { title: "STATIC", desc: "HTML5/CSS fast loading architecture", step: "01" },
              { title: "FUNCTIONAL", desc: "Interactive UI & contact workflows", step: "02" },
              { title: "DYNAMIC", desc: "API integrations & data feeds", step: "03" },
              { title: "FULL-STACK", desc: "Next.js engines with admin panels", step: "04" },
            ].map((item, idx) => (
              <div
                key={item.title}
                onClick={() => setActiveTab(idx)}
                className={`relative p-4 rounded-[10px] border transition-all duration-300 cursor-pointer ${
                  activeTab === idx
                    ? "border-crimson bg-crimson/10 shadow-crimson-glow"
                    : "border-white/[0.06] bg-black/50 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs text-zinc-500">PHASE {item.step}</span>
                  <span className={`h-1.5 w-1.5 rounded-full ${activeTab === idx ? "bg-crimson shadow-[0_0_6px_#CB2957]" : "bg-zinc-800"}`} />
                </div>
                <h3 className="font-display font-black text-sm sm:text-base uppercase text-white tracking-wider">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-1 leading-tight">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech-Forward Pricing Cards with Abstract Browser UI Windows */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {WEB_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[16px] border flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                plan.isPopular
                  ? "border-crimson/70 bg-[#0A070D] shadow-[0_15px_50px_-10px_rgba(203,41,87,0.3)]"
                  : "border-white/10 bg-[#08080C] hover:border-white/25 hover:-translate-y-1"
              }`}
            >
              <div>
                {/* Abstract Browser Chrome Top Bar */}
                <div className="flex items-center justify-between border-b border-white/[0.08] bg-black/60 px-5 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-2 rounded-[4px] border border-white/10 bg-white/[0.03] px-3 py-0.5 font-mono text-xs text-zinc-400">
                    <Globe className="h-3 w-3 text-crimson" />
                    <span className="truncate max-w-[220px]">anivel.dev/{plan.name.toLowerCase().replace(" ", "_")}</span>
                  </div>
                </div>

                {/* Abstract Code Terminal Snippet */}
                <div className="border-b border-white/[0.05] bg-[#050508] p-4 font-mono text-[11px] text-zinc-400 leading-relaxed overflow-x-auto select-none">
                  <pre className="text-zinc-300">
                    <code>{plan.codeSnippet}</code>
                  </pre>
                </div>

                {/* Card Content & Price */}
                <div className="p-6 sm:p-8 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-crimson">
                      {plan.name}
                    </span>
                    <span className="rounded-[4px] border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] text-zinc-400">
                      {plan.badge}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl sm:text-5xl font-black text-white">
                        {plan.price}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-rose-200 mt-1 font-semibold">
                      {plan.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-bold block">
                      Architecture Specifications:
                    </span>
                    {plan.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <Check className="h-3.5 w-3.5 text-crimson shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="p-6 sm:p-8 pt-0 mt-6">
                <button
                  onClick={() => onOpenInquiry(`Web Plan: ${plan.name} (${plan.price})`)}
                  className={`w-full rounded-[10px] py-3.5 font-display text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    plan.isPopular
                      ? "bg-crimson text-white shadow-crimson-glow hover:bg-crimson-600"
                      : "border border-white/15 bg-white/5 text-white hover:border-crimson hover:bg-crimson/10"
                  }`}
                >
                  <span>COMMISSION BUILD</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Required Disclaimer Notice */}
        <div className="rounded-[10px] border border-white/[0.06] bg-white/[0.02] p-4 flex items-center gap-3 text-xs text-zinc-400 font-mono">
          <Terminal className="h-4 w-4 text-crimson shrink-0" />
          <span>
            *Please note: Domain registration and cloud hosting server charges may be separate based on client architecture choices.
          </span>
        </div>

      </div>
    </section>
  );
};
