import type React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { FontSizeProvider } from '@/contexts/font-size-context';
import Providers from 'app/providers';

const pretendard = localFont({
  src: '../src/shared/fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Sent',
  description: '당신의 일상을 체계적으로 관리하세요',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={pretendard.className}>
        <Providers>
          <FontSizeProvider>{children}</FontSizeProvider>
        </Providers>
      </body>
    </html>
  );
}
