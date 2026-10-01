import { ServiceItem, CaseStudyItem, PricingTier, FAQItem } from "@/types";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "social-media-management",
    category: "social",
    title: "Social Media Management & Growth",
    badge: "Core Growth Engine",
    tagline: "Turn passive profile visitors into loyal brand advocates.",
    description:
      "Comprehensive end-to-end management for Instagram, LinkedIn, and YouTube. We handle the entire editorial pipeline: from deep competitor audits and content calendars to active community engagement and daily page optimization.",
    deliverables: [
      "In-Depth Competitor & Trend Research",
      "Monthly 30-Day Strategic Content Calendar",
      "Grid Aesthetic & Feed Layout Architecture",
      "Direct Message & Comment Community Engagement",
      "Weekly Algorithm & Metric Reporting Dashboards",
      "Continuous Profile & Bio Conversion Optimization",
    ],
    metrics: "Average 3.4x organic reach expansion within 90 days",
    timeline: "Ongoing Retainer (Monthly)",
    iconName: "TrendingUp",
  },
  {
    id: "reel-creation-post-design",
    category: "production",
    title: "Reel Creation & Visual Post Design",
    badge: "High-Fidelity Content",
    tagline: "Scroll-stopping short-form video and editorial static graphics.",
    description:
      "Short-form video is the primary discovery engine on the modern web. We write hook-driven scripts, edit high-tempo dynamic reels with sound design, and design bespoke carousels and static assets that look like luxury editorial spreads.",
    deliverables: [
      "Viral Hook Scriptwriting & Storyboarding",
      "Dynamic Short-Form Video Editing (9:16 4K)",
      "Motion Graphics, Subtitles & Custom Sound Design",
      "Bespoke High-Converting Carousel Decks",
      "Story Sequences & Interactive Polls",
      "Color-Graded Asset Export for Multiple Formats",
    ],
    metrics: "Crafted for 40%+ retention & high save-to-share ratios",
    timeline: "Bi-weekly sprint batches",
    iconName: "Clapperboard",
  },
  {
    id: "meta-ads-acquisition",
    category: "ads",
    title: "Meta Ads & Performance Acquisition",
    badge: "Paid Scale Engine",
    tagline: "Predictable customer acquisition powered by scientific creative testing.",
    description:
      "We pair compelling creative assets with systematic media buying on Meta (Instagram & Facebook). By continuously stress-testing hooks, angles, and landing pages, we scale customer acquisition while protecting efficiency.",
    deliverables: [
      "Custom Campaign & Ad Account Structure",
      "Ad Creative Concepting (UGC, Motion, Static)",
      "High-Intent Retargeting & Lookalike Audiences",
      "Dynamic Pixel & Conversion API (CAPI) Integration",
      "Systematic Creative Fatigue Prevention",
      "Daily Bid Management & ROAS Optimization",
    ],
    metrics: "Optimized for ROAS and CAC efficiency",
    timeline: "Ongoing Sprint & Scaling",
    iconName: "Target",
  },
  {
    id: "commercial-shoots-events",
    category: "production",
    title: "Commercial Shoots & Event Content",
    badge: "On-Ground Studio",
    tagline: "Cinema-grade visuals on location and in-studio across India.",
    description:
      "Nothing replaces authentic, high-definition visual production. We mobilize professional camera crews, cinematic lighting, and creative direction to capture your products, brand founders, restaurants, or flagship events.",
    deliverables: [
      "Pre-Production Shot-Lists & Moodboards",
      "Cinema Camera 4K Equipment & Drone Coverage",
      "On-Location Studio & Ambient Lighting Setups",
      "Founder & Executive Spotlight Interviews",
      "Same-Day Fast-Turnaround Event Teasers",
      "Full Post-Production & Color Grading Pipeline",
    ],
    metrics: "Cinema-grade 4K 10-bit color workflow",
    timeline: "Full-day & Multi-day Sprints",
    iconName: "Camera",
  },
  {
    id: "fullstack-website-development",
    category: "web",
    title: "Full-Stack Website Development",
    badge: "Digital Engineering",
    tagline: "Blazing fast, award-winning interactive digital experiences.",
    description:
      "Your website is your ultimate brand flagship. We build custom, bespoke web experiences using Next.js, React, and Tailwind CSS, engineered for sub-second load times, smooth interactive micro-animations, and high conversion rates.",
    deliverables: [
      "Custom UI/UX Design System in Figma",
      "Full-Stack Next.js (App Router) Architecture",
      "Framer Motion Interactive Micro-Interactions",
      "Seamless CMS / CRM Integrations",
      "Technical SEO & Lighthouse 95+ Performance",
      "Mobile-First Responsive Optimization",
    ],
    metrics: "Sub-second load times & 95+ Core Web Vitals",
    timeline: "3 to 6 Week Dedicated Sprints",
    iconName: "Code2",
  },
  {
    id: "branding-visual-identity",
    category: "brand",
    title: "Branding & Visual Identity Systems",
    badge: "Brand Architecture",
    tagline: "Distinctive identities that command premium pricing and customer loyalty.",
    description:
      "Before scaling ad spend or launching campaigns, you need a sharp brand foundation. We sculpt cohesive brand identities: from custom logomarks and typographic systems to comprehensive brand books and tone-of-voice playbooks.",
    deliverables: [
      "Brand Positioning & Competitor Differentiation",
      "Primary & Secondary Logo Monogram Design",
      "Curated Color & Editorial Typography Hierarchy",
      "Packaging, Merchandise & Print Guidelines",
      "Digital Brand Guidelines Book (PDF & Web)",
      "Social Media Brand Kit & Template Library",
    ],
    metrics: "Comprehensive 40+ page Brand System Guide",
    timeline: "2 to 4 Week Sprint",
    iconName: "Sparkles",
  },
];

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "elysian-couture",
    title: "Elysian Luxe: Reimagining D2C Fashion Commerce",
    clientName: "Elysian Atelier",
    category: "production",
    categoryLabel: "Commercial Shoot + Reels + Meta Ads",
    heroImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
    summary:
      "A complete visual overhaul and digital growth sprint for a contemporary Indian luxury pret label looking to transition into pan-India and international markets.",
    challenge:
      "The client possessed world-class garments, but their social media aesthetic was fragmented, reels were low resolution, and previous Facebook ad campaigns suffered from high customer acquisition costs due to generic static creatives.",
    execution: [
      "Directed an editorial 4K campaign shoot with cinematic lighting and model staging.",
      "Produced 18 high-tempo reels showcasing fabric movement, styling variations, and behind-the-scenes craft.",
      "Re-architected their Meta ad account into a creative-testing sandbox and scaling campaign.",
      "Engineered high-converting landing pages with seamless checkout pathways.",
    ],
    deliverables: [
      "4K Fashion Campaign Film",
      "18 Editorial Dynamic Reels",
      "High-ROAS Meta Ads Funnel",
      "Brand Style Architecture",
    ],
    keyOutcome: "Achieved a 4.4x blended ROAS and 280% expansion in qualified website inquiries.",
    tags: ["Fashion D2C", "4K Video Shoot", "Meta Ads", "Creative Direction"],
    featured: true,
  },
  {
    id: "strata-fintech",
    title: "Strata Core: Engineering Next-Gen Enterprise Web",
    clientName: "Strata Global Tech",
    category: "web",
    categoryLabel: "Full-Stack Web Development + Branding",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    summary:
      "Architecting a bespoke interactive web application and brand identity for a fintech infrastructure firm processing cross-border payments.",
    challenge:
      "Strata was pitching institutional investors and enterprise banking partners, but their legacy WordPress site was sluggish, outdated, and failed to communicate enterprise-grade technical authority.",
    execution: [
      "Designed a sleek, dark-mode design system with bespoke interactive charts and product walkthroughs.",
      "Built a full-stack Next.js web application with 99 Performance score on Google Lighthouse.",
      "Implemented smooth Framer Motion micro-interactions demonstrating transaction workflows.",
      "Crafted crisp enterprise-level messaging highlighting regulatory compliance and security.",
    ],
    deliverables: [
      "Next.js App Router Web Architecture",
      "Interactive Product Demo Modules",
      "Comprehensive Enterprise Brand Book",
      "Technical SEO & Lead Routing Integration",
    ],
    keyOutcome: "Reduced average page load time to 0.4s and increased institutional demo bookings by 190%.",
    tags: ["Next.js", "Web Engineering", "FinTech", "Brand Identity"],
    featured: true,
  },
  {
    id: "artisanal-brew",
    title: "Kōhī Craft: Viral Hospitality Storytelling",
    clientName: "Kōhī Roasters & Kitchen",
    category: "social",
    categoryLabel: "Social Media Growth + On-Ground Shoots",
    heroImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop",
    summary:
      "Launching a specialty roastery and experiential cafe into an ultra-competitive metropolitan market with high-velocity short-form content.",
    challenge:
      "New cafe openings often depend on paid influencer gimmicks that result in short-lived spikes followed by flatline footfall. The client needed durable, cult-like brand equity.",
    execution: [
      "Developed a 'Sensory Craft' content strategy focusing on the sounds, origins, and artisanal barista routines.",
      "Deployed weekly on-location micro-shoots capturing live customer reactions and brewing masterclasses.",
      "Executed an authentic local hyper-targeted Instagram strategy connecting with neighborhood creatives.",
      "Tied organic virality directly to weekend tasting event RSVPs and bean subscription sales.",
    ],
    deliverables: [
      "Weekly On-Location Video Production",
      "Daily Social Community Management",
      "Interactive Tasting Event Campaigns",
      "Specialty Packaging Photography",
    ],
    keyOutcome: "Generated over 620,000 organic video views and consistent weekend capacity queues without paid influencer sponsorship.",
    tags: ["Hospitality & F&B", "Viral Reels", "Community Growth", "Event Shoot"],
    featured: true,
  },
  {
    id: "velox-mobility",
    title: "Velox Dynamics: Electric Mobility Brand Launch",
    clientName: "Velox EV Technologies",
    category: "brand",
    categoryLabel: "Brand Architecture + Commercial Launch",
    heroImage: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop",
    summary:
      "Complete visual identity, 3D motion teaser, and digital debut for an innovative electric two-wheeler manufacturer in India.",
    challenge:
      "Standing out in a crowded EV category dominated by legacy conglomerates required an unmistakable modern identity rooted in aerospace-grade precision.",
    execution: [
      "Designed a dynamic geometric monogram and high-contrast typographic system.",
      "Scripted and produced a cinematic reveal teaser using motion graphics and live night footage.",
      "Structured a high-converting pre-order landing page capturing test-drive registrations.",
      "Orchestrated launch-day social media blitz across LinkedIn, Instagram, and YouTube.",
    ],
    deliverables: [
      "Complete Brand Identity Guidelines",
      "Commercial Cinematic Teaser",
      "Pre-Order Lead Generation System",
      "Launch Event Media Package",
    ],
    keyOutcome: "Secured 2,400+ qualified test-ride applications in the first 14 days post-launch.",
    tags: ["Brand Systems", "EV & CleanTech", "Commercial Film", "Lead Gen"],
    featured: false,
  },
];

