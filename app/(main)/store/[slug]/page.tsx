import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronLeft, ChevronRight, ShoppingBag, CheckCircle } from "lucide-react";

import { PRODUCTS, getProductBySlug, WHATSAPP_NUMBER } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} — Dr. Hilary Okello Store`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: `https://www.hilaryokello.com${product.image}` }],
    },
  };
}

export default async function StoreItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const waMessage = encodeURIComponent(
    `Hello Dr. Hilary Okello, I'd like to order: ${product.name} (${product.price})`,
  );
  const waLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${waMessage}`;

  const allSlugs = PRODUCTS.map((p) => p.slug);
  const currentIndex = allSlugs.indexOf(slug);
  const prevProduct = currentIndex > 0 ? PRODUCTS[currentIndex - 1] : null;
  const nextProduct =
    currentIndex < PRODUCTS.length - 1 ? PRODUCTS[currentIndex + 1] : null;

  return (
    <main className="text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 pb-14">
        {/* Back link */}
        <Link
          className="inline-flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-sm font-medium mb-8"
          href="/store"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Store
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white/5">
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                {product.badge}
              </span>
            )}
            <Image
              priority
              alt={product.name}
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              src={product.image}
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs text-yellow-500 font-bold uppercase tracking-widest">
                {product.category}
              </span>
              <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                {product.name}
              </h1>
              <p className="mt-3 text-3xl font-extrabold text-yellow-500">
                {product.price}
              </p>
            </div>

            <p className="text-white/70 leading-relaxed text-base">
              {product.description}
            </p>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-white/60 mb-2 uppercase tracking-wide">
                  Available Sizes
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="px-3 py-1.5 border border-white/20 rounded-lg text-sm font-medium text-white hover:border-yellow-500 transition-colors"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Product details */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-3">
                Product Details
              </p>
              <ul className="flex flex-col gap-2">
                {product.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/80">
                    <CheckCircle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            {product.inStock ? (
              <a
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-base rounded-full transition-all hover:scale-105 shadow-lg shadow-yellow-500/20"
                href={waLink}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ShoppingBag className="h-5 w-5" />
                Order via WhatsApp
              </a>
            ) : (
              <button
                disabled
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white/40 font-extrabold text-base rounded-full cursor-not-allowed"
              >
                Out of Stock
              </button>
            )}

            <p className="text-xs text-white/40 -mt-2">
              You&apos;ll be connected directly on WhatsApp to confirm size, colour, and delivery.
            </p>
          </div>
        </div>

        {/* Prev / Next navigation */}
        {(prevProduct || nextProduct) && (
          <nav className="mt-14 pt-8 border-t border-white/10 flex justify-between gap-4">
            {prevProduct ? (
              <Link
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm max-w-[45%]"
                href={`/store/${prevProduct.slug}`}
              >
                <ChevronLeft className="h-4 w-4 shrink-0" />
                <span className="truncate">{prevProduct.name}</span>
              </Link>
            ) : (
              <span />
            )}
            {nextProduct ? (
              <Link
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm max-w-[45%] text-right"
                href={`/store/${nextProduct.slug}`}
              >
                <span className="truncate">{nextProduct.name}</span>
                <ChevronRight className="h-4 w-4 shrink-0" />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </div>
    </main>
  );
}
