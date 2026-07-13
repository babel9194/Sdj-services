import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="border-t border-ink-border py-24">
      <div className="container-xl">
        <div className="relative overflow-hidden rounded-3xl border border-ink-border bg-signal-radial px-8 py-16 text-center md:py-20">
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Prêt à simplifier votre vie numérique ?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Rejoignez les clients qui font confiance à SDJ Services pour leurs abonnements du
            quotidien.
          </p>
          <Link
            href="/services"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-signal px-7 py-3.5 text-sm font-semibold text-paper transition-transform hover:scale-105"
          >
            Découvrir les services
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
