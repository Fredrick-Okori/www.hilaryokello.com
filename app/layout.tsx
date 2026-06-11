import "@/styles/globals.css";
import React from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";

// Fallback to the bundled font currently wired into Tailwind.
// (Tailwind is configured to use --font-plus-jakarta-sans for `font-sans`.)
const viga = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  metadataBase: new URL("https://www.hilaryokello.com"),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
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
    <html suppressHydrationWarning className={viga.variable} lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          content="width=device-width, initial-scale=1, viewport-fit=cover"
          name="viewport"
        />
        <meta content="#000000" name="theme-color" />
        <meta content="telephone=no" name="format-detection" />
      </head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-36J4TDZWT9"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-36J4TDZWT9');`}
      </Script>
      <body
        className="font-sans antialiased"
        style={{ backgroundColor: "black" }}
      >
        <chat-widget
          env="prod"
          project-id="6cab4e2d-7389-4443-a5a6-10100007c55d"
        />
        <Script
          src="https://cdn.apollo.kayeai.com/js/chat-widget.js"
          strategy="afterInteractive"
          type="module"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
