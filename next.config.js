/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
            },
            {
                protocol: 'https',
                hostname: 'btmwaweqwxwmmfscnzbe.supabase.co',
            },
        ],
    },
    experimental: {
        optimizeCss: true,
    },
    compress: true,
    poweredByHeader: false,
}

module.exports = nextConfig
