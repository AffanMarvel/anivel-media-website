"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  Layers,
  Workflow,
  Film,
  Sparkles,
  Rocket,
  PhoneCall,
} from "lucide-react";
import Dock, { DockItemData } from "./Dock";

export const FloatingDockMenu: React.FC = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  const scrollTo = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const dockItems: DockItemData[] = [
    {
      icon: <Home className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-300" />,
      label: "Top",
      onClick: () => scrollTo("top"),
      className: "!bg-[#0D0D12] !border-white/10 hover:!border-crimson/60 hover:!bg-[#181116]",
    },
    {
      icon: <Layers className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-300" />,
      label: "Services",
      onClick: () => scrollTo("services"),
      className: "!bg-[#0D0D12] !border-white/10 hover:!border-crimson/60 hover:!bg-[#181116]",
    },
    {
      icon: <Workflow className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-300" />,
      label: "Pipeline",
      onClick: () => scrollTo("process"),
      className: "!bg-[#0D0D12] !border-white/10 hover:!border-crimson/60 hover:!bg-[#181116]",
    },
    {
      icon: <Film className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-300" />,
      label: "Work",
      onClick: () => scrollTo("work"),
      className: "!bg-[#0D0D12] !border-white/10 hover:!border-crimson/60 hover:!bg-[#181116]",
    },
    {
      icon: <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-crimson" />,
      label: "Pricing",
      onClick: () => scrollTo("pricing"),
      className: "!bg-[#160D12] !border-crimson/40 hover:!border-crimson hover:!bg-[#220E18]",
    },
    {
      icon: <Rocket className="h-4 w-4 sm:h-5 sm:w-5 text-white animate-pulse" />,
      label: "Start Project",
      onClick: () => router.push("/onboarding"),
      className: "!bg-crimson !border-crimson shadow-[0_0_15px_#CB2957] hover:!bg-crimson-600",
    },
    {
      icon: <PhoneCall className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-300" />,
      label: "Contact",
      onClick: () => scrollTo("contact"),
      className: "!bg-[#0D0D12] !border-white/10 hover:!border-crimson/60 hover:!bg-[#181116]",
    },
  ];

  return (
    <div className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 pointer-events-auto max-w-[calc(100vw-16px)]">
      <div className="relative rounded-[22px] p-1 bg-black/75 backdrop-blur-2xl border border-white/10 shadow-[0_15px_50px_-10px_rgba(0,0,0,0.9)] max-w-full overflow-x-auto no-scrollbar">
        <Dock
          items={dockItems}
          panelHeight={isMobile ? 46 : 56}
          baseItemSize={isMobile ? 34 : 44}
          magnification={isMobile ? 42 : 60}
          distance={isMobile ? 70 : 120}
          className="!relative !bottom-0 !left-0 !transform-none !bg-transparent !border-0 !p-1 !gap-1.5 sm:!gap-2"
        />
      </div>
    </div>
  );
};

export default FloatingDockMenu;
