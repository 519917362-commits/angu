import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Static export for deployment
  output: 'export',
  distDir: 'dist',
  // API requests are proxied by Nginx to backend
  // No rewrites needed for static export
  images: {
    unoptimized: true,
    remotePatterns: [
      {protocol: 'https', hostname: 'images.unsplash.com'},
      {protocol: 'https', hostname: '**.supabase.co'}
    ]
  }
};

export default nextConfig;
