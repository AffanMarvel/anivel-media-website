"use client";

import React from "react";
import { 
  Instagram, 
  Youtube, 
  Linkedin, 
  Facebook, 
  MessageCircle, 
  ArrowUpRight, 
  Sparkles, 
  Play 
} from "lucide-react";
import { Eyebrow } from "@/components/ui/Typography";

interface PlatformCard {
  platform: string;
  handle: string;
  url: string;
  description: string;
  contentBadge: string;
  icon: React.ReactNode;
}

const PLATFORMS: PlatformCard[] = [
  {
    platform: "Instagram",
    handle: "@anivelmedia",
    url: "https://www.instagram.com/anivelmedia",
    description: "Daily short-form video releases, behind-the-scenes cinema shoots & editorial feed architecture.",
    contentBadge: "Daily Reels & Drops",
    icon: <Instagram className="h-6 w-6 text-crimson" />,
  },
  {
    platform: "YouTube",
    handle: "AnivelMedia",
    url: "https://www.youtube.com/@AnivelMedia",
    description: "Long-form commercial case studies, creative breakdowns & full 4K brand campaign films.",
    contentBadge: "4K Master Films",
    icon: <Youtube className="h-6 w-6 text-crimson" />,
  },
  {
    platform: "LinkedIn",
    handle: "anivel-media",
    url: "https://www.linkedin.com/company/anivel-media",
    description: "B2B growth playbooks, Meta ad scaling strategies & executive digital transformation insights.",
    contentBadge: "Growth Playbooks",
    icon: <Linkedin className="h-6 w-6 text-crimson" />,
  },
  {
    platform: "WhatsApp",
    handle: "+91 94287 77887",
    url: "https://wa.me/919428777887?text=Hello%20Affan,%20I%20would%20like%20to%20discuss%20a%20project%20with%20Anivel%20Media.",
    description: "Direct fast-track communication channel for immediate project consultations with founder Affan Shaikh.",
    contentBadge: "Fast-Track Support",
    icon: <MessageCircle className="h-6 w-6 text-emerald-400" />,
  },
];

const TICKER_POSTS = [
  { platform: "Instagram", tag: "#CampaignDrop", text: "4K Pret Fashion Lookbook live on feed", views: "14.2K" },
  { platform: "YouTube", tag: "#CaseStudy", text: "Scaling Meta ROAS from 1.8x to 4.4x Breakdown", views: "8.5K" },
  { platform: "Instagram", tag: "#ReelsInMotion", text: "Artisanal Barista Routine (450K+ Organic)", views: "452K" },
  { platform: "LinkedIn", tag: "#GrowthStrategy", text: "Why 90% of D2C Brand Ads Fatigue in 14 Days", views: "22.1K" },
  { platform: "YouTube", tag: "#CommercialFilm", text: "Velox Dynamics Clean Mobility Reveal (4K)", views: "34.8K" },
];

export const SocialEcosystemSection: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-28 bg-[#040406] overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-crimson/[0.06] blur-[170px] -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <Eyebrow>Media Ecosystem // Multi-Channel Presence</Eyebrow>

            {/* Exact Requested Headline */}
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.92]">
              Follow The <span className="text-crimson">Work.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            We practice what we preach. Discover our real-time reel releases, campaign case studies, and operational playbooks across our active channels.
          </p>
        </div>

        {/* Animated Horizontal Social-Media Wall Ticker */}
        <div className="relative w-full overflow-hidden rounded-[14px] border border-white/10 bg-[#08080C] py-4 select-none">
          {/* Edge Vignettes */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-r from-[#08080C] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-l from-[#08080C] to-transparent" />

          <div className="flex w-fit animate-marquee whitespace-nowrap">
            {[...TICKER_POSTS, ...TICKER_POSTS].map((post, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-[8px] border border-white/[0.06] bg-white/[0.02] px-4 py-2 mx-2 text-xs"
              >
                <span className="font-mono text-[10px] text-crimson font-bold uppercase">
                  {post.platform}
                </span>
                <span className="text-zinc-600">&bull;</span>
                <span className="font-mono text-[10px] text-zinc-400">
                  {post.tag}
                </span>
                <span className="text-zinc-300 font-medium">
                  {post.text}
                </span>
                <span className="rounded-[4px] bg-white/5 px-1.5 py-0.5 font-mono text-[9px] text-zinc-400">
                  {post.views}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Platform Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
          {PLATFORMS.map((p) => (
            <a
              key={p.platform}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-[14px] border border-white/[0.08] bg-[#08080C] p-6 flex flex-col justify-between transition-all duration-300 hover:border-crimson/50 hover:bg-[#0C0C12] hover:-translate-y-1 hover:shadow-[0_12px_35px_-10px_rgba(203,41,87,0.25)] select-none"
            >
              {/* Top Bar */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-white/10 bg-white/5 transition-colors group-hover:border-crimson/40 group-hover:bg-crimson/10">
                    {p.icon}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-all group-hover:text-crimson group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <div>
                  <span className="rounded-[4px] border border-white/10 bg-white/[0.02] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-rose-200">
                    {p.contentBadge}
                  </span>
                  <h3 className="font-display text-xl font-black uppercase text-white tracking-tight mt-2">
                    {p.platform}
                  </h3>
                  <span className="font-mono text-xs text-crimson font-bold block">
                    {p.handle}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                  {p.description}
                </p>
              </div>

              {/* Exact Requested CTA */}
              <div className="pt-6 mt-4 border-t border-white/[0.06]">
                <span className="font-display text-xs font-bold uppercase tracking-wider text-zinc-300 transition-colors group-hover:text-white flex items-center gap-1.5">
                  <span>Visit / Follow</span>
                  <span className="text-crimson">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
