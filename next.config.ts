import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Static export disabled to support dynamic admin routes
  // output: 'export',  // ⚠️ Commented out — re-enable before static build
  turbopack: {
    root: __dirname,
  },
  // /images/* 内容不可变（文件名即版本），缓存一年；
  // 此前默认 max-age=0，每次抓取都回源，浪费抓取预算且拖慢 TTFB
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {key: 'Cache-Control', value: 'public, max-age=31536000, immutable'},
        ],
      },
      {
        // 全站安全响应头。
        // 注意：若 Nginx 直接把 /images、/uploads 作为静态文件托管，请求不会经过 Next，
        // 这些头不会生效——需要在 nginx 侧再写一份（见部署清单）。
        // CSP 先以 Report-Only 上线：只收集违规报告，不影响渲染；盘点完内联脚本后再收紧为强制。
        source: '/:path*',
        headers: [
          {key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains'},
          {key: 'X-Content-Type-Options', value: 'nosniff'},
          {key: 'X-Frame-Options', value: 'SAMEORIGIN'},
          {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
          {key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()'},
          {
            key: 'Content-Security-Policy-Report-Only',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net; frame-src 'self' https://www.googletagmanager.com https://td.doubleclick.net; object-src 'none'; base-uri 'self'; form-action 'self'",
          },
        ],
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {protocol: 'https', hostname: 'images.unsplash.com'},
      {protocol: 'https', hostname: '**.supabase.co'}
    ]
  },
  // 转化确认页别名：外部投放/邮件里常写成 /thank-you、/thanks 或 /{locale}/thanks，
  // 统一 308 到 /{locale}/thank-you，避免落到 404 丢掉转化归因
  async redirects() {
    return [
      // 根路径 → 默认语种。原本由 app/page.tsx 的 permanentRedirect 承担，
      // 但 app/layout.tsx 删除后（为了给 /{locale}/* 输出正确的 <html lang>）
      // app/page.tsx 不再有根 layout，改由这里处理。permanent: true 依旧输出 308。
      {source: '/', destination: '/en', permanent: true},
      {source: '/thank-you', destination: '/en/thank-you', permanent: true},
      {source: '/thanks', destination: '/en/thank-you', permanent: true},
      {
        source: '/:locale(en|zh|vi|th)/thanks',
        destination: '/:locale/thank-you',
        permanent: true,
      },
    ];
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
