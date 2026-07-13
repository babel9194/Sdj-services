import {
  Clapperboard,
  Music4,
  Sparkles,
  AppWindow,
  ShieldCheck,
  Gamepad2,
  Cloud,
  Gift,
  Repeat,
} from "lucide-react";
import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "streaming",
    name: "Streaming",
    description: "Vos plateformes de films et séries préférées, prêtes à regarder.",
    icon: Clapperboard,
    image: "/categories/streaming.jpg",
  },
  {
    slug: "musique",
    name: "Musique",
    description: "Un accès illimité à vos titres et playlists, sans coupure.",
    icon: Music4,
    image: "/categories/musique.jpg",
  },
  {
    slug: "ia",
    name: "Intelligence Artificielle",
    description: "Les meilleurs assistants IA pour écrire, créer et automatiser.",
    icon: Sparkles,
    image: "/categories/ia.jpg",
  },
  {
    slug: "logiciels",
    name: "Logiciels Premium",
    description: "Des suites créatives et bureautiques sous licence officielle.",
    icon: AppWindow,
    image: "/categories/logiciels.jpg",
  },
  {
    slug: "vpn",
    name: "VPN",
    description: "Naviguez en toute confidentialité, où que vous soyez.",
    icon: ShieldCheck,
    image: "/categories/vpn.jpg",
  },
  {
    slug: "jeux",
    name: "Jeux",
    description: "Crédits, abonnements et clés pour vos plateformes de jeu.",
    icon: Gamepad2,
    image: "/categories/jeux.jpg",
  },
  {
    slug: "cloud",
    name: "Cloud",
    description: "De l'espace de stockage fiable pour vos fichiers importants.",
    icon: Cloud,
    image: "/categories/cloud.jpg",
  },
  {
    slug: "cartes-cadeaux",
    name: "Cartes Cadeaux",
    description: "Des cartes cadeaux internationales livrées instantanément.",
    icon: Gift,
    image: "/categories/cartes-cadeaux.jpg",
  },
  {
    slug: "vente-cartes-cadeaux",
    name: "Vente de Cartes Cadeaux",
    description: "Convertissez vos cartes cadeaux inutilisées en argent, rapidement.",
    icon: Repeat,
    image: "/categories/vente-cartes-cadeaux.jpg",
  },
];
