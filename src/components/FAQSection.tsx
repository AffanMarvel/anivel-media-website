"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_DATA } from "@/data/agencyData";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { editorialEase } from "@/lib/motion";

interface FAQSectionProps {
  onOpenInquiry: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenInquiry }) => {
  // Allow at most 2 questions open at a time
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleFAQ = (idx: number) => {
    setOpenIndices((prev) => {
      if (prev.includes(idx)) {
        // Close it
        return prev.filter((i) => i !== idx);
      } else {
        // If already 2 items open, drop the oldest and keep max 2
        const updated = prev.length >= 2 ? [prev[1], idx] : [...prev, idx];
        return updated;
      }
    });
  };

  return (
    <section id="faq" className="relative py-20 lg:py-28 bg-[#000000] border-t border-white/10 overflow-hidden">
      {/* Subtle crimson ambient glow */}
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-crimson/5 blur-[160px] -z-10" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Editorial Header */}
        <div className="mb-14 space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="h-1.5 w-6 rounded-full bg-crimson" />
            <span className="font-mono text-xs uppercase tracking-widest text-crimson font-bold">
              Clarity &bull; Working With Us
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[0.95]">
            FREQUENTLY ASKED <span className="text-crimson">QUESTIONS.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            Direct, transparent answers regarding our plans, production standards, and workflow.
          </p>
        </div>

        {/* Accordion Stream (Clean, minimal, easy to scan) */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            const numStr = (idx + 1).toString().padStart(2, "0");

            return (
              <div
                key={idx}
                className={`transition-colors duration-200 ${
                  isOpen ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="group flex w-full items-center justify-between py-6 px-3 sm:px-4 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-baseline gap-3 pr-4 min-w-0 flex-1">
                    <span className={`font-mono text-xs sm:text-sm font-semibold transition-colors shrink-0 ${
                      isOpen ? "text-crimson" : "text-zinc-600 group-hover:text-zinc-400"
                    }`}>
                      {numStr}
                    </span>
                    <span className={`font-display text-base sm:text-lg font-bold transition-colors min-w-0 ${
                      isOpen ? "text-white" : "text-zinc-200 group-hover:text-white"
                    }`}>
                      {faq.question}
                    </span>
                  </div>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border transition-all duration-300 ${
                      isOpen
                        ? "border-crimson bg-crimson text-white rotate-180"
                        : "border-white/15 bg-white/5 text-zinc-400 group-hover:border-crimson/50 group-hover:text-white"
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.35, ease: editorialEase },
                        opacity: { duration: 0.25, ease: editorialEase },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pl-11 sm:pl-16 pr-4 sm:pr-8 pb-7 pt-1">
                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl font-normal">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Minimal Fast-Track Help Line */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-white/10 bg-[#09090C]">
          <div>
            <h3 className="font-display font-bold text-white text-base">
              Have an unanswered requirement or custom project?
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Connect directly with our strategy team for a fast 1-on-1 assessment.
            </p>
          </div>

          <button
            onClick={onOpenInquiry}
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-crimson px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-crimson-600 transition-colors shadow-crimson-glow"
          >
            <span>Ask Us Directly</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
