// Third-party origins the site loads from: Google Analytics (after cookie
// consent), the Kaye chat widget, YouTube embeds/thumbnails, flag icons and
// Supabase (data + storage).
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.apollo.kayeai.com https://cdn.jsdelivr.net https://www.youtube.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://flagcdn.com https://*.supabase.co https://i.ytimg.com https://img.youtube.com https://www.google-analytics.com https://*.googletagmanager.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://app.apollo.kayeai.com https://cdn.apollo.kayeai.com wss://app.apollo.kayeai.com",
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://docs.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
  "report-uri /api/csp-report",
].join("; ");

const securityHeaders = [
  // Report-only for now: violations are logged by app/api/csp-report. Once
  // the logs are quiet (about a week), rename the key to
  // Content-Security-Policy to enforce it.
  { key: "Content-Security-Policy-Report-Only", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1600, 1920, 2560, 3840],
    imageSizes: [96, 128, 256, 384, 400],
    // Every `quality` value used by an <Image> must be listed here.
    qualities: [55, 70, 75, 80, 85],
    // 31 days. Optimised copies are cached by URL, so give a replaced image a
    // new filename rather than overwriting the old one.
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "btmwaweqwxwmmfscnzbe.supabase.co",
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Files in public/ aren't content-hashed (unlike /_next/static, which
      // Next already serves as immutable), so cache for 30 days, not forever.
      {
        source: "/:path*.:ext(avif|webp|jpg|jpeg|png|gif|svg|ico|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
