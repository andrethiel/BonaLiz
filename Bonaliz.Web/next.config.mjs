/** @type {import('next').NextConfig} */
const nextConfig = {
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
  reactStrictMode: false,
};

export default nextConfig;
