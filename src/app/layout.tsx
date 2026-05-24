import type { Metadata, Viewport } from "next";
import { Montserrat, Inter, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import PageTransition from "@/components/layout/PageTransition";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://apexcoaching.com";
const SITE_NAME = "Apex Coaching";
const SITE_DESCRIPTION =
  "Premium entrepreneur coaching that turns ambitious founders into high-performing CEOs. Clarity, systems, and uncommon execution.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Build a Business That Compounds`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "entrepreneur coaching",
    "business coach",
    "CEO coaching",
    "startup growth",
    "business systems",
    "executive coaching",
    "high performance",
    "business strategy",
  ],
  authors: [{ name: "Apex Coaching", url: SITE_URL }],
  creator: "Apex Coaching",
  publisher: "Apex Coaching",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Build a Business That Compounds`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@apexcoaching",
    creator: "@apexcoaching",
    title: `${SITE_NAME} — Build a Business That Compounds`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.jpg`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: SITE_URL,
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#0D1015",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${poppins.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-[#0D1015] text-[#F8F8F8] antialiased selection:bg-[#D4AF37]/20 selection:text-[#F8F8F8]">
        <CustomCursor />
        <Navbar />
        <PageTransition>
          <main id="main-content">{children}</main>
        </PageTransition>
        <Footer />
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "#171B22",
              border: "1px solid rgba(212,175,55,0.2)",
              color: "#F8F8F8",
              fontFamily: "var(--font-inter), sans-serif",
            },
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
