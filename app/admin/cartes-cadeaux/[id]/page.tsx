import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createAdminClient } from "@/lib/supabase-admin";
import { getBrandBySlug } from "@/data/giftcard-brands";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SendOfferForm } from "@/components/admin/SendOfferForm";
import { StatusActions } from "@/components/admin/StatusActions";

export const metadata: Metadata = {
  title: "Détail de la demande",
};

interface AdminGiftCardDetailProps {
  params: { id: string };
}

export default async function AdminGiftCardDetailPage({ params }: AdminGiftCardDetailProps) {
  const supabase = createAdminClient();

  const { data: submission } = await supabase
    .from("gift_card_submissions")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!submission) notFound();

  const { data: userResult } = await supabase.auth.admin.getUserById(submission.user_id);
  const brand = getBrandBySlug(submission.brand);

  let proofSignedUrl: string | null = null;
  if (submission.proof_url) {
    const { data: signed } = await supabase.storage
      .from("gift-card-proofs")
      .createSignedUrl(submission.proof_url, 60 * 10); // valid 10 minutes
    proofSignedUrl = signed?.signedUrl ?? null;
  }

  return (
    <div>
      <Link
        href="/admin/cartes-cadeaux"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-paper"
      >
        <ArrowLeft size={15} />
        Retour à la liste
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight">
          {brand?.name ?? submission.brand} — {submission.value_amount} {brand?.currency ?? ""}
        </h1>
        <StatusBadge status={submission.status} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-ink-border bg-ink-surface p-6">
          <h2 className="font-display text-base font-semibold">Détails de la carte</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Code de la carte</dt>
              <dd className="font-mono text-paper">{submission.code}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Client</dt>
              <dd className="text-paper">{userResult?.user?.email ?? "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Contact WhatsApp</dt>
              <dd className="text-paper">{submission.contact_phone}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Reçue le</dt>
              <dd className="text-paper">
                {new Date(submission.created_at).toLocaleString("fr-FR")}
              </dd>
            </div>
            {submission.offer_amount_fcfa && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Offre envoyée</dt>
                <dd className="font-mono text-paper">{submission.offer_amount_fcfa} FCFA</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="rounded-2xl border border-ink-border bg-ink-surface p-6">
          <h2 className="font-display text-base font-semibold">Photo de la carte</h2>
          {proofSignedUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={proofSignedUrl}
              alt="Photo de la carte cadeau"
              className="mt-4 max-h-64 w-full rounded-xl border border-ink-border object-contain"
            />
          ) : (
            <p className="mt-4 text-sm text-muted">Aucune photo fournie.</p>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-ink-border bg-ink-surface p-6">
        <h2 className="font-display text-base font-semibold">Envoyer une offre</h2>
        <p className="mt-1 text-sm text-muted">
          Vérifiez le solde de la carte avant d'envoyer un montant définitif.
        </p>
        <div className="mt-4">
          <SendOfferForm submissionId={submission.id} />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-ink-border bg-ink-surface p-6">
        <h2 className="font-display text-base font-semibold">Statut final</h2>
        <p className="mt-1 text-sm text-muted">
          À utiliser une fois le paiement effectué ou la demande refusée.
        </p>
        <div className="mt-4">
          <StatusActions submissionId={submission.id} currentStatus={submission.status} />
        </div>
      </div>
    </div>
  );
}
