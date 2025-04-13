import "@/styles/globals.css";
import type React from "react"; // Added import for React

import { Comfortaa } from "next/font/google";
import { MenuBar } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";

const comfortaa = Comfortaa({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={comfortaa.className} style={{backgroundColor: 'black'}}>
        <ThemeProvider disableSystemTheme attribute="class" defaultTheme="dark">
          {/* Navbar positioned on top of hero */}
          <div className="absolute top-20 left-0 right-0 z-40 flex justify-center px-4">
            <MenuBar />
          </div>

          {/* Main content with enough top padding to avoid overlap */}
          <div className="">{children}</div>
        </ThemeProvider>
       <Footer/>
      </body>
    </html>
  );
}
