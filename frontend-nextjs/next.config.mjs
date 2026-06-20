/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Disable image optimization API since it requires a Node.js server
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes are added for static file routing on basic web hosts
  trailingSlash: true,
};

export default nextConfig;
