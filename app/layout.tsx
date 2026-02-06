import "@/styles/globals.css";
import React, { Suspense, lazy } from "react";
import { Viga } from "next/font/google";
import Script from "next/script";

import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

// Lazy load non-critical components
const MenuBar = lazy(() => import("@/components/theme-toggle").then(mod => ({ default: mod.MenuBar })));
const Footer = lazy(() => import("@/components/footer"));

const viga = Viga({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-viga",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  metadataBase: new URL('https://www.hilaryokello.com'),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
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
    <html suppressHydrationWarning lang="en" className={viga.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="description" content="Hilary Okello's personal website - Uganda's top stand-up comedian" />
        <meta name="theme-color" content="#000000" />
        <meta name="format-detection" content="telephone=no" />
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
        {/* Chat Widget - placed in body where custom elements are valid */}
        <chat-widget env="prod" project-id="6cab4e2d-7389-4443-a5a6-10100007c55d"/>
        <Script src="https://cdn.apollo.kayeai.com/js/chat-widget.js" type="module" strategy="afterInteractive" />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {/* Navbar positioned on top of hero */}
          <div className="absolute top-20 left-0 right-0 z-40 flex justify-center px-4">
            <MenuBar />
          </div>

          {/* Main content with enough top padding to avoid overlap */}
          <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <div className="">{children}</div>
          </Suspense>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
