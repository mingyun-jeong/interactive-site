import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '애니메이션 MBTI 테스트 - 당신과 닮은 애니 캐릭터는?',
  description: 'MBTI 성격 유형으로 나와 닮은 애니메이션 캐릭터를 찾아보세요.',
  keywords: 'MBTI, 애니메이션, 테스트, 퀴즈, 성격 유형',
  metadataBase: new URL('https://interactive-site-ktqjcqw64-mgjeong-estsoftcoms-projects.vercel.app'),
  openGraph: {
    title: '나를 찾는 테스트',
    description: '나를 찾는 여러가지 테스트',
    url: 'https://interactive-site-ktqjcqw64-mgjeong-estsoftcoms-projects.vercel.app',
    siteName: '나를 찾는 테스트',
    locale: 'ko_KR',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Google AdSense 메타 태그 */}
        <meta name="google-adsense-account" content="ca-pub-6951210541539723" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6951210541539723"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <GoogleAnalytics gaId="G-G3NYK03GSD" />
      </body>
    </html>
  )
}
