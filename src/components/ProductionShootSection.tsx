"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Camera, Film, Sparkles, Video, Calendar, ArrowUpRight, LayoutGrid, CheckCircle2 } from "lucide-react";
import { Eyebrow } from "@/components/ui/Typography";

const DepthCarousel = dynamic(() => import("@/components/gallery/DepthCarousel"), {
  ssr: false,
});

interface ProductionShootSectionProps {
  onOpenInquiry: (shootType?: string) => void;
}

const SHOOT_CARDS = [
  {
    title: "CELEBRITY & INFLUENCER EVENT",
    subtitle: "Mr. Faisu x Brand Launch On-Ground",
    video: "/videos/mr_faisu_07_1750682013_3661303087387698067_2302078745.mp4",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
    category: "Celebrity Event",
    deliverables: "VIP arrivals, attendee energy, multi-camera stage coverage & same-day social drop.",
  },
  {
    title: "COMMERCIAL PRODUCT REEL",
    subtitle: "Adil Qadri Luxury Fragrance Drop",
    video: "/videos/adilqadriofficial_1744632640_3610561701392426739_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    category: "Product Commercial",
    deliverables: "High-contrast studio lighting, macro bottle angles, reflective staging & luxury motion grading.",
  },
  {
    title: "HIGH-JEWELRY BRIDAL SHOOT",
    subtitle: "Shish Jewels Heritage Bridal Collection",
    video: "/videos/shish.jewels_1779883412_3906267110038492615_47200406741.mp4",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
    category: "Luxury Jewelry",
    deliverables: "Diamond sparkle refraction, slow-motion turntable macro shots & gold tone grading.",
  },
  {
    title: "HERITAGE GOLD CRAFTSMANSHIP",
    subtitle: "Truth Jewels Royal Polki Documentary",
    video: "/videos/truthjewels_1763654700_3770131746743253147_26243800169.mp4",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop",
    category: "Brand Cinema",
    deliverables: "Artisan gold forging, behind-the-scenes hand craftsmanship & emotional brand story.",
  },
  {
    title: "VIRAL CINEMATIC HOOK REEL",
    subtitle: "High-Retention Hook & Sound Design Batch",
    video: "/videos/adilqadriofficial_1756806720_3712685295055080137_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop",
    category: "Viral Reel",
    deliverables: "Dynamic speed-ramped transitions, 3-second retention hooks & curated audio layers.",
  },
  {
    title: "ROYAL ATTAR STUDIO STAGING",
    subtitle: "Adil Qadri Traditional Oud Launch",
    video: "/videos/adilqadriofficial_1734672658_3527012320742840033_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop",
    category: "Studio Production",
    deliverables: "Volumetric smoke, gold foil reflections & precision product styling.",
  },
  {
    title: "SOLITAIRE DIAMOND MACRO",
    subtitle: "Shish Jewels 4K Optical Refraction",
    video: "/videos/shish.jewels_1783598485_3937431426671924305_47200406741.mp4",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
    category: "Macro Jewelry",
    deliverables: "Microscopic diamond cut inspection, prism lighting flares & ultra-smooth panning.",
  },
  {
    title: "WEDDING POLKI COLLECTION",
    subtitle: "Truth Jewels Bridal Opulence",
    video: "/videos/truthjewels_1765029600_3781664837445948419_26243800169.mp4",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
    category: "Bridal Campaign",
    deliverables: "Royal emerald gemstone macro, bridal necklace drape & luxury color tone.",
  },
  {
    title: "LUXURY SHANAYA PERFUME",
    subtitle: "Flagship E-Commerce Launch Campaign",
    video: "/videos/adilqadriofficial_1741430046_3583696700669181177_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop",
    category: "Campaign Ad",
    deliverables: "Speed-ramped edits, ASMR atomization sound design & high-velocity sales cut.",
  },
  {
    title: "AUTOMOTIVE & LIFESTYLE MOTION",
    subtitle: "KP700 Luxury Culture & High Energy",
    video: "/videos/kp700.__1781138003_3916766687588772486_13962572458.mp4",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop",
    category: "Fashion & Auto",
    deliverables: "Gimbal vehicle tracking, neon night street grade & dynamic beat matching.",
  },
  {
    title: "COMMUNITY STREET ACTIVATION",
    subtitle: "Adil Qadri Ki Sena Crowd Momentum",
    video: "/videos/adilqadri_ki_sena_1742810086_3595272204964343840_71336861351.mp4",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop",
    category: "On-Ground Shoot",
    deliverables: "Live consumer unboxing, mall event surge & high-energy community vibe.",
  },
  {
    title: "HANDCRAFTED GOLD ARTISAN",
    subtitle: "Truth Jewels Master Craftsman Spotlight",
    video: "/videos/truthjewels_1781191985_3917243619906701156_26243800169.mp4",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1000&auto=format&fit=crop",
    category: "Artisan Cinema",
    deliverables: "Extreme macro jeweler torch, filing & gold carving in 4K high framerate.",
  },
];

