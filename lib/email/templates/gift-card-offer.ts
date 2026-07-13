import { emailLayout, emailButton } from "@/lib/email/layout";
import { getBrandBySlug } from "@/data/giftcard-brands";

const formatFcfa = new Intl.NumberFormat("fr-FR").format;

interface GiftCardOfferEmailProps {
  fullName: string | null;
  brandSlug: string;
  offerAmountFcfa: number;
  submissionId: string;
  siteUrl: string;
}

export function giftCardOfferEmail({
  fullName,
  brandSlug,
  offerAmountFcfa,
  submissionId,
  siteUrl,
}: GiftCardOfferEmailProps): { subject: string; html: string } {
  const brand = getBrandBySlug(brandSlug);
  const brandName = brand?.name ?? brandSlug;
  const greeting = fullName ? `Bonjour ${fullName},` : "Bonjour,";
  const shortId = submissionId.slice(0, 8);
  const formattedOffer = `${formatFcfa(offerAmountFcfa)} FCFA`;

  const bodyHtml = `
    <p style="margin:0 0 12px;">${greeting}</p>
    <p style="margin:0 0 12px;">
      Bonne nouvelle : votre carte cadeau <strong style="color:#FFFFFF;">${brandName}</strong>
      (demande <span style="font-family:monospace;">#${shortId}</span>) a été vérifiée.
    </p>
    <p style="margin:0 0 20px;font-size:20px;font-weight:700;color:#FFFFFF;">
      Offre : ${formattedOffer}
    </p>
    <p style="margin:0 0 16px;">
      Confirmez cette offre pour recevoir votre paiement sous 24 heures.
    </p>
    ${emailButton(`${siteUrl}/compte`, "Voir ma demande")}
  `;

  return {
    subject: `Votre offre pour la carte ${brandName} : ${formattedOffer}`,
    html: emailLayout({
      previewText: `Offre reçue : ${formattedOffer} pour votre carte ${brandName}.`,
      heading: "Offre reçue",
      bodyHtml,
    }),
  };
}
