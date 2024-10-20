module.exports = {
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
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  reactStrictMode: true,
};