export const ProductionShootSection: React.FC<ProductionShootSectionProps> = ({
  onOpenInquiry,
}) => {
  const [viewMode, setViewMode] = useState<"depth" | "grid">("depth");
  const [hoveredCardTitle, setHoveredCardTitle] = useState<string | null>(null);

  return (
    <section className="relative py-20 lg:py-28 bg-[#040406] overflow-hidden border-t border-white/5">
      {/* Subtle Ambient Radial Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/3 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-crimson/[0.07] blur-[160px] -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-crimson/40 bg-crimson/15 px-3 py-1 font-mono text-[10px] text-rose-200 uppercase tracking-widest font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
              <span>100% Real Client Video Production Shoots</span>
            </div>

            {/* Exact Requested Headline */}
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.92]">
              Sometimes, Great Content{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-crimson">
                Needs A Real Shoot.
              </span>
            </h2>
          </div>

          {/* Exact Requested Supporting Copy with Client Credibility */}
          <div className="max-w-md space-y-2 text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            <p>
              Professional shoots are planned according to the campaign, event, product, location and production requirements.
            </p>
            <p className="font-mono text-xs text-rose-300">
              Featuring real on-ground production work for <strong>Mr. Faisu</strong>, <strong>Adil Qadri</strong>, <strong>Shish Jewels</strong> &amp; <strong>Truth Jewels</strong>.
            </p>
          </div>
        </div>

        {/* 4-Step Production Pipeline Bar */}
        <div className="rounded-[14px] border border-white/10 bg-[#08080C] p-6 sm:p-8 backdrop-blur-xl">
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-4">
            Production Flow Architecture:
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
            {[
              { label: "SHOOT", sub: "Cinema 4K on-ground gear" },
              { label: "EDIT", sub: "Pacing, sound design & grade" },
              { label: "PUBLISH", sub: "Curated captions & formats" },
              { label: "PROMOTE", sub: "Targeted paid distribution" },
            ].map((step, idx) => (
              <div key={step.label} className="relative flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-crimson font-bold">0{idx + 1}</span>
                    <span className="font-display text-lg sm:text-xl font-black uppercase text-white tracking-wider">
                      {step.label}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-zinc-500 block">
                    {step.sub}
                  </span>
                </div>
                {idx < 3 && (
                  <ArrowRight className="hidden sm:block h-4 w-4 text-white/20 -mr-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Gallery View Mode Toggle & Real Video Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-crimson animate-pulse shadow-[0_0_8px_#CB2957]" />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-300 font-bold">
              12 Real Shoot Units &bull; 36 Client Videos In Library
            </span>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-[10px] border border-white/10 bg-[#0B0B10] shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setViewMode("depth")}
              className={`px-3.5 py-1.5 rounded-[8px] font-display text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                viewMode === "depth"
                  ? "bg-crimson text-white shadow-crimson-glow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-rose-200" />
              <span>3D Depth Carousel</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3.5 py-1.5 rounded-[8px] font-display text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                viewMode === "grid"
                  ? "bg-crimson text-white shadow-crimson-glow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>All 12 Shoot Cards</span>
            </button>
          </div>
        </div>

        {viewMode === "depth" ? (
          <div className="relative w-full rounded-[24px] border border-white/10 overflow-hidden bg-[#06060A] shadow-2xl p-2 sm:p-4">
            <div className="absolute top-4 left-4 z-20 pointer-events-none rounded-[8px] border border-white/10 bg-black/80 backdrop-blur-md px-3.5 py-1.5 font-mono text-[11px] text-zinc-200 uppercase tracking-widest flex items-center gap-2.5 shadow-lg">
              <span className="h-2 w-2 rounded-full bg-crimson animate-pulse shadow-[0_0_8px_#CB2957]" />
              <span>Drag / Swipe &bull; 3D Depth Card Carousel ({SHOOT_CARDS.length} Real Videos)</span>
            </div>
            
            {/* 3D Depth Carousel with REAL VIDEOS PASSED DIRECTLY */}
            <DepthCarousel
              items={SHOOT_CARDS.map((card) => ({
                image: card.image,
                video: card.video,
                title: card.title,
                subtitle: card.subtitle,
                category: card.category,
                onClick: () => onOpenInquiry(`Shoot Unit: ${card.title}`),
              }))}
              cardWidth={330}
              cardHeight={460}
              depth={220}
              spread={110}
              tilt={22}
              tiltDirection="right"
              perspective={1400}
              visibleCards={4}
              falloff={0.15}
              blur={4}
              autoplay={false}
              loop={true}
              showControls={true}
              showIndicators={true}
              onItemClick={(item) => onOpenInquiry(`Shoot Unit: ${item.title}`)}
            />
          </div>
        ) : (
          /* All 12 Visual Shoot Cards Grid with Hover-to-Play Video */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 items-stretch">
            {SHOOT_CARDS.map((card) => {
              const isHovered = hoveredCardTitle === card.title;
              return (
                <div
                  key={card.title}
                  onMouseEnter={() => setHoveredCardTitle(card.title)}
                  onMouseLeave={() => setHoveredCardTitle(null)}
                  onClick={() => onOpenInquiry(`Shoot Unit: ${card.title}`)}
                  className="group relative rounded-[16px] border border-white/[0.08] bg-[#07070A] overflow-hidden cursor-pointer select-none transition-all duration-300 hover:border-crimson/50 hover:-translate-y-1 hover:shadow-[0_15px_45px_-10px_rgba(203,41,87,0.3)] flex flex-col justify-end min-h-[380px]"
                >
                  {/* Background Media: Direct client shoot video playback */}
                  <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950">
                    {card.video ? (
                      <video
                        src={card.video}
                        poster={card.image}
                        loop
                        muted
                        playsInline
                        preload="none"
                        ref={(el) => {
                          if (el) {
                            if (isHovered) el.play().catch(() => {});
                            else el.pause();
                          }
                        }}
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 brightness-105"
                      />
                    ) : (
                      <img
                        src={card.image}
                        alt={card.title}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 brightness-100"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-300 group-hover:via-black/60" />
                  </div>

                {/* Top Badge: Real Client Video */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/80 border border-crimson/50 px-2.5 py-0.5 font-mono text-[9px] font-bold text-rose-200 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
                    REAL SHOOT
                  </span>
                </div>

                {/* Crimson Accent Top Bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-crimson to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10" />

                {/* Card Meta & Content */}
                <div className="relative z-10 p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-crimson font-bold">
                      {card.category}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <h3 className="font-display text-lg font-black uppercase text-white leading-tight">
                    {card.title}
                  </h3>

                  <p className="font-mono text-xs text-zinc-300 leading-snug">
                    {card.subtitle}
                  </p>

                  <p className="text-[11px] text-zinc-400 line-clamp-2 pt-1 border-t border-white/[0.06]">
                    {card.deliverables}
                  </p>
                </div>
              </div>
            );
          })}
          </div>
        )}

        {/* Footer Production Booking Strip */}
        <div className="rounded-[16px] border border-white/10 bg-[#08080C] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-crimson font-bold block">
              Custom Production Booking
            </span>
            <h4 className="font-display text-2xl sm:text-3xl font-black uppercase text-white">
              Need An On-Ground Production Shoot For Your Brand?
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              We travel on location with cinema cameras, gimbal rigs, audio gear, and lighting crews for product launches, influencer events, and high-conversion commercial reels.
            </p>
          </div>

          <button
            onClick={() => onOpenInquiry("Production Shoot Inquiry")}
            className="shrink-0 inline-flex items-center justify-center gap-2 rounded-lg bg-crimson px-8 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white hover:bg-crimson-600 transition-colors shadow-crimson-glow"
          >
            <span>Book A Shoot Crew &rarr;</span>
          </button>
        </div>

      </div>
    </section>
  );
};
