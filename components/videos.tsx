"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import ReactPlayer from "react-player/youtube";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

interface Video {
  id: string;
  title: string;
  duration: string;
  youtubeId: string;
  views: string;
  uploadedAt: string;
}

// Row shape returned from Supabase (published via the admin Videos tab)
type DbVideo = {
  id: string;
  title: string;
  youtube_id: string;
  duration: string;
  views: string;
  is_featured: boolean;
  created_at: string;
};

function formatRelativeTime(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);

  if (days < 1) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;

  const months = Math.floor(days / 30);

  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

  const years = Math.floor(months / 12);

  return `${years} year${years > 1 ? "s" : ""} ago`;
}

function dbVideoToVideo(v: DbVideo): Video {
  return {
    id: v.id,
    title: v.title,
    duration: v.duration,
    youtubeId: v.youtube_id,
    views: v.views,
    uploadedAt: formatRelativeTime(v.created_at),
  };
}

// Poster shown for every video.
const DEFAULT_THUMBNAIL = "/news-thumbnail-youtube-1020x620-c-default.jpg";

function YouTubeThumbnail({
  alt,
  className,
  sizes,
  priority,
}: {
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <Image
      fill
      alt={alt}
      className={className}
      priority={priority}
      sizes={sizes}
      src={DEFAULT_THUMBNAIL}
    />
  );
}

interface VideoSectionProps {
  title: string;
  className?: string;
}

export function VideoSection({ title, className }: VideoSectionProps) {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const userSelectedRef = useRef(false);

  useEffect(() => {
    supabase
      .from("videos")
      .select("*")
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false })
      .then(
        ({ data }) => {
          const mapped = ((data ?? []) as DbVideo[]).map(dbVideoToVideo);

          setVideos(mapped);
          if (!userSelectedRef.current && mapped.length > 0) {
            setActiveVideo(mapped[0]);
          }
        },
        () => setVideos([]),
      );
  }, []);

  // Function to select a video
  const selectVideo = (video: Video) => {
    userSelectedRef.current = true;
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

        {videos === null ? (
          <div
            aria-label="Loading videos"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 animate-pulse"
            role="status"
          >
            <div className="lg:col-span-2 aspect-video rounded-lg sm:rounded-xl bg-white/5" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 rounded-lg bg-white/5" />
              ))}
            </div>
          </div>
        ) : videos.length === 0 || !activeVideo ? (
          <div
            className="text-center text-white/60 bg-white/5 border border-white/10 rounded-xl p-10"
            role="status"
          >
            No videos published yet. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Featured Video */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              <div
                aria-label="Featured video player"
                className="relative aspect-video overflow-hidden rounded-lg sm:rounded-xl bg-black"
                role="region"
              >
                {isPlaying ? (
                  <ReactPlayer
                    controls
                    playing
                    aria-label={`Playing video: ${activeVideo.title}`}
                    className="absolute top-0 left-0"
                    height="100%"
                    url={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                    width="100%"
                  />
                ) : (
                  <div
                    aria-label={`Play video: ${activeVideo.title}`}
                    className="relative w-full h-full cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onClick={playVideo}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        playVideo();
                      }
                    }}
                  >
                    <YouTubeThumbnail
                      priority
                      alt={`Video thumbnail for: ${activeVideo.title}`}
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        aria-label={`Play video: ${activeVideo.title}`}
                        className="bg-gold hover:bg-gold-light text-black rounded-full p-4 transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black"
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
              <h3 className="font-medium text-white text-base sm:text-lg">
                Up Next
              </h3>
              {videos
                .filter((video) => video.id !== activeVideo.id)
                .slice(0, 4)
                .map((video) => (
                  <div
                    key={video.id}
                    aria-label={`Select video: ${video.title}`}
                    className={cn(
                      "flex gap-4 cursor-pointer p-2 rounded-lg transition-colors",
                      "hover:bg-muted focus-within:ring-2 focus-within:ring-gold focus-within:ring-offset-2 focus-within:ring-offset-black",
                    )}
                    role="button"
                    tabIndex={0}
                    onClick={() => selectVideo(video)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        selectVideo(video);
                      }
                    }}
                  >
                    <div className="relative flex-shrink-0 w-40 h-24 overflow-hidden rounded-lg bg-muted">
                      <YouTubeThumbnail
                        alt={`Thumbnail for: ${video.title}`}
                        className="object-cover"
                        sizes="160px"
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
        )}
      </div>
    </section>
  );
}
