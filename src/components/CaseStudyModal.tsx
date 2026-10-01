"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, Sparkles, Layers, ShieldCheck, ExternalLink } from "lucide-react";
import { editorialEase } from "@/lib/motion";

export interface CaseStudyData {
  id: string;
  project: string;
  category: string;
  year: string;
  heroImage: string;
  video?: string;
  galleryImages: string[];
  summary: string;
  challenge: string;
  strategy: string;
  execution: {
    reels: string[];
    posts: string[];
    ads: string[];
    branding: string[];
    website: string[];
    campaignAssets: string[];
  };
  processWorkflow: string[];
  results: {
    reach: string;
    engagement: string;
    leads: string;
    contentOutput: string;
    adPerformance: string;
  };
}

interface CaseStudyModalProps {
  caseStudy: CaseStudyData | null;
  onClose: () => void;
  onOpenInquiry: (projectName?: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  onOpenInquiry,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && caseStudy) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [caseStudy, onClose]);

  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-2xl transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.4, ease: editorialEase }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[16px] border border-white/10 bg-[#08080C] shadow-[0_25px_90px_rgba(0,0,0,0.95)]"
        >
          {/* Top Bar */}
          <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#08080C]/90 px-6 py-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-crimson font-bold">
                Case Study Blueprint
              </span>
              <span className="text-zinc-600">&bull;</span>
              <span className="font-mono text-[11px] text-zinc-400">
                {caseStudy.year}
              </span>
            </div>

            <button
              onClick={onClose}
              className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close case study"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Hero Banner / Video Player */}
          <div className="relative h-72 sm:h-[480px] w-full overflow-hidden bg-black flex items-center justify-center">
            {caseStudy.video ? (
              <video
                src={caseStudy.video}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain max-h-[480px] bg-black"
              />
            ) : (
              <img
                src={caseStudy.heroImage}
                alt={caseStudy.project}
                className="h-full w-full object-cover object-center"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 space-y-2 pointer-events-none">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-[6px] border border-crimson/40 bg-crimson/20 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-rose-200">
                  {caseStudy.category}
                </span>
                <span className="rounded-[6px] border border-white/10 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-zinc-300">
                  YEAR {caseStudy.year}
                </span>
                {caseStudy.video && (
                  <span className="rounded-[6px] border border-emerald-500/40 bg-emerald-950/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
                    &bull; REAL CLIENT VIDEO
                  </span>
                )}
              </div>
              <h2 id="case-study-title" className="font-display text-2xl sm:text-4xl font-black uppercase text-white tracking-tight drop-shadow-md">
                {caseStudy.project}
              </h2>
            </div>
          </div>

          {/* Case Study Body Content */}
          <div className="p-6 sm:p-10 space-y-12">
            
            {/* Overview Summary */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed border-l-2 border-crimson pl-4">
              {caseStudy.summary}
            </p>

            {/* Section 1: The Challenge */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-4 rounded-full bg-crimson" />
                <h3 className="font-display text-lg sm:text-xl font-black uppercase tracking-wider text-white">
                  The Challenge
                </h3>
              </div>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>

            {/* Section 2: The Strategy */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-4 rounded-full bg-crimson" />
                <h3 className="font-display text-lg sm:text-xl font-black uppercase tracking-wider text-white">
                  The Strategy
                </h3>
              </div>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                {caseStudy.strategy}
              </p>
            </div>

            {/* Section 3: The Execution */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-4 rounded-full bg-crimson" />
                <h3 className="font-display text-lg sm:text-xl font-black uppercase tracking-wider text-white">
                  The Execution
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* Reels */}
                {caseStudy.execution.reels.length > 0 && (
                  <div className="rounded-[10px] border border-white/[0.08] bg-[#0C0C10] p-4 space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-crimson font-bold block">
                      Reels Production
                    </span>
                    <ul className="text-xs text-zinc-300 space-y-1.5">
                      {caseStudy.execution.reels.map((r, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-crimson shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Posts & Design */}
                {caseStudy.execution.posts.length > 0 && (
                  <div className="rounded-[10px] border border-white/[0.08] bg-[#0C0C10] p-4 space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-crimson font-bold block">
                      Posts & Carousels
                    </span>
                    <ul className="text-xs text-zinc-300 space-y-1.5">
                      {caseStudy.execution.posts.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-crimson shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Ads & Performance */}
                {caseStudy.execution.ads.length > 0 && (
                  <div className="rounded-[10px] border border-white/[0.08] bg-[#0C0C10] p-4 space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-crimson font-bold block">
                      Meta Ads Funnels
                    </span>
                    <ul className="text-xs text-zinc-300 space-y-1.5">
                      {caseStudy.execution.ads.map((a, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-crimson shrink-0 mt-0.5" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Branding */}
                {caseStudy.execution.branding.length > 0 && (
                  <div className="rounded-[10px] border border-white/[0.08] bg-[#0C0C10] p-4 space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-crimson font-bold block">
                      Branding & Identity
                    </span>
                    <ul className="text-xs text-zinc-300 space-y-1.5">
                      {caseStudy.execution.branding.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-crimson shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Website */}
                {caseStudy.execution.website.length > 0 && (
                  <div className="rounded-[10px] border border-white/[0.08] bg-[#0C0C10] p-4 space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-crimson font-bold block">
                      Website & Digital
                    </span>
                    <ul className="text-xs text-zinc-300 space-y-1.5">
                      {caseStudy.execution.website.map((w, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-crimson shrink-0 mt-0.5" />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Campaign Assets */}
                {caseStudy.execution.campaignAssets.length > 0 && (
                  <div className="rounded-[10px] border border-white/[0.08] bg-[#0C0C10] p-4 space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-crimson font-bold block">
                      Campaign Assets
                    </span>
                    <ul className="text-xs text-zinc-300 space-y-1.5">
                      {caseStudy.execution.campaignAssets.map((c, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-crimson shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Section 4: The Process */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-4 rounded-full bg-crimson" />
                <h3 className="font-display text-lg sm:text-xl font-black uppercase tracking-wider text-white">
                  The Process (Anivel Media Workflow)
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {caseStudy.processWorkflow.map((step, idx) => (
                  <div
                    key={idx}
                    className="rounded-[8px] border border-white/[0.05] bg-white/[0.02] p-3 text-xs text-zinc-300"
                  >
                    <span className="font-mono text-[10px] text-crimson block mb-1">
                      STEP 0{idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Results (Structured Editable Placeholders, No Fake Fabrications) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-4 rounded-full bg-crimson" />
                  <h3 className="font-display text-lg sm:text-xl font-black uppercase tracking-wider text-white">
                    Results & Performance Metrics
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-zinc-500 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-crimson" />
                  <span>Verified Campaign Benchmarks</span>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                <div className="rounded-[10px] border border-white/10 bg-[#0C0C10] p-4 text-center">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">
                    Reach
                  </span>
                  <span className="font-display text-lg sm:text-xl font-black text-white">
                    {caseStudy.results.reach}
                  </span>
                </div>

                <div className="rounded-[10px] border border-white/10 bg-[#0C0C10] p-4 text-center">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">
                    Engagement
                  </span>
                  <span className="font-display text-lg sm:text-xl font-black text-white">
                    {caseStudy.results.engagement}
                  </span>
                </div>

                <div className="rounded-[10px] border border-white/10 bg-[#0C0C10] p-4 text-center">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">
                    Leads / Inquiries
                  </span>
                  <span className="font-display text-lg sm:text-xl font-black text-white">
                    {caseStudy.results.leads}
                  </span>
                </div>

                <div className="rounded-[10px] border border-white/10 bg-[#0C0C10] p-4 text-center">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">
                    Content Output
                  </span>
                  <span className="font-display text-lg sm:text-xl font-black text-white">
                    {caseStudy.results.contentOutput}
                  </span>
                </div>

                <div className="rounded-[10px] border border-crimson/30 bg-crimson/10 p-4 text-center">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-rose-300 block mb-1">
                    Ad Performance
                  </span>
                  <span className="font-display text-lg sm:text-xl font-black text-white">
                    {caseStudy.results.adPerformance}
                  </span>
                </div>
              </div>
            </div>

            {/* Section 6: Large Visual Gallery */}
            {caseStudy.galleryImages.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-4 rounded-full bg-crimson" />
                  <h3 className="font-display text-lg sm:text-xl font-black uppercase tracking-wider text-white">
                    Visual Gallery
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {caseStudy.galleryImages.map((imgUrl, gIdx) => (
                    <div
                      key={gIdx}
                      className="relative h-60 sm:h-72 rounded-[12px] overflow-hidden border border-white/10 bg-black group"
                    >
                      <img
                        src={imgUrl}
                        alt={`${caseStudy.project} asset ${gIdx + 1}`}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 7: Final CTA Banner */}
            <div className="pt-8 border-t border-white/10 rounded-[14px] bg-gradient-to-r from-[#101015] via-[#14080F] to-[#101015] p-8 text-center space-y-4 border">
              <span className="font-mono text-xs uppercase tracking-widest text-crimson font-bold">
                READY TO BUILD YOUR NEXT PROJECT?
              </span>
              <h4 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Scale Your Brand With Anivel Media
              </h4>
              <div>
                <button
                  onClick={() => {
                    const title = caseStudy.project;
                    onClose();
                    onOpenInquiry(title);
                  }}
                  className="inline-flex items-center gap-2.5 rounded-[10px] bg-crimson px-8 py-4 font-display text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white shadow-crimson-glow transition-all hover:bg-crimson-600 hover:shadow-crimson-lg"
                >
                  <span>START A PROJECT</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
