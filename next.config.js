/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { domains: ["api.privy.sg"] },
};

module.exports = nextConfig;
