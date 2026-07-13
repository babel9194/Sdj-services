"use client";

import { motion } from "framer-motion";
import { categories } from "@/data/categories";

const POPULAR_SLUGS = ["streaming", "ia", "cartes-cadeaux", "vpn"];

export function PopularServices() {
  const popular = categories.filter((c) => POPULAR_SLUGS.includes(c.slug));

  return (
    <section className="border-t border-ink-border py-24">
      <div className="container-xl">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-widest text-signal">
              Services populaires
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Ce que nos clients commandent le plus.
            </h2>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {popular.map((category, i) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative min-w-[260px] flex-1 overflow-hidden rounded-2xl border border-ink-border bg-gradient-to-b from-ink-raised to-ink-surface p-6"
              >
                <Icon size={22} className="text-signal" strokeWidth={1.75} />
                <h3 className="mt-4 font-display text-lg font-semibold">{category.name}</h3>
                <p className="mt-2 text-sm text-muted">{category.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
