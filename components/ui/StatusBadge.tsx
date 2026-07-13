import { cn } from "@/lib/utils";
import type { GiftCardSubmissionStatus } from "@/types";

const STATUS_STYLES: Record<GiftCardSubmissionStatus, string> = {
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  offer_sent: "bg-signal/10 text-signal border-signal/30",
  accepted: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  rejected: "bg-white/5 text-muted border-ink-border",
  paid: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
};

const STATUS_LABELS: Record<GiftCardSubmissionStatus, string> = {
  pending: "En attente",
  offer_sent: "Offre envoyée",
  accepted: "Acceptée",
  rejected: "Refusée",
  paid: "Payée",
};

export function StatusBadge({ status }: { status: GiftCardSubmissionStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        STATUS_STYLES[status],
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
