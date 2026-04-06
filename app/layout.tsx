import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter, Noto_Serif_SC } from 'next/font/google';
import './global.css';
import type { ReactNode } from 'react';

// 引入系统英文无衬线字体
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
// 引入思源宋体作为主标题/海报级字体
const notoSerif = Noto_Serif_SC({ 
  subsets: ['latin'], 
  weight: ['400', '700', '900'], 
  variable: '--font-noto-serif' 
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // 💡 微调：将 lang="en" 改为 "zh-CN"
    <html lang="zh-CN" className={`${inter.variable} ${notoSerif.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen font-sans" suppressHydrationWarning>
        <RootProvider
          search={{
            enabled: true,
            options: {
              api: '/api/search',
              // 🔴 核心修复：强制开启云端/服务端检索模式。
              // 这样浏览器就不会在本地用英文规则乱切词，而是把关键词发给我们刚刚加了中文引擎的后端。
              type: 'fetch', 
            },
          }}
          theme={{ enabled: true }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}