import { emailLayout } from "@/lib/email/layout";
import { getBrandBySlug } from "@/data/giftcard-brands";

interface GiftCardSubmittedEmailProps {
  fullName: string | null;
  brandSlug: string;
  valueAmount: number;
  submissionId: string;
}

export function giftCardSubmittedEmail({
  fullName,
  brandSlug,
  valueAmount,
  submissionId,
}: GiftCardSubmittedEmailProps): { subject: string; html: string } {
  const brand = getBrandBySlug(brandSlug);
  const brandName = brand?.name ?? brandSlug;
  const greeting = fullName ? `Bonjour ${fullName},` : "Bonjour,";
  const shortId = submissionId.slice(0, 8);

  const bodyHtml = `
    <p style="margin:0 0 12px;">${greeting}</p>
    <p style="margin:0 0 12px;">
      Nous avons bien reçu votre carte cadeau <strong style="color:#FFFFFF;">${brandName}</strong>
      d'une valeur de <strong style="color:#FFFFFF;">${valueAmount} ${brand?.currency ?? ""}</strong>.
    </p>
    <p style="margin:0 0 12px;">
      Référence de votre demande :
      <span style="font-family:monospace;color:#FFFFFF;">#${shortId}</span>
    </p>
    <p style="margin:0;">
      Notre équipe vérifie le solde de votre carte et vous enverra une offre par email et
      WhatsApp dans les prochaines minutes.
    </p>
  `;

  return {
    subject: `Carte cadeau reçue — demande #${shortId}`,
    html: emailLayout({
      previewText: `Votre carte cadeau ${brandName} a bien été reçue.`,
      heading: "Carte cadeau reçue",
      bodyHtml,
    }),
  };
}
