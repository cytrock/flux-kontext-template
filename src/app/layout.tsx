import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { Analytics } from "@/components/Analytics";
import SessionProvider from "@/components/providers/SessionProvider";
import { GoogleOneTap } from "@/components/GoogleOneTap";
import { GoogleOneTapTrigger } from "@/components/GoogleOneTapTrigger";
import { StructuredData } from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mori Studio - Ghibli Style AI Platform | Transform Images to Magical Ghibli Art",
    template: "%s | Mori Studio"
  },
  description: "Transform any image to magical Studio Ghibli style with Mori Studio AI. Create enchanting Ghibli-style artwork from photos or text descriptions. Bring Studio Ghibli magic to your creative projects.",
  keywords: [
    "mori studio",
    "ghibli style ai",
    "studio ghibli transformation",
    "ghibli art generator",
    "ghibli style converter",
    "anime style transformation",
    "ghibli image generator",
    "mori studio ai",
    "studio ghibli art",
    "ghibli character creator",
    "totoro style art",
    "spirited away style",
    "miyazaki art style"
  ],
  authors: [{ name: "Mori Studio Team" }],
  creator: "Mori Studio",
  publisher: "Mori Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://fluxkontext.space'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <ClientBody>
            {children}
          </ClientBody>
          <GoogleOneTap />
          <GoogleOneTapTrigger />
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}

