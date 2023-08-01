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
        API_ENDPOINT: process.env.API_ENDPOINT
    }
}

module.exports = nextConfig
