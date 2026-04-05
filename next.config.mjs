import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  // 配置目录访问的自动重定向，消灭 404
  async redirects() {
    return [
      {
        source: '/infrastructure',
        destination: '/infrastructure/quick-start',
        permanent: false, // 开发阶段用 false
      },
      {
        source: '/perception',
        destination: '/perception/quick-start',
        permanent: false,
      },
      {
        source: '/hardware',
        destination: '/hardware/quick-start',
        permanent: false,
      },
      {
        source: '/simulation',
        destination: '/simulation/quick-start',
        permanent: false,
      },
    ];
  },
};

export default withMDX(config);
