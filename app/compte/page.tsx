import type { Metadata } from "next";
import { createClient } from "@/lib/supabase-server";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getBrandBySlug } from "@/data/giftcard-brands";

export const metadata: Metadata = {
  title: "Mon compte",
};

const formatFcfa = new Intl.NumberFormat("fr-FR").format;

export default async function AccountPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: submissions } = await supabase
    .from("gift_card_submissions")
    .select("id, brand, value_amount, status, offer_amount_fcfa, created_at")
    .eq("user_id", user?.id ?? "")
    .order("created_at", { ascending: false });

  return (
    <section className="container-xl py-24 pt-32 md:pt-40">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-signal">
            Mon compte
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            Bonjour{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""}
          </h1>
          <p className="mt-2 text-sm text-muted">{user?.email}</p>
        </div>
        <SignOutButton />
      </div>

      <div className="mt-12 rounded-2xl border border-ink-border bg-ink-surface p-8">
        <h2 className="font-display text-lg font-semibold">Mes cartes cadeaux</h2>

        {(!submissions || submissions.length === 0) && (
          <p className="mt-2 text-sm text-muted">
            Vous n'avez encore soumis aucune carte cadeau.
          </p>
        )}

        {submissions && submissions.length > 0 && (
          <ul className="mt-4 divide-y divide-ink-border">
            {submissions.map((submission) => {
              const brand = getBrandBySlug(submission.brand);
              return (
                <li
                  key={submission.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-4"
                >
                  <div>
                    <p className="text-sm font-medium text-paper">
                      {brand?.name ?? submission.brand} — {submission.value_amount}{" "}
                      {brand?.currency ?? ""}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      Reçue le {new Date(submission.created_at).toLocaleDateString("fr-FR")}
                      {submission.offer_amount_fcfa
                        ? ` · Offre : ${formatFcfa(submission.offer_amount_fcfa)} FCFA`
                        : ""}
                    </p>
                  </div>
                  <StatusBadge status={submission.status} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
