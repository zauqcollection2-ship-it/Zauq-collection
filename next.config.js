/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
      'images.unsplash.com',
    ],
  },
  swcMinify: true,
  compress: true,
  reactStrictMode: true,
  poweredByHeader: false,
};

module.exports = nextConfig;