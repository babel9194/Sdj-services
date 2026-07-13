import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { categories } from "@/data/categories";
import { getPlansByCategory } from "@/data/plans";
import { PlanCard } from "@/components/ui/PlanCard";

interface CategoryPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const Icon = category.icon;
  const categoryPlans = getPlansByCategory(category.slug);

  return (
    <section className="container-xl py-24 pt-32 md:pt-40">
      <Link
        href="/services"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-paper"
      >
        <ArrowLeft size={15} />
        Retour aux services
      </Link>

      <div className="mt-6 flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink-surface text-signal">
          <Icon size={26} strokeWidth={1.75} />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{category.name}</h1>
          <p className="mt-2 max-w-xl text-muted">{category.description}</p>
        </div>
      </div>

      <div className="mt-12">
        {categoryPlans.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categoryPlans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-ink-border bg-ink-surface p-8 text-center">
            <p className="text-sm text-muted">
              Les offres de cette catégorie seront bientôt disponibles. Contactez-nous pour être
              notifié dès leur mise en ligne.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex rounded-full bg-signal px-6 py-2.5 text-sm font-semibold text-paper"
            >
              Nous contacter
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
