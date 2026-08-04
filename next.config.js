/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig