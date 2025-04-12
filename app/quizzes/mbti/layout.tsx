import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: '원피스 MBTI 테스트 - 당신과 닮은 원피스 캐릭터는?',
  description: '당신의 MBTI를 알아보고 원피스 캐릭터 중 어떤 캐릭터와 가장 닮았는지 확인해보세요.',
};

export const viewport: Viewport = {
  themeColor: '#1e293b',
};

export default function MbtiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>{children}</div>
  );
} 