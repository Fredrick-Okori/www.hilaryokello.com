"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import ReactPlayer from "react-player/youtube";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface Video {
  id: string;
  title: string;
  duration: string;
  youtubeId: string;
  views: string;
  uploadedAt: string;
}

interface VideoSectionProps {
  title: string;
  featuredVideo: Video;
  videos: Video[];
  className?: string;
}

export function VideoSection({
  title,
  featuredVideo,
  videos,
  className,
}: VideoSectionProps) {
  const [activeVideo, setActiveVideo] = useState<Video>(featuredVideo);
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to get YouTube thumbnail URL
  const getYouTubeThumbnail = (youtubeId: string) => {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  };

  // Function to select a video
  const selectVideo = (video: Video) => {
    setActiveVideo(video);
    setIsPlaying(false);
  };

  // Function to play the current video
  const playVideo = () => {
    setIsPlaying(true);
  };

  return (
    <section className={cn("py-8 sm:py-12", className)} id="clips">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6 sm:mb-8 leading-tight">
          {title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Featured Video */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-lg sm:rounded-xl bg-black" role="region" aria-label="Featured video player">
              {isPlaying ? (
                <ReactPlayer
                  controls
                  playing
                  className="absolute top-0 left-0"
                  height="100%"
                  url={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                  width="100%"
                  aria-label={`Playing video: ${activeVideo.title}`}
                />
              ) : (
                <div
                  className="relative w-full h-full cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={playVideo}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      playVideo();
                    }
                  }}
                  aria-label={`Play video: ${activeVideo.title}`}
                >
                  <Image
                    alt={`Video thumbnail for: ${activeVideo.title}`}
                    className="object-cover"
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                    src={
                      getYouTubeThumbnail(activeVideo.youtubeId) ||
                      "/placeholder.svg"
                    }
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      className="bg-gold hover:bg-gold-light text-black rounded-full p-4 transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black"
                      aria-label={`Play video: ${activeVideo.title}`}
                    >
                      <Play className="h-8 w-8 fill-current" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 text-white right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {activeVideo.duration}
                  </div>
                </div>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              {activeVideo.title}
            </h3>
            <div className="flex items-center text-xs sm:text-sm text-white/70">
              <span>{activeVideo.views} views</span>
              <span className="mx-2">•</span>
              <span>{activeVideo.uploadedAt}</span>
            </div>
          </div>

          {/* Video Grid */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="font-medium text-white text-base sm:text-lg">Up Next</h3>
            {[...videos, featuredVideo]
              .filter((video) => video.id !== activeVideo.id)
              .slice(0, 4)
              .map((video) => (
                <div
                  key={video.id}
                  className={cn(
                    "flex gap-4 cursor-pointer p-2 rounded-lg transition-colors",
                    "hover:bg-muted focus-within:ring-2 focus-within:ring-gold focus-within:ring-offset-2 focus-within:ring-offset-black",
                  )}
                  role="button"
                  tabIndex={0}
                  onClick={() => selectVideo(video)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      selectVideo(video);
                    }
                  }}
                  aria-label={`Select video: ${video.title}`}
                >
                  <div className="relative flex-shrink-0 w-40 h-24 overflow-hidden rounded-lg bg-muted">
                    <Image
                      alt={`Thumbnail for: ${video.title}`}
                      className="object-cover"
                      fill
                      sizes="160px"
                      src={
                        getYouTubeThumbnail(video.youtubeId) ||
                        "/placeholder.svg"
                      }
                    />
                    <div className="absolute text-white bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium text-white line-clamp-2">
                      {video.title}
                    </h4>
                    <div className="flex text-white/70 items-center text-xs">
                      <span>{video.views} views</span>
                      <span className="mx-1">•</span>
                      <span>{video.uploadedAt}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
