/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/studio/:path*',
        destination: process.env.NODE_ENV === 'development' 
          ? `http://localhost:${process.env.SANITY_PORT || '3333'}/studio/:path*` 
          : '/studio/:path*',
      },
    ];
  },
  // Allow Next.js to use different ports if 3000 is busy
  experimental: {
    serverComponentsExternalPackages: ['@sanity/image-url'],
  },
};

module.exports = nextConfig;
