"use client";

import { motion } from "framer-motion";
import { howItWorksSteps } from "@/data/faq";

export function HowItWorks() {
  return (
    <section className="border-t border-ink-border bg-ink-surface/40 py-24">
      <div className="container-xl">
        <div className="mb-14 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-widest text-signal">
            Comment ça fonctionne
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Trois étapes, aucune complication.
          </h2>
        </div>

        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-ink-border md:block" />
          {howItWorksSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-signal/40 bg-ink font-mono text-sm text-signal">
                {String(step.step).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
