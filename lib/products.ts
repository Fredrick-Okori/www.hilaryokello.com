export interface Product {
  id: number;
  slug: string;
  name: string;
  price: string;
  category: string;
  description: string;
  details: string[];
  sizes?: string[];
  image: string;
  inStock: boolean;
  badge?: string;
}

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const RAW: Omit<Product, "slug">[] = [
  {
    id: 1,
    name: "Jokes From Far Away T-Shirt",
    price: "UGX 55,000",
    category: "Clothing",
    image: "/store/gray_cap.webp",
    badge: "Best Seller",
    inStock: true,
    description:
      "Wear the tour. This premium cotton tee features the official 'Jokes From Far Away 2026 World Tour' design on the front. Soft, breathable, and perfect for showing you were there.",
    details: [
      "100% premium ring-spun cotton",
      "Unisex fit",
      "Available in sizes S – 3XL",
      "Screen-printed tour graphic",
      "Machine washable",
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  },
  {
    id: 2,
    name: "Dr. Hilary Okello Classic Cap",
    price: "UGX 45,000",
    category: "Accessories",
    image: "/store/gray_cap.webp",
    badge: "New",
    inStock: true,
    description:
      "Rep the Doctor of Comedy everywhere you go. This structured 6-panel cap has an embroidered Dr. Hilary Okello logo on the front and an adjustable strap for a perfect fit.",
    details: [
      "Structured 6-panel cap",
      "Embroidered logo",
      "Adjustable buckle strap",
      "One size fits most",
      "Available in black and yellow",
    ],
  },
  {
    id: 3,
    name: "Comedy Doctor Hoodie",
    price: "UGX 95,000",
    category: "Clothing",
    image: "/store/gray_cap.webp",
    inStock: true,
    description:
      "Stay warm and stay funny. This heavyweight pullover hoodie features the 'Comedy Doctor' graphic on the back and a clean embroidered logo on the chest. Premium quality, built to last.",
    details: [
      "80% cotton, 20% polyester fleece",
      "Pullover style with kangaroo pocket",
      "Ribbed cuffs and hem",
      "Available in S – 2XL",
      "Embroidered chest logo + back print",
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: 4,
    name: "Africa's Doctor of Comedy Mug",
    price: "UGX 30,000",
    category: "Accessories",
    image: "/store/gray_cap.webp",
    inStock: true,
    description:
      "Start your morning with a laugh. This high-quality ceramic mug features the iconic 'Africa's Doctor of Comedy' tagline. Perfect for coffee, tea, or whatever gets you going.",
    details: [
      "11oz ceramic mug",
      "Dishwasher safe",
      "Microwave safe",
      "High-quality print that won't fade",
      "Comes in a gift box",
    ],
  },
  {
    id: 5,
    name: "Signed Show Poster – Jokes From Far Away",
    price: "UGX 70,000",
    category: "Collectibles",
    image: "/store/gray_cap.webp",
    badge: "Limited",
    inStock: true,
    description:
      "A limited-edition piece of comedy history. Each poster is personally signed by Dr. Hilary Okello and numbered. A must-have for fans and collectors.",
    details: [
      "A2 size (420mm × 594mm)",
      "Printed on 300gsm matte art paper",
      "Personally hand-signed by Dr. Hilary Okello",
      "Individually numbered",
      "Ships in a protective tube",
    ],
  },
  {
    id: 6,
    name: "World Tour Tote Bag",
    price: "UGX 25,000",
    category: "Accessories",
    image: "/store/gray_cap.webp",
    inStock: true,
    description:
      "Carry your essentials in style. This sturdy canvas tote bag features the 2026 World Tour graphic and is big enough for all your daily needs.",
    details: [
      "100% natural canvas",
      "Reinforced handles",
      "Large main compartment",
      "Screen-printed graphic",
      "Dimensions: 38cm × 42cm",
    ],
  },
];

export const PRODUCTS: Product[] = RAW.map((p) => ({
  ...p,
  slug: `${toSlug(p.name)}-${p.id}`,
}));

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const WHATSAPP_NUMBER = "+256752734280";
