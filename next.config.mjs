/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wxsewjhnmdvieqwyenem.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images//**",
      },
    ],
  },
};

export default nextConfig;
