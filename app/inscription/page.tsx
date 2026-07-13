import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Créer un compte",
  description: "Créez votre compte SDJ Services.",
};

export default function RegisterPage() {
  return (
    <section className="container-xl flex min-h-[80vh] items-center justify-center py-24">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="font-display text-lg font-bold tracking-tight">
            SDJ <span className="text-signal">Services</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold tracking-tight">Créer votre compte</h1>
          <p className="mt-2 text-sm text-muted">
            Rejoignez SDJ Services pour commander et suivre vos services numériques.
          </p>
        </div>
        <div className="rounded-2xl border border-ink-border bg-ink-surface p-8">
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
