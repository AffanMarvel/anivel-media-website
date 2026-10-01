"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Send,
  Copy,
  Check,
  Calendar,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/Typography";

interface ContactSectionProps {
  isStandalonePage?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  isStandalonePage = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("work.affanshaikh@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className={`relative bg-black text-[#EEEEEE] overflow-hidden ${
        isStandalonePage ? "py-16 sm:py-24" : "py-20 lg:py-28 border-t border-white/10"
      }`}
    >
      {/* Ambient Radial Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/3 h-[500px] w-[700px] rounded-full bg-crimson/[0.08] blur-[200px] -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <Eyebrow>Client Initiation &bull; Direct Desk</Eyebrow>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.92]">
              LET&apos;S BUILD <span className="text-crimson">SOMETHING.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            Ready to elevate your brand content? Choose your preferred path to get started — launch our structured 2-minute onboarding brief or speak directly with our team.
          </p>
        </div>

        {/* 2 High-Impact Action Portals (Onboarding Portal vs Direct WhatsApp Desk) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Onboarding Card (Takes center stage) */}
          <div className="lg:col-span-7 rounded-[24px] border border-crimson/50 bg-[#0C060A] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(203,41,87,0.25)] group">
            <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-crimson/20 blur-3xl" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-crimson/40 bg-crimson/15 px-3 py-1 font-mono text-[10px] text-rose-200 uppercase font-bold tracking-widest">
                  <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
                  <span>RECOMMENDED &bull; FAST-TRACK</span>
                </span>
                <span className="font-mono text-xs text-zinc-400">
                  Takes ~2 Minutes
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
                  Official Client Onboarding Brief
                </h3>
                <p className="text-sm text-zinc-300 font-sans leading-relaxed max-w-xl">
                  Submit your brand specifications, select your exact package (Demo ₹850, Creative ₹1.1k–₹4.5k, Brand Retainers, or Combos), attach your campaign goals, and receive an instant reference ID and 24-hour creative direction review.
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-crimson shrink-0" />
                  <span>Exact Package &amp; Budget Match</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-crimson shrink-0" />
                  <span>24-Hour Scope Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-crimson shrink-0" />
                  <span>Drive Asset &amp; Goal Ingestion</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-crimson shrink-0" />
                  <span>Automated Google Sheet Sync</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-white/10 relative z-10 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/onboarding"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-[12px] bg-crimson px-8 py-4 font-display text-xs font-black uppercase tracking-wider text-white shadow-crimson-glow hover:bg-crimson-600 hover:shadow-crimson-lg transition-all"
              >
                <FileText className="h-4 w-4" />
                <span>START CLIENT ONBOARDING &rarr;</span>
              </Link>
              <span className="font-mono text-xs text-zinc-400">
                Instant confirmation &bull; Zero commitment
              </span>
            </div>
          </div>

          {/* Right Column: Direct Channels & Operational Hubs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Direct WhatsApp Channel */}
            <a
              href="https://wa.me/919428777887?text=Hi%20Affan,%20I%20would%20like%20to%20discuss%20a%20project%20with%20Anivel%20Media."
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-[20px] border border-emerald-500/40 bg-emerald-950/20 p-6 backdrop-blur-md transition-all hover:border-emerald-500/70 hover:bg-emerald-950/30 shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-white text-base uppercase">
                      Priority WhatsApp Desk
                    </h4>
                    <span className="font-mono text-[11px] text-emerald-400 font-bold">
                      Direct: +91 94287 77887
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-emerald-400 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Connect directly on WhatsApp to ask quick questions, discuss custom plans, or check shoot availability.
              </p>
            </a>

            {/* Email Channel */}
            <div className="rounded-[20px] border border-white/10 bg-[#08080C] p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-zinc-300">
                    <Mail className="h-5 w-5 text-crimson" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-white text-base uppercase">
                      Direct Email Desk
                    </h4>
                    <span className="font-mono text-[11px] text-zinc-400">
                      work.affanshaikh@gmail.com
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[10px] text-zinc-300 hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Send formal RFPs, agency decks, or campaign briefs directly to our executive inbox.
              </p>
            </div>

            {/* Studio Footprint & Turnaround Guarantee */}
            <div className="rounded-[20px] border border-white/10 bg-[#08080C] p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-zinc-300">
                  <MapPin className="h-5 w-5 text-crimson" />
                </div>
                <div>
                  <h4 className="font-display font-black text-white text-base uppercase">
                    Operating Footprint &amp; Shoots
                  </h4>
                  <span className="font-mono text-[11px] text-zinc-400">
                    Surat &bull; Mumbai &bull; Nationwide Shoots
                  </span>
                </div>
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Cinema-grade camera kits, lighting, and sound crews operating across India with guaranteed 24-hour brief review.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
