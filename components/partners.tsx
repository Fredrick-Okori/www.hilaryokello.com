"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@heroui/button";
import Link from "next/link";

// Partner data with logos and website URLs
interface Partner {
  logo: string;
  fallback: string;
  website: string;
  name: string;
}

const partners: Partner[] = [
  {
    logo: "/partners/logo.webp",
    fallback: "/partners/logo.webp",
    website: "https://www.kayetickets.com", // Replace with actual website
    name: "Kayetickets",
  },
  {
    logo: "/partners/jico.png",
    fallback: "/partners/jico.png",
    website: "https://x.com/JicoLeague", // Replace with actual website
    name: "JICO",
  },
  {
    logo: "/partners/laughing_maraboustork.webp",
    fallback: "/partners/laughing_maraboustork.webp",
    website: "https://laughingmaraboustork.com/", // Replace with actual website
    name: "Laughing MarabouStork Comedy Club",
  },
  {
    logo: "/partners/logo.webp",
    fallback: "/partners/logo.webp",
    website: "https://www.kayetickets.com", // Replace with actual website
    name: "Kayetickets",
  },
  {
    logo: "/partners/logo-top.webp",
    fallback: "/partners/logo-top.png",
    website: "https://www.roketelkom.co.ug/", // Replace with actual website
    name: "Roketelcom",
  },
  {
    logo: "/partners/uganda_comedians_association.webp",
    fallback: "/partners/uganda_comedians_association.jpg",
    website: "https://www.ugandacomedians.com", // Replace with actual website
    name: "Uganda Comedians Association",
  },
  {
    logo: "/partners/logo.webp",
    fallback: "/partners/logo.webp",
    website: "https://www.kayetickets.com", // Replace with actual website
    name: "Kayetickets",
  },
];

// Simple debounce implementation
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): T & { cancel: () => void } {
  let timeout: NodeJS.Timeout | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };

  debounced.cancel = () => {
    if (timeout) clearTimeout(timeout);
  };

  return debounced as T & { cancel: () => void };
}

// Optimized Partner Logo component with lazy loading and hyperlinks
interface PartnerLogoProps {
  partner: Partner;
  index: number;
  isVisible: boolean;
  isPriority: boolean;
}

const PartnerLogo: React.FC<PartnerLogoProps> = ({
  partner,
  index,
  isVisible,
  isPriority,
}) => {
  const [imageSrc, setImageSrc] = useState(partner.logo);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Link
      aria-label={`Visit ${partner.name} website`}
      className="relative h-16 sm:h-20 md:h-24 lg:h-28 w-full mx-2 sm:mx-4 md:mx-6 block group"
      href={partner.website}
      rel="noopener noreferrer"
      target="_blank"
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}
      <div className="relative h-full w-full transform transition-transform duration-300 group-hover:scale-110">
        <Image
          fill
          alt={`${partner.name} Logo`}
          className={`object-contain transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } group-hover:opacity-80`}
          loading={isPriority ? "eager" : "lazy"}
          placeholder="empty"
          priority={isPriority}
          quality={75}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          src={imageSrc}
          onError={() => setImageSrc(partner.fallback)}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </Link>
  );
};

