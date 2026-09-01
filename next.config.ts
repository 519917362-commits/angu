import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Static export disabled to support dynamic admin routes
  // output: 'export',  // ⚠️ Commented out — re-enable before static build
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {protocol: 'https', hostname: 'images.unsplash.com'},
      {protocol: 'https', hostname: '**.supabase.co'}
    ]
  },
  // Proxy API requests to local backend during development
  async rewrites() {
    return [
      {
        source: '/api/inquiry',
        destination: 'http://localhost:3001/api/inquiry',
      },
      {
        source: '/api/admin/:path*',
        destination: 'http://localhost:3001/api/admin/:path*',
      },
      {
        source: '/api/inquiries/:path*',
        destination: 'http://localhost:3001/api/inquiries/:path*',
      },
      {
        source: '/api/catalog/:path*',
        destination: 'http://localhost:3001/api/catalog/:path*',
      },
      {
        source: '/api/products/:path*',
        destination: 'http://localhost:3001/api/products/:path*',
      },
      {
        source: '/api/blog/:path*',
        destination: 'http://localhost:3001/api/blog/:path*',
      },
      {
        source: '/api/blog-posts/:path*',
        destination: 'http://localhost:3001/api/blog-posts/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:3001/uploads/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
};

export default nextConfig;
