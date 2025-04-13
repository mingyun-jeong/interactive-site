import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import Navbar from './components/Navbar';

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Pickly Lab - 반응을 이끌어내는 콘텐츠 실험실',
  description: '재미있고 몰입감 있는 심리 테스트와 퀴즈를 통해 자신을 발견하고 친구들과 공유해보세요.',
  keywords: 'MBTI, IQ, 테스트, 퀴즈, 심리테스트, 재미, 콘텐츠, Pickly Lab',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#1e293b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Google AdSense 메타 태그 */}
        <meta name="google-adsense-account" content="ca-pub-485458818" />
        <Script
          id="google-adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-485458818"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        {/* 파비콘 직접 추가 */}
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo-image.png" />
        
        <meta name="application-name" content="Pickly Lab" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Pickly Lab" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#1e293b" />
      </head>
      <body className={outfit.className}>
        {/* Global Navigation Bar */}
        <Navbar />
        
        {/* Main Content with padding for the fixed navbar */}
        <div className="pt-16">
          {children}
        </div>

        {/* Google Analytics */}
        <Script 
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-FNLDN2VL56`}
        />
        <Script 
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FNLDN2VL56');
          `}
        </Script>
      </body>
    </html>
  );
}
