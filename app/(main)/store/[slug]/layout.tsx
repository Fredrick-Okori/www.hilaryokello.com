import { Metadata } from "next";

import { getProductBySlug } from "@/lib/store-products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} — Store`,
    description: product.description.slice(0, 155),
    alternates: { canonical: `/store/${slug}` },
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
