const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');

const nextConfig = {
  generateEtags: false,
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    // iconSizes: [],
    domains: [
      'colorfuldots.com',
      'colorfuldots.s3.amazonaws.com',
      'firebasestorage.googleapis.com',
      'cdn.jsdelivr.net',
      'cdnjs.cloudflare.com',
    ],
    path: '/_next/image',
    loader: 'default',
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    maximumFileSizeToCacheInBytes: 5000000,
  },
};

module.exports = withPlugins([withPWA(nextConfig)]);
