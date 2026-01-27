import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamic imports with proper named/default export handling
const HeroSection = dynamic(() => 
  import("@/components/hero-section").then(mod => ({ default: mod.HeroSection })), {
  loading: () => <div className="min-h-screen bg-black animate-pulse" />,
});

const CountryGlimpse = dynamic(() => import("@/components/glimpse"), {
  loading: () => <div className="h-96 bg-black-light animate-pulse" />,
});

const VideoSection = dynamic(() => 
  import("@/components/videos").then(mod => ({ default: mod.VideoSection })), {
  loading: () => <div className="h-64 bg-black-light animate-pulse" />,
});

const ImageCarousel = dynamic(() => import("@/components/home.carousel"), {
  loading: () => <div className="h-96 bg-black-light animate-pulse" />,
});

const UpcomingShows = dynamic(() => import("@/components/upcoming.show").then(mod => mod.default), {
  loading: () => <div className="h-64 bg-black-light animate-pulse" />,
});

export const metadata: Metadata = {
  title: "Home | Dr. Hilary Okello | Uganda's Funniest Stand-Up Comedian & Africa's Doctor of Comedy",
  keywords:
    "Dr. Hilary Okello, Ugandan comedian, African stand-up comedy, comedy Uganda, top comedians in Africa, live comedy Uganda, comedy shows Kampala, medical comedian, funny Ugandan doctor, stand-up comedy East Africa",
  description:
    "Welcome to the official website of Dr. Hilary Okello, Uganda's top stand-up comedian and Africa's Doctor of Comedy. Discover hilarious stand-up clips, upcoming shows, exclusive behind-the-scenes content, and his journey from medicine to comedy stardom.",
  metadataBase: new URL('https://www.hilaryokello.com'),
  openGraph: {
    title: "Dr. Hilary Okello | Uganda's Top Stand-Up Comedian",
    description: "Discover hilarious stand-up clips, upcoming shows, and exclusive content from Africa's Doctor of Comedy.",
    type: 'website',
    images: [{ url: "/bg_hero_edited.webp", width: 1200, height: 630, alt: "Dr. Hilary Okello" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dr. Hilary Okello | Uganda's Top Stand-Up Comedian",
    description: "Discover hilarious stand-up clips, upcoming shows, and exclusive content from Africa's Doctor of Comedy.",
    images: ["/bg_hero_edited.webp"],
  },
};


export default function Page() {
  // Featured video - Dr. Hilary Okello's comedy
  const featuredVideo = {
    id: "1",
    title:
      "Dr. Hilary Okello: Uganda Must Laugh 2 - (FULL STAND-UP COMEDY SPECIAL)",
    duration: "1:20:10",
    youtubeId: "UP8FWmG9BbY",
    views: "94K",
    uploadedAt: "3 Weeks ago",
  };

  // Other recommended videos
  const videos = [
    {
      id: "2",
      title: "Dr  Hilary Okello - Uganda Must Laugh II (Full Show)",
      duration: "50:30",
      youtubeId: "Q4M4WYh43dw",
      views: "26K",
      uploadedAt: "5 Months ago",
    },
    {
      id: "3",
      title:
        "Comedian Dr Hilary Okello's amazing performance leaves audience in stitches",
      duration: "22:15",
      youtubeId: "uKznySp_XbE",
      views: "28K",
      uploadedAt: "1 month ago",
    },
    {
      id: "4",
      title:
        "Uganda Fire Brigade are never in a hurry - Comedian Hilary Okello",
      duration: "10:35",
      youtubeId: "CT0VkRUdrtk",
      views: "14K",
      uploadedAt: "7 years ago",
    },
  ];

  const images = [
    { url: "/Rwanda/SHEMA INNOCENT 0780 329 329_128_4_11zon.jpg", caption: "Event Photo 1284" },
    { url: "/Rwanda/SHEMA INNOCENT 0780 329 329_130_6_11zon.jpg", caption: "Crowd" },
    { url: "/Rwanda/SHEMA INNOCENT 0780 329 329_157_13_11zon.jpg", caption: "Event Photo 9170" },
    { url: "/Rwanda/SHEMA INNOCENT 0780 329 329_131_7_11zon.jpg", caption: "Booking Background" },
  ];

  return (
    <main className="min-h-screen">
      {/* Full screen background */}
      <div className="min-h-screen overflow-hidden relative">
        <HeroSection />
      </div>

      <Suspense fallback={<div className="h-64 bg-black-light animate-pulse" />}>
        <UpcomingShows />
      </Suspense>
      
      <div className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4">
          <CountryGlimpse images={images} />
        </div>
      </div>
      
      {/* Video Section */}
      <div className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4">
          <VideoSection
            featuredVideo={featuredVideo}
            title="Featured Videos"
            videos={videos}
          />
        </div>
      </div>

      {/* Gallery Glimpse */}
      <div className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4">
          <ImageCarousel />
        </div>
      </div>
    </main>
  );
}

