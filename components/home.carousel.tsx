"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronLeft } from "lucide-react"

import { Button } from "@heroui/button"
import { Skeleton } from "@heroui/react" // Import the Skeleton component

// Define the type for a single image item
interface ImageItem {
  url: string
  caption: string
}

// Define the local data array
const botswana: ImageItem[] = [
  { url: "/Botswana/DSC_8883 2_1_11zon.webp", caption: "Botswana 1" },
  { url: "/Botswana/DSC_8941 2_2_11zon.webp", caption: "Botswana 2" },
  { url: "/Botswana/DSC_8991 2_4_11zon.webp", caption: "Botswana 4" },
  { url: "/Botswana/DSC_9023 2_5_11zon.webp", caption: "Botswana 5" },
  { url: "/Botswana/DSC_9042 2_6_11zon.webp", caption: "Botswana 6" },
  { url: "/Botswana/DSC_9047 2_7_11zon.webp", caption: "Botswana 7" },
  { url: "/Botswana/DSC_9052 2_9_11zon.webp", caption: "Botswana 9" },
  { url: "/Botswana/DSC_9053 2_10_11zon.webp", caption: "Botswana 10" },
  { url: "/Botswana/DSC_9055 2_11_11zon.webp", caption: "Botswana 11" },
  { url: "/Botswana/DSC_9066 2_14_11zon.webp", caption: "Botswana 14" },
  { url: "/Botswana/DSC_9072 2_15_11zon.webp", caption: "Botswana 15" },
  { url: "/Botswana/DSC_9082 2_16_11zon.webp", caption: "Botswana 16" },
  { url: "/Botswana/DSC_9098 2_18_11zon.webp", caption: "Botswana 18" },
]

// The component no longer accepts any props
const ImageCarousel: React.FC = () => {
  // Use the local 'botswana' array directly
  const imgs = botswana
  const [slideIndex, setSlideIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const slideWidthRef = useRef<number>(0)
  const [itemsPerView, setItemsPerView] = useState(3) // Default for large screens
  const [isLoading, setIsLoading] = useState(true) // State to track loading status

  // Dynamically adjust items per view based on screen width
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth

      if (width < 768) {
        setItemsPerView(1)
      } else if (width < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    updateItemsPerView()
    window.addEventListener("resize", updateItemsPerView)

    return () => window.removeEventListener("resize", updateItemsPerView)
  }, [])

  // Update carousel position on index or resize
  useEffect(() => {
    // Only calculate width and apply transform if images are loaded and refs exist
    if (carouselRef.current && carouselRef.current.children.length > 0) {
      // Calculate the width of a single *item* within the current view setting.
      const containerWidth = carouselRef.current.offsetWidth
      slideWidthRef.current = containerWidth / itemsPerView

      // Calculate the correct transform based on the total width the slide needs to move
      // which is the `slideIndex` multiplied by the width of *one full slide group*.
      const slideGroupWidth = slideWidthRef.current * itemsPerView

      carouselRef.current.style.transform = `translateX(-${slideIndex * slideGroupWidth}px)`
    }
  }, [slideIndex, itemsPerView])

  // Simulate image loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // 1.5 second delay to simulate loading

    return () => clearTimeout(timer)
  }, [])

  // Calculate the total number of viewable slides (groups of images)
  const totalSlides = Math.ceil(imgs.length / itemsPerView)

  const handleNext = () => {
    setSlideIndex((prev) => (prev + 1) % totalSlides)
  }

  const handlePrev = () => {
    setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <>
      {/* Title and Button Section */}
      <div>
        <h4 className="text-left text-4xl text-white font-bold">Gaborone - Botswana</h4>
        <Button className="rounded-full text-white px-4 py-2 mt-4" variant="bordered">
          <Link href="/gallery">More from Botswana</Link>
        </Button>
      </div>

      {/* Navigation Buttons */}
      <div className="top-0 right-0 flex py-10 justify-end space-x-2 z-10">
        <Button
          className="text-white rounded-full"
          size="sm"
          variant="bordered"
          onClick={handlePrev}
          disabled={isLoading || imgs.length <= itemsPerView}
        >
          <ChevronLeft />
        </Button>
        <Button
          className="text-white rounded-full"
          size="sm"
          variant="bordered"
          onClick={handleNext}
          disabled={isLoading || imgs.length <= itemsPerView}
        >
          <ChevronRight />
        </Button>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            // This is handled by the useEffect for responsiveness, but kept for initial render fallback
            transform: `translateX(0px)`,
          }}
        >
          {imgs && imgs.length > 0 ? (
            // Map through the local 'botswana' array
            imgs.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 p-2"
                // Dynamically set width based on itemsPerView state
                style={{
                  width: `${100 / itemsPerView}%`,
                }}
              >
                <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96">
                  {isLoading ? (
                    <Skeleton className="w-full h-full rounded-2xl" />
                  ) : (
                    <>
                      <Image
                        fill
                        alt={`Carousel Image ${index + 1}: ${image.caption}`}
                        className="rounded-2xl object-cover"
                        src={encodeURI(image.url || "/placeholder.svg")}
                        // sizes are crucial for Next/Image performance
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={index < itemsPerView} // Prioritize first few images
                        quality={70}
                      />
                      {/* Dark overlay to reduce image brightness */}
                      <div className="absolute inset-0 bg-black opacity-40 rounded-2xl"></div>
                      
                    
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex-shrink-0 w-full p-2">
              <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 flex items-center justify-center bg-gray-100 rounded-2xl">
                <p>No images available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ImageCarousel