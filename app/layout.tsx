import "@/styles/globals.css";
import React from "react"; // Corrected import for React
import { Comfortaa } from "next/font/google";
import Script from "next/script";
import { Analytics } from '@vercel/analytics/next';

import { MenuBar } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

const comfortaa = Comfortaa({ subsets: ["latin"] });



export const metadata: Metadata = {
  // Metadata unchanged
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
 
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="Hilary Okello's personal website" name="description" />
      </head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-36J4TDZWT9"
      />
    <Script id="google-analytics">
  {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-36J4TDZWT9');`}
</Script>

      <body
        className={comfortaa.className}
        style={{ backgroundColor: "black" }}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {/* Navbar positioned on top of hero */}
          <div className="absolute top-20 left-0 right-0 z-40 flex justify-center px-4">
            <MenuBar />
          </div>

          {/* Main content with enough top padding to avoid overlap */}
          <div className="">{children}</div>
          <Analytics />
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
