import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  // 配置目录访问的自动重定向，消灭 404
  async redirects() {
    return [
      {
        source: '/principia',
        destination: '/principia/summary',
        permanent: false, // 开发阶段用 false
      },
      {
        source: '/about',
        destination: '/about/overview',
        permanent: false,
      },
    ];
  },
};

export default withMDX(config);
