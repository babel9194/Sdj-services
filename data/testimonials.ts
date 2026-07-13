import type { Testimonial } from "@/types";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Aïcha D.",
    role: "Cliente depuis 2024",
    quote:
      "Livraison instantanée et support réactif. J'ai activé mon abonnement en moins de cinq minutes.",
    rating: 5,
    avatar: "/avatars/aicha.jpg",
  },
  {
    id: "t2",
    name: "Moussa K.",
    role: "Client fidèle",
    quote:
      "Les prix sont transparents et le suivi de commande est très clair. Je recommande sans hésiter.",
    rating: 5,
    avatar: "/avatars/moussa.jpg",
  },
  {
    id: "t3",
    name: "Fatou S.",
    role: "Nouvelle cliente",
    quote: "J'ai revendu une carte cadeau inutilisée en quelques clics, paiement reçu le jour même.",
    rating: 4,
    avatar: "/avatars/fatou.jpg",
  },
];
