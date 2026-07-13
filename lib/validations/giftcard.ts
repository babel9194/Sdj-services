import { z } from "zod";
import { giftCardBrands } from "@/data/giftcard-brands";

const brandSlugs = giftCardBrands.map((b) => b.slug) as [string, ...string[]];

export const sellGiftCardSchema = z.object({
  brandSlug: z.enum(brandSlugs, { errorMap: () => ({ message: "Choisissez une marque" }) }),
  valueAmount: z.coerce
    .number({ invalid_type_error: "Indiquez un montant" })
    .positive("Le montant doit être positif"),
  code: z
    .string()
    .min(4, "Le code semble trop court")
    .max(64, "Le code semble trop long"),
  contactPhone: z
    .string()
    .min(8, "Numéro de téléphone invalide")
    .regex(/^[0-9+\s-]+$/, "Numéro de téléphone invalide"),
  proof: z
    .custom<FileList>()
    .refine((files) => !files || files.length === 0 || files.length === 1, {
      message: "Une seule photo est acceptée",
    })
    .optional(),
});

export type SellGiftCardValues = z.infer<typeof sellGiftCardSchema>;
