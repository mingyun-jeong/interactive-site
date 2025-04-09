import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '애니메이션 MBTI 테스트 - 당신과 닮은 애니 캐릭터는?',
  description: 'MBTI 성격 유형으로 나와 닮은 애니메이션 캐릭터를 찾아보세요.',
  keywords: 'MBTI, 애니메이션, 테스트, 퀴즈, 성격 유형',
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
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXXXXX" />
      </head>
      <body className={inter.className}>
        {children}

        {/* Google Analytics */}
        <Script 
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        />
        <Script 
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  )
}
