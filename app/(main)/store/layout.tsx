import { Metadata } from "next";

// The store pages are client components, so their metadata lives here.
export const metadata: Metadata = {
  // A plain string here would stop product pages inheriting the root template.
  title: { default: "Store", template: "%s | Dr. Hilary Okello" },
  description:
    "Official Dr. Hilary Okello merchandise: tees, hoodies, caps and more.",
  alternates: { canonical: "/store" },
  // Not linked from the menu for now, so kept out of search results.
  robots: { index: false },
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
