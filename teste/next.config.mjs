/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/",
        destination: "/pages/Principal",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
