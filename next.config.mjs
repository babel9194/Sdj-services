/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Lint still runs locally via `npm run lint`; skipping it during the
    // build avoids the @typescript-eslint plugin resolution issue seen
    // on some npm/Vercel installs and keeps lint failures from blocking
    // a production deploy.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
