'use client'
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@heroui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const ImageCarousel = ({ images }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const carouselRef = useRef(null);
  const slideWidthRef = useRef(0);
  const itemsPerView = 2; // Number of images per view

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current && carouselRef.current.children[0]) {
        slideWidthRef.current = carouselRef.current.children[0].offsetWidth;
        carouselRef.current.style.transform = `translateX(-${slideIndex * slideWidthRef.current * itemsPerView}px)`;
      }
    };

    handleResize(); // Initial setup

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [slideIndex, itemsPerView]);

  const handleNext = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % Math.ceil(images.length / itemsPerView));
  };

  const handlePrev = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + Math.ceil(images.length / itemsPerView)) % Math.ceil(images.length / itemsPerView));
  };

  const imageDimension = 500; // Fixed dimension for images



  return (
    <>
      <div>
        <h4 className='text-left text-4xl text-white font-bold'> From the Lenses</h4>
        <Button variant='bordered'
     
        as={Link}
        href="/gallery"
        className='rounded-full text-white px-4 py-2 mt-4'> More Pictures</Button>
      </div>
      <div className="top-0 right-0 flex py-10 justify-end space-x-2 z-10">
        <Button
          variant='bordered'
          onClick={handlePrev}
          className="text-white rounded-full"
          size='md'
        >
          <ChevronLeft />
        </Button>
        <Button
          variant='bordered'
          onClick={handleNext}
          className="text-white rounded-full"
          size='md'
        >
          <ChevronRight />
        </Button>
      </div>
      <div className="relative w-full overflow-hidden">
        <div
          ref={carouselRef}
          className="whitespace-nowrap transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${slideIndex * (slideWidthRef.current || 0) * itemsPerView}px)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="inline-block w-1/3">
              <Image 
                src={image} 
                alt={`Carousel Image ${index + 1}`} 
                width={imageDimension} 
                height={imageDimension} 
                objectFit='cover'
                className="w-[500px] rounded-2xl p-2 h-[500px] object-cover" 
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageCarousel;