export default function Partners() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const autoScrollRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const autoScrollInterval = 3000;

  // Memoized calculations
  const maxSlideIndex = useMemo(
    () => Math.max(0, Math.ceil(partners.length / itemsPerView) - 1),
    [itemsPerView],
  );

  const currentVisibleLogos = useMemo(() => {
    const start = slideIndex * itemsPerView;
    const end = Math.min(start + itemsPerView, partners.length);

    return { start, end };
  }, [slideIndex, itemsPerView]);

  // Detect WebP support
  const [supportsWebP, setSupportsWebP] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    // Check WebP support
    const checkWebPSupport = async () => {
      const webpData =
        "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
      const img = new window.Image();

      img.onload = () => setSupportsWebP(true);
      img.onerror = () => setSupportsWebP(false);
      img.src = webpData;
    };

    checkWebPSupport();
  }, []);

  // Optimized resize handler with debouncing
  useEffect(() => {
    const handleResize = debounce(() => {
      const width = window.innerWidth;

      setItemsPerView(width < 640 ? 1 : width < 768 ? 2 : 3);
    }, 250);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      handleResize.cancel();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Optimized auto-scrolling with requestAnimationFrame
  useEffect(() => {
    if (!isAutoScrolling || !isMounted) return;

    const animate = (currentTime: number) => {
      if (currentTime - lastTimeRef.current >= autoScrollInterval) {
        setSlideIndex((prev) => {
          const next = prev + 1;

          return next > maxSlideIndex ? 0 : next;
        });
        lastTimeRef.current = currentTime;
      }
      autoScrollRef.current = requestAnimationFrame(animate);
    };

    autoScrollRef.current = requestAnimationFrame(animate);

    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling, maxSlideIndex, isMounted]);

  // Preload next images
  useEffect(() => {
    if (!isMounted) return;

    const nextIndex = (slideIndex + 1) % (maxSlideIndex + 1);
    const startIdx = nextIndex * itemsPerView;
    const endIdx = Math.min(startIdx + itemsPerView, partners.length);

    // Preload next set of images
    for (let i = startIdx; i < endIdx; i++) {
      if (partners[i]) {
        const img = new window.Image();

        img.src = supportsWebP ? partners[i].logo : partners[i].fallback;
      }
    }
  }, [slideIndex, itemsPerView, maxSlideIndex, supportsWebP, isMounted]);

  // Memoized event handlers
  const handleNext = useCallback(() => {
    setIsAutoScrolling(false);
    setSlideIndex((prevIndex) => {
      const next = prevIndex + 1;

      return next > maxSlideIndex ? 0 : next;
    });
    // Resume auto-scroll after manual navigation
    setTimeout(() => setIsAutoScrolling(true), 5000);
  }, [maxSlideIndex]);

  const handlePrev = useCallback(() => {
    setIsAutoScrolling(false);
    setSlideIndex((prevIndex) => {
      const prev = prevIndex - 1;

      return prev < 0 ? maxSlideIndex : prev;
    });
    // Resume auto-scroll after manual navigation
    setTimeout(() => setIsAutoScrolling(true), 5000);
  }, [maxSlideIndex]);

  const pauseAutoScroll = useCallback(() => setIsAutoScrolling(false), []);
  const resumeAutoScroll = useCallback(() => setIsAutoScrolling(true), []);

  const handleDotClick = useCallback((index: number) => {
    setIsAutoScrolling(false);
    setSlideIndex(index);
    // Resume auto-scroll after manual navigation
    setTimeout(() => setIsAutoScrolling(true), 5000);
  }, []);

  // Touch handling for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      pauseAutoScroll();
    },
    [pauseAutoScroll],
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      touchEndX.current = e.changedTouches[0].clientX;

      if (touchStartX.current !== null && touchEndX.current !== null) {
        const diff = touchStartX.current - touchEndX.current;

        if (Math.abs(diff) > 50) {
          // Minimum swipe distance
          if (diff > 0) {
            handleNext();
          } else {
            handlePrev();
          }
        }
      }

      setTimeout(() => resumeAutoScroll(), 5000);
    },
    [handleNext, handlePrev, resumeAutoScroll],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  if (!isMounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-32 bg-gray-200 animate-pulse rounded-lg" />
      </div>
    );
  }

  // Use WebP if supported, otherwise use fallback
  const currentPartners = supportsWebP
    ? partners
    : partners.map((p) => ({ ...p, logo: p.fallback }));

  return (
    <section
      aria-label="Our Partners"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <h2 className="text-left text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-6 md:mb-8">
        Our Partners
      </h2>

      <div
        aria-label={`Partner carousel, showing ${itemsPerView} partners at a time`}
        aria-live="polite"
        className="relative w-full overflow-hidden rounded-lg"
        onMouseEnter={pauseAutoScroll}
        onMouseLeave={resumeAutoScroll}
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
      >
        <div ref={carouselRef} className="relative">
          <div
            className="flex transition-transform duration-500 ease-out will-change-transform"
            style={{
              transform: `translateX(-${slideIndex * 100}%)`,
              WebkitTransform: `translateX(-${slideIndex * 100}%)`, // iOS Safari support
            }}
          >
            {Array.from({
              length: Math.ceil(currentPartners.length / itemsPerView),
            }).map((_, groupIndex) => (
              <div key={groupIndex} className="flex flex-shrink-0 w-full">
                {currentPartners
                  .slice(
                    groupIndex * itemsPerView,
                    (groupIndex + 1) * itemsPerView,
                  )
                  .map((partner, indexInGroup) => {
                    const globalIndex =
                      groupIndex * itemsPerView + indexInGroup;
                    const isVisible = groupIndex === slideIndex;
                    const isPriority =
                      groupIndex === 0 && indexInGroup < itemsPerView;

                    return (
                      <div
                        key={`${partner.name}-${globalIndex}`}
                        className="flex items-center justify-center"
                        style={{ width: `${90 / itemsPerView}%` }}
                      >
                        <PartnerLogo
                          index={globalIndex}
                          isPriority={isPriority}
                          isVisible={isVisible}
                          partner={partner}
                        />
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <nav
        aria-label="Carousel navigation"
        className="flex justify-center mt-6 space-x-4"
      >
        <Button
          aria-label="Previous partners"
          className="rounded-full text-white hover:bg-white hover:text-gray-800 transition-all duration-200 transform hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          size="sm"
          variant="bordered"
          onClick={handlePrev}
        >
          <FaArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>

        <div className="flex items-center space-x-2" role="tablist">
          {Array.from({ length: maxSlideIndex + 1 }).map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1} of ${maxSlideIndex + 1}`}
              aria-selected={index === slideIndex}
              className={`transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
                index === slideIndex
                  ? "bg-white w-8 h-2"
                  : "bg-gray-500 hover:bg-gray-400 w-2 h-2"
              }`}
              role="tab"
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>

        <Button
          aria-label="Next partners"
          className="rounded-full text-white hover:bg-white hover:text-gray-800 transition-all duration-200 transform hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          size="sm"
          variant="bordered"
          onClick={handleNext}
        >
          <FaArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </nav>
    </section>
  );
}
