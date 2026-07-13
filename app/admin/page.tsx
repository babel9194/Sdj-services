import type { Metadata } from "next";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase-admin";
import type { GiftCardSubmissionStatus } from "@/types";

export const metadata: Metadata = {
  title: "Tableau de bord",
};

const STATUS_LABELS: Record<GiftCardSubmissionStatus, string> = {
  pending: "En attente",
  offer_sent: "Offre envoyée",
  accepted: "Acceptées",
  rejected: "Refusées",
  paid: "Payées",
};

export default async function AdminDashboardPage() {
  const supabase = createAdminClient();

  const { data: submissions } = await supabase
    .from("gift_card_submissions")
    .select("status");

  const counts = (submissions ?? []).reduce<Record<string, number>>((acc, row) => {
    acc[row.status] = (acc[row.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Vue d'ensemble</h1>
      <p className="mt-1 text-sm text-muted">
        Suivi des demandes de reprise de cartes cadeaux.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {(Object.keys(STATUS_LABELS) as GiftCardSubmissionStatus[]).map((status) => (
          <div
            key={status}
            className="rounded-2xl border border-ink-border bg-ink-surface p-5"
          >
            <p className="font-mono text-2xl font-semibold">{counts[status] ?? 0}</p>
            <p className="mt-1 text-xs text-muted">{STATUS_LABELS[status]}</p>
          </div>
        ))}
      </div>

      <Link
        href="/admin/cartes-cadeaux"
        className="mt-8 inline-flex rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-paper"
      >
        Traiter les demandes en attente
      </Link>
    </div>
  );
}
