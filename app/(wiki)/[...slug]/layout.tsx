import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import type { ReactNode } from 'react';

export default function DocsLayoutWrapper({ children }: { children: ReactNode }) {
  const tree = source.getPageTree();

  return (
    <DocsLayout
      tree={tree}
      {...baseOptions()}
      sidebar={{
        enabled: true,
        tabs: [
          { title: '公理与基石', description: '丈量现实，抑或被现实重构。', url: '/principia' },
          { title: '关于本项目', description: '关于Shuuyou Wiki的一切！', url: '/about' }
        ],
      }}
    >
      {children}
    </DocsLayout>
  );
}