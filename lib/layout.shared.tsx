// lib/layout.shared.tsx
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { ShuuyouLogo } from '@/components/Logo'; // 引入刚才建好的组件

export const gitConfig = {
  user: 'shuuyou',
  repo: 'shuuyouwiki',
  branch: 'main',
};

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          <ShuuyouLogo variant="wiki" className="h-12 w-auto text-black dark:text-white" />
        </div>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}