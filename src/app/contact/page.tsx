"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ProjectInquiryModal } from "@/components/ProjectInquiryModal";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ContactPage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-[#EEEEEE] relative">
      <Navbar onOpenInquiry={() => setIsInquiryOpen(true)} />

      {/* Breadcrumb / Back Link */}
      <div className="pt-28 pb-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-crimson transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      <ContactSection isStandalonePage={true} />

      <Footer onOpenInquiry={() => setIsInquiryOpen(true)} />

      <ProjectInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </main>
  );
}
