import { Metadata } from "next";
import { ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "Store | Dr. Hilary Okello",
  description:
    "Official merchandise store for Dr. Hilary Okello. Merchandise coming soon — stay tuned!",
};

export default function StorePage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
      <div className="flex flex-col items-center gap-6 max-w-lg">
        <div className="w-20 h-20 rounded-full bg-yellow-400/10 flex items-center justify-center">
          <ShoppingBag className="w-10 h-10 text-yellow-400" />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Merchandise Coming Soon
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          The official Dr. Hilary Okello store is on its way. Check back soon
          for exclusive merch you won&apos;t want to miss.
        </p>
        <div className="w-16 h-1 rounded-full bg-yellow-400 mt-2" />
      </div>
    </div>
  );
}
