"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, Bell, ArrowRight, Heart, Eye } from "lucide-react";

import { STORE_PRODUCTS, type StoreProduct } from "@/lib/store-products";
import { supabase } from "@/lib/supabase";

const CATEGORIES = [
  "All",
  "T-Shirts",
  "Hoodies",
  "Hats",
  "Accessories",
] as const;

type Category = (typeof CATEGORIES)[number];

function dbToProduct(row: Record<string, unknown>): StoreProduct {
  return {
    id: 0,
    slug: row.slug as string,
    name: row.name as string,
    description: (row.description as string) ?? "",
    price: (row.price as string) ?? "",
    category: (row.category as string) ?? "",
    categoryLabel: `OFFICIAL MERCHANDISE · ${((row.category as string) ?? "").toUpperCase()}`,
    sizes: (row.sizes as string[]) ?? [],
    colors: [{ label: "Black", hex: "#111111" }],
    badge: (row.badge as string | null) ?? null,
    image: (row.image as string) ?? "/store/image-asset copy.png",
  };
}

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [dbProducts, setDbProducts] = useState<StoreProduct[]>([]);

  useEffect(() => {
    supabase
      .from("merchandise")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setDbProducts(data.map(dbToProduct));
        }
      });
  }, []);

  const allProducts =
    dbProducts.length > 0
      ? [
          ...dbProducts,
          ...STORE_PRODUCTS.filter(
            (s) => !dbProducts.some((d) => d.slug === s.slug),
          ),
        ]
      : STORE_PRODUCTS;

  const filtered =
    activeCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,144,33,0.15)_0%,_transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingBag className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold tracking-widest text-sm uppercase">
              Official Store
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            Official Merch
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed">
            Exclusive Dr. Hilary Okello gear. Limited editions — comedy-ready
            apparel and accessories straight from the tour.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            {[
              "Limited Edition Drops",
              "Ships Across Africa",
              "Fan-Designed Pieces",
            ].map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-300 text-sm font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-16 z-30 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-yellow-400 text-black"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10 rounded-2xl overflow-hidden">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className={`group relative bg-zinc-950 flex flex-col ${
                i % 4 !== 3 ? "sm:border-r border-white/10" : ""
              } ${i < filtered.length - 4 ? "border-b border-white/10" : ""}`}
            >
              {/* Image panel */}
              <div
                className="relative bg-white overflow-hidden"
                style={{ aspectRatio: "3/3.2" }}
              >
                <Image
                  fill
                  alt={product.name}
                  className="object-contain w-full h-full p-4"
                  src={product.image}
                />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded bg-yellow-400 text-black text-[10px] font-extrabold tracking-widest uppercase">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    aria-label="Wishlist"
                    className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-zinc-800 transition-colors"
                  >
                    <Heart className="w-4 h-4 text-white" />
                  </button>
                  <span className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-400 text-black text-sm font-extrabold tracking-wider uppercase cursor-default">
                    <ShoppingBag className="w-4 h-4" />
                    Coming Soon
                  </span>
                  <Link
                    aria-label="View item"
                    className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-zinc-800 transition-colors"
                    href={`/store/${product.slug}`}
                  >
                    <Eye className="w-4 h-4 text-white" />
                  </Link>
                </div>
              </div>

              {/* Card body */}
              <Link
                className="flex flex-col flex-1 p-4 gap-3"
                href={`/store/${product.slug}`}
              >
                <div>
                  <h3 className="text-white font-extrabold text-sm uppercase tracking-wide leading-snug mb-1">
                    {product.name}
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Sizes */}
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="px-2 py-0.5 rounded border border-white/20 text-white/60 text-[10px] font-semibold"
                    >
                      {size}
                    </span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-white font-extrabold text-base">
                    {product.price}
                  </span>
                  <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-extrabold uppercase tracking-wider">
                    View Item
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Notify CTA */}
        <div className="mt-16 rounded-2xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/10 via-black to-black p-8 sm:p-12 text-center">
          <div className="w-14 h-14 rounded-full bg-yellow-400/10 flex items-center justify-center mx-auto mb-5">
            <Bell className="w-7 h-7 text-yellow-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Merchandise Dropping Soon
          </h2>
          <p className="text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
            The Dr. Hilary Okello official merch collection is almost here.
            Contact us on WhatsApp to be the first to know when it goes live.
          </p>
          <a
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-base transition-all hover:scale-105"
            href="https://wa.me/256700000000?text=Hi%2C%20I%27d%20like%20to%20be%20notified%20when%20the%20Dr.%20Hilary%20Okello%20merch%20store%20launches!"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Bell className="w-4 h-4" />
            Get Notified on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
