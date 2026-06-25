import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ShoppingBag } from "lucide-react";

import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Store — Dr. Hilary Okello",
  description:
    "Official merchandise from Dr. Hilary Okello — Africa's Doctor of Comedy. T-shirts, caps, hoodies, mugs and more.",
};

export default function StorePage() {
  const categories = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-32 pb-20">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-7 w-7 text-yellow-500" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
              Official Store
            </h1>
          </div>
          <p className="text-white/60 text-lg max-w-xl">
            Rep Africa&apos;s Doctor of Comedy. All orders are confirmed via
            WhatsApp.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 rounded-full text-xs font-semibold border border-white/20 text-white/60"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/store/${product.slug}`}
              className="group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10"
            >
              {/* Badge */}
              {product.badge && (
                <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                  {product.badge}
                </span>
              )}

              {/* Out of stock overlay */}
              {!product.inStock && (
                <span className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-white/20 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                  Out of Stock
                </span>
              )}

              {/* Image */}
              <div className="relative w-full aspect-square bg-white/5 overflow-hidden">
                <Image
                  alt={product.name}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={product.image}
                />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-1.5 p-5 flex-1">
                <span className="text-xs text-yellow-500 font-semibold uppercase tracking-wide">
                  {product.category}
                </span>
                <h2 className="text-white font-bold text-base leading-snug group-hover:text-yellow-400 transition-colors">
                  {product.name}
                </h2>
                <p className="text-white/50 text-sm line-clamp-2 mt-1">
                  {product.description}
                </p>
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="text-white font-extrabold text-lg">
                    {product.price}
                  </span>
                  <span className="text-xs text-white/40 group-hover:text-yellow-500 transition-colors font-medium">
                    View details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
