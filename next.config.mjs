/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  
  // 这两行是关键！
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;