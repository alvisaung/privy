/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",

  typescript: {
    ignoreBuildErrors: true,
  },
  // reactStrictMode: true,

  images: { domains: ["api.privy.sg"] },
};

module.exports = nextConfig;
