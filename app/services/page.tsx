import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/ui/CategoryCard";

export const metadata: Metadata = {
  title: "Nos services",
  description: "Découvrez toutes les catégories de services numériques proposées par SDJ Services.",
};

export default function ServicesPage() {
  return (
    <section className="container-xl py-24 pt-32 md:pt-40">
      <div className="max-w-xl">
        <span className="font-mono text-xs uppercase tracking-widest text-signal">
          Catalogue complet
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Nos services</h1>
        <p className="mt-3 text-muted">
          Parcourez nos catégories et trouvez le service numérique qu'il vous faut.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, i) => (
          <CategoryCard key={category.slug} category={category} index={i} />
        ))}
      </div>
    </section>
  );
}
