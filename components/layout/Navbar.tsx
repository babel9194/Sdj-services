"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/vendre-carte-cadeau", label: "Vendre une carte cadeau" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-ink/80 backdrop-blur-lg border-b border-ink-border" : "bg-transparent",
      )}
    >
      <div className="container-xl flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="font-display text-lg font-bold tracking-tight md:text-xl">
          SDJ <span className="text-signal">Services</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-paper"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <div className="flex items-center gap-3">
            {user?.app_metadata?.role === "admin" && (
              <Link
                href="/admin"
                className="text-sm text-muted transition-colors hover:text-paper"
              >
                Admin
              </Link>
            )}
            <Link
              href={user ? "/compte" : "/connexion"}
              className="inline-flex items-center gap-1.5 rounded-full bg-paper px-5 py-2 text-sm font-medium text-ink transition-transform hover:scale-105"
            >
              {user && <User size={14} />}
              {user ? "Mon compte" : "Connexion"}
            </Link>
          </div>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-border md:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-ink-border bg-ink md:hidden"
          >
            <div className="container-xl flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base text-paper/90 hover:bg-ink-raised"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href={user ? "/compte" : "/connexion"}
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded-full bg-paper px-5 py-3 text-center text-sm font-medium text-ink"
              >
                {user ? "Mon compte" : "Connexion"}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
