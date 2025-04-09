import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: '포켓몬 MBTI 테스트 - 나와 닮은 포켓몬은?',
  description: 'MBTI 성격 유형으로 나와 닮은 포켓몬을 찾아보세요. 16가지 성격 유형별 포켓몬 매칭 테스트!',
  keywords: 'MBTI, 포켓몬, 테스트, 퀴즈, 성격 유형, 피카츄, 파이리, 리자몽, 뮤츠',
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
