import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: '연애 성향 테스트 - 당신의 연애 스타일은?',
  description: '당신의 연애 스타일과 이상형을 알아보세요.',
};

export const viewport: Viewport = {
  themeColor: '#1e293b',
};

export default function LoveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>{children}</div>
  );
} 