import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: '인터랙티브 테스트 - 나를 발견하는 재미있는 테스트',
  description: 'MBTI, 연애 성향, IQ 등 다양한 재미있는 테스트로 나에 대해 알아보세요.',
  keywords: 'MBTI, 테스트, 퀴즈, 성격 유형, 심리 테스트, 연애 테스트',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
