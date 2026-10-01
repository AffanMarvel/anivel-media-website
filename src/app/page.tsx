"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BrandSystemSection } from "@/components/BrandSystemSection";
import { Services } from "@/components/Services";
import { DualMarqueeTransition } from "@/components/DualMarqueeTransition";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { WorkShowcase } from "@/components/WorkShowcase";
import { ProductionShootSection } from "@/components/ProductionShootSection";
import { PackagesSection } from "@/components/PackagesSection";
import { WebDevSection } from "@/components/WebDevSection";
import { WhyAnivelSection } from "@/components/WhyAnivelSection";
import { AboutSection } from "@/components/AboutSection";
import { SocialEcosystemSection } from "@/components/SocialEcosystemSection";
import { StatsCounter } from "@/components/StatsCounter";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import {
  HeroToPositioningTransition,
  PositioningToServicesTransition,
  ProcessToWorkTransition,
  WorkToPackagesTransition,
  PackagesToContactTransition,
} from "@/components/SectionTransitions";
import { ScrollExpand } from "@/components/animations/ScrollExpand";

export default function HomePage() {
  const router = useRouter();

  const handleOpenInquiry = (serviceTitle?: string) => {
    if (serviceTitle) {
      router.push(`/onboarding?service=${encodeURIComponent(serviceTitle)}`);
    } else {
      router.push("/onboarding");
    }
  };

  return (
    <main className="min-h-screen bg-black text-[#EEEEEE] relative w-full max-w-full overflow-x-clip">
      {/* Global Navigation Header */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* 01: Hero Section */}
      <Hero onOpenInquiry={() => handleOpenInquiry()} />

      {/* Transition: Hero → Positioning */}
      <HeroToPositioningTransition />

      {/* 02: The Brand System Pipeline */}
      <ScrollExpand>
        <BrandSystemSection />
      </ScrollExpand>

      {/* Transition: Positioning → Services */}
      <PositioningToServicesTransition />

      {/* 03: Core Capabilities Hub (8 Asymmetric Bento Services) */}
      <ScrollExpand>
        <Services onOpenInquiry={handleOpenInquiry} />
      </ScrollExpand>

      {/* 04: Full-Width Dual-Layer Visual Transition */}
      <DualMarqueeTransition />

      {/* 05: 12-Stage Interactive Process Section (FROM IDEA TO EXECUTION.) */}
      <ScrollExpand>
        <ProcessTimeline onOpenInquiry={() => handleOpenInquiry()} />
      </ScrollExpand>

      {/* Transition: Process → Work */}
      <ProcessToWorkTransition />

      {/* 06: Selected Work & Reusable Case Study Showcase */}
      <ScrollExpand>
        <WorkShowcase onOpenInquiry={handleOpenInquiry} />
      </ScrollExpand>

      {/* Transition: Work → Packages */}
      <WorkToPackagesTransition />

      {/* 07: Production Shoots Section (SOMETIMES, GREAT CONTENT NEEDS A REAL SHOOT.) */}
      <ScrollExpand>
        <ProductionShootSection onOpenInquiry={handleOpenInquiry} />
      </ScrollExpand>

      {/* 08: Packages Section (3 Distinct Levels: Try ₹850, Start Local, Growth Partnership) */}
      <ScrollExpand>
        <PackagesSection onOpenInquiry={handleOpenInquiry} />
      </ScrollExpand>

      {/* 09: Website Development Section (YOUR BRAND DESERVES A BETTER DIGITAL HOME.) */}
      <ScrollExpand>
        <WebDevSection onOpenInquiry={handleOpenInquiry} />
      </ScrollExpand>

      {/* 10: WHY ANIVEL? Section (4 Principles: THINK, CREATE, EXECUTE, IMPROVE) */}
      <ScrollExpand>
        <WhyAnivelSection />
      </ScrollExpand>

      {/* 11: About & Philosophy Section (Official Circular Brand Emblem) */}
      <ScrollExpand>
        <AboutSection onOpenInquiry={() => handleOpenInquiry()} />
      </ScrollExpand>

      {/* 12: Social Media Ecosystem (FOLLOW THE WORK.) */}
      <ScrollExpand>
        <SocialEcosystemSection />
      </ScrollExpand>

      {/* 13: Empirical Agency Benchmarks */}
      <ScrollExpand>
        <StatsCounter />
      </ScrollExpand>

      {/* 14: Inquiries & FAQ Accordion (13 Questions) */}
      <ScrollExpand>
        <FAQSection onOpenInquiry={() => handleOpenInquiry()} />
      </ScrollExpand>

      {/* Transition: Packages/FAQ → Contact */}
      <PackagesToContactTransition />

      {/* 15: Direct Contact & Priority WhatsApp */}
      <ScrollExpand>
        <ContactSection />
      </ScrollExpand>

      {/* 16: Final Editorial Footer */}
      <Footer onOpenInquiry={() => handleOpenInquiry()} />
    </main>
  );
}
