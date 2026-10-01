import React from "react";
import Link from "next/link";
import { FileText, ShieldCheck, Check, ArrowRight, Phone, Mail, Clock, Layers, Sparkles } from "lucide-react";
import { Metadata } from "next";
import { TERMS_OF_SERVICE_V2, BUSINESS_INFO } from "@/lib/legal/legalContentV2";
import { LegalNavHeader } from "@/components/legal/LegalNavHeader";
import { OWNER_CONTACT } from "@/lib/constants/contactInfo";

export const metadata: Metadata = {
  title: "Terms & Conditions (v2.0) | Anivel Media",
  description: "Official Master Terms of Service v2.0 for Anivel Media creative production, retainers, and commercial video shoots.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-black text-[#EEEEEE] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Shared Policy Navigation Hub */}
        <LegalNavHeader activeDoc="TERMS" />

        {/* Document Header */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-crimson font-bold uppercase tracking-widest">
            <FileText className="h-4 w-4" />
            <span>Master Commercial Terms &bull; Version 2.0</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-[0.95]">
            TERMS OF <span className="text-crimson">SERVICE.</span>
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400 pt-1">
            <span>Last Updated: {TERMS_OF_SERVICE_V2.lastUpdated}</span>
            <span>&bull;</span>
            <span>Effective Date: {BUSINESS_INFO.effectiveDate}</span>
            <span>&bull;</span>
            <span className="text-emerald-400 font-bold">✓ Active Legal Version (v2.0)</span>
          </div>
        </header>

        {/* Quick Highlights Grid for Clients */}
        <div className="rounded-2xl border border-crimson/30 bg-[#0E060A] p-6 space-y-4 shadow-[0_10px_40px_-10px_rgba(203,41,87,0.2)]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-rose-200 font-mono text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-crimson" />
              <span>Key Commercial Terms Summary (v2.0)</span>
            </div>
            <span className="font-mono text-[10px] text-zinc-400">Binding on All Engagements</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300 font-sans">
            <div className="p-3 rounded-xl border border-white/5 bg-black/40">
              <strong className="text-white block mb-0.5">💳 Payment &amp; Advance</strong>
              Demo 100% advance; Combos 50/50; Creative 100% advance/cycle; Brand first installment / 3-month advance for discount.
            </div>
            <div className="p-3 rounded-xl border border-white/5 bg-black/40">
              <strong className="text-white block mb-0.5">🎬 2-Round Revisions</strong>
              Each deliverable includes up to 2 revision rounds within 3 business days of preview delivery.
            </div>
            <div className="p-3 rounded-xl border border-white/5 bg-black/40">
              <strong className="text-white block mb-0.5">🛡️ Stage-Based Refunds</strong>
              Full refund within 48h before work. Once concept/shoot/editing begins, respective phase fees are non-refundable.
            </div>
            <div className="p-3 rounded-xl border border-white/5 bg-black/40">
              <strong className="text-white block mb-0.5">📢 Ad Spend Excluded</strong>
              Meta and Google media spends are paid directly by client through client&apos;s own advertising manager.
            </div>
          </div>
        </div>

        {/* Quick Jump Table of Contents */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-bold block">
            Table of Contents &bull; Quick Jump:
          </span>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {TERMS_OF_SERVICE_V2.sections.map((sec, idx) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="px-3 py-1 rounded-lg border border-white/10 bg-black/40 text-zinc-300 hover:text-white hover:border-crimson/50 transition-colors"
              >
                {idx + 1}. {sec.title.split(".")[1] || sec.title}
              </a>
            ))}
          </div>
        </div>

        {/* Full Legal Sections */}
        <div className="space-y-12 divide-y divide-white/10">
          {TERMS_OF_SERVICE_V2.sections.map((section, idx) => (
            <section key={section.id} id={section.id} className={idx > 0 ? "pt-12 space-y-4" : "space-y-4"}>
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

        {/* Contracting & Contact Details Footer */}
        <footer className="rounded-2xl border border-white/10 bg-[#08080C] p-6 sm:p-8 space-y-4 text-xs text-zinc-400 font-sans border-t border-white/10">
          <div className="space-y-1">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white font-bold">
              Official Contracting Entity &amp; Direct Desk:
            </h4>
            <p>
              <strong>{BUSINESS_INFO.brand}</strong> &bull; Location: {BUSINESS_INFO.location} &bull; Directed by {BUSINESS_INFO.founder}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/5 font-mono text-xs">
            <div>
              <span className="text-zinc-500 block">Direct Founder WhatsApp:</span>
              <a href={OWNER_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                {OWNER_CONTACT.phone}
              </a>
            </div>
            <div>
              <span className="text-zinc-500 block">Official Business Email:</span>
              <a href={`mailto:${OWNER_CONTACT.email}`} className="text-crimson hover:underline">
                {OWNER_CONTACT.email}
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
