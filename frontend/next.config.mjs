/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Add this line for static export
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
