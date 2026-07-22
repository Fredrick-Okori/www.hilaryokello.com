"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

interface ImageItem {
  url: string;
  caption: string;
}

interface ImageCarouselProps {
  images?: ImageItem[];
  botswana?: ImageItem[];
}

const defaultBotswana: ImageItem[] = [
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
  { url: "/Botswana/DSC_9082 2_16_11zon.webp", caption: "Botswana 18" },
];

/**
 * GSAP Horizontal Loop Helper
 * Wraps elements seamlessly in a continuous infinite loop
 */
function horizontalLoop(items: HTMLElement[], config: any = {}) {
  items = gsap.utils.toArray(items);
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onUpdate: () => {
        updateDepthFocus();
      },
      onReverseComplete: () => {
        tl.totalTime(tl.rawTime() + tl.duration() * 100);
      },
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times: number[] = [],
    widths: number[] = [],
    xPercents: number[] = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1),
    totalWidth: number,
    curX: number,
    distanceToStart: number,
    distanceToLoop: number,
    item: HTMLElement,
    i: number;

  gsap.set(items, {
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
          (gsap.getProperty(el, "xPercent") as number)
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });

  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      (gsap.getProperty(items[length - 1], "scaleX") as number) +
    (parseFloat(config.paddingRight) || 0);

  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);

    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration: (totalWidth - distanceToLoop) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);

    times[i] = distanceToStart / pixelsPerSecond;
  }

  // Active Center Scale Logic
  function updateDepthFocus() {
    if (!items.length) return;
    const parent = items[0].parentElement;
    if (!parent) return;

    const parentBounds = parent.getBoundingClientRect();
    const parentCenter = parentBounds.left + parentBounds.width / 2;

    items.forEach((card) => {
      const cardBounds = card.getBoundingClientRect();
      const cardCenter = cardBounds.left + cardBounds.width / 2;
      const distanceFromCenter = Math.abs(parentCenter - cardCenter);
      const maxDistance = parentBounds.width / 2;
      const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);

      const isActive = distanceFromCenter < cardBounds.width / 2;

      const scale = isActive ? 1.08 : 0.92 - normalizedDistance * 0.05;
      const opacity = isActive ? 1 : 0.5 - normalizedDistance * 0.15;
      const zIndex = isActive ? 50 : Math.round(10 - normalizedDistance * 10);
      const yTranslate = isActive ? -6 : 4;

      gsap.to(card, {
        scale: scale,
        opacity: opacity,
        zIndex: zIndex,
        y: yTranslate,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }

  function toIndex(index: number, vars: any = {}) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
      (index += index < curIndex ? length : -length);
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];

    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }

  tl.next = (vars: any) => toIndex(curIndex + 1, vars);
  tl.previous = (vars: any) => toIndex(curIndex - 1, vars);
  tl.toIndex = (index: number, vars: any) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true);

  if (config.draggable && typeof Draggable === "function") {
    let proxy = document.createElement("div"),
      wrap = gsap.utils.wrap(0, 1),
      ratio: number,
      startProgress: number,
      draggable: any;

    draggable = Draggable.create(proxy, {
      trigger: config.dragTrigger || items[0].parentNode,
      type: "x",
      inertia: true,
      onPress() {
        startProgress = tl.progress();
        tl.pause();
        ratio = 1 / totalWidth;
      },
      onDrag() {
        tl.progress(wrap(startProgress + (this.startX - this.x) * ratio));
      },
      onThrowUpdate() {
        tl.progress(wrap(startProgress + (this.startX - this.x) * ratio));
      },
    })[0];
  }

  updateDepthFocus();
  return tl;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, botswana }) => {
  const imgs = images ?? botswana ?? defaultBotswana;
  const containerRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".carousel-card");

      loopRef.current = horizontalLoop(cards, {
        paused: true,
        draggable: true,
        speed: 1,
        snap: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, imgs]);

  const handleNext = () => {
    if (loopRef.current) {
      loopRef.current.next({ duration: 0.6, ease: "power2.out" });
    }
  };

  const handlePrev = () => {
    if (loopRef.current) {
      loopRef.current.previous({ duration: 0.6, ease: "power2.out" });
    }
  };

  return (
    <div className="w-full">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h4 className="text-left text-3xl md:text-4xl text-white font-bold tracking-tight">
            Gaborone - Botswana
          </h4>
          <Button
            className="rounded-full text-white border-white/20 hover:bg-white/10 px-5 py-2 mt-3 font-medium text-sm"
            variant="bordered"
          >
            <Link href="/gallery">More from Botswana</Link>
          </Button>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center space-x-2 self-end md:self-auto z-20">
          <Button
            aria-label="Previous slide"
            className="text-white border-white/20 rounded-full hover:bg-white/10 active:scale-95 transition-transform"
            disabled={isLoading}
            size="sm"
            variant="bordered"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            aria-label="Next slide"
            className="text-white border-white/20 rounded-full hover:bg-white/10 active:scale-95 transition-transform"
            disabled={isLoading}
            size="sm"
            variant="bordered"
            onClick={handleNext}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* GSAP Infinite Slider Viewport */}
      <div className="relative w-full overflow-hidden py-14 md:py-20 cursor-grab active:cursor-grabbing select-none">
        <div ref={containerRef} className="flex gap-4 sm:gap-6 items-center">
          {imgs.map((image, index) => (
            <div
              key={index}
              /* Increased Mobile Size: w-[80vw] & h-[400px] */
              className="carousel-card flex-shrink-0 w-[80vw] sm:w-[35vw] lg:w-[22vw] relative h-[400px] sm:h-[420px] transform-gpu"
            >
              {isLoading ? (
                <Skeleton className="w-full h-full bg-default-200/20 rounded-3xl" />
              ) : (
                <div className="group relative w-full h-full overflow-hidden rounded-3xl bg-zinc-900 shadow-xl border border-white/10">
                  <Image
                    fill
                    alt={`Carousel Image ${index + 1}`}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={index < 3}
                    quality={80}
                    src={encodeURI(image.url || "/placeholder.svg")}
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 35vw, 22vw"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;