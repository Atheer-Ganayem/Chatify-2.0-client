/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AWS: "https://atheer-web-projects.s3.eu-central-1.amazonaws.com/",
    API: "http://localhost:5000",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "atheer-web-projects.s3.eu-central-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
