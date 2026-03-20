import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TodayMeal - 오늘 뭐 먹지?',
  description: '음식 이미지 기반 1:1 토너먼트로 메뉴 결정 피로를 해소하세요',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TodayMeal',
  },
  formatDetection: { telephone: false },
  openGraph: {
    title: 'TodayMeal - 오늘 뭐 먹지?',
    description: '음식 이상형 월드컵으로 오늘 메뉴 결정!',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FF6B35',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="min-h-screen bg-[#FFF8F0]">
        <div className="max-w-md mx-auto min-h-screen relative overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
