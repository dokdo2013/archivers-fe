/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["archivers.app", "static-cdn.jtvnw.net"],
  },
};

module.exports = nextConfig;
