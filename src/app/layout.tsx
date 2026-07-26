import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const metadataBase = new URL(configuredSiteUrl || "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Meet Tala — Applied AI & Data Science Portfolio",
    template: "%s | Meet Tala",
  },
  description:
    "Five repository-ready applied AI and data science case studies with transparent engineering, safety, testing and limitations.",
  applicationName: "Meet Tala Portfolio",
  authors: [{ name: "Meet Tala" }],
  creator: "Meet Tala",
  keywords: [
    "Applied AI",
    "Data Science",
    "Machine Learning",
    "RAG",
    "Next.js",
    "Python",
    "AI safety",
  ],
  openGraph: {
    type: "website",
    title: "Meet Tala — Applied AI & Data Science Portfolio",
    description:
      "Five evidence-led AI and data science projects with code, tests, safety boundaries and honest limitations.",
    siteName: "Meet Tala Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Tala — Applied AI & Data Science Portfolio",
    description:
      "Five evidence-led AI and data science projects with code, tests, safety boundaries and honest limitations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only z-50 rounded-sm bg-signal-amber px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main-content" className="min-h-screen" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
