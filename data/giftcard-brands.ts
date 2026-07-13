import type { GiftCardBrand } from "@/types";

/**
 * Indicative buy-back rates. Real rates should be fetched from Supabase
 * so they can be updated without a redeploy — this is placeholder data
 * for the Étape 3 scaffold.
 */
export const giftCardBrands: GiftCardBrand[] = [
  { slug: "amazon", name: "Amazon", currency: "USD", rateFcfaPerUnit: 580, minAmount: 10, maxAmount: 500 },
  { slug: "itunes", name: "iTunes / Apple", currency: "USD", rateFcfaPerUnit: 560, minAmount: 10, maxAmount: 500 },
  { slug: "google-play", name: "Google Play", currency: "USD", rateFcfaPerUnit: 540, minAmount: 10, maxAmount: 500 },
  { slug: "steam", name: "Steam", currency: "USD", rateFcfaPerUnit: 520, minAmount: 10, maxAmount: 500 },
  { slug: "xbox", name: "Xbox", currency: "USD", rateFcfaPerUnit: 520, minAmount: 10, maxAmount: 500 },
  { slug: "playstation", name: "PlayStation", currency: "USD", rateFcfaPerUnit: 520, minAmount: 10, maxAmount: 500 },
  { slug: "sephora", name: "Sephora", currency: "USD", rateFcfaPerUnit: 500, minAmount: 10, maxAmount: 500 },
];

export function getBrandBySlug(slug: string): GiftCardBrand | undefined {
  return giftCardBrands.find((b) => b.slug === slug);
}

/** Rough estimate shown live in the form before an agent confirms the final offer. */
export function estimateOfferFcfa(brandSlug: string, valueAmount: number): number | null {
  const brand = getBrandBySlug(brandSlug);
  if (!brand || !valueAmount) return null;
  return Math.round(brand.rateFcfaPerUnit * valueAmount);
}
