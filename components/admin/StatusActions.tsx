"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { updateSubmissionStatus } from "@/lib/actions/gift-card-status";
import type { GiftCardSubmissionStatus } from "@/types";

export function StatusActions({
  submissionId,
  currentStatus,
}: {
  submissionId: string;
  currentStatus: GiftCardSubmissionStatus;
}) {
  const [isPending, startTransition] = useTransition();
  const [pendingAction, setPendingAction] = useState<"paid" | "rejected" | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (currentStatus === "paid" || currentStatus === "rejected") {
    return null;
  }

  function handleAction(status: "paid" | "rejected") {
    if (status === "rejected" && !window.confirm("Refuser définitivement cette demande ?")) {
      return;
    }

    setError(null);
    setPendingAction(status);
    startTransition(async () => {
      const result = await updateSubmissionStatus(submissionId, status);
      if (result.error) {
        setError("Une erreur est survenue. Réessayez.");
      }
      setPendingAction(null);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => handleAction("paid")}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-5 py-2.5 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/25 disabled:opacity-60"
      >
        {isPending && pendingAction === "paid" ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <CheckCircle2 size={15} />
        )}
        Marquer payée
      </button>
      <button
        type="button"
        onClick={() => handleAction("rejected")}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-full border border-ink-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-ink-raised disabled:opacity-60"
      >
        {isPending && pendingAction === "rejected" ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <XCircle size={15} />
        )}
        Refuser
      </button>
      {error && <p className="w-full text-sm text-signal">{error}</p>}
    </div>
  );
}
