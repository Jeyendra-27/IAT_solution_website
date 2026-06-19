/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict Mode double-invokes effects in development, which makes the slide
  // decks re-run their palette/entrance setup twice on mount (visible flash and
  // replayed animations). Turning it off makes dev match the original behaviour.
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
};

export default nextConfig;
