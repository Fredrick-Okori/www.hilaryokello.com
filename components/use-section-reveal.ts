"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useSectionReveal(
  sectionRef: RefObject<HTMLElement>,
  refreshKey?: string | number | boolean,
) {
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray<HTMLElement>(
        "[data-scroll-reveal-item]",
        section,
      );
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
      });

      timeline.fromTo(
        section,
        { y: -18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.65, ease: "power4.out" },
      );

      if (items.length > 0) {
        timeline.fromTo(
          items,
          { y: 28, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            stagger: 0.075,
            ease: "power3.out",
          },
          "-=0.3",
        );
      }
    });

    return () => media.revert();
  }, [sectionRef, refreshKey]);
}
