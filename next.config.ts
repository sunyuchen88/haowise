import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 启用图片优化
  images: {
    // 根据实际使用的图片域名进行配置
    domains: ['localhost'],
    // 启用图片优化
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 启用压缩
  compress: true,
  // 配置HTTP头部
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/chatbot.html',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
  // 启用React Strict Mode
  reactStrictMode: true,
};

export default nextConfig;