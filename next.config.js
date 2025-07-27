/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['@sanity/image-url'],
  },
};

module.exports = nextConfig;
