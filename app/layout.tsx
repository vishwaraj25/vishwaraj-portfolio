import type { Metadata } from "next";
import { Fraunces, Newsreader } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navigation/Header";

// Self-hosted at build time — no runtime requests to Google, no visitor IPs sent.
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});
import { Footer } from "@/components/navigation/Footer";
import { RouteTheme } from "@/components/system/RouteTheme";
import { ScrollProgress } from "@/components/system/ScrollProgress";

export const metadata: Metadata = {
  title: "Vishwaraj Saxena | Product Portfolio",
  description:
    "Product portfolio of Vishwaraj Saxena. Interactive product studies of game discovery, live-service strategy, player trust, and product decision-making.",
  keywords: [
    "Vishwaraj Saxena",
    "Product Manager",
    "Product Portfolio",
    "Steam Discovery",
    "Real Racing 3",
    "Live-Service Strategy",
    "Product Teardown",
  ],
  authors: [{ name: "Vishwaraj Saxena" }],
  openGraph: {
    title: "Vishwaraj Saxena | Product Portfolio",
    description:
      "Interactive product breakdowns of the decisions, mechanics, and user behaviours that make products work.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${newsreader.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans antialiased" data-theme="global">
        <RouteTheme />
        <ScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
