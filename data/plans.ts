import type { Plan } from "@/types";

/**
 * Placeholder pricing data. Replace with real offers once the catalog
 * (and underlying licensing/resale agreements for each category) is
 * finalized in Supabase.
 */
export const plans: Plan[] = [
  {
    id: "streaming-1",
    categorySlug: "streaming",
    name: "Essentiel",
    duration: "1 mois",
    priceFcfa: 3000,
    features: ["1 écran", "Support standard"],
  },
  {
    id: "streaming-2",
    categorySlug: "streaming",
    name: "Standard",
    duration: "3 mois",
    priceFcfa: 8000,
    features: ["2 écrans", "Support prioritaire"],
    popular: true,
  },
  {
    id: "ia-1",
    categorySlug: "ia",
    name: "Essentiel",
    duration: "1 mois",
    priceFcfa: 5000,
    features: ["Accès complet", "Support standard"],
  },
  {
    id: "ia-2",
    categorySlug: "ia",
    name: "Pro",
    duration: "3 mois",
    priceFcfa: 13000,
    features: ["Accès complet", "Support prioritaire"],
    popular: true,
  },
];

export function getPlansByCategory(slug: string): Plan[] {
  return plans.filter((p) => p.categorySlug === slug);
}
