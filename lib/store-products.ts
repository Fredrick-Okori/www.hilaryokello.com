export type StoreProduct = {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: string;
  category: string;
  categoryLabel: string;
  sizes: string[];
  colors: { label: string; hex: string }[];
  badge: string | null;
  image: string;
};

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: 1,
    slug: "dr-hilary-signature-tee",
    name: "Dr. Hilary Signature Tee",
    description:
      "The official Dr. Hilary Okello signature tee. Features the embroidered comedy tour logo on the chest and a clean minimal back. 100% organic cotton, pre-shrunk. Wear it to a show, wear it anywhere.",
    price: "UGX 65,000",
    category: "T-Shirts",
    categoryLabel: "OFFICIAL MERCHANDISE · T-SHIRT",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { label: "Black", hex: "#111111" },
      { label: "White", hex: "#f5f5f5" },
    ],
    badge: "Best Seller",
    image: "/store/image-asset copy.png",
  },
  {
    id: 2,
    slug: "unbothered-hoodie",
    name: "Unbothered Hoodie",
    description:
      "Premium heavyweight pullover hoodie inspired by the Unbothered comedy special. Thick fleece interior, kangaroo pocket, and ribbed cuffs. Perfect for cool nights at the show.",
    price: "UGX 120,000",
    category: "Hoodies",
    categoryLabel: "OFFICIAL MERCHANDISE · HOODIE",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { label: "Black", hex: "#111111" },
      { label: "Charcoal", hex: "#3a3a3a" },
    ],
    badge: "Limited Edition",
    image: "/store/image-asset copy.png",
  },
  {
    id: 3,
    slug: "comedy-tour-cap",
    name: "Comedy Tour Cap",
    description:
      "Structured snapback with gold embroidery of the Dr. Hilary logo on the front. Flat brim, adjustable strap. One size fits all. Pairs with anything.",
    price: "UGX 45,000",
    category: "Hats",
    categoryLabel: "OFFICIAL MERCHANDISE · HAT",
    sizes: ["ONE SIZE"],
    colors: [
      { label: "Black", hex: "#111111" },
      { label: "Yellow", hex: "#facc15" },
    ],
    badge: null,
    image: "/store/bucket-cap.png",
  },
  {
    id: 4,
    slug: "world-tour-tee",
    name: "World Tour Tee",
    description:
      "Jokes From Far Away World Tour edition. All tour cities printed on the back in bold gold. Breathable ringspun cotton — comfortable for all-day wear from Kampala to Harare.",
    price: "UGX 70,000",
    category: "T-Shirts",
    categoryLabel: "OFFICIAL MERCHANDISE · T-SHIRT",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { label: "Black", hex: "#111111" },
      { label: "White", hex: "#f5f5f5" },
    ],
    badge: "Fan Favourite",
    image: "/store/image-asset copy.png",
  },
  {
    id: 5,
    slug: "dr-okello-mug",
    name: "Dr. Okello Mug",
    description:
      "Start every morning with a laugh. 11oz ceramic mug featuring the Dr. Hilary Okello logo. Dishwasher and microwave safe. One size, maximum laughs.",
    price: "UGX 35,000",
    category: "Accessories",
    categoryLabel: "OFFICIAL MERCHANDISE · ACCESSORY",
    sizes: ["ONE SIZE"],
    colors: [
      { label: "Black", hex: "#111111" },
      { label: "White", hex: "#f5f5f5" },
    ],
    badge: null,
    image: "/store/image-asset copy.png",
  },
  {
    id: 6,
    slug: "jokes-from-far-away-hoodie",
    name: "Jokes From Far Away Hoodie",
    description:
      "World Tour Edition — strictly limited run. Oversized cut, fleece lined interior, dropped shoulders. The most premium piece in the collection. Once it's gone, it's gone.",
    price: "UGX 130,000",
    category: "Hoodies",
    categoryLabel: "OFFICIAL MERCHANDISE · HOODIE",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { label: "Black", hex: "#111111" },
      { label: "Yellow", hex: "#facc15" },
    ],
    badge: "Limited Edition",
    image: "/store/hoodie.png",
  },
  {
    id: 7,
    slug: "dr-hilary-bucket-cap",
    name: "Dr. Hilary Bucket Cap",
    description:
      "The official Dr. Hilary Okello bucket cap. Relaxed fit with an embroidered logo on the front. 100% cotton, UV protective brim. Festival-ready and built to last.",
    price: "UGX 40,000",
    category: "Hats",
    categoryLabel: "OFFICIAL MERCHANDISE · HAT",
    sizes: ["ONE SIZE"],
    colors: [
      { label: "Black", hex: "#111111" },
      { label: "Yellow", hex: "#facc15" },
    ],
    badge: "New",
    image: "/store/bucket-cap.png",
  },
  {
    id: 8,
    slug: "comedy-tour-hoodie",
    name: "Comedy Tour Hoodie",
    description:
      "The Dr. Hilary Okello Comedy Tour hoodie. Heavyweight fleece, oversized fit, dropped shoulders. Front chest logo and full tour dates on the back. Limited quantities — this one won't be restocked.",
    price: "UGX 115,000",
    category: "Hoodies",
    categoryLabel: "OFFICIAL MERCHANDISE · HOODIE",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { label: "Black", hex: "#111111" },
      { label: "Charcoal", hex: "#3a3a3a" },
    ],
    badge: "New",
    image: "/store/hoodie.png",
  },
];

export function getProductBySlug(slug: string): StoreProduct | undefined {
  return STORE_PRODUCTS.find((p) => p.slug === slug);
}
