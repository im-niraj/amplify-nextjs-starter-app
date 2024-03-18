/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.hindinews9.com",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "taazatime.com",
      },
    ],
  },
  env: {
    imageUrl: "https://image.hindinews9.com",
  },
}

module.exports = nextConfig
