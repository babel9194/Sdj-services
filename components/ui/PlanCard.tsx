"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Plan } from "@/types";
import { cn } from "@/lib/utils";

const formatFcfa = new Intl.NumberFormat("fr-FR").format;

export function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        "relative rounded-2xl border bg-ink-surface p-6",
        plan.popular ? "border-signal" : "border-ink-border",
      )}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-6 rounded-full bg-signal px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-paper">
          Populaire
        </span>
      )}
      <h3 className="font-display text-lg font-semibold">{plan.name}</h3>
      <p className="text-sm text-muted">{plan.duration}</p>

      <p className="mt-5 font-mono text-3xl font-semibold">
        {formatFcfa(plan.priceFcfa)} <span className="text-sm text-muted">FCFA</span>
      </p>

      <ul className="mt-5 space-y-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-paper/90">
            <Check size={16} className="mt-0.5 shrink-0 text-signal" />
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-6 w-full rounded-full bg-signal py-3 text-sm font-semibold text-paper transition-transform hover:scale-[1.02]"
      >
        Commander
      </button>
    </motion.div>
  );
}
