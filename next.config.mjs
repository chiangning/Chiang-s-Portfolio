/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true // Allows standard <img> tagging without Vercel optimization requirements
  },
  allowedDevOrigins: [
    'ais-dev-u2b6ululfpg7rumvrgo6hn-107757568055.asia-southeast1.run.app',
    'ais-pre-u2b6ululfpg7rumvrgo6hn-107757568055.asia-southeast1.run.app',
    'localhost:3000',
    '127.0.0.1:3000'
  ]
};

export default nextConfig;
