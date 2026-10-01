"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Flame,
  FileText,
  MessageCircle,
  HelpCircle,
  UploadCloud,
  ChevronRight,
  ExternalLink,
  Layers,
  Video,
  Zap,
  Star,
  Info,
  Building,
  User,
  Phone,
  Mail,
  Instagram,
  MapPin,
  Target,
  Clock,
  Send,
  X,
  Lock,
  Scale,
  BookOpen,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  TERMS_OF_SERVICE_V2,
  REFUND_POLICY_V2,
  PRIVACY_POLICY_V2,
  BUSINESS_INFO,
} from "@/lib/legal/legalContentV2";

interface PlanOption {
  id: string;
  category: "BRAND" | "CREATIVE" | "COMBO" | "DEMO" | "CUSTOM";
  title: string;
  price: string;
  badge?: string;
  highlight?: boolean;
  deliverables: string;
}

const ALL_PLAN_OPTIONS: PlanOption[] = [
  // Demo Plan
  {
    id: "demo-850",
    category: "DEMO",
    title: "Demo Plan // Try Anivel",
    price: "₹850/-",
    badge: "1-Time Test Drive",
    deliverables: "2 Reels, 1 Ad, 3 Video Concepts with Scripts, Instagram Page Guide & Brand Research",
  },
  // Creative Monthly Plans
  {
    id: "creative-1",
    category: "CREATIVE",
    title: "Creative Plan 1",
    price: "₹1,100 / month",
    deliverables: "2 Reels, 1 Ad, 5 Posts, 3 Concepts, 5 Topics, 3+1 Scripts, 3 Shoots, 3 Edits, 1+1 Boost Ads",
  },
  {
    id: "creative-2",
    category: "CREATIVE",
    title: "Creative Plan 2",
    price: "₹1,200 / month",
    deliverables: "3 Reels, 1 Ad, 5 Posts, 3 Concepts, 5 Topics, 4+1 Scripts, 4 Shoots, 4 Edits, 1+1 Boost Ads",
  },
  {
    id: "creative-3",
    category: "CREATIVE",
    title: "Creative Plan 3",
    price: "₹2,100 / month",
    deliverables: "4 Reels, 1 Ad, 7 Posts, 4 Concepts, 5 Topics, 5+2 Scripts, 5 Shoots, 5 Edits, 1+2 Boost Ads",
  },
  {
    id: "creative-4",
    category: "CREATIVE",
    title: "Creative Plan 4",
    price: "₹3,100 / month",
    badge: "Most Popular",
    highlight: true,
    deliverables: "6 Reels, 2 Ads, 10 Posts, 5 Concepts, 7 Topics, 8+3 Scripts, 8 Shoots, 8 Edits, 2+3 Boost Ads",
  },
  {
    id: "creative-5",
    category: "CREATIVE",
    title: "Creative Plan 5",
    price: "₹4,500 / month",
    deliverables: "8 Reels, 3 Ads, 15 Posts, 6 Concepts, 10 Topics, 11+4 Scripts, 11 Shoots, 11 Edits, 3+4 Boost Ads",
  },
  // Brand Growth Retainers
  {
    id: "brand-1",
    category: "BRAND",
    title: "Brand Growth Plan 01",
    price: "₹7,500 / mo (₹5,000 Advance)",
    badge: "Steady Growth",
    deliverables: "8 Reels, 2 Ads, 7 Posts, 5 Concepts + 10 Extra Topics, 20 Scripts, 10 Shoots, 10 Edits, 2 Meetings/Mo",
  },
  {
    id: "brand-2",
    category: "BRAND",
    title: "Brand Growth Plan 02",
    price: "₹10,000 / mo (₹7,500 Advance)",
    badge: "Flagship Retainer",
    highlight: true,
    deliverables: "12 Reels, 3 Ads, 7 Posts, 7 Concepts + 10 Extra Topics, 25 Scripts, 15 Shoots, 15 Edits, 3 Meetings/Mo",
  },
  {
    id: "brand-3",
    category: "BRAND",
    title: "Brand Growth Plan 03",
    price: "₹12,500 / mo (₹10,000 Advance)",
    badge: "Full Dominance",
    deliverables: "17 Reels, 5 Ads, 10 Posts, 10 Concepts + 10 Extra Topics, 32 Scripts, 22 Shoots, 22 Edits, Weekly Meetings",
  },
  // Combo Packs
  {
    id: "combo-1",
    category: "COMBO",
    title: "Combo 01: Concept + Shoot + Edit",
    price: "₹1,000 / video",
    badge: "Save ₹300",
    deliverables: "Full Stack Reel: Viral script hook + Cinema camera shoot + Dynamic video edit & sound design",
  },
  {
    id: "combo-2",
    category: "COMBO",
    title: "Combo 02: Shoot + Edit",
    price: "₹750 / video",
    badge: "Save ₹250",
    deliverables: "Production & Post: Client provides script -> Anivel handles on-location shoot and high-pacing edit",
  },
  {
    id: "combo-3",
    category: "COMBO",
    title: "Combo 03: Concept + Edit",
    price: "₹700 / video",
    badge: "Save ₹100",
    deliverables: "Creative & Post: Script & angles + high-retention video editing on client's raw video footage",
  },
  // Custom
  {
    id: "custom-enterprise",
    category: "CUSTOM",
    title: "Custom Bespoke Plan / Commercial Shoot",
    price: "Custom Quote",
    badge: "Custom Scope",
    deliverables: "Multi-day on-location commercial shoot, high-volume influencer campaign, or bespoke web development",
  },
];

