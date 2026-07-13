"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function SendOfferForm({ submissionId }: { submissionId: string }) {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSending(true);

    try {
      const res = await fetch("/api/emails/gift-card-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId, offerAmountFcfa: Number(amount) }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Échec de l'envoi");
      }

      setSent(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setIsSending(false);
    }
  }

  if (sent) {
    return <p className="text-sm text-emerald-400">Offre envoyée au client.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex flex-1 flex-col gap-1.5">
        <label htmlFor="offerAmount" className="text-sm font-medium text-paper/90">
          Montant de l'offre (FCFA)
        </label>
        <input
          id="offerAmount"
          type="number"
          min="0"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="29000"
          className="rounded-xl border border-ink-border bg-ink-surface px-4 py-3 text-sm text-paper focus:border-signal"
        />
      </div>
      <button
        type="submit"
        disabled={isSending}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-semibold text-paper transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {isSending && <Loader2 size={16} className="animate-spin" />}
        {isSending ? "Envoi..." : "Envoyer l'offre"}
      </button>
      {error && <p className="text-sm text-signal sm:basis-full">{error}</p>}
    </form>
  );
}
