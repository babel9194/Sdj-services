"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

const ROTATING_WORDS = [
  "Streaming",
  "Intelligence Artificielle",
  "Logiciels Premium",
  "Cartes Cadeaux",
  "Musique",
  "Cloud",
];

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden pt-16 md:pt-20">
      {/* Ambient glow background */}
      <div className="absolute inset-0 -z-10 bg-signal-radial" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_0%,#0B0B0B_90%)]" />
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-0 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-signal/20 blur-[140px]"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-xl flex flex-col items-start gap-8 py-24 md:py-32">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-full border border-ink-border bg-ink-surface px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-muted"
        >
          La marketplace premium du numérique
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
        >
          Tous vos services numériques{" "}
          <span className="relative inline-block h-[1.1em] overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROTATING_WORDS[index]}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="block text-signal"
              >
                {ROTATING_WORDS[index]}
              </motion.span>
            </AnimatePresence>
          </span>{" "}
          au même endroit.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl text-balance text-lg text-muted md:text-xl"
        >
          Streaming, Intelligence Artificielle, Logiciels Premium, Cartes Cadeaux et bien plus.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/services"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-signal px-7 py-3.5 text-sm font-semibold text-paper transition-transform hover:scale-105"
          >
            Découvrir les services
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-border bg-ink-surface px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-ink-raised"
          >
            <MessageCircle size={16} />
            Nous contacter
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
