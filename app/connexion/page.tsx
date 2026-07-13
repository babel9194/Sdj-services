import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous à votre compte SDJ Services.",
};

export default function LoginPage() {
  return (
    <section className="container-xl flex min-h-[80vh] items-center justify-center py-24">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="font-display text-lg font-bold tracking-tight">
            SDJ <span className="text-signal">Services</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold tracking-tight">Content de vous revoir</h1>
          <p className="mt-2 text-sm text-muted">
            Connectez-vous pour accéder à votre compte et vos commandes.
          </p>
        </div>
        <div className="rounded-2xl border border-ink-border bg-ink-surface p-8">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
