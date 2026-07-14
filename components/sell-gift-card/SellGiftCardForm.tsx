"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ImagePlus, Loader2 } from "lucide-react";
import { sellGiftCardSchema, type SellGiftCardValues } from "@/lib/validations/giftcard";
import { giftCardBrands, estimateOfferFcfa } from "@/data/giftcard-brands";
import { createClient } from "@/lib/supabase";
import { FormField } from "@/components/ui/FormField";
import { SelectField } from "@/components/ui/SelectField";

const formatFcfa = new Intl.NumberFormat("fr-FR").format;

export function SellGiftCardForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SellGiftCardValues>({
    resolver: zodResolver(sellGiftCardSchema),
  });

  const brandSlug = watch("brandSlug");
  const valueAmount = watch("valueAmount");

  const estimate = useMemo(
    () => estimateOfferFcfa(brandSlug, Number(valueAmount)),
    [brandSlug, valueAmount],
  );

  async function onSubmit(values: SellGiftCardValues) {
    setServerError(null);
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setServerError("Votre session a expiré. Veuillez vous reconnecter.");
      return;
    }

    let proofUrl: string | null = null;
    const file = values.proof?.[0];

    if (file) {
      const path = `${user.id}/${crypto.randomUUID()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("gift-card-proofs")
        .upload(path, file);

      if (uploadError) {
        setServerError("Impossible d'envoyer la photo. Réessayez ou continuez sans photo.");
        return;
      }

      const { data: publicUrl } = supabase.storage.from("gift-card-proofs").getPublicUrl(path);
      proofUrl = publicUrl.publicUrl;
    }

    const { data, error } = await supabase
      .from("gift_card_submissions")
      .insert({
        user_id: user.id,
        brand: values.brandSlug,
        value_amount: values.valueAmount,
        code: values.code,
        contact_phone: values.contactPhone,
        proof_url: proofUrl,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) {
      setServerError("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
      return;
    }

    // Best-effort: the submission itself already succeeded, so a failed
    // confirmation email shouldn't block the user from seeing success.
    fetch("/api/emails/gift-card-submitted", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submissionId: data.id }),
    }).catch((err) => console.error("Failed to trigger confirmation email:", err));

    setSubmittedId(data.id);
  }

  if (submittedId) {
    return (
      <div className="rounded-2xl border border-ink-border bg-ink-surface p-8 text-center">
        <CheckCircle2 size={36} className="mx-auto text-signal" strokeWidth={1.5} />
        <h2 className="mt-4 font-display text-xl font-semibold">Carte reçue</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Votre demande <span className="font-mono text-paper">#{submittedId.slice(0, 8)}</span>{" "}
          a bien été enregistrée. Une offre vous sera envoyée par WhatsApp ou email dans les
          prochaines minutes.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <SelectField
        id="brandSlug"
        label="Marque de la carte cadeau"
        error={errors.brandSlug?.message}
        defaultValue=""
        {...register("brandSlug")}
      >
        <option value="" disabled>
          Sélectionnez une marque
        </option>
        {giftCardBrands.map((brand) => (
          <option key={brand.slug} value={brand.slug}>
            {brand.name}
          </option>
        ))}
      </SelectField>

      <FormField
        id="valueAmount"
        type="number"
        step="0.01"
        label="Valeur de la carte (USD)"
        placeholder="50"
        error={errors.valueAmount?.message}
        {...register("valueAmount")}
      />

      {estimate !== null && (
        <div className="rounded-xl border border-signal/30 bg-signal/5 px-4 py-3 text-sm">
          Offre estimée : <span className="font-mono font-semibold">{formatFcfa(estimate)}</span>{" "}
          FCFA
          <span className="ml-1 text-xs text-muted">(confirmée après vérification)</span>
        </div>
      )}

      <FormField
        id="code"
        label="Code de la carte"
        placeholder="XXXX-XXXX-XXXX"
        error={errors.code?.message}
        {...register("code")}
      />

      <FormField
        id="contactPhone"
        label="Numéro WhatsApp"
        placeholder="+225 00 00 00 00"
        error={errors.contactPhone?.message}
        {...register("contactPhone")}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="proof" className="text-sm font-medium text-paper/90">
          Photo de la carte <span className="text-muted">(optionnel)</span>
        </label>
        <label
          htmlFor="proof"
          className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-ink-border bg-ink-surface px-4 py-6 text-sm text-muted transition-colors hover:border-signal/50"
        >
          <ImagePlus size={18} />
          Ajouter une photo
        </label>
        <input id="proof" type="file" accept="image/*" className="hidden" {...register("proof")} />
      </div>

      {serverError && <p className="text-sm text-signal">{serverError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-semibold text-paper transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {isSubmitting && <Loader2 size={16} className="animate-spin" />}
        {isSubmitting ? "Envoi..." : "Envoyer ma carte"}
      </button>
    </form>
  );
}
