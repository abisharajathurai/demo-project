/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET:process.env.NEXTAUTH_SECRET,
    NEXTAUTH_CLIENT_ID:process.env.NEXTAUTH_CLIENT_ID,
  },
};

export default nextConfig;
