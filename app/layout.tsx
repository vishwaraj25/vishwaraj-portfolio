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
  title: "Vishwaraj Saxena — Product Portfolio",
  description:
    "Product portfolio of Vishwaraj Saxena. Deep, interactive product breakdowns of quick-commerce reliability, turn-based combat systems, and language-learning engagement. Don't just show what I built. Show how I think.",
  keywords: [
    "Vishwaraj Saxena",
    "Product Manager",
    "Product Portfolio",
    "Swiggy Instamart",
    "Expedition 33",
    "Duolingo",
    "Product Teardown",
  ],
  authors: [{ name: "Vishwaraj Saxena" }],
  openGraph: {
    title: "Vishwaraj Saxena — Product Portfolio",
    description:
      "Interactive product breakdowns — the decisions, mechanics, and user behaviours that make products work.",
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
