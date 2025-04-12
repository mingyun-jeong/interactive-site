import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'IQ 테스트 - 당신의 지능 지수는?',
  description: '재미있는 IQ 테스트로 당신의 지능 지수를 측정해보세요.',
};

export const viewport: Viewport = {
  themeColor: '#1e293b',
};

export default function IqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>{children}</div>
  );
} 