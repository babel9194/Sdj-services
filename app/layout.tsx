import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "SDJ Services — Tous vos services numériques au même endroit",
    template: "%s | SDJ Services",
  },
  description:
    "SDJ Services est la marketplace premium pour vos abonnements streaming, musique, IA, logiciels, VPN, cloud, jeux et cartes cadeaux.",
  keywords: [
    "SDJ Services",
    "abonnement streaming",
    "cartes cadeaux",
    "VPN",
    "intelligence artificielle",
    "logiciels premium",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "SDJ Services",
    title: "SDJ Services — Tous vos services numériques au même endroit",
    description:
      "Streaming, Intelligence Artificielle, Logiciels Premium, Cartes Cadeaux et bien plus.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${sora.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
