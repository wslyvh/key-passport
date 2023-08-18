/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    if (!options.isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.readline = false;
    }
    return config;
  }
}

module.exports = nextConfig
