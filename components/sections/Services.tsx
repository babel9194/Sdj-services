import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/ui/CategoryCard";

export function Services() {
  return (
    <section id="services" className="border-t border-ink-border py-24">
      <div className="container-xl">
        <div className="mb-12 max-w-xl">
          <span className="font-mono text-xs uppercase tracking-widest text-signal">
            Nos services
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Neuf catégories, un seul endroit.
          </h2>
          <p className="mt-3 text-muted">
            Chaque catégorie est pensée pour vous faire gagner du temps, avec des offres
            vérifiées et une livraison rapide.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <CategoryCard key={category.slug} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
