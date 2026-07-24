import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./Providers";
import ContactHeader from "@/components/layout/ContactHeader";
import JsonLd from "@/components/JsonLd";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  style: ["normal"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cargoland.africa/"),

  title: {
    default: "CargoLand Logistics - Fast & Reliable Global Shipping",
    template: "%s | Cargoland Logistics",
  },

  description:
    "Ship packages across countries via Air, Ocean, or Road freight with real-time tracking and transparent pricing.",

  manifest: "/site.webmanifest",

  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }, // fallback for old browsers
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  keywords: [
    "logistics company Nigeria",
    "global coverage",
    "freight services Nigeria",
    "cargo transport Lagos",
    "sea freight Nigeria",
    "air freight Nigeria",
    "road haulage Nigeria",
    "Cargoland Logistics",
    "shipping company Nigeria",
    "freight forwarding West Africa",
    "logistics solutions West Africa",
  ],

  authors: [
    { name: "Cargoland Logistics", url: "https://www.cargoland.africa/" },
  ],
  creator: "Cargoland Logistics",
  publisher: "Cargoland Logistics",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },

  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://www.cargoland.africa/",
    siteName: "Cargoland Logistics",
    title: "CargoLand Logistics - Fast & Reliable Global Shipping",
    description:
      "Ship packages across countries via Air, Ocean, or Road freight with real-time tracking and transparent pricing.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cargoland Global Logistics Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CargoLand Logistics - Fast & Reliable Global Shipping",
    description:
      "Leading logistics company in Nigeria offering road, sea, and air freight services",
    images: ["/og-image.png"],
    creator: "@cargolandlogistics",
    site: "@cargolandlogistics",
  },

  alternates: {
    canonical: "https://www.cargoland.africa/",
  },

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
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        montserrat.variable,
        roboto.variable,
        "font-sans",
      )}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd />
        <Providers>
          <ContactHeader />
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
