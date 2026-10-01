"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { 
  ArrowRight, 
  ArrowDown, 
  Sparkles, 
  Compass, 
  Clapperboard, 
  Share2, 
  Target, 
  Code2, 
  Palette, 
  Play 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { InteractiveOrbitalMark } from "@/components/InteractiveOrbitalMark";
import { editorialEase } from "@/lib/motion";

const MagicRings = dynamic(() => import("@/components/animations/MagicRings"), {
  ssr: false,
});

interface HeroProps {
  onOpenInquiry: () => void;
}

interface FloatingCardItem {
  id: string;
  title: string;
  category: string;
  stat: string;
  icon: React.ReactNode;
  initialX: number; // percentage or rem
  initialY: number;
  depth: number;    // parallax factor
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  // Mouse coordinate springs for interactive workspace
  const mouseX = useSpring(0, { stiffness: 150, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 25 });

  // Scroll parallax
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, 80]);
  const emblemY = useTransform(scrollY, [0, 600], [0, 120]);
  const cardsScrollY = useTransform(scrollY, [0, 600], [0, -50]);
  const indicatorOpacity = useTransform(scrollY, [0, 120], [1, 0]);

  // Pre-declare useTransform for each of the 7 floating cards (Rules of Hooks: no hooks in loops)
  // Card depths in order: content(22), strategy(-18), reels(30), social(-25), ads(26), web(-15), branding(20)
  const cardX0 = useTransform(mouseX, (v) => v * 22);
  const cardY0 = useTransform(mouseY, (v) => v * 22);
  const cardX1 = useTransform(mouseX, (v) => v * -18);
  const cardY1 = useTransform(mouseY, (v) => v * -18);
  const cardX2 = useTransform(mouseX, (v) => v * 30);
  const cardY2 = useTransform(mouseY, (v) => v * 30);
  const cardX3 = useTransform(mouseX, (v) => v * -25);
  const cardY3 = useTransform(mouseY, (v) => v * -25);
  const cardX4 = useTransform(mouseX, (v) => v * 26);
  const cardY4 = useTransform(mouseY, (v) => v * 26);
  const cardX5 = useTransform(mouseX, (v) => v * -15);
  const cardY5 = useTransform(mouseY, (v) => v * -15);
  const cardX6 = useTransform(mouseX, (v) => v * 20);
  const cardY6 = useTransform(mouseY, (v) => v * 20);

  const cardTransforms = [
    { x: cardX0, y: cardY0 },
    { x: cardX1, y: cardY1 },
    { x: cardX2, y: cardY2 },
    { x: cardX3, y: cardY3 },
    { x: cardX4, y: cardY4 },
    { x: cardX5, y: cardY5 },
    { x: cardX6, y: cardY6 },
  ];

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);

    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        if (!containerRef.current || window.matchMedia("(pointer: coarse)").matches) {
          ticking = false;
          return;
        }
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
        const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
        mouseX.set(x);
        mouseY.set(y);
        ticking = false;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // 7 Creative Discipline Nodes
  const floatingCards: FloatingCardItem[] = [
    {
      id: "content",
      title: "CONTENT",
      category: "4K Cinema & Stills",
      stat: "10-Bit Color",
      icon: <Clapperboard className="h-4 w-4 text-crimson" />,
      initialX: 58,
      initialY: 14,
      depth: 22,
      className: "hidden lg:flex",
    },
    {
      id: "strategy",
      title: "STRATEGY",
      category: "Competitor Intelligence",
      stat: "Audience ICP",
      icon: <Compass className="h-4 w-4 text-crimson" />,
      initialX: 82,
      initialY: 28,
      depth: -18,
      className: "hidden md:flex",
    },
    {
      id: "reels",
      title: "REELS",
      category: "High-Retention Video",
      stat: "42%+ Avg Watch",
      icon: <Play className="h-4 w-4 fill-crimson text-crimson" />,
      initialX: 62,
      initialY: 42,
      depth: 30,
      className: "hidden md:flex",
    },
    {
      id: "social",
      title: "SOCIAL",
      category: "Audience Retention",
      stat: "+140% Net Eng.",
      icon: <Share2 className="h-4 w-4 text-crimson" />,
      initialX: 85,
      initialY: 58,
      depth: -25,
      className: "hidden lg:flex",
    },
    {
      id: "ads",
      title: "ADS",
      category: "Meta Performance",
      stat: "4.2x ROAS Benchmark",
      icon: <Target className="h-4 w-4 text-crimson" />,
      initialX: 54,
      initialY: 68,
      depth: 26,
      className: "hidden md:flex",
    },
    {
      id: "web",
      title: "WEB",
      category: "Full-Stack Next.js",
      stat: "99 Lighthouse Score",
      icon: <Code2 className="h-4 w-4 text-crimson" />,
      initialX: 78,
      initialY: 82,
      depth: -15,
      className: "hidden lg:flex",
    },
    {
      id: "branding",
      title: "BRANDING",
      category: "Visual Identity Systems",
      stat: "Editorial Scale",
      icon: <Palette className="h-4 w-4 text-crimson" />,
      initialX: 72,
      initialY: 86,
      depth: 20,
      className: "hidden 2xl:flex",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[96vh] sm:min-h-screen flex flex-col justify-between pt-32 sm:pt-36 pb-12 overflow-hidden bg-black select-none"
    >
      {/* Background Animated Grid & Ambient Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20 -z-30" />

      {/* ReactBits Magic Rings Background (Optimized for 0 lag) */}
      <div className="pointer-events-none absolute inset-0 -z-25 overflow-hidden flex items-center justify-center opacity-60">
        <MagicRings
          color="#CB2957"
          colorTwo="#EEEEEE"
          ringCount={5}
          speed={0.65}
          attenuation={8.5}
          lineThickness={1.8}
          baseRadius={0.34}
          radiusStep={0.095}
          scaleRate={0.11}
          opacity={0.5}
          noiseAmount={0.05}
          ringGap={1.45}
          followMouse={true}
          mouseInfluence={0.12}
          hoverScale={1.12}
          parallax={0.03}
        />
      </div>

      {/* Central Soft Crimson Radial Glow (Carefully tuned, never bright) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[950px] rounded-full bg-crimson/[0.08] blur-[170px] -z-20"
      />

      {/* Large Central Abstract ANIVEL Geometric Mark (Layered in Background) */}
      <motion.div
        style={{ y: emblemY }}
        className="pointer-events-none absolute top-1/2 right-[5%] lg:right-[12%] -translate-y-1/2 w-[340px] sm:w-[480px] lg:w-[620px] aspect-square -z-10 opacity-[0.14] transition-opacity duration-1000"
      >
        <Image
          src="/brand/anivel-circular-logo.jpg"
          alt="ANIVEL Geometric Mark"
          fill
          priority
          className="object-contain filter grayscale contrast-125"
        />
        {/* Subtle crimson rim glow */}
        <div className="absolute inset-0 rounded-full bg-crimson/20 blur-3xl" />
      </motion.div>

      {/* Main Hero Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Command Column: Editorial Typography & Intent */}
          <motion.div
            style={{ y: contentY }}
            className="lg:col-span-7 xl:col-span-8 flex flex-col items-start text-left space-y-6"
          >
            {/* Live Availability Badge & Eyebrow */}
            <div className="space-y-3.5">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: editorialEase }}
                className="inline-flex items-center gap-2.5 rounded-[6px] border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-md"
              >
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Accepting Select Q3/Q4 Client Partnerships
                </span>
              </motion.div>

              {/* Exact Requested Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: editorialEase }}
                className="flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold tracking-wider text-crimson"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-crimson shadow-[0_0_8px_#CB2957]" />
                <span>Creative Media × Digital Growth</span>
              </motion.div>
            </div>

            {/* Exact Requested Stacked Headline: Line by Line Reveal */}
            <div className="font-display font-black text-[28px] min-[360px]:text-4xl sm:text-5xl md:text-7xl lg:text-[96px] xl:text-[112px] uppercase leading-[0.9] tracking-tight sm:tracking-tighter text-[#EEEEEE] space-y-1 break-words">
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: editorialEase }}
                >
                  YOUR BRAND.
                </motion.div>
              </div>

              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.35, ease: editorialEase }}
                  className="text-white"
                >
                  YOUR STORY.
                </motion.div>
              </div>

              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: editorialEase }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-crimson"
                >
                  YOUR GROWTH.
                </motion.div>
              </div>
            </div>

            {/* Exact Requested Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: editorialEase }}
              className="max-w-xl text-base sm:text-lg text-zinc-300 font-sans leading-relaxed pt-1"
            >
              Anivel Media helps businesses build a stronger digital presence through strategy, content, social media, advertising, websites and creative execution.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: editorialEase }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              {/* Primary CTA with Magnetic hover */}
              <MagneticButton onClick={onOpenInquiry} strength={0.35}>
                START A PROJECT
              </MagneticButton>

              {/* Secondary CTA */}
              <Button
                variant="secondary"
                size="md"
                href="#work"
                showArrow={true}
              >
                EXPLORE OUR WORK
              </Button>
            </motion.div>

          </motion.div>

          {/* Right Column: 3D Holographic Kinetic Orbital Reactor */}
          <div className="lg:col-span-5 xl:col-span-4 h-full min-h-[320px] lg:min-h-[500px] flex items-center justify-center relative pointer-events-auto">
            <InteractiveOrbitalMark size={320} onClick={onOpenInquiry} />
          </div>

        </div>
      </div>

      {/* Interactive Digital Creative Workspace: 7 Floating Cards */}
      <motion.div
        style={{ y: cardsScrollY }}
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden hidden md:block"
      >
        {floatingCards.map((card, idx) => {
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.4 + idx * 0.08,
                ease: editorialEase,
              }}
              style={{
                position: "absolute",
                top: `${card.initialY}%`,
                left: `${card.initialX}%`,
                x: isTouch ? 0 : cardTransforms[idx].x,
                y: isTouch ? 0 : cardTransforms[idx].y,
              }}
              className={`pointer-events-auto cursor-default ${card.className}`}
            >
              <div className="group relative rounded-[10px] border border-white/[0.08] bg-[#09090D]/90 backdrop-blur-xl p-3.5 shadow-2xl transition-all duration-300 hover:border-crimson/50 hover:bg-[#0E0E14] hover:shadow-[0_8px_30px_-5px_rgba(203,41,87,0.3)] hover:-translate-y-1">
                {/* Subtle top edge crimson accent line */}
                <div className="absolute top-0 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-crimson/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-white/10 bg-white/5 transition-colors group-hover:border-crimson/40 group-hover:bg-crimson/10">
                    {card.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-xs font-black uppercase tracking-wider text-white group-hover:text-rose-100">
                        {card.title}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-crimson" />
                    </div>
                    <span className="font-mono text-xs text-zinc-400 block leading-tight">
                      {card.category}
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                  <span>Metric Target</span>
                  <span className="text-zinc-300 font-semibold">{card.stat}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Mobile-Friendly Floating Tags Ribbon (Shown on smaller screens below typography) */}
      <div className="lg:hidden w-full px-4 pt-5 z-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {["CONTENT", "STRATEGY", "REELS", "SOCIAL", "ADS", "WEB", "BRANDING"].map((tag) => (
            <span
              key={tag}
              className="shrink-0 rounded-[8px] border border-white/10 bg-[#0A0A0E] px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-wider text-zinc-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Scroll Indicator: SCROLL TO EXPLORE ↓ */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="mx-auto flex flex-col items-center justify-center gap-2 z-10 pt-4 cursor-pointer"
        onClick={() => {
          const el = document.getElementById("services");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="h-3 w-3 text-crimson animate-pulse" />
        </span>
        <span className="h-6 w-[1px] bg-gradient-to-b from-crimson/60 to-transparent" />
      </motion.div>

    </section>
  );
};
