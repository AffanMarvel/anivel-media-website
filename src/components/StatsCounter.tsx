"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Lock, Users, Zap, CheckCircle2 } from "lucide-react";
import { editorialEase } from "@/lib/motion";

const OPERATIONAL_COMMITMENTS = [
  {
    icon: Lock,
    code: "COMMITMENT 01",
    title: "100% IP & Asset Ownership",
    description: "Zero licensing lock-ins. You retain full ownership of all raw footage, 4K master video exports, Figma UI files, and Next.js repositories.",
  },
  {
    icon: Users,
    code: "COMMITMENT 02",
    title: "Direct Senior Director Access",
    description: "No junior account managers or communication silos. You collaborate directly with experienced creative directors, editors, and engineers.",
  },
  {
    icon: Zap,
    code: "COMMITMENT 03",
    title: "Bi-Weekly Production Sprints",
    description: "Content is planned, shot, edited, and approved in structured two-week sprint batches so your channels never face content droughts.",
  },
  {
    icon: CheckCircle2,
    code: "COMMITMENT 04",
    title: "Transparent Scope, Zero Hidden Fees",
    description: "Clear fixed billing with itemized deliverables. Domain registration, hosting ownership, and ad spend accounts remain directly in your control.",
  },
];

export const StatsCounter: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-20 lg:py-28 bg-[#020204] border-y border-white/10 overflow-hidden">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[700px] rounded-full bg-crimson/5 blur-[160px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Intro Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="h-1.5 w-6 rounded-sm bg-crimson" />
            <span className="font-mono text-xs uppercase tracking-widest text-crimson font-bold">
              Agency Commitments &bull; Operational Standards
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            BUILT ON DISCIPLINE, <span className="text-crimson">NOT HYPE.</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            We operate on concrete delivery SLAs, radical communication transparency, and verified creative ownership.
          </p>
        </div>

        {/* Commitments Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {OPERATIONAL_COMMITMENTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: editorialEase }}
                className="relative overflow-hidden rounded-[12px] border border-white/10 bg-[#09090C] p-6 sm:p-7 text-left transition-all duration-300 hover:border-crimson/40 hover:shadow-crimson-glow group h-full flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-white/5 border border-white/10 text-crimson group-hover:border-crimson/50 group-hover:bg-crimson/10 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                      {item.code}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 font-mono text-[10px] text-emerald-400 uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-sm bg-emerald-400" />
                  <span>Guaranteed SLA Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Ethical Transparency Note */}
        <div className="mt-12 flex items-center justify-center gap-2 text-center text-[11px] font-mono text-zinc-500">
          <ShieldCheck className="h-3.5 w-3.5 text-crimson shrink-0" />
          <span>
            Every engagement is governed by formal statements of work with guaranteed turnaround timelines.
          </span>
        </div>

      </div>
    </section>
  );
};