export const METHODOLOGY_STEPS = [
  {
    step: "01",
    phase: "Discovery & Deep Audit",
    title: "Uncovering the Unfair Advantage",
    description:
      "We dissect your existing digital presence, competitor landscape, customer psychographics, and current conversion bottlenecks before touching a single line of code or camera lens.",
    activities: [
      "Full digital asset & social profile audit",
      "Competitor creative & ad strategy teardown",
      "Ideal customer profile (ICP) mapping",
      "Strategic roadmap & measurable KPI alignment",
    ],
  },
  {
    step: "02",
    phase: "Creative Architecture",
    title: "Blueprinting the Visual & Content System",
    description:
      "We build the creative foundation: scripts with compelling hooks, moodboards, brand typography, shot-lists, and UI/UX wireframes designed to command attention.",
    activities: [
      "Video shot-lists & narrative scriptwriting",
      "Figma UI wireframes & interactive prototypes",
      "Ad creative angle development (pain-point vs. aspiration)",
      "30-day cross-platform editorial calendar",
    ],
  },
  {
    step: "03",
    phase: "High-Fidelity Production",
    title: "Precision Execution & Craft",
    description:
      "Our directors, camera crew, motion artists, and full-stack developers build the assets. 4K cinema cameras, sound design, and clean Next.js code come together seamlessly.",
    activities: [
      "Cinema 4K video shoots on location or studio",
      "Dynamic reel editing, motion graphics & color grade",
      "Full-stack web engineering & API integration",
      "Meta Ads campaign structure & pixel setup",
    ],
  },
  {
    step: "04",
    phase: "Scale & Dominate",
    title: "Algorithmic Iteration & Scaling",
    description:
      "Launch is just day one. We continuously analyze watch time, hook drop-off, ROAS, click-through rates, and conversion metrics to double down on winning creative formulas.",
    activities: [
      "Creative fatigue tracking & weekly refreshes",
      "Paid budget scaling across proven ad sets",
      "Conversion rate optimization (CRO) testing",
      "Transparent executive reporting dashboards",
    ],
  },
];

