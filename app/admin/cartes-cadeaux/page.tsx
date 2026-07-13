import type { Metadata } from "next";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase-admin";
import { getBrandBySlug } from "@/data/giftcard-brands";
import { StatusBadge } from "@/components/ui/StatusBadge";

export const metadata: Metadata = {
  title: "Cartes cadeaux",
};

export default async function AdminGiftCardsPage() {
  const supabase = createAdminClient();

  const { data: submissions, error } = await supabase
    .from("gift_card_submissions")
    .select("id, brand, value_amount, contact_phone, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Cartes cadeaux</h1>
      <p className="mt-1 text-sm text-muted">Toutes les demandes de reprise, les plus récentes en premier.</p>

      {error && (
        <p className="mt-6 text-sm text-signal">
          Impossible de charger les demandes. Vérifiez la connexion à Supabase.
        </p>
      )}

      {!error && submissions?.length === 0 && (
        <p className="mt-6 text-sm text-muted">Aucune demande pour le moment.</p>
      )}

      {!error && submissions && submissions.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-ink-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-surface text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Marque</th>
                <th className="px-4 py-3 font-medium">Valeur</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium">Reçue le</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-border">
              {submissions.map((submission) => {
                const brand = getBrandBySlug(submission.brand);
                return (
                  <tr key={submission.id} className="hover:bg-ink-surface/60">
                    <td className="px-4 py-3">{brand?.name ?? submission.brand}</td>
                    <td className="px-4 py-3 font-mono">
                      {submission.value_amount} {brand?.currency ?? ""}
                    </td>
                    <td className="px-4 py-3 text-muted">{submission.contact_phone}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={submission.status} />
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {new Date(submission.created_at).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/cartes-cadeaux/${submission.id}`}
                        className="text-signal hover:underline"
                      >
                        Ouvrir
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
