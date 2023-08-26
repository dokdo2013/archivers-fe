/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["videoimg.afreecatv.com", "iflv14.afreecatv.com"],
  },
};

module.exports = nextConfig;
