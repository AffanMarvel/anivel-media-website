"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  DisplayXL, 
  DisplayLarge, 
  H1, 
  H2, 
  H3, 
  BodyLarge, 
  Body, 
  Small, 
  Eyebrow,
  EditorialHeadline 
} from "@/components/ui/Typography";
import { Button, PrimaryCTA } from "@/components/ui/Button";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/Card";
import { BackgroundDepth } from "@/components/ui/BackgroundDepth";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowLeft, Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState<"all" | "typography" | "buttons" | "cards" | "colors">("all");

  return (
    <BackgroundDepth showGlowTop={true} showGlowCenter={true} showGrid={true}>
      <main className="min-h-screen text-[#EEEEEE] py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Navigation Back */}
        <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Live Website</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-crimson animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-crimson font-bold">
              ANIVEL MEDIA Design System v1.0
            </span>
          </div>
        </div>

        {/* Page Hero */}
        <div className="mb-20 space-y-4">
          <Eyebrow>Foundation &bull; Tokens &bull; Motion</Eyebrow>
          <DisplayLarge>Visual Design System</DisplayLarge>
          <BodyLarge className="max-w-2xl text-[#DDDDDD]">
            Strict dark-first architecture engineered for high-craft digital presence. Crafted with obsidian backgrounds, strategic crimson accents, tight grotesk editorial typography, and disciplined non-bouncy motion.
          </BodyLarge>
        </div>

        {/* Section 1: Color Palette Tokens */}
        <section className="mb-24 space-y-8">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-6 rounded-full bg-crimson" />
            <H2>01. Color Palette & Surface Tokens</H2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Swatch 1 */}
            <div className="rounded-[10px] border border-white/10 p-4 bg-black space-y-3">
              <div className="h-16 w-full rounded-[6px] bg-[#000000] border border-white/15" />
              <div>
                <span className="font-mono text-xs font-bold text-white block">Background</span>
                <span className="font-mono text-[11px] text-zinc-500">#000000 (Pure Obsidian)</span>
              </div>
            </div>

            {/* Swatch 2 */}
            <div className="rounded-[10px] border border-white/10 p-4 bg-surface-1 space-y-3">
              <div className="h-16 w-full rounded-[6px] bg-[#CB2957] shadow-crimson-glow" />
              <div>
                <span className="font-mono text-xs font-bold text-white block">Primary Accent</span>
                <span className="font-mono text-[11px] text-rose-300">#CB2957 (Crimson)</span>
              </div>
            </div>

            {/* Swatch 3 */}
            <div className="rounded-[10px] border border-white/10 p-4 bg-surface-1 space-y-3">
              <div className="h-16 w-full rounded-[6px] bg-[#EEEEEE]" />
              <div>
                <span className="font-mono text-xs font-bold text-white block">Primary Text</span>
                <span className="font-mono text-[11px] text-zinc-500">#EEEEEE</span>
              </div>
            </div>

            {/* Swatch 4 */}
            <div className="rounded-[10px] border border-white/10 p-4 bg-surface-1 space-y-3">
              <div className="h-16 w-full rounded-[6px] bg-[#DDDDDD]" />
              <div>
                <span className="font-mono text-xs font-bold text-white block">Secondary Text</span>
                <span className="font-mono text-[11px] text-zinc-500">#DDDDDD</span>
              </div>
            </div>

            {/* Swatch 5 */}
            <div className="rounded-[10px] border border-white/10 p-4 bg-surface-1 space-y-3">
              <div className="h-16 w-full rounded-[6px] bg-[#08080A] border border-white/10" />
              <div>
                <span className="font-mono text-xs font-bold text-white block">Surface 1 (Base)</span>
                <span className="font-mono text-[11px] text-zinc-500">#08080A</span>
              </div>
            </div>

            {/* Swatch 6 */}
            <div className="rounded-[10px] border border-white/10 p-4 bg-surface-1 space-y-3">
              <div className="h-16 w-full rounded-[6px] bg-[#0D0D11] border border-white/10" />
              <div>
                <span className="font-mono text-xs font-bold text-white block">Surface 2 (Elevated)</span>
                <span className="font-mono text-[11px] text-zinc-500">#0D0D11</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Typography Hierarchy & Stacked Editorial Headlines */}
        <section className="mb-24 space-y-10">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-6 rounded-full bg-crimson" />
            <H2>02. Typography Scale & Editorial Headlines</H2>
          </div>

          {/* Stacked Editorial Headline Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Card surface="surface-2" radius="md" className="p-8 space-y-6">
              <Eyebrow>Headline Style &bull; Example 01</Eyebrow>
              <EditorialHeadline
                lines={["WE", "BUILD", "BRANDS."]}
                highlightIndex={2}
                highlightClass="text-crimson"
                size="xl"
              />
              <Small className="pt-4 border-t border-white/10">
                Display XL (96px–115px), tight line-height (0.88), tracking-tighter. Strategic crimson accent on the anchor word.
              </Small>
            </Card>

            <Card surface="surface-2" radius="md" className="p-8 space-y-6">
              <Eyebrow>Headline Style &bull; Example 02</Eyebrow>
              <EditorialHeadline
                lines={["MAKE", "YOUR BRAND", "MOVE."]}
                highlightIndex={1}
                highlightClass="text-crimson"
                size="xl"
              />
              <Small className="pt-4 border-t border-white/10">
                Display XL multi-line stacked structure. Line-height calibrated so stacked lines lock together without colliding.
              </Small>
            </Card>
          </div>

          {/* Complete Scale Overview Table / List */}
          <Card surface="surface-1" radius="md" className="divide-y divide-white/5">
            <div className="p-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <span className="font-mono text-xs text-crimson uppercase tracking-wider w-40 shrink-0">
                Display Large
              </span>
              <DisplayLarge className="flex-1">Dominant Digital Authority</DisplayLarge>
              <span className="font-mono text-[11px] text-zinc-500 shrink-0">72px / lh 0.92</span>
            </div>

            <div className="p-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <span className="font-mono text-xs text-crimson uppercase tracking-wider w-40 shrink-0">
                H1 Headline
              </span>
              <H1 className="flex-1">Algorithmic Growth Engine</H1>
              <span className="font-mono text-[11px] text-zinc-500 shrink-0">48px / lh 1.05</span>
            </div>

            <div className="p-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <span className="font-mono text-xs text-crimson uppercase tracking-wider w-40 shrink-0">
                H2 Section
              </span>
              <H2 className="flex-1">Disciplined Sprint Production & Meta Testing</H2>
              <span className="font-mono text-[11px] text-zinc-500 shrink-0">34px / lh 1.15</span>
            </div>

            <div className="p-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <span className="font-mono text-xs text-crimson uppercase tracking-wider w-40 shrink-0">
                H3 Component
              </span>
              <H3 className="flex-1">Full-Stack Next.js Architecture with 99 Core Web Vitals</H3>
              <span className="font-mono text-[11px] text-zinc-500 shrink-0">22px / lh 1.25</span>
            </div>

            <div className="p-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <span className="font-mono text-xs text-crimson uppercase tracking-wider w-40 shrink-0">
                Body Large
              </span>
              <BodyLarge className="flex-1">
                We reject standard agency templates. By uniting cinema-grade 4K shoots with rigorous media buying, we position brands as category leaders.
              </BodyLarge>
              <span className="font-mono text-[11px] text-zinc-500 shrink-0">18px / lh 1.6</span>
            </div>

            <div className="p-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <span className="font-mono text-xs text-crimson uppercase tracking-wider w-40 shrink-0">
                Body Standard
              </span>
              <Body className="flex-1">
                High-definition reels, hook scripting, 3D/motion carousel designs, and full conversion funnel tracking.
              </Body>
              <span className="font-mono text-[11px] text-zinc-500 shrink-0">15px / lh 1.6</span>
            </div>

            <div className="p-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <span className="font-mono text-xs text-crimson uppercase tracking-wider w-40 shrink-0">
                Eyebrow / Label
              </span>
              <Eyebrow className="flex-1">Sprint Stage 01 &bull; Discovery & Audit</Eyebrow>
              <span className="font-mono text-[11px] text-zinc-500 shrink-0">11px / mono / 0.2em</span>
            </div>
          </Card>
        </section>

        {/* Section 3: Button System */}
        <section className="mb-24 space-y-8">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-6 rounded-full bg-crimson" />
            <H2>03. Button System & Interaction States</H2>
          </div>

          <Card surface="surface-1" radius="md" className="p-8 space-y-8">
            <div>
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-4">
                Primary Button & Standard CTA (`START A PROJECT →`)
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <PrimaryCTA size="lg" />
                <PrimaryCTA size="md" />
                <PrimaryCTA size="sm" />
                <Button variant="primary-white" size="md">
                  Explore Showreel
                </Button>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-4">
                Secondary Button (Transparent with thin border &bull; Transitions toward #CB2957 on hover)
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="secondary" size="lg">
                  Explore Our Work
                </Button>
                <Button variant="secondary" size="md">
                  View Case Studies
                </Button>
                <Button variant="secondary" size="sm">
                  Filter Sprints
                </Button>
                <Button variant="ghost" size="md">
                  Download Agency Deck
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Section 4: Card System & Editorial Radii */}
        <section className="mb-24 space-y-8">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-6 rounded-full bg-crimson" />
            <H2>04. Card System & Editorial Radii (6px–16px)</H2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Radius Sm (8px) */}
            <Card radius="sm" surface="surface-1" hoverEffect="lift">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase text-crimson font-bold">
                    Radius: 8px (sm)
                  </span>
                  <Sparkles className="h-4 w-4 text-crimson" />
                </div>
                <H3>Sharp Editorial Card</H3>
              </CardHeader>
              <CardBody>
                <Body className="text-xs text-zinc-400">
                  Used for technical modules, metric cards, and data badges where a crisp, razor-sharp architectural aesthetic is required.
                </Body>
              </CardBody>
              <CardFooter>
                <span className="font-mono text-[10px] text-zinc-500">Surface-1 (#08080A)</span>
              </CardFooter>
            </Card>

            {/* Radius Md (12px) */}
            <Card radius="md" surface="surface-2" hoverEffect="lift">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase text-crimson font-bold">
                    Radius: 12px (md)
                  </span>
                  <Zap className="h-4 w-4 text-crimson" />
                </div>
                <H3>Standard Capability Card</H3>
              </CardHeader>
              <CardBody>
                <Body className="text-xs text-zinc-400">
                  The primary workhorse radius for services, pricing tiers, and case study previews. Balanced, modern, and disciplined.
                </Body>
              </CardBody>
              <CardFooter>
                <span className="font-mono text-[10px] text-zinc-500">Surface-2 (#0D0D11)</span>
              </CardFooter>
            </Card>

            {/* Radius Lg (16px) */}
            <Card radius="lg" surface="surface-3" hoverEffect="lift">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase text-crimson font-bold">
                    Radius: 16px (lg)
                  </span>
                  <Layers className="h-4 w-4 text-crimson" />
                </div>
                <H3>Elevated Container Card</H3>
              </CardHeader>
              <CardBody>
                <Body className="text-xs text-zinc-400">
                  Maximum editorial radius (strictly below 18px). Used for full-width interactive modals, hero callouts, and pre-footer containers.
                </Body>
              </CardBody>
              <CardFooter>
                <span className="font-mono text-[10px] text-zinc-500">Surface-3 (#131318)</span>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Section 5: Reusable Motion System */}
        <section className="mb-20 space-y-8">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-6 rounded-sm bg-crimson" />
            <H2>05. Reusable Framer Motion Presets</H2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <Card surface="surface-1" radius="md" className="p-6 space-y-3">
                <Eyebrow>Preset: fadeUp</Eyebrow>
                <H3>Smooth Viewport Entrance</H3>
                <Body className="text-xs text-zinc-400">
                  Uses cubic-bezier [0.16, 1, 0.3, 1] for frictionless entry with y: 24 to 0 translation and opacity interpolation.
                </Body>
              </Card>
            </ScrollReveal>

            <ScrollReveal variant="textReveal" delay={0.2}>
              <Card surface="surface-1" radius="md" className="p-6 space-y-3">
                <Eyebrow>Preset: textReveal</Eyebrow>
                <H3>Masked Clip-Path Slide</H3>
                <Body className="text-xs text-zinc-400">
                  Reveals typography smoothly using a bottom clip-path mask (`inset(0 0 100% 0)` to `inset(0 0 0% 0)`), preventing layout jitter.
                </Body>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer info */}
        <div className="pt-10 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>ANIVEL MEDIA Design System &bull; Production Ready</span>
          <Link href="/" className="text-crimson hover:underline">
            View Live Homepage &rarr;
          </Link>
        </div>

      </main>
    </BackgroundDepth>
  );
}
