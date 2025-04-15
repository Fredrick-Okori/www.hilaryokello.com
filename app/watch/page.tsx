
import React from 'react'



import { VideoSection } from '@/components/videos';

  // Featured video - Dr. Hilary Okello's comedy
  const featuredVideo = {
    id: "1",
    title:
      "Dr Hilary Okello funniest joke about Government Ministers in Traffic Jam.",
    duration: "08:04", // Estimated based on similar videos
    youtubeId: "uKznySp_XbE",
    views: "23K",
    uploadedAt: "10 days ago",
  };

  // Other recommended videos
  const videos = [
    {
      id: "2",
      title: "Comedian Hilary Okello jokes about how journalists cover stories",
      duration: "15:42",
      youtubeId: "yQMes8rjKrs", // Placeholder ID
      views: "15K",
      uploadedAt: "2 weeks ago",
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
    {
      id: "5",
      title:
        "Ugandan Comedian thrills Rwanda with his hilarious, electrifying Comedy performance!",
      duration: "19:30",
      youtubeId: "ZrCm1CfKqoo", // Placeholder ID
      views: "540K",
      uploadedAt: "6 months ago",
    },
  ];

export default function Page() {

    return(
        <>

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
        </>
    )
}
