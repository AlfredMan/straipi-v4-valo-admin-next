/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ["assets.vercel.com", "valobucket.s3.amazonaws.com"],
    formats: ["image/avif", "image/webp"],
  },
  eslint: {
    dirs: ["src"],
  },

  reactStrictMode: true,
};
