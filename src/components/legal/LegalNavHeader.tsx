import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, Shield, ShieldAlert, Cookie, Phone, Mail } from "lucide-react";
import { OWNER_CONTACT } from "@/lib/constants/contactInfo";

interface LegalNavHeaderProps {
  activeDoc: "TERMS" | "REFUND" | "PRIVACY" | "COOKIES";
}

export const LegalNavHeader: React.FC<LegalNavHeaderProps> = ({ activeDoc }) => {
  const navItems = [
    {
      id: "TERMS",
      label: "Terms of Service (v2.0)",
      href: "/terms-and-conditions",
      icon: <FileText className="h-3.5 w-3.5" />,
    },
    {
      id: "REFUND",
      label: "Refund & Cancellation",
      href: "/refund-cancellation",
      icon: <ShieldAlert className="h-3.5 w-3.5" />,
    },
    {
      id: "PRIVACY",
      label: "Privacy Policy (DPDP)",
      href: "/privacy-policy",
      icon: <Shield className="h-3.5 w-3.5" />,
    },
    {
      id: "COOKIES",
      label: "Cookie Policy",
      href: "/cookie-policy",
      icon: <Cookie className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <div className="space-y-6 border-b border-white/10 pb-6">
      {/* Top Breadcrumb & Contact Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-crimson transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Anivel Media</span>
        </Link>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
          <a
            href={OWNER_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-400 hover:underline"
          >
            <Phone className="h-3 w-3" />
            <span>Direct WhatsApp: {OWNER_CONTACT.phone}</span>
          </a>
          <span className="text-zinc-600 hidden sm:inline">&bull;</span>
          <a
            href={`mailto:${OWNER_CONTACT.email}`}
            className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-crimson transition-colors"
          >
            <Mail className="h-3 w-3 text-crimson" />
            <span>{OWNER_CONTACT.email}</span>
          </a>
        </div>
      </div>

      {/* Legal Hub Document Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {navItems.map((item) => {
          const isActive = activeDoc === item.id;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                isActive
                  ? "bg-crimson text-white shadow-crimson-glow"
                  : "bg-white/5 text-zinc-400 border border-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
