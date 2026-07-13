"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="border-t border-ink-border py-24">
      <div className="container-xl">
        <div className="mb-12 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-widest text-signal">
            Avis clients
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Ils nous font confiance.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-ink-border bg-ink-surface p-6"
            >
              <div className="flex gap-1 text-signal" aria-label={`${t.rating} sur 5 étoiles`}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={14}
                    fill={idx < t.rating ? "currentColor" : "none"}
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-paper/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-medium">{t.name}</span>
                <span className="text-muted"> — {t.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
