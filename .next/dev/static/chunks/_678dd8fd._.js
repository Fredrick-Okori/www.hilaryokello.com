(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/partners.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Partners
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$button$2f$dist$2f$chunk$2d$KCYYJJH4$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__button_default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/@heroui/button/dist/chunk-KCYYJJH4.mjs [app-client] (ecmascript) <export button_default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const partners = [
    {
        logo: "/partners/ciu-hor-white.webp",
        fallback: "/partners/ciu-hor-white.png",
        website: "https://www.ciu.ac.ug",
        name: "CIU"
    },
    {
        logo: "/partners/images.webp",
        fallback: "/partners/images.jpeg",
        website: "https://www.instagram.com/donelbistrolounge_ug/?hl=en",
        name: "Donel's Bistro, Ntinda"
    },
    {
        logo: "/partners/logo.webp",
        fallback: "/partners/logo.webp",
        website: "https://www.kayetickets.com",
        name: "Kayetickets"
    },
    {
        logo: "/partners/jico.png",
        fallback: "/partners/jico.png",
        website: "https://x.com/JicoLeague",
        name: "JICO"
    },
    {
        logo: "/partners/karitickets-white.webp",
        fallback: "/partners/karitickets-white.webp",
        website: "https://www.karitickets.com",
        name: "KariTickets"
    },
    {
        logo: "/partners/laughing_maraboustork.webp",
        fallback: "/partners/laughing_maraboustork.webp",
        website: "https://laughingmaraboustork.com/",
        name: "Laughing MarabouStork Comedy Club"
    },
    {
        logo: "/partners/logo.webp",
        fallback: "/partners/logo.webp",
        website: "https://www.kayetickets.com",
        name: "Kayetickets"
    },
    {
        logo: "/partners/logo-top.webp",
        fallback: "/partners/logo-top.png",
        website: "https://www.roketelkom.co.ug/",
        name: "Roketelcom"
    },
    {
        logo: "/partners/uganda_comedians_association.webp",
        fallback: "/partners/uganda_comedians_association.jpg",
        website: "https://www.ugandacomedians.com",
        name: "Uganda Comedians Association"
    },
    {
        logo: "/partners/logo.webp",
        fallback: "/partners/logo.webp",
        website: "https://www.kayetickets.com",
        name: "Kayetickets"
    }
];
// Simple debounce implementation
function debounce(func, wait) {
    let timeout = null;
    const debounced = (...args)=>{
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(()=>func(...args), wait);
    };
    debounced.cancel = ()=>{
        if (timeout) clearTimeout(timeout);
    };
    return debounced;
}
const PartnerLogo = ({ partner, index, isVisible, isPriority })=>{
    _s();
    const [imageSrc, setImageSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(partner.logo);
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: partner.website,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "relative h-16 sm:h-20 md:h-24 lg:h-28 w-full mx-2 sm:mx-4 md:mx-6 block group",
        "aria-label": `Visit ${partner.name} website`,
        children: [
            !isLoaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gray-200 animate-pulse rounded-lg"
            }, void 0, false, {
                fileName: "[project]/components/partners.tsx",
                lineNumber: 124,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-full w-full transform transition-transform duration-300 group-hover:scale-110",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    fill: true,
                    alt: `${partner.name} Logo`,
                    className: `object-contain transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"} group-hover:opacity-80`,
                    sizes: "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw",
                    src: imageSrc,
                    onError: ()=>setImageSrc(partner.fallback),
                    onLoad: ()=>setIsLoaded(true),
                    loading: isPriority ? "eager" : "lazy",
                    priority: isPriority,
                    quality: 75,
                    placeholder: "empty"
                }, void 0, false, {
                    fileName: "[project]/components/partners.tsx",
                    lineNumber: 127,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/partners.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/partners.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PartnerLogo, "HBe5y4Y8FqDQptchF2xVGWdEKv0=");
_c = PartnerLogo;
function Partners() {
    _s1();
    const [slideIndex, setSlideIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [itemsPerView, setItemsPerView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(3);
    const [isAutoScrolling, setIsAutoScrolling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isMounted, setIsMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const carouselRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const autoScrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const autoScrollInterval = 3000;
    // Memoized calculations
    const maxSlideIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Partners.useMemo[maxSlideIndex]": ()=>Math.max(0, Math.ceil(partners.length / itemsPerView) - 1)
    }["Partners.useMemo[maxSlideIndex]"], [
        itemsPerView
    ]);
    const currentVisibleLogos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Partners.useMemo[currentVisibleLogos]": ()=>{
            const start = slideIndex * itemsPerView;
            const end = Math.min(start + itemsPerView, partners.length);
            return {
                start,
                end
            };
        }
    }["Partners.useMemo[currentVisibleLogos]"], [
        slideIndex,
        itemsPerView
    ]);
    // Detect WebP support
    const [supportsWebP, setSupportsWebP] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Partners.useEffect": ()=>{
            setIsMounted(true);
            // Check WebP support
            const checkWebPSupport = {
                "Partners.useEffect.checkWebPSupport": async ()=>{
                    const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
                    const img = new window.Image();
                    img.onload = ({
                        "Partners.useEffect.checkWebPSupport": ()=>setSupportsWebP(true)
                    })["Partners.useEffect.checkWebPSupport"];
                    img.onerror = ({
                        "Partners.useEffect.checkWebPSupport": ()=>setSupportsWebP(false)
                    })["Partners.useEffect.checkWebPSupport"];
                    img.src = webpData;
                }
            }["Partners.useEffect.checkWebPSupport"];
            checkWebPSupport();
        }
    }["Partners.useEffect"], []);
    // Optimized resize handler with debouncing
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Partners.useEffect": ()=>{
            const handleResize = debounce({
                "Partners.useEffect.handleResize": ()=>{
                    const width = window.innerWidth;
                    setItemsPerView(width < 640 ? 1 : width < 768 ? 2 : 3);
                }
            }["Partners.useEffect.handleResize"], 250);
            handleResize();
            window.addEventListener("resize", handleResize);
            return ({
                "Partners.useEffect": ()=>{
                    handleResize.cancel();
                    window.removeEventListener("resize", handleResize);
                }
            })["Partners.useEffect"];
        }
    }["Partners.useEffect"], []);
    // Optimized auto-scrolling with requestAnimationFrame
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Partners.useEffect": ()=>{
            if (!isAutoScrolling || !isMounted) return;
            const animate = {
                "Partners.useEffect.animate": (currentTime)=>{
                    if (currentTime - lastTimeRef.current >= autoScrollInterval) {
                        setSlideIndex({
                            "Partners.useEffect.animate": (prev)=>{
                                const next = prev + 1;
                                return next > maxSlideIndex ? 0 : next;
                            }
                        }["Partners.useEffect.animate"]);
                        lastTimeRef.current = currentTime;
                    }
                    autoScrollRef.current = requestAnimationFrame(animate);
                }
            }["Partners.useEffect.animate"];
            autoScrollRef.current = requestAnimationFrame(animate);
            return ({
                "Partners.useEffect": ()=>{
                    if (autoScrollRef.current) {
                        cancelAnimationFrame(autoScrollRef.current);
                    }
                }
            })["Partners.useEffect"];
        }
    }["Partners.useEffect"], [
        isAutoScrolling,
        maxSlideIndex,
        isMounted
    ]);
    // Preload next images
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Partners.useEffect": ()=>{
            if (!isMounted) return;
            const nextIndex = (slideIndex + 1) % (maxSlideIndex + 1);
            const startIdx = nextIndex * itemsPerView;
            const endIdx = Math.min(startIdx + itemsPerView, partners.length);
            // Preload next set of images
            for(let i = startIdx; i < endIdx; i++){
                if (partners[i]) {
                    const img = new window.Image();
                    img.src = supportsWebP ? partners[i].logo : partners[i].fallback;
                }
            }
        }
    }["Partners.useEffect"], [
        slideIndex,
        itemsPerView,
        maxSlideIndex,
        supportsWebP,
        isMounted
    ]);
    // Memoized event handlers
    const handleNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Partners.useCallback[handleNext]": ()=>{
            setIsAutoScrolling(false);
            setSlideIndex({
                "Partners.useCallback[handleNext]": (prevIndex)=>{
                    const next = prevIndex + 1;
                    return next > maxSlideIndex ? 0 : next;
                }
            }["Partners.useCallback[handleNext]"]);
            // Resume auto-scroll after manual navigation
            setTimeout({
                "Partners.useCallback[handleNext]": ()=>setIsAutoScrolling(true)
            }["Partners.useCallback[handleNext]"], 5000);
        }
    }["Partners.useCallback[handleNext]"], [
        maxSlideIndex
    ]);
    const handlePrev = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Partners.useCallback[handlePrev]": ()=>{
            setIsAutoScrolling(false);
            setSlideIndex({
                "Partners.useCallback[handlePrev]": (prevIndex)=>{
                    const prev = prevIndex - 1;
                    return prev < 0 ? maxSlideIndex : prev;
                }
            }["Partners.useCallback[handlePrev]"]);
            // Resume auto-scroll after manual navigation
            setTimeout({
                "Partners.useCallback[handlePrev]": ()=>setIsAutoScrolling(true)
            }["Partners.useCallback[handlePrev]"], 5000);
        }
    }["Partners.useCallback[handlePrev]"], [
        maxSlideIndex
    ]);
    const pauseAutoScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Partners.useCallback[pauseAutoScroll]": ()=>setIsAutoScrolling(false)
    }["Partners.useCallback[pauseAutoScroll]"], []);
    const resumeAutoScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Partners.useCallback[resumeAutoScroll]": ()=>setIsAutoScrolling(true)
    }["Partners.useCallback[resumeAutoScroll]"], []);
    const handleDotClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Partners.useCallback[handleDotClick]": (index)=>{
            setIsAutoScrolling(false);
            setSlideIndex(index);
            // Resume auto-scroll after manual navigation
            setTimeout({
                "Partners.useCallback[handleDotClick]": ()=>setIsAutoScrolling(true)
            }["Partners.useCallback[handleDotClick]"], 5000);
        }
    }["Partners.useCallback[handleDotClick]"], []);
    // Touch handling for mobile
    const touchStartX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const touchEndX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleTouchStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Partners.useCallback[handleTouchStart]": (e)=>{
            touchStartX.current = e.touches[0].clientX;
            pauseAutoScroll();
        }
    }["Partners.useCallback[handleTouchStart]"], [
        pauseAutoScroll
    ]);
    const handleTouchEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Partners.useCallback[handleTouchEnd]": (e)=>{
            touchEndX.current = e.changedTouches[0].clientX;
            if (touchStartX.current !== null && touchEndX.current !== null) {
                const diff = touchStartX.current - touchEndX.current;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        handleNext();
                    } else {
                        handlePrev();
                    }
                }
            }
            setTimeout({
                "Partners.useCallback[handleTouchEnd]": ()=>resumeAutoScroll()
            }["Partners.useCallback[handleTouchEnd]"], 5000);
        }
    }["Partners.useCallback[handleTouchEnd]"], [
        handleNext,
        handlePrev,
        resumeAutoScroll
    ]);
    // Keyboard navigation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Partners.useEffect": ()=>{
            const handleKeyDown = {
                "Partners.useEffect.handleKeyDown": (e)=>{
                    if (e.key === "ArrowLeft") {
                        handlePrev();
                    } else if (e.key === "ArrowRight") {
                        handleNext();
                    }
                }
            }["Partners.useEffect.handleKeyDown"];
            window.addEventListener("keydown", handleKeyDown);
            return ({
                "Partners.useEffect": ()=>window.removeEventListener("keydown", handleKeyDown)
            })["Partners.useEffect"];
        }
    }["Partners.useEffect"], [
        handleNext,
        handlePrev
    ]);
    if (!isMounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-32 bg-gray-200 animate-pulse rounded-lg"
            }, void 0, false, {
                fileName: "[project]/components/partners.tsx",
                lineNumber: 323,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/partners.tsx",
            lineNumber: 322,
            columnNumber: 7
        }, this);
    }
    // Use WebP if supported, otherwise use fallback
    const currentPartners = supportsWebP ? partners : partners.map((p)=>({
            ...p,
            logo: p.fallback
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
        "aria-label": "Our Partners",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-left text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-6 md:mb-8",
                children: "Our Partners"
            }, void 0, false, {
                fileName: "[project]/components/partners.tsx",
                lineNumber: 338,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full overflow-hidden rounded-lg",
                onMouseEnter: pauseAutoScroll,
                onMouseLeave: resumeAutoScroll,
                onTouchStart: handleTouchStart,
                onTouchEnd: handleTouchEnd,
                "aria-live": "polite",
                "aria-label": `Partner carousel, showing ${itemsPerView} partners at a time`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: carouselRef,
                    className: "relative",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex transition-transform duration-500 ease-out will-change-transform",
                        style: {
                            transform: `translateX(-${slideIndex * 100}%)`,
                            WebkitTransform: `translateX(-${slideIndex * 100}%)`
                        },
                        children: Array.from({
                            length: Math.ceil(currentPartners.length / itemsPerView)
                        }).map((_, groupIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-shrink-0 w-full",
                                children: currentPartners.slice(groupIndex * itemsPerView, (groupIndex + 1) * itemsPerView).map((partner, indexInGroup)=>{
                                    const globalIndex = groupIndex * itemsPerView + indexInGroup;
                                    const isVisible = groupIndex === slideIndex;
                                    const isPriority = groupIndex === 0 && indexInGroup < itemsPerView;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center",
                                        style: {
                                            width: `${90 / itemsPerView}%`
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PartnerLogo, {
                                            partner: partner,
                                            index: globalIndex,
                                            isVisible: isVisible,
                                            isPriority: isPriority
                                        }, void 0, false, {
                                            fileName: "[project]/components/partners.tsx",
                                            lineNumber: 380,
                                            columnNumber: 25
                                        }, this)
                                    }, `${partner.name}-${globalIndex}`, false, {
                                        fileName: "[project]/components/partners.tsx",
                                        lineNumber: 375,
                                        columnNumber: 23
                                    }, this);
                                })
                            }, groupIndex, false, {
                                fileName: "[project]/components/partners.tsx",
                                lineNumber: 363,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/partners.tsx",
                        lineNumber: 355,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/partners.tsx",
                    lineNumber: 351,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/partners.tsx",
                lineNumber: 342,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "flex justify-center mt-6 space-x-4",
                "aria-label": "Carousel navigation",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$button$2f$dist$2f$chunk$2d$KCYYJJH4$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__button_default__as__Button$3e$__["Button"], {
                        "aria-label": "Previous partners",
                        className: "rounded-full text-white hover:bg-white hover:text-gray-800 transition-all duration-200 transform hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50",
                        size: "sm",
                        variant: "bordered",
                        onClick: handlePrev,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaArrowLeft"], {
                            className: "h-3 w-3 sm:h-4 sm:w-4"
                        }, void 0, false, {
                            fileName: "[project]/components/partners.tsx",
                            lineNumber: 407,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/partners.tsx",
                        lineNumber: 400,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2",
                        role: "tablist",
                        children: Array.from({
                            length: maxSlideIndex + 1
                        }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                role: "tab",
                                "aria-selected": index === slideIndex,
                                "aria-label": `Go to slide ${index + 1} of ${maxSlideIndex + 1}`,
                                className: `transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${index === slideIndex ? "bg-white w-8 h-2" : "bg-gray-500 hover:bg-gray-400 w-2 h-2"}`,
                                onClick: ()=>handleDotClick(index)
                            }, index, false, {
                                fileName: "[project]/components/partners.tsx",
                                lineNumber: 412,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/partners.tsx",
                        lineNumber: 410,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$button$2f$dist$2f$chunk$2d$KCYYJJH4$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__button_default__as__Button$3e$__["Button"], {
                        "aria-label": "Next partners",
                        className: "rounded-full text-white hover:bg-white hover:text-gray-800 transition-all duration-200 transform hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50",
                        size: "sm",
                        variant: "bordered",
                        onClick: handleNext,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaArrowRight"], {
                            className: "h-3 w-3 sm:h-4 sm:w-4"
                        }, void 0, false, {
                            fileName: "[project]/components/partners.tsx",
                            lineNumber: 434,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/partners.tsx",
                        lineNumber: 427,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/partners.tsx",
                lineNumber: 396,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/partners.tsx",
        lineNumber: 334,
        columnNumber: 5
    }, this);
}
_s1(Partners, "Rf08ESTYrrZp5p+feUB8usICYes=");
_c1 = Partners;
var _c, _c1;
__turbopack_context__.k.register(_c, "PartnerLogo");
__turbopack_context__.k.register(_c1, "Partners");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/booking/parts/contact.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BookingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$partners$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/partners.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function BookingPage() {
    _s();
    const [slideIndex, setSlideIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const carouselRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const slideWidthRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const itemsPerView = 1;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookingPage.useEffect": ()=>{
            const handleResize = {
                "BookingPage.useEffect.handleResize": ()=>{
                    if (carouselRef.current?.children[0]) {
                        slideWidthRef.current = carouselRef.current.children[0].clientWidth;
                        carouselRef.current.style.transform = `translateX(-${slideIndex * slideWidthRef.current * itemsPerView}px)`;
                    }
                }
            }["BookingPage.useEffect.handleResize"];
            handleResize();
            window.addEventListener("resize", handleResize);
            return ({
                "BookingPage.useEffect": ()=>window.removeEventListener("resize", handleResize)
            })["BookingPage.useEffect"];
        }
    }["BookingPage.useEffect"], [
        slideIndex,
        itemsPerView
    ]);
    const handleNext = ()=>{
        setSlideIndex((prev)=>(prev + 1) % Math.ceil(images.length / itemsPerView));
    };
    const handlePrev = ()=>{
        setSlideIndex((prev)=>(prev - 1 + Math.ceil(images.length / itemsPerView)) % Math.ceil(images.length / itemsPerView));
    };
    const images = [
        "/gallery/crowd.png",
        "/gallery/uganda_must_laugh-1.jpg",
        "/gallery/bg_booking.webp",
        "/bg_hero.webp",
        "/bg_hero.webp"
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full bg-black text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full h-screen overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: "/hero_bg.webp",
                        alt: "Uganda Must Laugh - Comedy Special",
                        layout: "fill",
                        quality: 80,
                        objectFit: "cover",
                        className: "brightness-70"
                    }, void 0, false, {
                        fileName: "[project]/app/booking/parts/contact.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex flex-col items-left justify-left px-6 text-left ",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: 0.7
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-xl mx-20 px-6 py-20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    whileInView: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        duration: 0.6,
                                        delay: 0.2
                                    },
                                    viewport: {
                                        once: true,
                                        margin: "-100px"
                                    },
                                    className: "text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-4xl font-bold mb-10",
                                            children: "For Bookings"
                                        }, void 0, false, {
                                            fileName: "[project]/app/booking/parts/contact.tsx",
                                            lineNumber: 78,
                                            columnNumber: 11
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 gap-8",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col p-8  justify-end",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-semibold mb-4 text-black",
                                                        children: "Booking Information"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/booking/parts/contact.tsx",
                                                        lineNumber: 81,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mb-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "text-sm font-semibold text-black mb-3 flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaPhone"], {
                                                                        size: 18
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/booking/parts/contact.tsx",
                                                                        lineNumber: 84,
                                                                        columnNumber: 19
                                                                    }, this),
                                                                    " Phone Numbers"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/booking/parts/contact.tsx",
                                                                lineNumber: 83,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-3 mb-3",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: "https://wa.me/256752734280",
                                                                    className: "hover:text-black transition-colors flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaWhatsapp"], {
                                                                            size: 20,
                                                                            className: "text-green-600"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/booking/parts/contact.tsx",
                                                                            lineNumber: 88,
                                                                            columnNumber: 21
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-black",
                                                                            children: "+256 752 734280"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/booking/parts/contact.tsx",
                                                                            lineNumber: 89,
                                                                            columnNumber: 21
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/booking/parts/contact.tsx",
                                                                    lineNumber: 87,
                                                                    columnNumber: 19
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/booking/parts/contact.tsx",
                                                                lineNumber: 86,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-3",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: "https://wa.me/256784704143",
                                                                    className: "hover:text-black transition-colors flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaWhatsapp"], {
                                                                            size: 20,
                                                                            className: "text-green-600"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/booking/parts/contact.tsx",
                                                                            lineNumber: 94,
                                                                            columnNumber: 21
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-black",
                                                                            children: "+256 784 704143"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/booking/parts/contact.tsx",
                                                                            lineNumber: 95,
                                                                            columnNumber: 21
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/booking/parts/contact.tsx",
                                                                    lineNumber: 93,
                                                                    columnNumber: 19
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/booking/parts/contact.tsx",
                                                                lineNumber: 92,
                                                                columnNumber: 17
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/booking/parts/contact.tsx",
                                                        lineNumber: 82,
                                                        columnNumber: 15
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mb-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "text-sm font-semibold text-black mb-3 flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEnvelope"], {
                                                                        size: 18
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/booking/parts/contact.tsx",
                                                                        lineNumber: 101,
                                                                        columnNumber: 19
                                                                    }, this),
                                                                    " Email"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/booking/parts/contact.tsx",
                                                                lineNumber: 100,
                                                                columnNumber: 17
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center  text-black gap-3",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: "mailto:info@hilaryokello.com",
                                                                    className: "hover:text-black transition-colors flex items-center gap-2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "info@hilaryokello.com"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/booking/parts/contact.tsx",
                                                                        lineNumber: 106,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/booking/parts/contact.tsx",
                                                                    lineNumber: 104,
                                                                    columnNumber: 19
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/booking/parts/contact.tsx",
                                                                lineNumber: 103,
                                                                columnNumber: 17
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/booking/parts/contact.tsx",
                                                        lineNumber: 99,
                                                        columnNumber: 15
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/booking/parts/contact.tsx",
                                                lineNumber: 80,
                                                columnNumber: 13
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/booking/parts/contact.tsx",
                                            lineNumber: 79,
                                            columnNumber: 11
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/booking/parts/contact.tsx",
                                    lineNumber: 71,
                                    columnNumber: 9
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/booking/parts/contact.tsx",
                                lineNumber: 70,
                                columnNumber: 7
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/booking/parts/contact.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/booking/parts/contact.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/booking/parts/contact.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: " py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$partners$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/app/booking/parts/contact.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/booking/parts/contact.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/booking/parts/contact.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(BookingPage, "NyQMpEZEPrNlCf+n5AvCZ4d9eBA=");
_c = BookingPage;
var _c;
__turbopack_context__.k.register(_c, "BookingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_678dd8fd._.js.map