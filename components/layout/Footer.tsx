import Link from "next/link";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

const LINK_GROUPS = [
  {
    title: "Liens rapides",
    links: [
      { href: "/", label: "Accueil" },
      { href: "/services", label: "Services" },
      { href: "/vendre-carte-cadeau", label: "Vendre une carte cadeau" },
      { href: "/a-propos", label: "À propos" },
    ],
  },
  {
    title: "Légal",
    links: [
      { href: "/confidentialite", label: "Politique de confidentialité" },
      { href: "/conditions", label: "Conditions générales" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-border bg-ink">
      <div className="container-xl grid grid-cols-1 gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="font-display text-lg font-bold tracking-tight">
            SDJ <span className="text-signal">Services</span>
          </span>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            La marketplace premium pour vos abonnements streaming, musique, IA, logiciels, VPN,
            cloud, jeux et cartes cadeaux — livrés instantanément.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-border text-muted transition-colors hover:text-signal"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-border text-muted transition-colors hover:text-signal"
            >
              <Facebook size={16} />
            </a>
            <a
              href="#"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-border text-muted transition-colors hover:text-signal"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        {LINK_GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
              {group.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-paper/80 transition-colors hover:text-signal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ink-border py-6">
        <p className="container-xl text-center text-xs text-muted">
          © {new Date().getFullYear()} SDJ Services. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