const CAMPAIGN_GOALS = [
  "Viral Organic Reach & Follower Growth",
  "High-Ticket WhatsApp / Direct Inquiries",
  "E-Commerce Catalog Sales & Meta Ad ROAS",
  "Brand Film / Commercial Lookbook Shoot",
  "Complete Social Media Profile Transformation",
  "Custom Next.js Website & Digital Experience",
];

const TIMELINE_OPTIONS = [
  "Immediate (Within 7-10 Days)",
  "Next 2-4 Weeks",
  "Upcoming Month / Quarter",
  "Flexible / Discovery Phase",
];

function OnboardingContent() {
  const searchParams = useSearchParams();
  const preSelectedQuery = searchParams.get("service") || searchParams.get("plan") || "";

  // Step 1: Client & Brand Info
  const [fullName, setFullName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [websiteOrHandle, setWebsiteOrHandle] = useState("");
  const [city, setCity] = useState("");

  // Step 2: Selected Plan
  const [selectedPlanId, setSelectedPlanId] = useState<string>("brand-2");
  const [planCategoryFilter, setPlanCategoryFilter] = useState<string>("ALL");

  // Step 3: Goals & Timeline
  const [primaryGoal, setPrimaryGoal] = useState<string>(CAMPAIGN_GOALS[0]);
  const [timeline, setTimeline] = useState<string>(TIMELINE_OPTIONS[0]);
  const [assetDriveUrl, setAssetDriveUrl] = useState<string>("");
  const [projectNotes, setProjectNotes] = useState<string>("");

  // Step 4: Submission & Legal Consent State (v2.0)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [privacyAccepted, setPrivacyAccepted] = useState<boolean>(false);
  const [activeLegalTab, setActiveLegalTab] = useState<"SUMMARY" | "TERMS" | "REFUND" | "PRIVACY">("SUMMARY");
  const [activeLegalModal, setActiveLegalModal] = useState<"TERMS" | "REFUND" | "PRIVACY" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [referenceId, setReferenceId] = useState<string>("");

  // Pre-select plan from URL parameters if present
  useEffect(() => {
    if (preSelectedQuery) {
      const queryLower = preSelectedQuery.toLowerCase();
      const match = ALL_PLAN_OPTIONS.find(
        (p) =>
          p.title.toLowerCase().includes(queryLower) ||
          queryLower.includes(p.title.toLowerCase()) ||
          p.id.toLowerCase().includes(queryLower) ||
          queryLower.includes(p.id.toLowerCase())
      );
      if (match) {
        setSelectedPlanId(match.id);
      }
    }
  }, [preSelectedQuery]);

  const selectedPlan = ALL_PLAN_OPTIONS.find((p) => p.id === selectedPlanId) || ALL_PLAN_OPTIONS[0];

  // Validation handlers
  const handleNextToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!brandName.trim() || brandName.trim().length < 2) {
      setErrorMessage("Please enter your business or brand name.");
      return;
    }
    const cleanPhone = phone.replace(/\D/g, "");
    if (!phone.trim() || cleanPhone.length < 7) {
      setErrorMessage("Please provide a valid WhatsApp / phone number.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage("Please enter a valid work email address.");
      return;
    }

    setErrorMessage("");
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextToStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanId) {
      setErrorMessage("Please select a plan to continue.");
      return;
    }
    setErrorMessage("");
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextToStep4 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmitBrief = async () => {
    if (!termsAccepted || !privacyAccepted) {
      setErrorMessage("Please review and accept both the Master Terms of Service (v2.0) and Privacy Policy before submitting.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          brandName,
          phone,
          email,
          websiteOrHandle,
          city,
          selectedPlan: selectedPlan.title,
          planCategory: selectedPlan.category,
          planPrice: selectedPlan.price,
          primaryGoal,
          timeline,
          assetDriveUrl,
          projectNotes,
          termsAccepted: true,
          privacyAccepted: true,
          termsVersion: "v2.0",
        }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(resData.message || "Failed to submit onboarding brief.");
      }

      setReferenceId(resData.referenceId || `ANV-${new Date().getFullYear()}-8820`);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.5 },
          colors: ["#CB2957", "#FFFFFF", "#EEEEEE"],
        });
      } catch {
        // Safe fallback
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission error occurred.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPlans =
    planCategoryFilter === "ALL"
      ? ALL_PLAN_OPTIONS
      : ALL_PLAN_OPTIONS.filter((p) => p.category === planCategoryFilter);

  // Success Screen
  if (isSubmitted) {
    const officialPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919428777887";
    const whatsappMessage = encodeURIComponent(
      `🎬 *NEW CLIENT ONBOARDING BRIEF — ANIVEL MEDIA*\n\n` +
      `• *Ref ID:* ${referenceId}\n` +
      `• *Client Name:* ${fullName}\n` +
      `• *Brand / Business:* ${brandName}\n` +
      `• *WhatsApp:* ${phone}\n` +
      `• *Email:* ${email}\n` +
      (city ? `• *Location:* ${city}\n` : "") +
      (websiteOrHandle ? `• *Social / Web:* ${websiteOrHandle}\n` : "") +
      `• *Selected Plan:* ${selectedPlan.title} (${selectedPlan.price})\n` +
      `• *Primary Goal:* ${primaryGoal}\n` +
      `• *Target Kickoff:* ${timeline}\n` +
      (assetDriveUrl ? `• *Asset Drive:* ${assetDriveUrl}\n` : "") +
      (projectNotes ? `• *Notes:* ${projectNotes}\n` : "") +
      `• *Master Legal Terms:* Accepted (v2.0) ✓\n\n` +
      `Hi Affan, I just submitted our onboarding brief on the website. Looking forward to kickstarting our production!`
    );

    return (
      <div className="min-h-screen bg-black text-[#EEEEEE] py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center w-full max-w-full overflow-x-hidden">
        <div className="max-w-2xl w-full rounded-[24px] border border-crimson/50 bg-[#0A0609] p-8 sm:p-12 shadow-[0_25px_80px_-20px_rgba(203,41,87,0.35)] text-center space-y-8 relative overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-crimson/20 blur-3xl" />
          
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-crimson/20 border border-crimson/50 text-crimson shadow-crimson-glow">
            <CheckCircle2 className="h-10 w-10 text-crimson" />
          </div>

          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">
              ✓ Onboarding Brief Recorded &bull; Ready For Launch
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              WELCOME TO <span className="text-crimson">ANIVEL MEDIA.</span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 font-sans max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{fullName}</strong>. Your project brief for <strong>{brandName}</strong> has been logged into our executive pipeline and Google Sheet.
            </p>
          </div>

          {/* Reference ID Pill */}
          <div className="rounded-[16px] border border-white/10 bg-black/60 p-5 space-y-1 max-w-md mx-auto">
            <span className="font-mono text-[10px] uppercase text-zinc-400 block tracking-widest">
              OFFICIAL ONBOARDING REFERENCE ID
            </span>
            <span className="font-mono text-2xl sm:text-3xl font-black text-rose-200 tracking-wider block">
              {referenceId}
            </span>
            <span className="font-mono text-xs text-zinc-400 block pt-1">
              Selected: <strong className="text-white">{selectedPlan.title}</strong> ({selectedPlan.price})
            </span>
          </div>

          {/* Next Steps Card */}
          <div className="text-left rounded-xl border border-white/5 bg-white/[0.02] p-5 space-y-2 text-xs text-zinc-300 font-sans">
            <span className="font-mono text-[10px] uppercase tracking-wider text-crimson font-bold block">
              What Happens Next:
            </span>
            <div className="space-y-1.5">
              <p>&bull; <strong>24-Hour Scope Review:</strong> Founder &amp; Creative Director Affan Shaikh reviews your brand assets &amp; goals.</p>
              <p>&bull; <strong>Google Sheet Ingestion:</strong> Your details are archived in our client delivery roster.</p>
              <p>&bull; <strong>Direct Alignment Call:</strong> We will reach out on WhatsApp to schedule our creative kick-off.</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${officialPhone}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 px-8 py-4 font-display text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-500 shadow-[0_10px_30px_-5px_rgba(16,185,129,0.4)] transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              <span>SEND BRIEF ON WHATSAPP &rarr;</span>
            </a>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-4 font-display text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white hover:border-white/20 transition-all"
            >
              Return To Website
            </Link>
          </div>
          <p className="font-mono text-[10px] text-zinc-500">
            Clicking &quot;Send Brief On WhatsApp&quot; opens WhatsApp with your pre-formatted brief ready to send directly to Affan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#EEEEEE] py-12 lg:py-20 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[1000px] rounded-full bg-crimson/[0.06] blur-[220px] -z-10"
      />

      <div className="mx-auto max-w-4xl space-y-10">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>&larr; Back to Anivel Media</span>
          </Link>

          <div className="flex items-center gap-2 font-mono text-xs text-rose-300">
            <Sparkles className="h-3.5 w-3.5 text-crimson" />
            <span>Official Client Intake</span>
          </div>
        </div>

        {/* Header Title */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-crimson/40 bg-crimson/15 px-3 py-1 font-mono text-[10px] text-rose-200 uppercase font-bold tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
            <span>Structured Client Onboarding &bull; 4 Steps</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[0.95]">
            INITIATE YOUR <span className="text-crimson">CAMPAIGN.</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-sans leading-relaxed">
            Tell us about your brand, choose your official service plan, and align your deliverables. Takes approximately 2 minutes to submit.
          </p>
        </div>

        {/* Step Progress Tracker */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 py-3 border-y border-white/10">
          {[
            { num: 1, label: "01. Brand & Contact" },
            { num: 2, label: "02. Select Plan" },
            { num: 3, label: "03. Goals & Assets" },
            { num: 4, label: "04. Launch Brief" },
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => {
                // Allow jumping backwards
                if (s.num < currentStep) setCurrentStep(s.num);
              }}
              className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${
                currentStep === s.num
                  ? "border-crimson bg-crimson/15 text-white shadow-crimson-glow"
                  : currentStep > s.num
                  ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-300"
                  : "border-white/5 bg-white/[0.02] text-zinc-500 pointer-events-none"
              }`}
            >
              <span className="font-mono text-[10px] sm:text-xs font-bold block truncate">
                {currentStep > s.num ? `✓ ${s.label}` : s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-xl border border-rose-500/50 bg-rose-950/30 text-rose-300 text-xs font-sans flex items-center justify-between animate-shake">
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage("")}
              className="font-mono text-xs text-rose-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* Form Container */}
        <div className="rounded-[24px] border border-white/10 bg-[#08080C] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* =========================================================================
              STEP 1: BRAND & CONTACT INFORMATION
          ========================================================================= */}
          {currentStep === 1 && (
            <form onSubmit={handleNextToStep2} className="space-y-6">
              <div className="space-y-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-crimson font-bold block">
                  Step 01 of 04
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white">
                  Who Are We Creating For?
                </h2>
                <p className="text-xs text-zinc-400">
                  Please provide your personal contact info and business identity.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-zinc-300 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-crimson" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:border-crimson focus:ring-1 focus:ring-crimson outline-none transition-all"
                  />
                </div>

                {/* Brand Name */}
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-zinc-300 flex items-center gap-1.5">
                    <Building className="h-3.5 w-3.5 text-crimson" />
                    <span>Brand / Business Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="e.g. Shish Jewels / Adil Qadri"
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:border-crimson focus:ring-1 focus:ring-crimson outline-none transition-all"
                  />
                </div>

                {/* WhatsApp Phone */}
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-zinc-300 flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-emerald-400" />
                    <span>WhatsApp / Contact Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:border-crimson focus:ring-1 focus:ring-crimson outline-none transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-zinc-300 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-crimson" />
                    <span>Work Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@brand.com"
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:border-crimson focus:ring-1 focus:ring-crimson outline-none transition-all"
                  />
                </div>

                {/* Instagram Handle / Website */}
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-zinc-300 flex items-center gap-1.5">
                    <Instagram className="h-3.5 w-3.5 text-rose-300" />
                    <span>Instagram Handle or Website</span>
                  </label>
                  <input
                    type="text"
                    value={websiteOrHandle}
                    onChange={(e) => setWebsiteOrHandle(e.target.value)}
                    placeholder="@brandhandle or https://brand.com"
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:border-crimson focus:ring-1 focus:ring-crimson outline-none transition-all"
                  />
                </div>

                {/* City / Base Location */}
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-zinc-300 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-crimson" />
                    <span>City / Base Location</span>
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Surat, Mumbai, Delhi, Bengaluru"
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:border-crimson focus:ring-1 focus:ring-crimson outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-crimson px-8 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-crimson-glow hover:bg-crimson-600 transition-all"
                >
                  <span>Continue to Plan Selection &rarr;</span>
                </button>
              </div>
            </form>
          )}

          {/* =========================================================================
              STEP 2: SELECT YOUR OFFICIAL PLAN OR SERVICE
          ========================================================================= */}
          {currentStep === 2 && (
            <form onSubmit={handleNextToStep3} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-crimson font-bold block">
                    Step 02 of 04
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white">
                    Select Your Plan
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Choose from our official rate card packages or select a custom quote.
                  </p>
                </div>

                {/* Plan Category Filter */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                  {[
                    { id: "ALL", label: "All Plans" },
                    { id: "BRAND", label: "Brand Retainers" },
                    { id: "CREATIVE", label: "Creative" },
                    { id: "COMBO", label: "Combos" },
                    { id: "DEMO", label: "Demo ₹850" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setPlanCategoryFilter(cat.id)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-[11px] uppercase font-bold transition-all ${
                        planCategoryFilter === cat.id
                          ? "bg-crimson text-white shadow-crimson-glow"
                          : "bg-white/5 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plans Selection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[460px] overflow-y-auto pr-1">
                {filteredPlans.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? "border-crimson bg-[#140911] shadow-[0_0_25px_rgba(203,41,87,0.3)] ring-1 ring-crimson"
                          : "border-white/10 bg-[#0B0B0F] hover:border-white/20 hover:bg-[#0E0E14]"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase font-bold text-zinc-400">
                            {plan.category}
                          </span>
                          {plan.badge && (
                            <span
                              className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-bold ${
                                isSelected
                                  ? "bg-crimson text-white shadow-crimson-glow"
                                  : "bg-white/10 text-rose-200"
                              }`}
                            >
                              {plan.badge}
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="font-display font-black text-white text-base uppercase">
                            {plan.title}
                          </h4>
                          <span className="font-display text-xl font-black text-crimson">
                            {plan.price}
                          </span>
                        </div>

                        <p className="text-xs text-zinc-300 font-sans leading-relaxed pt-1 border-t border-white/5">
                          {plan.deliverables}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between font-mono text-[11px]">
                        <span className={isSelected ? "text-rose-200 font-bold" : "text-zinc-500"}>
                          {isSelected ? "✓ Selected Plan" : "Click to Select"}
                        </span>
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? "border-crimson bg-crimson text-white"
                              : "border-white/20 bg-black/40"
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="font-mono text-xs text-zinc-400 hover:text-white"
                >
                  &larr; Back to Step 1
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-crimson px-8 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-crimson-glow hover:bg-crimson-600 transition-all"
                >
                  <span>Continue to Goals &rarr;</span>
                </button>
              </div>
            </form>
          )}

          {/* =========================================================================
              STEP 3: GOALS, TIMELINE & ASSETS
          ========================================================================= */}
          {currentStep === 3 && (
            <form onSubmit={handleNextToStep4} className="space-y-6">
              <div className="space-y-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-crimson font-bold block">
                  Step 03 of 04
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white">
                  Campaign Goals &amp; Assets
                </h2>
                <p className="text-xs text-zinc-400">
                  Help us understand your target milestones and creative requirements.
                </p>
              </div>

              <div className="space-y-5 pt-2">
                {/* Primary Objective */}
                <div className="space-y-2">
                  <label className="font-mono text-xs text-zinc-300 flex items-center gap-1.5">
                    <Target className="h-3.5 w-3.5 text-crimson" />
                    <span>Primary Campaign Objective *</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {CAMPAIGN_GOALS.map((goal) => {
                      const isSelected = primaryGoal === goal;
                      return (
                        <div
                          key={goal}
                          onClick={() => setPrimaryGoal(goal)}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? "border-crimson bg-crimson/20 text-white font-bold"
                              : "border-white/10 bg-black/40 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                          }`}
                        >
                          <span>{goal}</span>
                          {isSelected && <Check className="h-3.5 w-3.5 text-crimson shrink-0 ml-2" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Kickoff Timeline */}
                <div className="space-y-2">
                  <label className="font-mono text-xs text-zinc-300 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-crimson" />
                    <span>Target Kickoff Timeline *</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {TIMELINE_OPTIONS.map((time) => {
                      const isSelected = timeline === time;
                      return (
                        <div
                          key={time}
                          onClick={() => setTimeline(time)}
                          className={`p-3 rounded-xl border text-center text-xs cursor-pointer transition-all ${
                            isSelected
                              ? "border-crimson bg-crimson/20 text-white font-bold"
                              : "border-white/10 bg-black/40 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                          }`}
                        >
                          <span>{time}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Cloud Drive Link */}
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-zinc-300 flex items-center gap-1.5">
                    <UploadCloud className="h-3.5 w-3.5 text-rose-300" />
                    <span>Cloud Asset Drive Link (Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={assetDriveUrl}
                    onChange={(e) => setAssetDriveUrl(e.target.value)}
                    placeholder="Google Drive, Dropbox, or OneDrive link for logos, raw video footage, or brand deck"
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:border-crimson focus:ring-1 focus:ring-crimson outline-none transition-all"
                  />
                  <span className="font-mono text-[10px] text-zinc-500 block">
                    Make sure share link permissions are set to &quot;Anyone with the link can view&quot;.
                  </span>
                </div>

                {/* Project Notes */}
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-zinc-300 flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-crimson" />
                    <span>Specific Project Notes or Vision (Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={projectNotes}
                    onChange={(e) => setProjectNotes(e.target.value)}
                    placeholder="Tell us about your brand pain points, preferred shoot locations, or reference videos you love."
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:border-crimson focus:ring-1 focus:ring-crimson outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="font-mono text-xs text-zinc-400 hover:text-white"
                >
                  &larr; Back to Step 2
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-crimson px-8 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-white shadow-crimson-glow hover:bg-crimson-600 transition-all"
                >
                  <span>Review &amp; Confirm &rarr;</span>
                </button>
              </div>
            </form>
          )}

          {/* =========================================================================
              STEP 4: REVIEW & LAUNCH BRIEF
          ========================================================================= */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-crimson font-bold block">
                  Step 04 of 04 &bull; Final Review
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white">
                  Confirm Onboarding Scope
                </h2>
                <p className="text-xs text-zinc-400">
                  Please verify your brief details before submitting to our production pipeline.
                </p>
              </div>

              {/* Review Summary Grid */}
              <div className="rounded-2xl border border-crimson/40 bg-[#120810] p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-zinc-400 block tracking-widest">
                      SELECTED PLAN
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-black text-white uppercase mt-0.5">
                      {selectedPlan.title}
                    </h3>
                  </div>
                  <span className="font-display text-2xl font-black text-crimson">
                    {selectedPlan.price}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-zinc-300">
                  <div>
                    <span className="font-mono text-[10px] text-zinc-400 uppercase block font-bold">CLIENT &amp; BRAND</span>
                    <span className="text-white font-medium block">{fullName} &bull; {brandName}</span>
                    <span className="text-zinc-400 block">{email} &bull; {phone}</span>
                    {city && <span className="text-zinc-400 block">Location: {city}</span>}
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-zinc-400 uppercase block font-bold">CAMPAIGN GOAL &amp; TIMELINE</span>
                    <span className="text-white font-medium block">{primaryGoal}</span>
                    <span className="text-zinc-400 block">Timeline: {timeline}</span>
                  </div>
                </div>

                {assetDriveUrl && (
                  <div className="pt-2 border-t border-white/5 text-xs">
                    <span className="font-mono text-[10px] text-zinc-400 uppercase block font-bold">ASSET DRIVE</span>
                    <a href={assetDriveUrl} target="_blank" rel="noreferrer" className="text-crimson hover:underline truncate block">
                      {assetDriveUrl}
                    </a>
                  </div>
                )}
              </div>

              {/* Master Legal Terms & Privacy Agreement (v2.0) Panel */}
              <div className="rounded-2xl border border-white/15 bg-[#0D0B12] p-5 sm:p-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Scale className="h-4 w-4 text-crimson" />
                      <span className="font-mono text-xs text-crimson font-bold uppercase tracking-wider">
                        Master Legal Specification (v2.0)
                      </span>
                      <span className="rounded-full bg-crimson/20 border border-crimson/30 px-2 py-0.5 text-[10px] font-mono text-rose-300">
                        Official Contract Terms
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      Review commercial rules, revision milestones, cancellation refund stages, and DPDP privacy protection below.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setActiveLegalModal(activeLegalTab === "SUMMARY" ? "TERMS" : activeLegalTab)}
                      className="px-3 py-1.5 rounded-lg border border-crimson/40 bg-crimson/10 text-rose-300 hover:bg-crimson/20 transition-colors flex items-center gap-1.5"
                    >
                      <BookOpen className="h-3 w-3" />
                      <span>Expand Modal</span>
                    </button>
                    <a
                      href={
                        activeLegalTab === "PRIVACY"
                          ? "/privacy-policy"
                          : activeLegalTab === "REFUND"
                          ? "/refund-cancellation"
                          : "/terms-and-conditions"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-zinc-300 hover:text-white hover:border-white/30 transition-colors flex items-center gap-1.5"
                    >
                      <span>Full Page</span>
                      <ExternalLink className="h-3 w-3 text-crimson" />
                    </a>
                  </div>
                </div>

                {/* Tab Navigation for In-Flow Reading */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-white/5">
                  <button
                    type="button"
                    onClick={() => setActiveLegalTab("SUMMARY")}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 shrink-0 ${
                      activeLegalTab === "SUMMARY"
                        ? "bg-crimson text-white shadow-crimson-glow font-bold"
                        : "bg-black/40 text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>01. Quick Summary</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveLegalTab("TERMS")}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 shrink-0 ${
                      activeLegalTab === "TERMS"
                        ? "bg-crimson text-white shadow-crimson-glow font-bold"
                        : "bg-black/40 text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>02. Terms of Service (v2.0)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveLegalTab("REFUND")}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 shrink-0 ${
                      activeLegalTab === "REFUND"
                        ? "bg-crimson text-white shadow-crimson-glow font-bold"
                        : "bg-black/40 text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Scale className="h-3.5 w-3.5" />
                    <span>03. Refund &amp; Cancellation</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveLegalTab("PRIVACY")}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 shrink-0 ${
                      activeLegalTab === "PRIVACY"
                        ? "bg-crimson text-white shadow-crimson-glow font-bold"
                        : "bg-black/40 text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Lock className="h-3.5 w-3.5" />
                    <span>04. Privacy Policy (DPDP)</span>
                  </button>
                </div>

                {/* Tab 1: Commercial Summary */}
                {activeLegalTab === "SUMMARY" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl border border-white/5 bg-black/50 space-y-1">
                      <div className="flex items-center gap-1.5 text-white font-mono text-[11px] font-bold">
                        <span className="text-crimson">01.</span>
                        <span>Payment Schedule</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-snug">
                        Demo 100% upfront; Individual/Combo 50% deposit &amp; 50% post-preview; Creative plans 100% advance; Brand first installment / 3-mo advance for discount.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-white/5 bg-black/50 space-y-1">
                      <div className="flex items-center gap-1.5 text-white font-mono text-[11px] font-bold">
                        <span className="text-crimson">02.</span>
                        <span>2-Round Revisions</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-snug">
                        Up to two (2) revision rounds included per deliverable. Feedback window is 3 business days; failure to respond constitutes deemed acceptance.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-white/5 bg-black/50 space-y-1">
                      <div className="flex items-center gap-1.5 text-white font-mono text-[11px] font-bold">
                        <span className="text-crimson">03.</span>
                        <span>Stage-Based Refunds</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-snug">
                        100% refund within 48h before work commences. Once concept starts, concept fee non-refundable; shoot completed = shoot non-refundable; editing started = no refund.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-white/5 bg-black/50 space-y-1">
                      <div className="flex items-center gap-1.5 text-white font-mono text-[11px] font-bold">
                        <span className="text-crimson">04.</span>
                        <span>Ad &amp; Boost Media Spend</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-snug">
                        Meta &amp; Google ad media spends are strictly excluded and paid directly by client through their ad manager account. Retainer fees cover strategy &amp; execution.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-white/5 bg-black/50 space-y-1 sm:col-span-2 lg:col-span-2">
                      <div className="flex items-center gap-1.5 text-white font-mono text-[11px] font-bold">
                        <span className="text-crimson">05.</span>
                        <span>IP Rights &amp; DPDP Protection</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-snug">
                        Client owns all final published assets upon full invoice payment. Raw camera rushes remain Anivel Media property. Data processed per India DPDP Act 2023.
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab 2: Full Terms Reader */}
                {activeLegalTab === "TERMS" && (
                  <div className="rounded-xl border border-white/10 bg-black/60 p-4 max-h-[380px] overflow-y-auto space-y-5 text-xs text-zinc-300 font-sans leading-relaxed">
                    <div className="p-3 rounded-lg bg-crimson/10 border border-crimson/30 text-rose-200">
                      <strong>Terms of Service (v2.0):</strong> Governs all video production, retainer deliverables, and agency engagements. Scroll below to read all clauses.
                    </div>
                    {TERMS_OF_SERVICE_V2.sections.map((sec) => (
                      <div key={sec.id} className="space-y-1.5 border-b border-white/5 pb-3">
                        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                          {sec.title}
                        </h4>
                        <div className="whitespace-pre-line text-zinc-400">{sec.content}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab 3: Full Refund Policy Reader */}
                {activeLegalTab === "REFUND" && (
                  <div className="rounded-xl border border-white/10 bg-black/60 p-4 max-h-[380px] overflow-y-auto space-y-5 text-xs text-zinc-300 font-sans leading-relaxed">
                    <div className="p-3 rounded-lg bg-crimson/10 border border-crimson/30 text-rose-200">
                      <strong>Refund &amp; Cancellation Policy (v2.0):</strong> Stage-based refund milestones tied to production milestones.
                    </div>
                    {REFUND_POLICY_V2.sections.map((sec) => (
                      <div key={sec.id} className="space-y-1.5 border-b border-white/5 pb-3">
                        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                          {sec.title}
                        </h4>
                        <div className="whitespace-pre-line text-zinc-400">{sec.content}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab 4: Full DPDP Privacy Policy Reader */}
                {activeLegalTab === "PRIVACY" && (
                  <div className="rounded-xl border border-white/10 bg-black/60 p-4 max-h-[380px] overflow-y-auto space-y-5 text-xs text-zinc-300 font-sans leading-relaxed">
                    <div className="p-3 rounded-lg bg-crimson/10 border border-crimson/30 text-rose-200">
                      <strong>DPDP Act 2023 Compliance (v2.0):</strong> Minimal business data collection, zero data selling, and direct grievance redressal.
                    </div>
                    {PRIVACY_POLICY_V2.sections.map((sec) => (
                      <div key={sec.id} className="space-y-1.5 border-b border-white/5 pb-3">
                        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                          {sec.title}
                        </h4>
                        <div className="whitespace-pre-line text-zinc-400">{sec.content}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Explicit Legal Consent Checkboxes */}
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <label className="flex items-start gap-3 text-xs text-zinc-200 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-white/30 bg-black text-crimson focus:ring-crimson cursor-pointer"
                    />
                    <span>
                      I have reviewed and agree to Anivel Media&apos;s{" "}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveLegalModal("TERMS");
                        }}
                        className="text-crimson font-bold hover:underline"
                      >
                        Master Terms of Service (v2.0)
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveLegalModal("REFUND");
                        }}
                        className="text-crimson font-bold hover:underline"
                      >
                        Refund &amp; Cancellation Policy
                      </button>
                      . *
                    </span>
                  </label>

                  <label className="flex items-start gap-3 text-xs text-zinc-200 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-white/30 bg-black text-crimson focus:ring-crimson cursor-pointer"
                    />
                    <span>
                      I acknowledge the{" "}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveLegalModal("PRIVACY");
                        }}
                        className="text-crimson font-bold hover:underline"
                      >
                        Privacy Policy (DPDP Act 2023)
                      </button>{" "}
                      and confirm that boost/ad media budgets are paid directly by client to advertising platforms. *
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="font-mono text-xs text-zinc-400 hover:text-white"
                >
                  &larr; Back to Step 3
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmitBrief}
                  className="inline-flex items-center gap-2.5 rounded-xl bg-crimson px-10 py-4 font-display text-xs font-black uppercase tracking-wider text-white shadow-crimson-glow hover:bg-crimson-600 disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>LOGGING YOUR BRIEF...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>SUBMIT ONBOARDING BRIEF &rarr;</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Interactive In-Page Legal Drawer / Modal */}
      <AnimatePresence>
        {activeLegalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLegalModal(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl border border-white/20 bg-[#0A0A0E] text-[#EEEEEE] shadow-2xl z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-black/60">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-crimson font-bold uppercase tracking-wider">
                      Official Specification v2.0
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">&bull;</span>
                    <span className="font-mono text-[10px] text-emerald-400">Binding Legal Terms</span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-white mt-0.5">
                    {activeLegalModal === "TERMS" && "Master Terms of Service (v2.0)"}
                    {activeLegalModal === "REFUND" && "Refund & Cancellation Policy (v2.0)"}
                    {activeLegalModal === "PRIVACY" && "Privacy Policy (DPDP Act 2023 Compliant)"}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={
                      activeLegalModal === "TERMS"
                        ? "/terms-and-conditions"
                        : activeLegalModal === "REFUND"
                        ? "/refund-cancellation"
                        : "/privacy-policy"
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
                    title="Open in new window"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => setActiveLegalModal(null)}
                    className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
                    title="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-zinc-300 font-sans leading-relaxed">
                {activeLegalModal === "TERMS" && (
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-crimson/10 border border-crimson/30 text-rose-200">
                      <strong>Executive Summary:</strong> Covers payment schedules (Demo 100% advance, Combo 50/50, Creative 100%, Brand advance), 2-round revision limits, 3-day approval window, stage-based refunds, and exclusive client ownership of final released outputs upon full payment.
                    </div>
                    {TERMS_OF_SERVICE_V2.sections.map((sec) => (
                      <div key={sec.id} className="space-y-2 border-b border-white/5 pb-4">
                        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                          {sec.title}
                        </h4>
                        <div className="whitespace-pre-line text-zinc-400">{sec.content}</div>
                      </div>
                    ))}
                  </div>
                )}

                {activeLegalModal === "REFUND" && (
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-crimson/10 border border-crimson/30 text-rose-200">
                      <strong>Refund Milestones:</strong> 100% refund within 48h before work commences. Once concept work commences, concept fee is non-refundable. Shoot completed = shoot fee non-refundable. Editing started = no refund. Discounted 3-month retainers forfeit discount on early exit.
                    </div>
                    {REFUND_POLICY_V2.sections.map((sec) => (
                      <div key={sec.id} className="space-y-2 border-b border-white/5 pb-4">
                        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                          {sec.title}
                        </h4>
                        <div className="whitespace-pre-line text-zinc-400">{sec.content}</div>
                      </div>
                    ))}
                  </div>
                )}

                {activeLegalModal === "PRIVACY" && (
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-crimson/10 border border-crimson/30 text-rose-200">
                      <strong>DPDP Act 2023 Compliance:</strong> We collect only business details needed for video production. We never sell, rent, or trade your personal data. Grievance Desk: {BUSINESS_INFO.privacyEmail}.
                    </div>
                    {PRIVACY_POLICY_V2.sections.map((sec) => (
                      <div key={sec.id} className="space-y-2 border-b border-white/5 pb-4">
                        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                          {sec.title}
                        </h4>
                        <div className="whitespace-pre-line text-zinc-400">{sec.content}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 px-6 py-4 bg-black/60 flex items-center justify-between">
                <span className="font-mono text-[11px] text-zinc-500">
                  Version 2.0 &bull; Effective {BUSINESS_INFO.effectiveDate}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (activeLegalModal === "PRIVACY") {
                      setPrivacyAccepted(true);
                    } else {
                      setTermsAccepted(true);
                    }
                    setActiveLegalModal(null);
                  }}
                  className="rounded-xl bg-crimson px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-white hover:bg-crimson-600 transition-colors"
                >
                  I Understand &amp; Accept
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono text-xs">
          Loading Onboarding Portal...
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
