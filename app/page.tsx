import { HeroSection } from "@/components/hero-section";
import ImageCarousel from "@/components/home.carousel";
import UpcomingShows from "@/components/upcoming.show";
import { VideoSection } from "@/components/videos";
import Head from "next/head";

import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Home | Dr. Hilary Okello | Uganda's Funniest Stand-Up Comedian & Africa’s Doctor of Comedy",
  keywords:
    "Dr. Hilary Okello, Ugandan comedian, African stand-up comedy, comedy Uganda, top comedians in Africa, live comedy Uganda, comedy shows Kampala, medical comedian, funny Ugandan doctor, stand-up comedy East Africa",
  description:
    "Welcome to the official website of Dr. Hilary Okello, Uganda's top stand-up comedian and Africa's Doctor of Comedy. Discover hilarious stand-up clips, upcoming shows, exclusive behind-the-scenes content, and his journey from medicine to comedy stardom.",
};


export default function Page() {
  // Featured video - Dr. Hilary Okello's comedy
  const featuredVideo = {
    id: "1",
    title:
      "Dr. Hilary Okello: Uganda Must Laugh 2 - (FULL STAND-UP COMEDY SPECIAL)",
    duration: "1:20:10", // Estimated based on similar videos
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
      youtubeId: "Q4M4WYh43dw", // Placeholder ID
      views: "26K",
      uploadedAt: "5 Months ago",
    },
    {
      id: "3",
      title:
        "Comedian Dr Hilary Okello's amazing performance leaves audience in stitches",
      duration: "22:15",
      youtubeId: "uKznySp_XbE", // Placeholder ID
      views: "28K",
      uploadedAt: "1 month ago",
    },
    {
      id: "4",
      title:
        "Uganda Fire Brigade are never in a hurry - Comedian Hilary Okello",
      duration: "10:35",
      youtubeId: "CT0VkRUdrtk", // Placeholder ID
      views: "14K",
      uploadedAt: "7 years ago",
    },
 
  ];

  const images = [
    { url: "/gallery/bg_booking.webp", caption: "Booking Background" },
    { url: "/gallery/crowd.png", caption: "Crowd" },
    { url: "/gallerypage/DSC_9170.webp", caption: "Event Photo 9170" },
    { url: "/gallerypage/DSC_1041.webp", caption: "Event Photo 1041" },
    { url: "/gallerypage/DSC_8976.webp", caption: "Event Photo 8976" },
    { url: "/gallerypage/DSC_2148.webp", caption: "Event Photo 2148" },
    { url: "/gallerypage/DSC_8799.webp", caption: "Event Photo 8799" },
    { url: "/gallerypage/DSC_9161.webp", caption: "Event Photo 9161" },
  ];

  return (
    <>
      <Head>
        <title>Hilary Okello - Uganda&apos;s Top Comedian</title>
        <meta
          name="description"
          content="Discover Hilary Okello's upcoming shows and watch his featured comedy videos on his official website."
        />
        <meta name="keywords" content="Hilary Okello, comedy, upcoming shows, videos, performances" />
        <meta name="author" content="Hilary Okello" />
        <meta property="og:title" content="Hilary Okello - Upcoming Shows and Featured Videos" />
        <meta property="og:description" content="Discover Hilary Okello's upcoming shows and watch his featured comedy videos on his official website." />
        <meta property="og:image" content="/liveatthestork.jpeg" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hilary Okello - Upcoming Shows and Featured Videos" />
        <meta name="twitter:description" content="Discover Hilary Okello's upcoming shows and watch his featured comedy videos on his official website." />
        <meta name="twitter:image" content="/liveatthestork.jpeg" />
      </Head>
      <div className="">
        {/* Full screen background */}
        <div className="min-h-screen overflow-hidden relative">
          <HeroSection />
        </div>

        <UpcomingShows />
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
            <ImageCarousel images={images} />
          </div>
        </div>
      </div>
    </>
  );
}
