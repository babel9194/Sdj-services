import type { LucideIcon } from "lucide-react";

export type CategorySlug =
  | "streaming"
  | "musique"
  | "ia"
  | "logiciels"
  | "vpn"
  | "jeux"
  | "cloud"
  | "cartes-cadeaux"
  | "vente-cartes-cadeaux";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: LucideIcon;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatar: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface Plan {
  id: string;
  categorySlug: CategorySlug;
  name: string;
  duration: string;
  priceFcfa: number;
  features: string[];
  popular?: boolean;
}

export interface GiftCardBrand {
  slug: string;
  name: string;
  currency: string;
  rateFcfaPerUnit: number;
  minAmount: number;
  maxAmount: number;
}

export type GiftCardSubmissionStatus =
  | "pending"
  | "offer_sent"
  | "accepted"
  | "rejected"
  | "paid";

export interface GiftCardSubmission {
  id: string;
  brandSlug: string;
  valueAmount: number;
  code: string;
  contactPhone: string;
  proofUrl: string | null;
  status: GiftCardSubmissionStatus;
  offerAmountFcfa: number | null;
  createdAt: string;
}
