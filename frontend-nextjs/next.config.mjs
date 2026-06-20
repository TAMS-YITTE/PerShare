/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Disable image optimization API since it requires a Node.js server
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes are added for static file routing on basic web hosts
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false, encoding: false, 'pino-pretty': false };
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
