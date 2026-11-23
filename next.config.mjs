/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // The minimal v2 site is a standalone static page in public/v2
  async rewrites() {
    return [{ source: "/v2", destination: "/v2/index.html" }]
  },
}

export default nextConfig
