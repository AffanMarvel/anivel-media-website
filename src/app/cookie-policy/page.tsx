import React from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, Phone, Mail } from "lucide-react";
import { Metadata } from "next";
import { COOKIE_POLICY_V2, BUSINESS_INFO } from "@/lib/legal/legalContentV2";
import { LegalNavHeader } from "@/components/legal/LegalNavHeader";
import { OWNER_CONTACT } from "@/lib/constants/contactInfo";

export const metadata: Metadata = {
  title: "Cookie Policy (v2.0) | Anivel Media",
  description: "Official Cookie Policy v2.0 for Anivel Media outlining our minimal and privacy-focused cookie practices.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-black text-[#EEEEEE] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Shared Policy Navigation Hub */}
        <LegalNavHeader activeDoc="COOKIES" />

        {/* Header */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-crimson font-bold uppercase tracking-widest">
            <Cookie className="h-4 w-4" />
            <span>Transparent Tracking &bull; Part D</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-[0.95]">
            COOKIE <span className="text-crimson">POLICY.</span>
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400 pt-1">
            <span>Last Updated: {COOKIE_POLICY_V2.lastUpdated}</span>
            <span>&bull;</span>
            <span>Effective Date: {BUSINESS_INFO.effectiveDate}</span>
            <span>&bull;</span>
            <span className="text-emerald-400 font-bold">✓ Zero Invasive Third-Party Tracking</span>
          </div>
        </header>

        {/* Core Principles */}
        <div className="rounded-2xl border border-white/10 bg-[#0C0C0E] p-6 space-y-3 shadow-[0_10px_40px_-10px_rgba(203,41,87,0.15)]">
          <div className="flex items-center gap-2 text-white font-mono text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-crimson" />
            <span>Cookie Use Overview (v2.0)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-zinc-300 font-sans">
            <div className="border border-white/5 rounded-xl p-3 bg-black/40">
              <strong className="block text-white mb-1">Essential Cookies</strong>
              Used for security verification, session integrity, and smooth navigation.
            </div>
            <div className="border border-white/5 rounded-xl p-3 bg-black/40">
              <strong className="block text-white mb-1">UI Preferences</strong>
              Remembers your chosen view modes, themes, or active plan calculators.
            </div>
            <div className="border border-white/5 rounded-xl p-3 bg-black/40">
              <strong className="block text-white mb-1">Anonymized Telemetry</strong>
              Aggregated performance metrics to ensure high speed without profiling.
            </div>
          </div>
        </div>

        {/* Legal Sections */}
        <div className="space-y-12 divide-y divide-white/10">
          {COOKIE_POLICY_V2.sections.map((section, idx) => (
            <section key={section.id} className={idx > 0 ? "pt-12 space-y-4" : "space-y-4"}>
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-crimson/20 border border-crimson/40 text-rose-300 font-mono text-xs font-bold">
                  0{idx + 1}
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-wide">
                  {section.title}
                </h2>
              </div>
              <div className="font-sans text-sm text-zinc-300 leading-relaxed whitespace-pre-line space-y-3 pl-0 sm:pl-10">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Footer info */}
        <footer className="rounded-2xl border border-white/10 bg-[#08080C] p-6 sm:p-8 space-y-4 text-xs text-zinc-400 font-sans border-t border-white/10">
          <div className="space-y-1">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white font-bold">
              Questions on Cookies or Data Storage?
            </h4>
            <p>
              Please contact our dedicated support team directly with any inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/5 font-mono text-xs">
            <div>
              <span className="text-zinc-500 block">Direct Email:</span>
              <a href={`mailto:${OWNER_CONTACT.email}`} className="text-crimson hover:underline">
                {OWNER_CONTACT.email}
              </a>
            </div>
            <div>
              <span className="text-zinc-500 block">Direct WhatsApp / Phone:</span>
              <a href={OWNER_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                {OWNER_CONTACT.phone}
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
