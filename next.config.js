const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias["@"] = path.join(__dirname, "src");
    return config;
  },
  images: {
    domains: ["res.cloudinary.com", "storage.googleapis.com", "avatars.githubusercontent.com"],
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiUrl}/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