export const AGENCY_STATS = [
  {
    value: "140+",
    label: "Production Deliverables",
    description: "High-definition reels, commercial films & editorial assets executed",
  },
  {
    value: "₹25M+",
    label: "Ad Spend Managed",
    description: "Deployed across Meta performance funnels with scientific rigor",
  },
  {
    value: "4.2x",
    label: "Average Creative ROAS",
    description: "Benchmark across scaled e-commerce and lead-generation accounts",
  },
  {
    value: "99.2%",
    label: "On-Time Milestone Rate",
    description: "Rigorous sprint management with zero ghosting or missed deadlines",
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "growth-foundation",
    name: "Growth Engine Retainer",
    tier: "standard",
    subtitle: "For growing brands establishing unmistakable social authority.",
    priceNote: "Customized to monthly creative volume",
    billingPeriod: "Monthly Retainer",
    badge: "Consistent Momentum",
    description:
      "A structured monthly partnership providing high-end social media management, daily creative operations, and strategic content planning.",
    deliverables: [
      "12 High-Impact 4K Dynamic Reels / Month",
      "12 Curated Editorial Carousel & Static Posts",
      "30-Day Content Calendar & Hook Scripting",
      "Active Daily Page Management & DM Routing",
      "Competitor Research & Trend Capitalization",
      "Dedicated Slack / WhatsApp Communication Channel",
      "Monthly Bi-Weekly Strategic Review Calls",
    ],
    idealFor: "Brands, premium retail, and founders wanting consistent, elevated social presence without building an in-house team.",
    ctaText: "Inquire for Retainer",
  },
  {
    id: "performance-scale",
    name: "Performance & Scale Suite",
    tier: "popular",
    subtitle: "Our flagship combination of creative production and paid customer acquisition.",
    priceNote: "Most selected by scaling brands",
    billingPeriod: "Monthly Retainer + Growth Sprints",
    badge: "Most Popular",
    description:
      "The definitive growth engine. We combine top-tier organic content with high-octane Meta performance advertising and dedicated creative testing.",
    deliverables: [
      "Everything in Growth Engine Retainer",
      "Full Meta Ads (FB & IG) Strategy & Management",
      "8 Dedicated Ad Creatives (Video UGC + Motion + Static)",
      "Pixel, Conversion API & Retargeting Funnel Setup",
      "1 Monthly Professional On-Location Video Shoot",
      "Weekly Creative Fatigue Refresh & A/B Angle Testing",
      "Custom Real-Time Live Performance Dashboard",
      "Priority Rapid Turnaround SLA",
    ],
    idealFor: "E-commerce brands, high-growth startups, and multi-location businesses looking to scale revenue predictably.",
    ctaText: "Start Performance Sprint",
  },
  {
    id: "flagship-bespoke",
    name: "Flagship Custom Sprint",
    tier: "bespoke",
    subtitle: "Complete digital transformation: Web Engineering, Cinema Shoots & Full Brand Identity.",
    priceNote: "Project-based or Quarterly Engagement",
    billingPeriod: "Milestone-Based Sprint",
    badge: "Full Transformation",
    description:
      "When standard marketing isn't enough. We engineer custom high-performance web systems, cinema-grade commercial films, and comprehensive brand overhauls.",
    deliverables: [
      "Custom Next.js Full-Stack Interactive Website",
      "Figma UI/UX Design System with Interactive Prototyping",
      "Multi-Day Commercial 4K Video Production & Aerial Footage",
      "Complete Brand Identity (Monogram, Guidelines, Voice)",
      "Enterprise Conversion Funnel & Lead Routing Integration",
      "Full IP Transfer & Comprehensive Source Code Repository",
      "90-Day Post-Launch Technical Support & Warranty",
    ],
    idealFor: "Funded ventures, luxury brands, and market leaders requiring an extraordinary digital flagship.",
    ctaText: "Discuss Flagship Project",
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "What does Anivel Media do?",
    answer:
      "Anivel Media is a creative growth agency combining content creation, social media management, dynamic Reel production, Meta advertising, full-stack website development, and branding into one unified system for ambitious brands.",
    category: "general",
  },
  {
    question: "Which businesses do you work with?",
    answer:
      "We partner with local Indian businesses, direct-to-consumer (D2C) brands, hospitality venues, retail outlets, corporate services, and fast-scaling digital ventures seeking high-craft market positioning and measurable growth.",
    category: "clients",
  },
  {
    question: "Are your plans monthly?",
    answer:
      "Yes, our Starter and Growth plans operate as flexible monthly partnerships with no rigid lock-in periods after introductory milestones. We also execute one-time sprints like our ₹850 Demo Plan, brand identity overhauls, and website builds.",
    category: "plans",
  },
  {
    question: "What is the ₹850 Demo Plan?",
    answer:
      "The ₹850 Demo Plan is an introductory trial sprint engineered to prove our production craft risk-free. It includes 1 high-impact edited Reel or Post, creative concept strategy, and an account audit before you commit to larger retainers.",
    category: "demo",
  },
  {
    question: "Can I purchase the Demo Plan more than once?",
    answer:
      "No. The ₹850 Demo Plan is strictly limited to one trial per brand. It is an introductory offering so you can experience our high-craft production standard firsthand before transitioning to ongoing monthly growth.",
    category: "demo",
  },
  {
    question: "What is included in the Growth Plans?",
    answer:
      "Growth Plans (Growth 8, Growth 15, and Growth 20) include end-to-end social media management, custom Reel creation, graphic design, content calendar planning, Meta Ads strategy and execution, competitor research, and monthly performance reviews.",
    category: "plans",
  },
  {
    question: "Are professional shoots included?",
    answer:
      "Professional on-location shoots are included in Growth 20 and can be added as standalone modules or add-ons to any plan. Our production crew handles 4K cinema cameras, lighting, audio, and on-site direction across major Indian metros.",
    category: "production",
  },
  {
    question: "Do you manage Instagram pages?",
    answer:
      "Yes. Comprehensive Instagram management is a core discipline. We handle content scheduling, copywriting, strategic hashtag and audio selection, story planning, aesthetic grid curation, and direct message routing to qualified leads.",
    category: "social",
  },
  {
    question: "Do you run Meta Ads?",
    answer:
      "Yes. We plan, engineer, and optimize high-converting Meta Ads (Facebook & Instagram). We produce the video and static creatives, configure pixel and conversion API tracking, build custom audience funnels, and test angles to maximize return on ad spend (ROAS).",
    category: "ads",
  },
  {
    question: "Can you create a website for my business?",
    answer:
      "Yes. We design and develop bespoke, high-performance websites using modern Next.js and Tailwind technology, ranging from high-converting single-page landing sites to multi-page business flagships and full-stack web applications.",
    category: "web",
  },
  {
    question: "Is domain and hosting included?",
    answer:
      "We configure domain routing and deploy your site on high-speed global cloud infrastructure (Vercel, AWS, or Cloudflare). Domain registration and specialized third-party server fees are maintained directly by you for complete asset ownership, or managed by us upon request.",
    category: "web",
  },
  {
    question: "Can I request custom services?",
    answer:
      "Absolutely. If your business has specialized needs (such as a multi-day commercial campaign, bespoke e-commerce platform, event coverage, or tailored monthly creative volume), we engineer a custom sprint scope tailored to your exact objectives.",
    category: "custom",
  },
  {
    question: "How does the first discussion work?",
    answer:
      "You submit a project request through our brief builder or ping us on WhatsApp. Within 24 hours, an Anivel Media director reviews your brand and schedules a focused 20-minute discovery call to analyze bottlenecks, propose creative directions, and outline the ideal roadmap.",
    category: "onboarding",
  },
];

