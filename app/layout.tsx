import type { Metadata, Viewport } from "next";
import { Fredoka, Inter } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cafedapraca.com.br"),
  title: "Café da Praça — Sabor & Aconchego em Leme/SP",
  description:
    "O sabor que Leme inteira ama. Cafés especiais, bolos caseiros, salgados artesanais e o melhor café da cidade. Cafeteria e delivery em Leme - SP.",
  icons: { icon: "/midia/logo.png", apple: "/midia/logo.png" },
  openGraph: {
    title: "Café da Praça — Sabor & Aconchego em Leme/SP",
    description: "Café, conforto e a melhor experiência da cidade. Sabor & Aconchego.",
    images: ["/midia/logo.png"],
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#3a2518",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${fredoka.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
