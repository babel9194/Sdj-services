import { giftCardBrands } from "@/data/giftcard-brands";

const formatFcfa = new Intl.NumberFormat("fr-FR").format;

export function RatesSidebar() {
  return (
    <aside className="rounded-2xl border border-ink-border bg-ink-surface p-6">
      <h2 className="font-display text-base font-semibold">Taux indicatifs</h2>
      <p className="mt-1 text-xs text-muted">Par unité de devise d'origine, en FCFA.</p>

      <ul className="mt-4 space-y-3">
        {giftCardBrands.map((brand) => (
          <li key={brand.slug} className="flex items-center justify-between text-sm">
            <span className="text-paper/90">{brand.name}</span>
            <span className="font-mono text-muted">
              {formatFcfa(brand.rateFcfaPerUnit)} FCFA/{brand.currency}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-xs leading-relaxed text-muted">
        Le montant final est confirmé après vérification du solde de la carte, généralement en
        quelques minutes.
      </p>
    </aside>
  );
}
