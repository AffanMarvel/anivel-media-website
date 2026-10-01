"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, ArrowRight, Sparkles, LayoutGrid, Eye, Film, Play } from "lucide-react";
import { Eyebrow } from "@/components/ui/Typography";
import { CaseStudyModal, CaseStudyData } from "@/components/CaseStudyModal";

const DriftWall = dynamic(() => import("@/components/gallery/DriftWall"), {
  ssr: false,
});

interface WorkShowcaseProps {
  onOpenInquiry: (initialProject?: string) => void;
}

type WorkCategory = "ALL" | "Social Media" | "Branding" | "Shoots" | "Ads";

const CATEGORIES: WorkCategory[] = ["ALL", "Social Media", "Branding", "Shoots", "Ads"];

export interface ClientVideoItem {
  id: string;
  name: string;
  subtitle: string;
  client: string;
  category: "Social Media" | "Branding" | "Shoots" | "Ads";
  categoryLabel: string;
  year: string;
  video: string;
  image: string;
  summary: string;
  results: {
    reach: string;
    engagement: string;
    leads: string;
    contentOutput: string;
    adPerformance: string;
  };
}

export const ALL_36_CLIENT_VIDEOS: ClientVideoItem[] = [
  {
    id: "video-01",
    name: "Celebrity Event Launch",
    subtitle: "Mr. Faisu x Brand Launch On-Ground Shoot",
    client: "Adil Qadri x Mr. Faisu",
    category: "Shoots",
    categoryLabel: "Celebrity Event // 4K Production",
    year: "2026",
    video: "/videos/mr_faisu_07_1750682013_3661303087387698067_2302078745.mp4",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
    summary: "Multi-camera on-ground coverage capturing VIP arrival, product unveiling, and crowd excitement.",
    results: {
      reach: "1.4M+ Impressions",
      engagement: "68K+ Likes & Comments",
      leads: "Record Launch Day Traffic",
      contentOutput: "1 Master Video + 4 Cutdowns",
      adPerformance: "Organic Algorithmic Velocity",
    },
  },
  {
    id: "video-02",
    name: "Bridal Diamond Sparkle",
    subtitle: "Shish Jewels Turntable Light Refraction",
    client: "Shish Jewels",
    category: "Shoots",
    categoryLabel: "Luxury Jewelry // Turntable Macro",
    year: "2026",
    video: "/videos/shish.jewels_1779883412_3906267110038492615_47200406741.mp4",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
    summary: "High-frame-rate diamond motion capture with custom optical prism flares and slow-motion rotation.",
    results: {
      reach: "480K+ Views",
      engagement: "8.4% Save-to-View Rate",
      leads: "140+ Direct WhatsApp Leads",
      contentOutput: "9:16 Ultra-HD Master Reel",
      adPerformance: "5.4x Catalog ROAS",
    },
  },
  {
    id: "video-03",
    name: "Solitaire Cut Showcase",
    subtitle: "Shish Jewels 4K Precision Shoot",
    client: "Shish Jewels",
    category: "Social Media",
    categoryLabel: "High Jewelry // Macro Sparkle",
    year: "2026",
    video: "/videos/shish.jewels_1783598485_3937431426671924305_47200406741.mp4",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
    summary: "Extreme macro lens inspection revealing facet brilliance and bespoke ring settings.",
    results: {
      reach: "320K+ Views",
      engagement: "6.2% Engagement Rate",
      leads: "85+ Bridal Consultations",
      contentOutput: "Single Asset Sprint",
      adPerformance: "₹0.09 Cost Per View",
    },
  },
  {
    id: "video-04",
    name: "Heritage Gold Craftsmanship",
    subtitle: "Truth Jewels Master Jeweler Documentary",
    client: "Truth Jewels",
    category: "Branding",
    categoryLabel: "Brand Cinema // Heritage Documentary",
    year: "2026",
    video: "/videos/truthjewels_1763654700_3770131746743253147_26243800169.mp4",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop",
    summary: "Emotional storytelling showcasing traditional Indian goldsmithing techniques, filing, and torch work.",
    results: {
      reach: "520K+ Organic Reach",
      engagement: "44% Avg Retention",
      leads: "High-Ticket Custom Inquiries",
      contentOutput: "Heritage Brand Film Cut",
      adPerformance: "Authority Multiplier",
    },
  },
  {
    id: "video-05",
    name: "Royal Polki Bridal Suite",
    subtitle: "Truth Jewels Wedding Emerald & Polki",
    client: "Truth Jewels",
    category: "Shoots",
    categoryLabel: "Bridal Luxury // Product Cinema",
    year: "2026",
    video: "/videos/truthjewels_1765029600_3781664837445948419_26243800169.mp4",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
    summary: "Slow cinematic glide across handcrafted emerald and polki wedding sets with warm heritage grade.",
    results: {
      reach: "290K+ Views",
      engagement: "9.1% High-Intent Share",
      leads: "Showroom Footfall Spike",
      contentOutput: "Polki Collection Reel",
      adPerformance: "4.8x Return on Ad Spend",
    },
  },
  {
    id: "video-06",
    name: "Artisan Gold Carving",
    subtitle: "Truth Jewels Handcrafted Macro Details",
    client: "Truth Jewels",
    category: "Social Media",
    categoryLabel: "Artisan Craft // 4K Macro",
    year: "2026",
    video: "/videos/truthjewels_1781191985_3917243619906701156_26243800169.mp4",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1000&auto=format&fit=crop",
    summary: "Close-up macro of artisan filing, polishing, and setting gemstone accents.",
    results: {
      reach: "380K+ Views",
      engagement: "5.7% Engagement",
      leads: "Custom Orders Pipeline",
      contentOutput: "Social Macro Reel",
      adPerformance: "High Engagement Index",
    },
  },
  {
    id: "video-07",
    name: "Automotive & Lifestyle Street",
    subtitle: "KP700 Luxury Culture & High Energy",
    client: "KP700",
    category: "Social Media",
    categoryLabel: "Lifestyle Culture // Street Reel",
    year: "2026",
    video: "/videos/kp700.__1781138003_3916766687588772486_13962572458.mp4",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop",
    summary: "Gimbal vehicle tracking, neon street grade, and dynamic rhythm cut for urban audience.",
    results: {
      reach: "610K+ Impressions",
      engagement: "12% Viral Velocity",
      leads: "Audience Expansion",
      contentOutput: "Dynamic Short Cut",
      adPerformance: "Under ₹0.07 CPV",
    },
  },
  {
    id: "video-08",
    name: "Commercial Scent Atomization",
    subtitle: "Adil Qadri High-Speed Mist & Droplets",
    client: "Adil Qadri",
    category: "Ads",
    categoryLabel: "Commercial Ad // High-Speed Macro",
    year: "2026",
    video: "/videos/adilqadriofficial_1744632640_3610561701392426739_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    summary: "High-contrast studio lighting capturing fine perfume mist atomization with ASMR audio design.",
    results: {
      reach: "850K+ Views",
      engagement: "46% Watch Time",
      leads: "E-Commerce Checkout Surge",
      contentOutput: "Hero Commercial Asset",
      adPerformance: "6.2x Conversion ROAS",
    },
  },
  {
    id: "video-09",
    name: "Viral Retention Hook Reel",
    subtitle: "Adil Qadri Speed-Ramped Sound Design",
    client: "Adil Qadri",
    category: "Social Media",
    categoryLabel: "Viral Reel // Algorithmic Pacing",
    year: "2026",
    video: "/videos/adilqadriofficial_1756806720_3712685295055080137_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop",
    summary: "Engineered specifically for Instagram explore algorithms with high-BPM cuts and 3-second hook.",
    results: {
      reach: "1.1M+ Organic Views",
      engagement: "52% Retention",
      leads: "Mass DM Inquiries",
      contentOutput: "Viral Retention Batch",
      adPerformance: "High Organic Flow",
    },
  },
  {
    id: "video-10",
    name: "Royal Oud Studio Staging",
    subtitle: "Adil Qadri Volumetric Smoke & Staging",
    client: "Adil Qadri",
    category: "Shoots",
    categoryLabel: "Studio Production // Luxury Staging",
    year: "2026",
    video: "/videos/adilqadriofficial_1734672658_3527012320742840033_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop",
    summary: "Dark studio staging with gold reflections, subtle smoke diffusion, and luxury bottle turntable.",
    results: {
      reach: "430K+ Views",
      engagement: "7.1% Save Rate",
      leads: "Retail Orders",
      contentOutput: "4K Studio Master",
      adPerformance: "Strong Brand Lift",
    },
  },
  {
    id: "video-11",
    name: "Signature Attar Heritage",
    subtitle: "Adil Qadri Traditional Attar Experience",
    client: "Adil Qadri",
    category: "Branding",
    categoryLabel: "Brand Heritage // Traditional Craft",
    year: "2026",
    video: "/videos/adilqadriofficial_1735365499_3532838166709090691_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop",
    summary: "Capturing the timeless prestige of oriental attar bottles and artisanal application.",
    results: {
      reach: "390K+ Views",
      engagement: "6.8% Engagement",
      leads: "Collector Sales",
      contentOutput: "Heritage Cut",
      adPerformance: "Low CPA",
    },
  },
  {
    id: "video-12",
    name: "Sensorial Visual Drops",
    subtitle: "Adil Qadri Fragrance Liquid Aesthetics",
    client: "Adil Qadri",
    category: "Social Media",
    categoryLabel: "Product Motion // Scent Drops",
    year: "2026",
    video: "/videos/adilqadriofficial_1735973244_3537921762623672186_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    summary: "Macro liquid droplets, glass refraction, and smooth rhythmic sound integration.",
    results: {
      reach: "310K+ Views",
      engagement: "4.9% Save Rate",
      leads: "Direct Site Clicks",
      contentOutput: "Sensorial Cut",
      adPerformance: "₹0.11 CPC",
    },
  },
  {
    id: "video-13",
    name: "High-Contrast Glass Flares",
    subtitle: "Adil Qadri Optical Staging & Light Leaks",
    client: "Adil Qadri",
    category: "Shoots",
    categoryLabel: "Optical Flares // Studio Staging",
    year: "2026",
    video: "/videos/adilqadriofficial_1736144758_3539360865613311727_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    summary: "Cinema lighting angles generating anamorphic horizontal flares across perfume glass.",
    results: {
      reach: "260K+ Views",
      engagement: "5.5% Engagement",
      leads: "Brand Lift Metric",
      contentOutput: "Optical Stills & Video",
      adPerformance: "High Ad Recall",
    },
  },
  {
    id: "video-14",
    name: "Shanaya Luxury Launch",
    subtitle: "Adil Qadri Flagship Perfume Campaign",
    client: "Adil Qadri",
    category: "Ads",
    categoryLabel: "Campaign Ad // E-Commerce Drop",
    year: "2026",
    video: "/videos/adilqadriofficial_1741430046_3583696700669181177_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop",
    summary: "Full commercial campaign asset driving massive immediate conversion velocity.",
    results: {
      reach: "980K+ Views",
      engagement: "41% Retention",
      leads: "Direct Cart Adds",
      contentOutput: "Campaign Reel Asset",
      adPerformance: "5.8x ROAS",
    },
  },
  {
    id: "video-15",
    name: "Fast-Paced Retention Cut",
    subtitle: "Adil Qadri Algorithmic Audio Transitions",
    client: "Adil Qadri",
    category: "Social Media",
    categoryLabel: "Retention Edit // Fast-Cut",
    year: "2026",
    video: "/videos/adilqadriofficial_1741932042_3587908140305437713_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop",
    summary: "Dynamic quick-cut editing synchronized precisely to trending audio beats.",
    results: {
      reach: "440K+ Views",
      engagement: "6.3% Viral Ratio",
      leads: "Profile Visits Surge",
      contentOutput: "Viral Cut",
      adPerformance: "Organic Reach",
    },
  },
  {
    id: "video-16",
    name: "Atmospheric Fragrance Story",
    subtitle: "Adil Qadri Emotional Scent Narrative",
    client: "Adil Qadri",
    category: "Branding",
    categoryLabel: "Brand Narrative // Mood Film",
    year: "2026",
    video: "/videos/adilqadriofficial_1744800882_3611973250028029936_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop",
    summary: "Moody cinematography with rich shadows and intimate bottle reflections.",
    results: {
      reach: "350K+ Views",
      engagement: "5.1% Retention",
      leads: "Prestige Brand Image",
      contentOutput: "Mood Video",
      adPerformance: "Low Frequency Drop",
    },
  },
  {
    id: "video-17",
    name: "Dynamic Camera Transitions",
    subtitle: "Adil Qadri Seamless Speed Ramps",
    client: "Adil Qadri",
    category: "Social Media",
    categoryLabel: "Motion Graphics // Speed Ramps",
    year: "2026",
    video: "/videos/adilqadriofficial_1747043778_3630781734381921210_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    summary: "360-degree orbital motion, whip pans, and clean zoom transitions.",
    results: {
      reach: "510K+ Views",
      engagement: "7.8% Re-watch Rate",
      leads: "Viral Explore Pick",
      contentOutput: "Speed-Ramped Cut",
      adPerformance: "High CTR",
    },
  },
  {
    id: "video-18",
    name: "Luxury Packaging Unveil",
    subtitle: "Adil Qadri Box & Bottle Experience",
    client: "Adil Qadri",
    category: "Shoots",
    categoryLabel: "Packaging Shoot // Macro Unbox",
    year: "2026",
    video: "/videos/adilqadriofficial_1747288801_3632844246522750279_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1000&auto=format&fit=crop",
    summary: "Tactile unboxing experience highlighting embossed gold lettering and luxury velvet lining.",
    results: {
      reach: "370K+ Views",
      engagement: "6.0% Save Rate",
      leads: "Gift Purchase Inquiries",
      contentOutput: "Unboxing Reel",
      adPerformance: "4.9x ROAS",
    },
  },
  {
    id: "video-19",
    name: "Exclusive Social Drop",
    subtitle: "Adil Qadri Meta Retargeting Ad Asset",
    client: "Adil Qadri",
    category: "Ads",
    categoryLabel: "Performance Ad // Retargeting",
    year: "2026",
    video: "/videos/adilqadriofficial_1750847321_3662694349665242666_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop",
    summary: "Built specifically to re-engage website visitors with strong call-to-action hooks.",
    results: {
      reach: "680K+ Views",
      engagement: "3.8% Click-Through",
      leads: "Direct Conversions",
      contentOutput: "Retargeting Cut",
      adPerformance: "7.1x ROAS",
    },
  },
  {
    id: "video-20",
    name: "Prism & Optical Reflections",
    subtitle: "Adil Qadri Studio Optical Artistry",
    client: "Adil Qadri",
    category: "Shoots",
    categoryLabel: "Optical Cinema // Studio Staging",
    year: "2026",
    video: "/videos/adilqadriofficial_1753440058_3684443988143839222_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    summary: "Reflective acrylic staging, prism refraction, and directional spotlight choreography.",
    results: {
      reach: "410K+ Views",
      engagement: "6.9% Engagement",
      leads: "Retail Partnership Deals",
      contentOutput: "Prism Motion Asset",
      adPerformance: "Top 5% Ad Score",
    },
  },
  {
    id: "video-21",
    name: "Aura Fragrance Editorial",
    subtitle: "Adil Qadri Lifestyle Editorial Motion",
    client: "Adil Qadri",
    category: "Branding",
    categoryLabel: "Editorial Video // Brand Aura",
    year: "2026",
    video: "/videos/adilqadriofficial_1753523229_3685140572640721041_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
    summary: "Sensorial storytelling connecting fragrance notes to human emotion and confidence.",
    results: {
      reach: "460K+ Views",
      engagement: "42% Retention Rate",
      leads: "Brand Loyalty Metric",
      contentOutput: "Editorial Brand Film",
      adPerformance: "Prestige Driver",
    },
  },
  {
    id: "video-22",
    name: "Viral Explore Reel Sprint",
    subtitle: "Adil Qadri Hook Formulation Batch",
    client: "Adil Qadri",
    category: "Social Media",
    categoryLabel: "Viral Reel // Hook Strategy",
    year: "2026",
    video: "/videos/adilqadriofficial_1755072980_3698141689532131249_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop",
    summary: "Scripted specifically to eliminate drop-off in the first 3 seconds of viewing.",
    results: {
      reach: "780K+ Views",
      engagement: "49% Retention",
      leads: "Audience Surge",
      contentOutput: "Hook Sprint Asset",
      adPerformance: "Algorithmic Growth",
    },
  },
  {
    id: "video-23",
    name: "Macro Nozzle Mist",
    subtitle: "Adil Qadri Fine Scent Atomizer",
    client: "Adil Qadri",
    category: "Shoots",
    categoryLabel: "Macro Cinema // 120 FPS Mist",
    year: "2026",
    video: "/videos/adilqadriofficial_1755242815_3699566907186232982_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    summary: "120 frames per second ultra-slow motion capture of aerosolized perfume mist.",
    results: {
      reach: "530K+ Views",
      engagement: "8.1% Share Ratio",
      leads: "Product Quality Trust",
      contentOutput: "120 FPS Macro Master",
      adPerformance: "High Conversion Lift",
    },
  },
  {
    id: "video-24",
    name: "Legacy Perfume Craft",
    subtitle: "Adil Qadri Heritage Fragrance Cut",
    client: "Adil Qadri",
    category: "Branding",
    categoryLabel: "Brand Heritage // Premium Oud",
    year: "2026",
    video: "/videos/adilqadriofficial_1755583325_3702423128545287230_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop",
    summary: "Highlighting raw ingredients, amber notes, and decades of artisanal perfume dedication.",
    results: {
      reach: "360K+ Views",
      engagement: "5.4% Retention",
      leads: "High-AOV Customer Leads",
      contentOutput: "Heritage Brand Film",
      adPerformance: "Loyalty Driver",
    },
  },
  {
    id: "video-25",
    name: "Autumn Scent Collection",
    subtitle: "Adil Qadri Seasonal Campaign Video",
    client: "Adil Qadri",
    category: "Social Media",
    categoryLabel: "Seasonal Campaign // Warm Grade",
    year: "2026",
    video: "/videos/adilqadriofficial_1758098667_3723523239545678968_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop",
    summary: "Autumn color grading with warm golden tones and cozy lifestyle storytelling.",
    results: {
      reach: "420K+ Views",
      engagement: "6.7% Engagement",
      leads: "Seasonal Sales Spike",
      contentOutput: "Autumn Video Drop",
      adPerformance: "4.5x ROAS",
    },
  },
  {
    id: "video-26",
    name: "Gold Foil Bottle Showcase",
    subtitle: "Adil Qadri Luxury Metallic Detailing",
    client: "Adil Qadri",
    category: "Shoots",
    categoryLabel: "Product Detail // Metallic Reflection",
    year: "2026",
    video: "/videos/adilqadriofficial_1758695127_3728527339865825900_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1000&auto=format&fit=crop",
    summary: "Specialized lighting setup showcasing micro gold foil stamping and glass depth.",
    results: {
      reach: "300K+ Views",
      engagement: "5.2% Engagement",
      leads: "Luxury Market Penetration",
      contentOutput: "Macro Product Cut",
      adPerformance: "Prestige Index",
    },
  },
  {
    id: "video-27",
    name: "ROAS E-Commerce Asset",
    subtitle: "Adil Qadri Direct-To-Consumer Acquisition",
    client: "Adil Qadri",
    category: "Ads",
    categoryLabel: "Performance Ad // Paid Acquisition",
    year: "2026",
    video: "/videos/adilqadriofficial_1764570309_3777812433344136005_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    summary: "Engineered specifically to convert cold traffic into paid buyers via Meta ads.",
    results: {
      reach: "1.2M+ Paid Views",
      engagement: "3.2% Conversion Rate",
      leads: "Scale E-Commerce Orders",
      contentOutput: "Ad Master Asset",
      adPerformance: "5.6x Scaled ROAS",
    },
  },
  {
    id: "video-28",
    name: "Dynamic Speed-Ramped Cut",
    subtitle: "Adil Qadri Modern Kinetic Typography",
    client: "Adil Qadri",
    category: "Social Media",
    categoryLabel: "Kinetic Video // Modern Pacing",
    year: "2026",
    video: "/videos/adilqadriofficial_1765362070_3784453187400089525_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop",
    summary: "Fast-moving cuts paired with kinetic typography and modern rhythm transitions.",
    results: {
      reach: "580K+ Views",
      engagement: "45% Watch Time",
      leads: "New Follower Inflow",
      contentOutput: "Kinetic Cut",
      adPerformance: "High Virality",
    },
  },
  {
    id: "video-29",
    name: "Commercial Finale Cut",
    subtitle: "Adil Qadri Brand Authority Showcase",
    client: "Adil Qadri",
    category: "Branding",
    categoryLabel: "Brand Finale // Commercial Master",
    year: "2026",
    video: "/videos/adilqadriofficial_1766028410_3790042061467072149_7277603136.mp4",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop",
    summary: "Cinematic commercial finale establishing Adil Qadri as a modern luxury benchmark.",
    results: {
      reach: "750K+ Views",
      engagement: "8.3% Share Rate",
      leads: "Mass Brand Credibility",
      contentOutput: "Commercial Finale",
      adPerformance: "High Retention",
    },
  },
  {
    id: "video-30",
    name: "Community Fan Energy",
    subtitle: "Adil Qadri Ki Sena Viral Engagement",
    client: "Adil Qadri Ki Sena",
    category: "Social Media",
    categoryLabel: "Community Reel // Fan Culture",
    year: "2026",
    video: "/videos/adilqadri_ki_sena_1734779069_3527903108917649630_71336861351.mp4",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop",
    summary: "Highlighting genuine brand advocates, fan reactions, and high-energy community content.",
    results: {
      reach: "490K+ Views",
      engagement: "14% Comment Rate",
      leads: "Community Growth",
      contentOutput: "Fan Energy Cut",
      adPerformance: "High Organic Flow",
    },
  },
  {
    id: "video-31",
    name: "Unboxing Excitement",
    subtitle: "Adil Qadri Ki Sena Customer Reaction",
    client: "Adil Qadri Ki Sena",
    category: "Social Media",
    categoryLabel: "UGC Motion // Real Reaction",
    year: "2026",
    video: "/videos/adilqadri_ki_sena_1735020917_3529932769275995137_71336861351.mp4",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
    summary: "Authentic customer unboxing moment with genuine excitement and reaction pacing.",
    results: {
      reach: "380K+ Views",
      engagement: "9.2% Engagement",
      leads: "Social Proof Multiplier",
      contentOutput: "Reaction Cut",
      adPerformance: "High Trust Metric",
    },
  },
  {
    id: "video-32",
    name: "Mall Event Surge",
    subtitle: "Adil Qadri Ki Sena Pop-Up Momentum",
    client: "Adil Qadri Ki Sena",
    category: "Shoots",
    categoryLabel: "On-Ground Shoot // Event Pop-Up",
    year: "2026",
    video: "/videos/adilqadri_ki_sena_1741253474_3582215767154345430_71336861351.mp4",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
    summary: "On-location filming capturing packed mall pop-up stalls and eager customers.",
    results: {
      reach: "620K+ Views",
      engagement: "11% Viral Velocity",
      leads: "On-Ground Footfall Spike",
      contentOutput: "Pop-Up Event Master",
      adPerformance: "Geotargeted Buzz",
    },
  },
  {
    id: "video-33",
    name: "Street Interaction Vibe",
    subtitle: "Adil Qadri Ki Sena Public Reactions",
    client: "Adil Qadri Ki Sena",
    category: "Shoots",
    categoryLabel: "Street Motion // Crowd Reaction",
    year: "2026",
    video: "/videos/adilqadri_ki_sena_1742810086_3595272204964343840_71336861351.mp4",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop",
    summary: "Real audience fragrance testing on the street with spontaneous honest reactions.",
    results: {
      reach: "710K+ Views",
      engagement: "48% Avg Watch Time",
      leads: "Customer Acquisition",
      contentOutput: "Street Testing Cut",
      adPerformance: "High Ad Recall",
    },
  },
  {
    id: "video-34",
    name: "High-BPM Viral Montage",
    subtitle: "Adil Qadri Ki Sena Community Hype",
    client: "Adil Qadri Ki Sena",
    category: "Social Media",
    categoryLabel: "High-Energy Cut // Viral Montage",
    year: "2026",
    video: "/videos/adilqadri_ki_sena_1744291743_3607701867380118335_71336861351.mp4",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop",
    summary: "Rapid-fire community montage showing dozens of happy buyers in quick succession.",
    results: {
      reach: "430K+ Views",
      engagement: "6.9% Engagement",
      leads: "Follower Growth",
      contentOutput: "Montage Cut",
      adPerformance: "Organic Reach",
    },
  },
  {
    id: "video-35",
    name: "Milestone Campaign Drop",
    subtitle: "Adil Qadri Ki Sena Special Activation",
    client: "Adil Qadri Ki Sena",
    category: "Social Media",
    categoryLabel: "Milestone Drop // Viral Activation",
    year: "2026",
    video: "/videos/adilqadri_ki_sena_1751434504_3667621291293580640_71336861351.mp4",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
    summary: "Celebrating follower growth milestones with dynamic motion graphics and brand badges.",
    results: {
      reach: "560K+ Views",
      engagement: "13% Comment Engagement",
      leads: "Brand Loyalty Spike",
      contentOutput: "Milestone Video",
      adPerformance: "Community Driver",
    },
  },
  {
    id: "video-36",
    name: "Perfume Trio Demonstration",
    subtitle: "Adil Qadri Product Lineup Showcase",
    client: "Adil Qadri",
    category: "Shoots",
    categoryLabel: "Commercial Shoot // Product Trio",
    year: "2026",
    video: "/videos/adilqadri_perfumes_1736857069_3545335112324249908_41772203900.mp4",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    summary: "Turntable product demonstration displaying packaging, bottle design, and atomization mist.",
    results: {
      reach: "470K+ Views",
      engagement: "7.4% Save Rate",
      leads: "Gift Set Inquiries",
      contentOutput: "Product Trio Reel",
      adPerformance: "4.7x ROAS",
    },
  },
];

