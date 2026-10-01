import type { Metadata, Viewport } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://anivelmedia.com"),
  title: {
    default: "Anivel Media | Creative Media & Digital Growth Agency",
    template: "%s | Anivel Media",
  },
  description:
    "Anivel Media helps businesses grow through social media, content creation, advertising, websites, branding and digital strategy.",
  keywords: [
    "Anivel Media",
    "Creative Media Agency",
    "Digital Growth Agency",
    "Social Media Management",
    "Reel Creation",
    "Meta Ads Agency",
    "Full-Stack Web Development",
    "Brand Identity Design",
    "Commercial Video Shoots",
  ],
  authors: [{ name: "ANIVEL MEDIA" }],
  creator: "ANIVEL MEDIA",
  publisher: "ANIVEL MEDIA",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Anivel Media | Creative Media & Digital Growth Agency",
    description:
      "Anivel Media helps businesses grow through social media, content creation, advertising, websites, branding and digital strategy.",
    url: "https://anivelmedia.com",
    siteName: "ANIVEL MEDIA",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/brand/anivel-hero-badge.jpg",
        width: 1200,
        height: 630,
        alt: "ANIVEL MEDIA | Creative Media & Digital Growth Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anivel Media | Creative Media & Digital Growth Agency",
    description:
      "Anivel Media helps businesses grow through social media, content creation, advertising, websites, branding and digital strategy.",
    images: ["/brand/anivel-hero-badge.jpg"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Suppress third-party Chrome extension errors from triggering Next.js dev overlays */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.addEventListener('error', function(e) {
                  if (e.filename && (e.filename.indexOf('chrome-extension:') !== -1 || e.filename.indexOf('moz-extension:') !== -1)) {
                    e.stopImmediatePropagation();
                  }
                }, true);
              }
            `,
          }}
        />
      </head>
      <body className="bg-black text-[#EEEEEE] antialiased selection:bg-crimson selection:text-white overflow-x-hidden w-full max-w-full relative">
        <ScrollProgressBar />
        {children}
      </body>
    </html>
  );
}
