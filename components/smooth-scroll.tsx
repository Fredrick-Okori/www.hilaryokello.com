"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "lenis/dist/lenis.css";

// Smooth (eased) scrolling for the public site, driven by GSAP's ticker so
// ScrollTrigger animations stay in step with it. Touch scrolling stays
// native; visitors who prefer reduced motion get normal scrolling.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.1,
      // The chat widget and anything marked data-lenis-prevent scroll on
      // their own.
      prevent: (node) =>
        node.nodeName === "CHAT-WIDGET" ||
        node.hasAttribute?.("data-lenis-prevent"),
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // The mobile menu and the gallery lightbox lock the page with
    // body { overflow: hidden }; pause smooth scrolling while they do. A
    // section link tapped inside the mobile menu scrolls once it unlocks.
    let pending: HTMLElement | null = null;
    const syncLock = () => {
      if (document.body.style.overflow === "hidden") {
        lenis.stop();

        return;
      }
      lenis.start();
      if (pending) {
        lenis.scrollTo(pending);
        pending = null;
      }
    };
    const observer = new MutationObserver(syncLock);

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });
    syncLock();

    // Same-page section links (e.g. "/#shows" on the home page) glide to
    // the section instead of jumping. Runs before Next's <Link> handler,
    // which then skips its own navigation.
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = (event.target as Element | null)?.closest?.("a[href]");

      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank")
        return;
      const url = new URL(link.href);

      if (
        url.origin !== location.origin ||
        url.pathname !== location.pathname ||
        !url.hash
      )
        return;
      const target = document.getElementById(
        decodeURIComponent(url.hash.slice(1)),
      );

      if (!target) return;
      event.preventDefault();
      history.pushState(null, "", url.hash);
      if (lenis.isStopped) pending = target;
      else lenis.scrollTo(target);
    };

    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      observer.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
