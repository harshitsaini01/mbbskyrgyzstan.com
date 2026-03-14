import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mbbskyrgyzstan.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "MBBS in Kyrgyzstan";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Study MBBS in Kyrgyzstan 2025`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Study MBBS in Kyrgyzstan at top MCI-recognized medical universities. Low tuition fees, English-medium programs, high FMGE pass rates. Apply for 2025 admissions.",
  keywords: "MBBS in Kyrgyzstan, study MBBS Kyrgyzstan, medical university Kyrgyzstan, MCI recognized Kyrgyzstan",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Study MBBS in Kyrgyzstan 2025`,
    description: "Study MBBS in Kyrgyzstan at top MCI-recognized medical universities.",
    images: [
      {
        url: `${SITE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Study MBBS in Kyrgyzstan 2025`,
    description: "Study MBBS in Kyrgyzstan at top MCI-recognized medical universities.",
    images: [`${SITE_URL}/og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

import { auth } from "@/lib/auth";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-white text-gray-900 antialiased font-sans">
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
