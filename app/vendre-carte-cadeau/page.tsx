import type { Metadata } from "next";
import { SellGiftCardForm } from "@/components/sell-gift-card/SellGiftCardForm";
import { RatesSidebar } from "@/components/sell-gift-card/RatesSidebar";

export const metadata: Metadata = {
  title: "Vendre une carte cadeau",
  description: "Convertissez vos cartes cadeaux inutilisées en argent, rapidement et en toute sécurité.",
};

// Route is protected by middleware.ts (redirects to /connexion if no session).
export default function SellGiftCardPage() {
  return (
    <section className="container-xl py-24 pt-32 md:pt-40">
      <div className="max-w-xl">
        <span className="font-mono text-xs uppercase tracking-widest text-signal">
          Vendre une carte cadeau
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Convertissez votre carte en argent.
        </h1>
        <p className="mt-3 text-muted">
          Renseignez les informations de votre carte, nous vous envoyons une offre en quelques
          minutes.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-ink-border bg-ink-surface p-8">
          <SellGiftCardForm />
        </div>
        <RatesSidebar />
      </div>
    </section>
  );
}
