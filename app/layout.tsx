import "@/styles/globals.css";
import React from "react";
import { Google_Sans } from "next/font/google";
import Script from "next/script";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import { CookieConsent } from "@/components/cookie-consent";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";

const googleSans = Google_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-google-sans",
  weight: ["400", "500", "700"],
});

// Pages set their own title (rendered as "<title> | Dr. Hilary Okello") and
// their own canonical URL. Canonical isn't set here: it would be inherited by
// every page that forgets one and point them all at the home page.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.hilaryokello.com"),
  title: {
    default: "Dr. Hilary Okello — Uganda's Top Stand-Up Comedian",
    template: "%s | Dr. Hilary Okello",
  },
  description:
    "Official site of Dr. Hilary Okello, Uganda's top stand-up comedian and Africa's Doctor of Comedy. Tour dates, tickets, videos and booking.",
  keywords: siteConfig.keywords,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Dr. Hilary Okello",
    images: [
      {
        url: "/og/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Hilary Okello on stage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/og-home.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className={googleSans.variable} lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          content="width=device-width, initial-scale=1, viewport-fit=cover"
          name="viewport"
        />
        <meta content="#fff7e5" name="theme-color" />
        <meta content="telephone=no" name="format-detection" />
      </head>
      <body
        className="font-sans antialiased"
        style={{ backgroundColor: "#fff7e5" }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
        {/* After the page content, so it isn't the first tab stop. */}
        <chat-widget
          env="prod"
          project-id="6cab4e2d-7389-4443-a5a6-10100007c55d"
        />
        <Script
          src="https://cdn.apollo.kayeai.com/js/chat-widget.js"
          // Loads once the page is idle, off the critical path.
          strategy="lazyOnload"
          type="module"
        />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
