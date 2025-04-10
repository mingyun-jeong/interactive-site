import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '원피스 MBTI 테스트 - 당신과 닮은 원피스 캐릭터는?',
  description: 'MBTI 성격 유형으로 나와 닮은 원피스 캐릭터를 찾아보세요.',
  keywords: 'MBTI, 원피스, 테스트, 퀴즈, 성격 유형, 애니메이션',
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
        <meta name="google-adsense-account" content="ca-pub-6951210541539723" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6951210541539723"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        {children}

        {/* Google Analytics */}
        <Script 
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-G3NYK03GSD`}
        />
        <Script 
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G3NYK03GSD');
          `}
        </Script>
      </body>
    </html>
  );
}
