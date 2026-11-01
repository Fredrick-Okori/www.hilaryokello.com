import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import Zambia from "@/components/home.zambia";
import { SITE_URL, jsonLdScript } from "@/lib/shows-server";

// Dynamic imports with proper named/default export handling
const HeroSection = dynamic(
  () =>
    import("@/components/hero-section").then((mod) => ({
      default: mod.HeroSection,
    })),
  {
    loading: () => <div className="min-h-screen bg-cream animate-pulse" />,
  },
);

const CountryGlimpse = dynamic(() => import("@/components/glimpse"), {
  loading: () => <div className="h-96 bg-black-light animate-pulse" />,
});

const VideoSection = dynamic(
  () =>
    import("@/components/videos").then((mod) => ({
      default: mod.VideoSection,
    })),
  {
    loading: () => <div className="h-64 bg-black-light animate-pulse" />,
  },
);

const ImageCarousel = dynamic(() => import("@/components/home.carousel"), {
  loading: () => <div className="h-96 bg-black-light animate-pulse" />,
});

const UpcomingShows = dynamic(
  () => import("@/components/upcoming.show").then((mod) => mod.default),
  {
    loading: () => <div className="h-64 bg-black-light animate-pulse" />,
  },
);

export const metadata: Metadata = {
  title: { absolute: "Dr. Hilary Okello — Uganda's Top Stand-Up Comedian" },
  description:
    "Official site of Dr. Hilary Okello, Uganda's top stand-up comedian and Africa's Doctor of Comedy. Tour dates, tickets, stand-up clips and booking.",
  keywords:
    "Dr. Hilary Okello, Ugandan comedian, African stand-up comedy, comedy Uganda, top comedians in Africa, live comedy Uganda, comedy shows Kampala, medical comedian, funny Ugandan doctor, stand-up comedy East Africa",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Dr. Hilary Okello",
    title: "Dr. Hilary Okello — Uganda's Top Stand-Up Comedian",
    description:
      "Tour dates, stand-up clips and booking for Africa's Doctor of Comedy.",
    images: [
      {
        url: "/og/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Hilary Okello on stage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Hilary Okello — Uganda's Top Stand-Up Comedian",
    description:
      "Tour dates, stand-up clips and booking for Africa's Doctor of Comedy.",
    images: ["/og/og-home.jpg"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr. Hilary Okello",
  jobTitle: "Stand-up comedian",
  url: SITE_URL,
  image: `${SITE_URL}/og/og-home.jpg`,
  sameAs: [
    "https://www.youtube.com/@drhilaryokello",
    "https://www.instagram.com/drhilaryokello/",
    "https://www.tiktok.com/@drhilary_okello",
    "https://twitter.com/DrHilaryOkello",
  ],
};

export default function Page() {
  const images = [
    {
      url: "/gallery/two-kings-one-mic/NJJ_2833.avif",
      caption: "Dr. Hilary Okello on stage at 2 Kings One Mic",
    },
    {
      url: "/gallery/two-kings-one-mic/NJJ_3186.avif",
      caption: "Patrick Salvado and Dr. Hilary Okello on stage",
    },
    {
      url: "/gallery/two-kings-one-mic/NJJ_2763.avif",
      caption: "A packed hall at 2 Kings One Mic",
    },
    {
      url: "/gallery/two-kings-one-mic/NJJ_3249.avif",
      caption: "Patrick Salvado and Dr. Hilary Okello take a selfie on stage",
    },
    {
      url: "/gallery/two-kings-one-mic/NJJ_3044.avif",
      caption: "Audience members laughing",
    },
    {
      url: "/gallery/two-kings-one-mic/NJJ_2980.avif",
      caption: "The 2 Kings One Mic stage",
    },
  ];

  return (
    <main className="min-h-screen">
      <script
        dangerouslySetInnerHTML={{ __html: jsonLdScript(personJsonLd) }}
        type="application/ld+json"
      />
      {/* Full screen background */}
      <div className="min-h-screen overflow-hidden relative">
        <HeroSection />
      </div>

      <Suspense
        fallback={<div className="h-64 bg-black-light animate-pulse" />}
      >
        <div className="scroll-mt-24" id="shows">
          <UpcomingShows />
        </div>
      </Suspense>
      <div className="bg-cream py-8 sm:py-10 4xl:py-16">
        <div className="mx-auto max-w-7xl px-4 2xl:max-w-[1440px] 3xl:max-w-[1680px] 4xl:max-w-[2400px]">
          <CountryGlimpse images={images} />
        </div>
      </div>
      <div className="bg-cream py-8 sm:py-10 4xl:py-16">
        <div className="mx-auto max-w-7xl px-4 2xl:max-w-[1440px] 3xl:max-w-[1680px] 4xl:max-w-[2400px]">
          <Zambia />
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-cream py-8 sm:py-10 4xl:py-16">
        <div className="mx-auto max-w-7xl px-4 2xl:max-w-[1440px] 3xl:max-w-[1680px] 4xl:max-w-[2400px]">
          <VideoSection className="py-0 sm:py-0" title="Featured Videos" />
        </div>
      </div>

      {/* Gallery Glimpse */}
      <div className="bg-cream py-8 sm:py-10 4xl:py-16">
        <div className="mx-auto max-w-7xl px-4 2xl:max-w-[1440px] 3xl:max-w-[1680px] 4xl:max-w-[2400px]">
          <ImageCarousel />
        </div>
      </div>
    </main>
  );
}
