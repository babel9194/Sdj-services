"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/types";

export function CategoryCard({ category, index }: { category: Category; index: number }) {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-ink-border bg-ink-surface p-6 transition-colors hover:border-signal/40"
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-signal/10 blur-2xl transition-all duration-300 group-hover:bg-signal/25" />

      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-ink-raised text-signal">
        <Icon size={20} strokeWidth={1.75} />
      </div>

      <h3 className="relative mt-5 font-display text-lg font-semibold">{category.name}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-muted">{category.description}</p>

      <Link
        href={`/services/${category.slug}`}
        className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-paper transition-colors hover:text-signal"
      >
        Découvrir
        <ArrowUpRight
          size={15}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </motion.div>
  );
}
