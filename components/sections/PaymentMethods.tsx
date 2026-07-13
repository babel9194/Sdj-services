import { CreditCard, Smartphone, Wallet, Landmark } from "lucide-react";

const METHODS = [
  { icon: Smartphone, label: "Mobile Money" },
  { icon: CreditCard, label: "Carte bancaire" },
  { icon: Wallet, label: "Portefeuille électronique" },
  { icon: Landmark, label: "Virement bancaire" },
];

export function PaymentMethods() {
  return (
    <section className="border-t border-ink-border py-24">
      <div className="container-xl">
        <div className="mb-12 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-widest text-signal">
            Moyens de paiement
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Payez comme vous le souhaitez.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {METHODS.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.label}
                className="flex flex-col items-center gap-3 rounded-2xl border border-ink-border bg-ink-surface px-4 py-8 text-center"
              >
                <Icon size={24} className="text-signal" strokeWidth={1.75} />
                <span className="text-sm text-muted">{method.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
