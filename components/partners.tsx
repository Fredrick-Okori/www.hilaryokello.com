'use client'
import React, { useState, useEffect, useRef } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';

export default function Partners() {
    const [slideIndex, setSlideIndex] = useState(0);
    const carouselRef = useRef(null);
    const slideWidthRef = useRef(0);
    const itemsPerView = 3; // Number of partner logos per view
    const autoScrollInterval = 3000; // Interval for auto-scrolling in milliseconds

    useEffect(() => {
        const handleResize = () => {
            if (carouselRef.current && carouselRef.current.children[0]) {
                slideWidthRef.current = carouselRef.current.children[0].offsetWidth;
                carouselRef.current.style.transform = `translateX(-${slideIndex * slideWidthRef.current * itemsPerView}px)`;
            }
        };

        handleResize(); // Initial setup

        window.addEventListener('resize', handleResize);

        // Auto-scrolling functionality
        const interval = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % Math.ceil(partnerLogos.length / itemsPerView));
        }, autoScrollInterval);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(interval);
        };
    }, [slideIndex]);

    const handleNext = () => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % Math.ceil(partnerLogos.length / itemsPerView));
    };

    const handlePrev = () => {
        setSlideIndex((prevIndex) => (prevIndex - 1 + Math.ceil(partnerLogos.length / itemsPerView)) % Math.ceil(partnerLogos.length / itemsPerView));
    };

    // Example partner logos
    const partnerLogos = [
        '/partners/ciu-logo.png',
        '/partners/images.jpeg',
        '/partners/jico_league.jpg',
        '/partners/kbadge.jpg',
        '/partners/laughing_maraboustork.webp',
        '/partners/logo-top.png',
        '/partners/uganda_comedians_association.jpg'
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h4 className='text-left text-3xl sm:text-4xl text-white font-bold mb-4'>
                Our Partners
            </h4>
            <div className="relative w-full overflow-hidden">
                <div
                    ref={carouselRef}
                    className="whitespace-nowrap transition-transform duration-500 ease-in-out flex"
                    style={{ transform: `translateX(-${slideIndex * (slideWidthRef.current || 0) * itemsPerView}px)` }}
                >
                    {partnerLogos.map((logo, index) => (
                        <div key={index} className="inline-block w-1/3 p-4">
                            <Image 
                                src={logo} 
                                alt={`Partner Logo ${index + 1}`}
                                width={150} 
                                height={100} 
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-4 space-x-4">
                <Button 
                    variant='bordered' 
                    className='rounded-full text-white px-2 py-2' 
                    onClick={handlePrev}
                >
                    <FaArrowLeft size={24} />
                </Button>
                <Button 
                    variant='bordered' 
                    className='rounded-full text-white px-2 py-2' 
                    onClick={handleNext}
                >
                    <FaArrowRight size={24} />
                </Button>
            </div>
        </div>
    );
}

// Example Button component if not already defined
const Button = ({ variant, className, onClick, children }) => {
    return (
        <button 
            className={`border ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
