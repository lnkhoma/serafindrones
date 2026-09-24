/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All photography is served locally from /public/images.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
