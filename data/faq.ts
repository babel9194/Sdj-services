import type { FaqItem, HowItWorksStep } from "@/types";

export const faqItems: FaqItem[] = [
  {
    id: "f1",
    question: "Combien de temps faut-il pour recevoir mon service ?",
    answer:
      "La majorité des commandes sont livrées instantanément après confirmation du paiement. Certaines demandes personnalisées peuvent prendre jusqu'à quelques heures.",
  },
  {
    id: "f2",
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Nous acceptons les paiements mobiles, les cartes bancaires et plusieurs portefeuilles électroniques locaux et internationaux.",
  },
  {
    id: "f3",
    question: "Puis-je vendre une carte cadeau que je n'utilise pas ?",
    answer:
      "Oui. Rendez-vous sur la page « Vendre une carte cadeau », renseignez les informations demandées et recevez une offre en quelques minutes.",
  },
  {
    id: "f4",
    question: "Que faire si je rencontre un problème avec ma commande ?",
    answer:
      "Notre équipe support est disponible via le chat et WhatsApp pour résoudre tout incident rapidement.",
  },
];

export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: 1,
    title: "Choisissez votre service",
    description: "Parcourez nos catégories et sélectionnez l'offre qui correspond à vos besoins.",
  },
  {
    step: 2,
    title: "Payez en toute sécurité",
    description: "Réglez votre commande via l'un de nos moyens de paiement vérifiés.",
  },
  {
    step: 3,
    title: "Recevez vos accès",
    description: "Recevez vos identifiants ou codes instantanément par email ou WhatsApp.",
  },
];
