"use client";

import React from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { PrimaryCTA, Button } from "@/components/ui/Button";
import {
  Sparkles,
  Cpu,
  TrendingUp,
  Award,
  Briefcase,
  GraduationCap,
  ExternalLink,
  CheckCircle2,
  Globe,
  Youtube,
  Instagram,
  Compass,
} from "lucide-react";

interface AboutSectionProps {
  onOpenInquiry: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenInquiry }) => {
  return (
    <section id="about" className="relative py-20 lg:py-28 bg-[#040406] border-t border-white/5 overflow-hidden">
      {/* Background Subtle Ambience */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-crimson/[0.08] blur-[170px] -z-10" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-[400px] w-[400px] rounded-full bg-blue-500/[0.04] blur-[150px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3">
            <Eyebrow>Leadership &bull; Founder &amp; Creative Director</Eyebrow>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight">
              Crafted By <span className="text-crimson">Affan Shaikh.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-zinc-400 leading-relaxed">
            ANIVEL MEDIA is architected and led by Affan Shaikh (Affan Kaze) — Digital Creator, Director, and Full-Stack Developer bridging cinematic artistry with algorithmic growth.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Founder Photo & Profile Identity Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md rounded-[20px] overflow-hidden border border-white/10 bg-[#09090E] p-3 shadow-2xl group transition-all duration-500 hover:border-crimson/50">
              
              {/* Photo Frame */}
              <div className="relative aspect-[4/5] w-full rounded-[16px] overflow-hidden bg-black/60">
                <Image
                  src="/brand/affan-shaikh.jpg"
                  alt="Affan Shaikh (Affan Kaze) - Founder & Creative Director of Anivel Media"
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
                
                {/* Tech overlays & badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-transparent to-black/20" />
                
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/80 backdrop-blur-md px-3 py-1 font-mono text-[10px] font-bold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    FOUNDER &bull; ACTIVE
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span className="font-mono text-[10px] text-zinc-400 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                    ID // AS-001
                  </span>
                </div>

                {/* Identity Tag at bottom of photo */}
                <div className="absolute bottom-5 left-5 right-5 space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-crimson font-bold block">
                    FOUNDER &bull; CREATIVE DIRECTOR
                  </span>
                  <h3 className="font-display text-2xl font-black text-white">
                    Affan Shaikh <span className="text-zinc-400 text-sm font-sans font-normal">(Affan Kaze)</span>
                  </h3>
                  <p className="text-xs text-zinc-300 font-sans">
                    Navsari, Gujarat, India &bull; 7+ Years in Digital Media
                  </p>
                </div>
              </div>

              {/* Founder Stats Mini-Strip */}
              <div className="grid grid-cols-4 gap-2 pt-3 pb-1 text-center font-mono">
                <div className="p-2 rounded-[8px] bg-white/[0.03] border border-white/5">
                  <span className="block font-display text-lg font-black text-white">7+</span>
                  <span className="block text-[9px] uppercase tracking-wider text-zinc-400">Years</span>
                </div>
                <div className="p-2 rounded-[8px] bg-white/[0.03] border border-white/5">
                  <span className="block font-display text-lg font-black text-white">100+</span>
                  <span className="block text-[9px] uppercase tracking-wider text-zinc-400">Projects</span>
                </div>
                <div className="p-2 rounded-[8px] bg-white/[0.03] border border-white/5">
                  <span className="block font-display text-lg font-black text-crimson">100K+</span>
                  <span className="block text-[9px] uppercase tracking-wider text-zinc-400">Audience</span>
                </div>
                <div className="p-2 rounded-[8px] bg-white/[0.03] border border-white/5">
                  <span className="block font-display text-lg font-black text-white">50+</span>
                  <span className="block text-[9px] uppercase tracking-wider text-zinc-400">Systems</span>
                </div>
              </div>

              {/* Direct Links to Personal Channels */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 px-1">
                <a
                  href="https://www.affankaze.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-crimson/15 border border-crimson/40 px-3 py-2 text-xs font-mono font-bold text-rose-200 hover:bg-crimson hover:text-white transition-all"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>affankaze.in</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                <a
                  href="https://instagram.com/AffanKaze"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Affan Shaikh Instagram"
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-all"
                >
                  <Instagram className="h-4 w-4" />
                </a>

                <a
                  href="https://youtube.com/@AffanMarvel"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Affan Marvel YouTube"
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-all"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Founder's Story, Experience & Strategic Pillars */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* The Mission & Philosophy */}
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-crimson font-bold block">
                The Architect&apos;s Vision
              </span>
              <blockquote className="rounded-xl border-l-2 border-crimson bg-white/[0.02] p-4 text-base sm:text-lg text-zinc-200 italic leading-relaxed">
                &ldquo;I am not just a creator — I am a builder. I build brands, audiences, systems, and stories. Between creative direction and technology lies the space where true impact happens.&rdquo;
              </blockquote>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                Affan started his journey in 2016 at age 14 during the Indian digital revolution. Guided by a fascination for storytelling, superhero lore, and technical development, he grew multiple digital platforms, amassing over 100K followers and engineering digital experiences for fast-scaling commercial brands.
              </p>
            </div>

            {/* Experience & Credentials Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="rounded-[12px] border border-white/10 bg-[#09090D] p-3.5 flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-crimson shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-xs uppercase text-white">Media Manager &bull; Adil Qadri</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Led creative video productions, high-converting ad concepts &amp; performance assets.
                  </p>
                </div>
              </div>

              <div className="rounded-[12px] border border-white/10 bg-[#09090D] p-3.5 flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-crimson shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-xs uppercase text-white">Assistant Manager &bull; Jio</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Spearheaded corporate telecom operations, system deployment &amp; operational scale.
                  </p>
                </div>
              </div>

              <div className="rounded-[12px] border border-white/10 bg-[#09090D] p-3.5 flex items-start gap-3">
                <GraduationCap className="h-5 w-5 text-crimson shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-xs uppercase text-white">BCA &amp; MCA in Computer Applications</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Naran Lala College &bull; Awarded Best React App &amp; Best Final Project.
                  </p>
                </div>
              </div>

              <div className="rounded-[12px] border border-white/10 bg-[#09090D] p-3.5 flex items-start gap-3">
                <Award className="h-5 w-5 text-crimson shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-xs uppercase text-white">Creator of AffanMarvel.in</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Built live entertainment platform with 100K+ reach and 50+ automated content workflows.
                  </p>
                </div>
              </div>
            </div>

            {/* The 3 Core Pillars */}
            <div className="pt-2 space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold block">
                How Affan Runs ANIVEL MEDIA:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Card surface="surface-1" radius="sm" hoverEffect="lift" className="p-3.5 space-y-1.5 border border-white/10">
                  <div className="flex items-center gap-2 text-crimson">
                    <Sparkles className="h-4 w-4" />
                    <span className="font-display font-bold text-xs uppercase text-white">Cinema Direction</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Cinema-grade 4K filming, retention scripting &amp; rapid editorial pacing.
                  </p>
                </Card>

                <Card surface="surface-1" radius="sm" hoverEffect="lift" className="p-3.5 space-y-1.5 border border-white/10">
                  <div className="flex items-center gap-2 text-crimson">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-display font-bold text-xs uppercase text-white">Growth Engine</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Systematic Meta ad testing, customer acquisition sandboxes &amp; CRO.
                  </p>
                </Card>

                <Card surface="surface-1" radius="sm" hoverEffect="lift" className="p-3.5 space-y-1.5 border border-white/10">
                  <div className="flex items-center gap-2 text-crimson">
                    <Cpu className="h-4 w-4" />
                    <span className="font-display font-bold text-xs uppercase text-white">Web Architecture</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Sub-second Next.js web applications, digital systems &amp; automations.
                  </p>
                </Card>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button variant="primary" onClick={onOpenInquiry}>
                Work With Affan&apos;s Team
              </Button>
              <a
                href="https://www.affankaze.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white hover:border-crimson hover:bg-crimson/10 transition-all"
              >
                <span>Read Full Biography &rarr;</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

