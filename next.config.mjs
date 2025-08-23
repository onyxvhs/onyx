import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'doareq03jfupil1a.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
}

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
