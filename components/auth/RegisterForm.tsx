"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { registerSchema, type RegisterValues } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase";
import { FormField } from "@/components/ui/FormField";

export function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmationSent, setConfirmationSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(values: RegisterValues) {
    setServerError(null);
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: { full_name: values.fullName },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      setServerError(
        error.message === "User already registered"
          ? "Un compte existe déjà avec cet email."
          : "Une erreur est survenue. Veuillez réessayer.",
      );
      return;
    }

    setConfirmationSent(true);
  }

  if (confirmationSent) {
    return (
      <div className="rounded-xl border border-ink-border bg-ink-surface p-6 text-center">
        <p className="text-sm text-paper">
          Un email de confirmation a été envoyé. Vérifiez votre boîte de réception pour activer
          votre compte.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <FormField
        id="fullName"
        label="Nom complet"
        placeholder="Votre nom"
        error={errors.fullName?.message}
        {...register("fullName")}
      />
      <FormField
        id="email"
        type="email"
        label="Email"
        placeholder="vous@exemple.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <FormField
        id="password"
        type="password"
        label="Mot de passe"
        placeholder="8 caractères minimum"
        error={errors.password?.message}
        {...register("password")}
      />
      <FormField
        id="confirmPassword"
        type="password"
        label="Confirmer le mot de passe"
        placeholder="••••••••"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      {serverError && <p className="text-sm text-signal">{serverError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-full bg-signal px-6 py-3 text-sm font-semibold text-paper transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {isSubmitting ? "Création..." : "Créer mon compte"}
      </button>

      <p className="text-center text-sm text-muted">
        Déjà un compte ?{" "}
        <Link href="/connexion" className="text-paper hover:text-signal">
          Se connecter
        </Link>
      </p>
    </form>
  );
}