export const WorkShowcase: React.FC<WorkShowcaseProps> = ({ onOpenInquiry }) => {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>("ALL");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyData | null>(null);
  const [viewMode, setViewMode] = useState<"drift" | "bento">("drift");
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

  const filteredVideos =
    activeCategory === "ALL"
      ? ALL_36_CLIENT_VIDEOS
      : ALL_36_CLIENT_VIDEOS.filter((p) => p.category === activeCategory);

  const handleOpenVideoModal = (v: ClientVideoItem) => {
    setSelectedCaseStudy({
      id: v.id,
      project: `${v.name} | ${v.client}`,
      category: v.categoryLabel,
      year: v.year,
      heroImage: v.image,
      video: v.video,
      galleryImages: [v.image],
      summary: `${v.summary} 100% authentic commercial production and editing delivered by Anivel Media.`,
      challenge: "Capturing instant high-retention engagement in the first 3 seconds while driving measurable commercial return.",
      strategy: "Precision lighting, macro 4K camera gear, algorithmic hook scripting, and rhythmic editorial pacing.",
      execution: {
        reels: ["4K Cinema Capture", "Sound FX & Audio Layers", "High-Contrast Grade"],
        posts: [],
        ads: ["Targeted Paid Distribution"],
        branding: [],
        website: [],
        campaignAssets: ["Master 9:16 Video Asset"],
      },
      processWorkflow: ["Pre-Production Scripting", "On-Location Shoot", "Rapid Post-Production", "Algorithmic Timing Drop"],
      results: v.results,
    });
  };

  return (
    <section id="work" className="relative py-20 lg:py-28 bg-black overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[800px] w-[1100px] rounded-full bg-crimson/[0.06] blur-[200px] -z-10"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Real Client Production Badges */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-crimson/40 bg-crimson/15 px-3 py-1 font-mono text-[10px] text-rose-200 uppercase tracking-widest font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
              <span>100% Real Client Video Productions &bull; 36 Archive Assets</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[0.92]">
              WORK THAT HAS{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-crimson">
                A PURPOSE.
              </span>
            </h2>
          </div>

          <div className="max-w-md space-y-2 text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
            <p>
              Every video below is an authentic commercial reel produced and edited by Anivel Media for real brands — including <strong>Adil Qadri</strong>, <strong>Mr. Faisu</strong>, <strong>Shish Jewels</strong>, <strong>Truth Jewels</strong>, and <strong>KP700</strong>.
            </p>
            <span className="font-mono text-xs text-rose-300 block">
              Tap any video tile to launch the 4K video player with audio and case study specs.
            </span>
          </div>
        </div>

        {/* Category Filters & Gallery View Mode Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-[8px] px-4 py-2 font-display text-xs font-bold uppercase tracking-wider transition-all select-none min-h-[40px] flex items-center justify-center ${
                  activeCategory === cat
                    ? "border border-crimson bg-crimson text-white shadow-crimson-glow"
                    : "border border-white/10 bg-surface/50 text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery View Mode Toggle: Bento vs 3D Drift Wall */}
          <div className="flex items-center gap-1.5 p-1 rounded-[10px] border border-white/10 bg-[#0B0B10] shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setViewMode("drift")}
              className={`px-3 py-1.5 rounded-[8px] font-display text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                viewMode === "drift"
                  ? "bg-crimson text-white shadow-crimson-glow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-rose-300" />
              <span>3D Drift Wall ({filteredVideos.length} Videos)</span>
            </button>
            <button
              onClick={() => setViewMode("bento")}
              className={`px-3 py-1.5 rounded-[8px] font-display text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                viewMode === "bento"
                  ? "bg-crimson text-white shadow-crimson-glow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {viewMode === "drift" ? (
          <div className="relative w-full h-[620px] sm:h-[700px] lg:h-[750px] rounded-[24px] border border-white/10 overflow-hidden bg-[#06060A] shadow-2xl">
            {/* Real Videos Live Notification Pill */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none rounded-[8px] border border-white/15 bg-black/80 backdrop-blur-md px-3.5 py-1.5 font-mono text-[11px] text-zinc-200 uppercase tracking-widest flex items-center gap-2.5 shadow-lg">
              <span className="h-2 w-2 rounded-full bg-crimson animate-pulse shadow-[0_0_8px_#CB2957]" />
              <span>Streaming {filteredVideos.length} Real Client Videos &bull; Hover To Drift &bull; Click Any Reel To Watch</span>
            </div>

            {/* 3D Drift Wall with ALL 36 REAL CLIENT VIDEOS */}
            <DriftWall
              items={filteredVideos.map((v) => ({
                image: v.image,
                video: v.video,
                title: v.name,
                subtitle: `${v.client} // ${v.subtitle}`,
                category: v.categoryLabel,
                onClick: () => handleOpenVideoModal(v),
              }))}
              columns={6}
              tileWidth={260}
              tileHeight={170}
              gap={20}
              speed={40}
              perspective={1200}
              tilt={15}
              turn={-10}
              depth={130}
              lift={70}
              dim={0.9}
              overlayColor="rgba(0,0,0,0.1)"
            />
          </div>
        ) : (
          /* Grid View of All Real Client Videos with Hover-to-Play */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch">
            {filteredVideos.map((v) => {
              const isHovered = hoveredVideoId === v.id;
              return (
                <div
                  key={v.id}
                  onMouseEnter={() => setHoveredVideoId(v.id)}
                  onMouseLeave={() => setHoveredVideoId(null)}
                  onClick={() => handleOpenVideoModal(v)}
                  className="group relative rounded-[16px] border border-white/[0.08] bg-[#07070A] overflow-hidden cursor-pointer select-none transition-all duration-300 hover:border-crimson/60 hover:-translate-y-1 hover:shadow-[0_15px_45px_-10px_rgba(203,41,87,0.3)] flex flex-col justify-end min-h-[380px]"
                >
                  {/* Background Media: Direct client video playback */}
                  <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950">
                    {v.video ? (
                      <video
                        src={v.video}
                        poster={v.image}
                        loop
                        muted
                        playsInline
                        preload="none"
                        ref={(el) => {
                          if (el) {
                            if (isHovered) el.play().catch(() => {});
                            else el.pause();
                          }
                        }}
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 brightness-105"
                      />
                    ) : (
                      <img
                        src={v.image}
                        alt={v.name}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 brightness-100"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-300 group-hover:via-black/60" />
                  </div>

                {/* Top Badge: Real Client Video */}
                <div className="absolute top-3.5 right-3.5 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/80 border border-crimson/50 px-2.5 py-0.5 font-mono text-[9px] font-bold text-rose-200 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
                    REAL VIDEO
                  </span>
                </div>

                {/* Crimson Accent Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-crimson to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10" />

                {/* Content Overlay */}
                <div className="relative z-10 p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-crimson font-bold">
                      {v.client}
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-crimson text-white shadow-crimson-glow">
                      <Play className="h-3 w-3 fill-white ml-0.5" />
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-black uppercase text-white leading-tight">
                    {v.name}
                  </h3>

                  <p className="font-mono text-xs text-zinc-300 leading-snug">
                    {v.subtitle}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-white/[0.08]">
                    <span>{v.results.reach}</span>
                    <span className="text-rose-300 font-bold">Watch &rarr;</span>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        )}

      </div>

      {/* Case Study Modal with Full HD Video Player */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onOpenInquiry={onOpenInquiry}
      />
    </section>
  );
};
