"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { STORE_PRODUCTS, getProductBySlug } from "@/lib/store-products";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].label);
  const [activeThumb, setActiveThumb] = useState(0);

  const waText = encodeURIComponent(
    `Hi, I'd like to be notified when the ${product.name} is available in the Dr. Hilary Okello store!`,
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-4">
        <div className="flex items-center gap-2 text-white/40 text-xs">
          <Link className="hover:text-white transition-colors" href="/store">
            Store
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link className="hover:text-white transition-colors" href="/store">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/70 truncate">{product.name}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* LEFT — image gallery */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div className="relative bg-white rounded-2xl overflow-hidden aspect-square">
              <Image
                fill
                alt={product.name}
                className="object-contain p-8"
                src={product.image}
              />
              <button
                aria-label="Wishlist"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-black/40 transition-colors"
              >
                <Heart className="w-5 h-5 text-black/60" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  className={`relative bg-white rounded-xl overflow-hidden w-24 h-24 flex-shrink-0 border-2 transition-colors ${
                    activeThumb === i
                      ? "border-yellow-400"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveThumb(i)}
                >
                  <Image
                    fill
                    alt={`${product.name} view ${i + 1}`}
                    className="object-contain p-2"
                    src={product.image}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — product details */}
          <div className="flex flex-col gap-6 lg:pt-2">
            {/* Category label */}
            <p className="text-yellow-400 text-xs font-bold tracking-[0.2em] uppercase">
              {product.categoryLabel}
            </p>

            {/* Name + price */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold uppercase leading-tight text-white mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-extrabold text-yellow-400">
                {product.price}
              </p>
            </div>

            {/* Description */}
            <p className="text-white/60 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>

            {/* Size selector */}
            {product.sizes[0] !== "ONE SIZE" && (
              <div>
                <p className="text-white/50 text-xs font-bold tracking-[0.15em] uppercase mb-3">
                  Select Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`w-12 h-12 rounded-full border text-sm font-bold transition-all ${
                        selectedSize === size
                          ? "border-yellow-400 bg-yellow-400 text-black"
                          : "border-white/20 text-white/70 hover:border-white/60"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color selector */}
            <div>
              <p className="text-white/50 text-xs font-bold tracking-[0.15em] uppercase mb-3">
                Color
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.label}
                    aria-label={color.label}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${
                      selectedColor === color.label
                        ? "border-yellow-400 scale-110"
                        : "border-white/20 hover:border-white/50"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                    onClick={() => setSelectedColor(color.label)}
                  />
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mt-2">
              <a
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-sm uppercase tracking-wider transition-all hover:scale-[1.02]"
                href={`https://wa.me/256700000000?text=${waText}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Notify Me on WhatsApp
              </a>
              <button
                disabled
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full border border-yellow-400/40 text-yellow-400/40 font-extrabold text-sm uppercase tracking-wider cursor-not-allowed"
              >
                Coming Soon
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Delivery badges */}
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-3 flex-1 bg-white/5 rounded-xl px-4 py-3">
                <Truck className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-white text-xs font-bold">Free Shipping</p>
                  <p className="text-white/40 text-[11px]">over UGX 200K</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-1 bg-white/5 rounded-xl px-4 py-3">
                <ShieldCheck className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-white text-xs font-bold">30-Day</p>
                  <p className="text-white/40 text-[11px]">Money Back</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-16">
          <Link
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors"
            href="/store"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Store
          </Link>
        </div>

        {/* More products */}
        <div className="mt-8 pt-12 border-t border-white/10">
          <h2 className="text-xl font-extrabold uppercase tracking-wide text-white mb-8">
            More Items
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {STORE_PRODUCTS.filter((p) => p.slug !== slug)
              .slice(0, 4)
              .map((p) => (
                <Link
                  key={p.id}
                  className="group flex flex-col gap-2"
                  href={`/store/${p.slug}`}
                >
                  <div className="relative bg-white rounded-xl overflow-hidden aspect-square">
                    <Image
                      fill
                      alt={p.name}
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                      src={p.image}
                    />
                  </div>
                  <p className="text-white/80 text-xs font-bold uppercase tracking-wide line-clamp-1">
                    {p.name}
                  </p>
                  <p className="text-yellow-400 text-sm font-extrabold">
                    {p.price}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
