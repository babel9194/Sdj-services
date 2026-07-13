import Link from "next/link";
import { LayoutDashboard, Gift } from "lucide-react";

const LINKS = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/admin/cartes-cadeaux", label: "Cartes cadeaux", icon: Gift },
] as const;

export function AdminSidebar() {
  return (
    <aside className="w-full shrink-0 border-ink-border md:w-56 md:border-r md:pr-6">
      <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
        {LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-paper/80 transition-colors hover:bg-ink-surface hover:text-paper"
            >
              <Icon size={16} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
