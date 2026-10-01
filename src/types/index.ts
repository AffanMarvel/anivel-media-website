export interface ServiceItem {
  id: string;
  category: "all" | "social" | "production" | "ads" | "web" | "brand";
  title: string;
  badge: string;
  tagline: string;
  description: string;
  deliverables: string[];
  metrics: string;
  timeline: string;
  iconName: string;
  highlightColor?: string;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  clientName: string;
  category: "all" | "social" | "production" | "ads" | "web" | "brand";
  categoryLabel: string;
  heroImage: string;
  summary: string;
  challenge: string;
  execution: string[];
  deliverables: string[];
  keyOutcome: string;
  tags: string[];
  featured?: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  tier: "standard" | "popular" | "bespoke";
  subtitle: string;
  priceNote: string;
  billingPeriod: string;
  badge?: string;
  description: string;
  deliverables: string[];
  idealFor: string;
  ctaText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface ProjectInquiryData {
  services: string[];
  budget: string;
  timeline: string;
  brandName: string;
  contactName: string;
  email: string;
  phone: string;
  projectBrief: string;
}
