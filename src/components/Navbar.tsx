"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ArrowRight, MessageCircle, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { editorialEase } from "@/lib/motion";

interface NavbarProps {
  onOpenInquiry: (initialService?: string) => void;
}

interface NavItem {
  label: string;
  href: string;
}

const DESKTOP_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#pricing" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#methodology" },
  { label: "About", href: "#about" },
];

const MOBILE_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#pricing" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#methodology" },
  { label: "About", href: "#about" },
  { label: "Connect", href: "#contact" },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let accumulatedDelta = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      // Blur background when scrolled away from absolute top
      setIsScrolled(currentScrollY > 15);

      // Top of page (within 40px): always show navbar
      if (currentScrollY <= 40) {
        setIsVisible(true);
        accumulatedDelta = 0;
        lastScrollY = currentScrollY;
        return;
      }

      // If scroll direction reversed, reset accumulated counter
      if ((delta > 0 && accumulatedDelta < 0) || (delta < 0 && accumulatedDelta > 0)) {
        accumulatedDelta = 0;
      }

      accumulatedDelta += delta;

      // Scrolling DOWN accumulated > 12px -> smoothly hide
      if (accumulatedDelta > 12) {
        setIsVisible(false);
      }
      // Scrolling UP accumulated < -8px -> smoothly reveal navbar
      else if (accumulatedDelta < -8) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile full-screen overlay is active
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Smart Hide on Scroll Down / Reveal on Scroll Up Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible || isMobileOpen ? "translate-y-0" : "-translate-y-full pointer-events-none"
        } ${
          isScrolled
            ? "bg-black/92 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.85)] py-2 sm:py-2.5"
            : "bg-black/35 backdrop-blur-[4px] border-b border-transparent py-3 sm:py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left: Official Brand Logo - fully complete with generous breathing room on PC and Android */}
            <Link
              href="/"
              className="group flex items-center gap-3 select-none"
              aria-label="ANIVEL MEDIA Home"
            >
              <div className="relative h-14 sm:h-16 md:h-18 lg:h-20 xl:h-22 w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src="/brand/anivel-logo.png"
                  alt="ANIVEL MEDIA"
                  fill
                  priority
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 320px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Center / Right: Desktop Navigation Items */}
            <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
              {DESKTOP_NAV_ITEMS.map((item, idx) => {
                const isHovered = hoveredIdx === idx;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className="relative px-3.5 py-2 text-xs lg:text-[13px] font-display font-semibold uppercase tracking-wider text-zinc-300 transition-colors duration-200 hover:text-white"
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      {/* Small Crimson Micro-indicator Dot */}
                      <span
                        className={`h-1 w-1 rounded-full bg-crimson transition-all duration-200 ${
                          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-0"
                        }`}
                      />
                      <span>{item.label}</span>
                    </span>

                    {/* Smooth Underline Reveal */}
                    <motion.span
                      className="absolute bottom-0.5 left-3.5 right-3.5 h-[1.5px] bg-crimson"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.25, ease: editorialEase }}
                      style={{ originX: 0 }}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Right: Secondary Outline CTA - links directly to Client Onboarding Portal */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/onboarding"
                className="group relative inline-flex items-center justify-center gap-2 rounded-[8px] border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-display font-bold uppercase tracking-wider text-white hover:border-crimson hover:bg-crimson/10 transition-all cursor-pointer min-h-[44px]"
              >
                <span>Start a Project</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 text-crimson" />
              </Link>
            </div>

            {/* Mobile: Inquire CTA & Hamburger Button - visible below md */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                href="/onboarding"
                className="rounded-[8px] bg-crimson px-3.5 py-2.5 min-h-[44px] font-display text-[11px] font-extrabold uppercase tracking-wider text-white shadow-crimson-glow cursor-pointer flex items-center justify-center"
              >
                Inquire
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileOpen(true)}
                className="rounded-[8px] border border-white/10 bg-white/5 p-2.5 min-h-[44px] min-w-[44px] text-zinc-300 transition-colors hover:bg-white/10 hover:text-white flex items-center justify-center cursor-pointer"
                aria-label="Open full screen navigation menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

          </div>
        </div>
      </header>


      {/* Mobile Full-Screen Dark Navigation Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: editorialEase }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/98 backdrop-blur-2xl p-6 sm:p-8 overflow-y-auto"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="relative h-14 sm:h-16 w-52 sm:w-60">
                <Image
                  src="/brand/anivel-logo.png"
                  alt="ANIVEL MEDIA"
                  fill
                  className="object-contain object-left"
                />
              </div>

              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="rounded-[8px] border border-white/15 bg-white/5 p-2.5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Sequential Menu Items Stagger */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.06,
                    delayChildren: 0.1,
                  },
                },
              }}
              className="py-5 flex flex-col space-y-1"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-crimson mb-3 block">
                Navigation &bull; Sections
              </span>

              {MOBILE_NAV_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.35, ease: editorialEase },
                    },
                  }}
                >
                  <a
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="group flex items-center justify-between py-2.5 text-2xl font-display font-extrabold uppercase tracking-tight text-zinc-200 transition-colors hover:text-crimson min-h-[52px]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs text-zinc-600 group-hover:text-crimson transition-colors">
                        0{idx + 1}
                      </span>
                      <span>{item.label}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-crimson" />
                  </a>
                </motion.div>
              ))}
            </motion.div>


            {/* Bottom Actions: Large CTA and Direct Channels */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <Link
                href="/onboarding"
                onClick={() => setIsMobileOpen(false)}
                className="w-full rounded-[12px] bg-crimson py-4 font-display text-sm font-extrabold uppercase tracking-widest text-white shadow-crimson-glow transition-all hover:bg-crimson-600 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href="https://wa.me/919428777887"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-[8px] border border-emerald-500/30 bg-emerald-950/20 py-2.5 text-xs font-semibold text-emerald-400"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="mailto:work.affanshaikh@gmail.com"
                  className="flex items-center justify-center gap-2 rounded-[8px] border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-zinc-300"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Us</span>
                </a>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
