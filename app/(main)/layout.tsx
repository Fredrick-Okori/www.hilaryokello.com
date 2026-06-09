"use client";

import React, { Suspense, lazy } from "react";

const MenuBar = lazy(() =>
  import("@/components/theme-toggle").then((mod) => ({ default: mod.MenuBar }))
);
const Footer = lazy(() => import("@/components/footer"));

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="absolute top-20 left-0 right-0 z-40 flex justify-center px-4">
        <Suspense fallback={null}>
          <MenuBar />
        </Suspense>
      </div>
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <div>{children}</div>
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
