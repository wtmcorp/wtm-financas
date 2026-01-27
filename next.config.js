/** @type {import('next').NextConfig} */
const nextConfig = {
    // Performance Optimizations
    compress: true, // Enable gzip compression

    // Production optimizations
    productionBrowserSourceMaps: false, // Disable source maps in production for smaller bundle

    // Compiler optimizations
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production' ? {
            exclude: ['error', 'warn'], // Keep error and warn logs
        } : false,
    },

    // Experimental features for better performance
    experimental: {
        optimizeCss: false, // Disable CSS optimization to avoid critters dependency issue
        optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'], // Optimize specific packages
    },

    // Image optimization
    images: {
        formats: ['image/webp', 'image/avif'], // Use modern formats
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },

    // Security Headers
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin'
                    }
                ]
            }
        ];
    },
    // Webpack optimizations
    webpack: (config, { isServer }) => {
        // Optimize bundle size
        if (!isServer) {
            config.optimization.splitChunks = {
                chunks: 'all',
                cacheGroups: {
                    default: false,
                    vendors: false,
                    // Vendor chunk for node_modules
                    vendor: {
                        name: 'vendor',
                        chunks: 'all',
                        test: /node_modules/,
                        priority: 20
                    },
                    // Common chunk for shared code
                    common: {
                        name: 'common',
                        minChunks: 2,
                        chunks: 'all',
                        priority: 10,
                        reuseExistingChunk: true,
                        enforce: true
                    }
                }
            };
        }
        return config;
    },
};

module.exports = nextConfig;
