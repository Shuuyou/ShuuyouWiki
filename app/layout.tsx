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
    <html lang="en" className={`${inter.variable} ${notoSerif.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen font-sans">
        <RootProvider
          search={{
            enabled: true,
            options: {
              api: '/api/search',
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