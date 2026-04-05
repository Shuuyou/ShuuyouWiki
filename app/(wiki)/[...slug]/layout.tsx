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
          { title: '环境与基础', description: 'Ubuntu, ROS2', url: '/infrastructure/quick-start' },
          { title: '感知与算法', description: 'Vision, Multi-modal', url: '/perception/quick-start' },
          { title: '硬件与控制', description: 'Jetson, MCU, 控制链路', url: '/hardware/quick-start' },
          { title: '仿真与建模', description: 'Isaac Sim, Gazebo', url: '/simulation/quick-start' },
        ],
      }}
    >
      {children}
    </DocsLayout>
  );
}