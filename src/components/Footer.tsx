"use client";

import React from "react";
import { ArrowUp, ArrowUpRight, Instagram, Linkedin, Youtube, Facebook, MessageCircle, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface FooterProps {
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#000000] text-[#EEEEEE] pt-24 pb-12 border-t border-white/10 overflow-hidden">
      
      {/* Subtle Animated Crimson Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[450px] w-[900px] rounded-full bg-crimson/10 blur-[200px] -z-10" />

      {/* Subtle Animated Crimson Beam / Line across top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-crimson/80 to-transparent animate-pulse" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* The Final Visual Chapter Callout */}
        <div className="pb-20 border-b border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-widest text-crimson font-bold block">
                The Final Chapter &bull; Take Action
              </span>
              <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.92]">
                YOUR BRAND HAS A STORY.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-crimson">
                  LET&apos;S MAKE PEOPLE NOTICE IT.
                </span>
              </h2>
            </div>

            <div className="shrink-0">
              <Link
                href="/onboarding"
                className="group inline-flex items-center gap-3 rounded-[12px] bg-crimson px-8 py-4 text-xs sm:text-sm font-black uppercase tracking-widest text-white shadow-crimson-glow hover:bg-crimson-600 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              >
                <span>START A PROJECT &rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4-Column Navigation Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10 py-14 sm:py-16 border-b border-white/10">
          
          {/* Brand Presentation */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-4">
            <div className="relative h-14 w-52">
              <Image
                src="/brand/anivel-logo.png"
                alt="ANIVEL MEDIA"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
              Creative Studio + Growth Agency + Digital Technology Company. Engineering digital presence for ambitious brands.
            </p>
          </div>

          {/* 01: SERVICES */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-white font-bold">
              SERVICES
            </h3>
            <ul className="space-y-2 text-xs text-zinc-400 font-medium">
              <li>
                <a href="#services" className="hover:text-crimson transition-colors">
                  Social Media
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-crimson transition-colors">
                  Content Creation
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-crimson transition-colors">
                  Growth &amp; Ads
                </a>
              </li>
              <li>
                <a href="#webdev" className="hover:text-crimson transition-colors">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-crimson transition-colors">
                  Branding
                </a>
              </li>
              <li>
                <a href="#shoots" className="hover:text-crimson transition-colors">
                  Professional Shoots
                </a>
              </li>
            </ul>
          </div>

          {/* 02: COMPANY */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-white font-bold">
              COMPANY
            </h3>
            <ul className="space-y-2 text-xs text-zinc-400 font-medium">
              <li>
                <a href="#about" className="hover:text-crimson transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-crimson transition-colors">
                  Process
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-crimson transition-colors">
                  Work
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-crimson transition-colors">
                  Packages
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-crimson transition-colors">
                  Connect
                </a>
              </li>
            </ul>
          </div>

          {/* 03: SOCIAL (ONLY OFFICIAL CHANNELS) */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-white font-bold">
              OFFICIAL MEDIA
            </h3>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-medium">
              <li>
                <a
                  href="https://www.instagram.com/anivelmedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-crimson transition-colors"
                >
                  <Instagram className="h-3.5 w-3.5 text-crimson" />
                  <span>Instagram: @anivelmedia</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@AnivelMedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-crimson transition-colors"
                >
                  <Youtube className="h-3.5 w-3.5 text-crimson" />
                  <span>YouTube: AnivelMedia</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/anivel-media"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-crimson transition-colors"
                >
                  <Linkedin className="h-3.5 w-3.5 text-crimson" />
                  <span>LinkedIn: anivel-media</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919428777887"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                  <span>WhatsApp: +91 94287 77887</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:work.affanshaikh@gmail.com"
                  className="flex items-center gap-2 hover:text-crimson transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-zinc-500" />
                  <span>work.affanshaikh@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919428777887"
                  className="flex items-center gap-2 hover:text-crimson transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-zinc-500" />
                  <span>+91 94287 77887</span>
                </a>
              </li>
            </ul>
          </div>

          {/* 04: LEGAL */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-white font-bold">
              LEGAL CONTRACTS
            </h3>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-medium">
              <li>
                <Link href="/terms-and-conditions" className="hover:text-crimson transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-crimson" />
                  <span>Terms &amp; Conditions (v2.0)</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-crimson transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-crimson" />
                  <span>Privacy Policy (DPDP Act)</span>
                </Link>
              </li>
              <li>
                <Link href="/refund-cancellation" className="hover:text-crimson transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-crimson" />
                  <span>Refund &amp; Cancellation Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-crimson transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-crimson" />
                  <span>Cookie Policy</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Massive Watermark Typography */}
        <div className="py-8 sm:py-14 select-none overflow-hidden text-center max-w-full">
          <div className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[140px] font-black uppercase tracking-tighter text-white/[0.04] hover:text-white/[0.07] transition-colors leading-[0.82] select-none">
            <div>ANIVEL</div>
            <div>MEDIA</div>
          </div>
        </div>

        {/* Bottom Bar with Prominent Legal Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5 text-[11px] font-mono text-zinc-500">
          <div className="space-y-1 text-center sm:text-left">
            <div>
              &copy; 2026 Anivel Media. All Rights Reserved. Directed by{" "}
              <a
                href="https://www.affankaze.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-crimson transition-colors underline underline-offset-2"
              >
                Affan Shaikh (Affan Kaze)
              </a>
              .
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-3 text-zinc-400">
              <Link href="/terms-and-conditions" className="hover:text-crimson transition-colors">
                T&amp;C
              </Link>
              <span>&bull;</span>
              <Link href="/privacy-policy" className="hover:text-crimson transition-colors">
                Privacy
              </Link>
              <span>&bull;</span>
              <Link href="/refund-cancellation" className="hover:text-crimson transition-colors">
                Refunds
              </Link>
              <span>&bull;</span>
              <Link href="/cookie-policy" className="hover:text-crimson transition-colors">
                Cookies
              </Link>
            </div>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>

      </div>
    </footer>
  );
};
