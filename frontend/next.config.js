/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true
    },
    async rewrites() {
        return [
            {
                source: '/api',
                destination: 'http://localhost:8000/api'
            },
            {
                source: '/api/:path*',
                destination: 'http://localhost:8000/api/:path*'
            },
        ]
    },
    env: {
        FLOWISE_DN: process.env.FLOWISE_DN,
        API_ENDPOINT: process.env.API_ENDPOINT
    },
    publicRuntimeConfig: {
        API_ENDPOINT: process.env.API_ENDPOINT || "http://localhost:5000",
        FLOWISE_DN: process.env.FLOWISE_DN,
    }
}

module.exports = nextConfig
