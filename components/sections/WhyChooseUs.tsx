"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Headset, BadgePercent } from "lucide-react";

const REASONS = [
  {
    icon: Zap,
    title: "Livraison instantanée",
    description: "Vos accès sont délivrés dès la confirmation du paiement, sans attente.",
  },
  {
    icon: ShieldCheck,
    title: "Paiements sécurisés",
    description: "Chaque transaction est protégée et vérifiée avant traitement.",
  },
  {
    icon: Headset,
    title: "Support réactif",
    description: "Une équipe disponible par chat et WhatsApp pour répondre à vos questions.",
  },
  {
    icon: BadgePercent,
    title: "Prix transparents",
    description: "Aucun frais caché : le prix affiché est le prix payé.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="border-t border-ink-border bg-ink-surface/40 py-24">
      <div className="container-xl">
        <div className="mb-12 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-widest text-signal">
            Pourquoi choisir SDJ Services
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Une expérience pensée pour la confiance.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Icon size={24} className="text-signal" strokeWidth={1.75} />
                <h3 className="mt-4 font-display text-base font-semibold">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
