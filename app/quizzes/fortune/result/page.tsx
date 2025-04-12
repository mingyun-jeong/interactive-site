'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Copy, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { UserBirthInfo, FortuneResult } from '@/types';
import { getFortuneTelling } from '@/lib/deepseek';
import { incrementVisitorCount } from '@/lib/visitors';
import AdBanner from '@/app/components/AdBanner';
import { Skeleton } from '@/components/ui/skeleton';
import Markdown from 'react-markdown';

export default function FortuneResultPage() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <FortuneResultContent />
    </Suspense>
  );
}

function LoadingComponent() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h3 className="text-xl font-medium mb-2">당신의 사주를 분석하고 있습니다</h3>
        <p className="text-muted-foreground">잠시만 기다려주세요...</p>
      </div>
    </div>
  );
}

function FortuneResultContent() {
  const searchParams = useSearchParams();
  const [fortuneResult, setFortuneResult] = useState<FortuneResult | null>(null);
  const [userInfo, setUserInfo] = useState<UserBirthInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const initPage = async () => {
      try {
        // 방문자 수 증가
        try {
          await incrementVisitorCount('fortune_result');
        } catch (error) {
          console.error('방문자 수 증가 실패:', error);
        }

        // URL에서 파라미터 가져오기
        const name = searchParams.get('name') || '';
        const birthYear = parseInt(searchParams.get('year') || '0');
        const birthMonth = parseInt(searchParams.get('month') || '0');
        const birthDay = parseInt(searchParams.get('day') || '0');
        const birthHour = searchParams.get('hour') ? parseInt(searchParams.get('hour') || '0') : undefined;
        const gender = searchParams.get('gender') as 'male' | 'female';
        const question = searchParams.get('question') ? decodeURIComponent(searchParams.get('question') || '') : undefined;

        // 유효성 검사
        if (!birthYear || !birthMonth || !birthDay || !gender) {
          throw new Error('필요한 정보가 누락되었습니다. 다시 시도해주세요.');
        }

        const info: UserBirthInfo = {
          name,
          birthYear,
          birthMonth,
          birthDay,
          birthHour,
          gender,
        };

        setUserInfo(info);

        // 포춘 생성
        const result = await getFortuneTelling(info, question);
        setFortuneResult(result);
        setLoading(false);
      } catch (error) {
        console.error('Error generating fortune:', error);
        setFortuneResult({ 
          fortune: '', 
          error: error instanceof Error ? error.message : '사주 분석 중 오류가 발생했습니다. 다시 시도해주세요.' 
        });
        setLoading(false);
      }
    };

    initPage();
  }, [searchParams]);

  const handleCopyToClipboard = () => {
    if (!fortuneResult?.fortune || !userInfo) return;

    const fortuneText = `
🔮 ${userInfo.name || '사용자'}님의 AI 사주 분석 결과 🔮

${fortuneResult.fortune.replace(/#{1,6} /g, '').replace(/\*\*/g, '').replace(/\n\n/g, '\n')}

🔗 나도 해보기: ${typeof window !== 'undefined' ? window.location.origin : ''}/quizzes/fortune
`;

    navigator.clipboard.writeText(fortuneText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = async () => {
    if (!fortuneResult?.fortune || !userInfo) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${userInfo.name || '사용자'}님의 AI 사주 분석 결과`,
          text: `AI가 분석한 ${userInfo.name || '사용자'}님의 사주를 확인해보세요!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopyToClipboard();
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  if (fortuneResult?.error) {
    return (
      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center">오류 발생</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-6">{fortuneResult.error}</p>
              <Link href="/quizzes/fortune">
                <Button className="w-full">다시 시도하기</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!fortuneResult?.fortune || !userInfo) {
    return null;
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      {/* 상단 네비게이션 */}
      <div className="mb-6">
        <Link href="/quizzes/fortune" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>다시 테스트하기</span>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">{userInfo.name || '사용자'}님의 사주 분석 결과</h1>
        <p className="text-center mb-8 text-muted-foreground">
          {userInfo.birthYear}년 {userInfo.birthMonth}월 {userInfo.birthDay}일 {userInfo.birthHour !== undefined ? `${userInfo.birthHour}시` : ''}생 ({userInfo.gender === 'male' ? '남성' : '여성'})
        </p>

        <AdBanner type="horizontal" className="mb-8" />

        {/* 결과 카드 */}
        <Card className="mb-8 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">AI 사주 분석</CardTitle>
            <CardDescription>당신의 사주를 AI가 분석했습니다</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              <Markdown>{fortuneResult.fortune}</Markdown>
            </div>
          </CardContent>
        </Card>

        {/* 공유 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-8">
          <Button
            onClick={handleCopyToClipboard}
            variant="outline"
            className="flex-1 flex items-center justify-center"
          >
            <Copy className="h-4 w-4 mr-2" />
            {copied ? '복사됨!' : '결과 복사하기'}
          </Button>
          
          <Button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center"
          >
            <Share2 className="h-4 w-4 mr-2" />
            결과 공유하기
          </Button>
        </div>

        <Separator className="my-8" />

        {/* 다른 테스트 추천 */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold mb-4">다른 테스트도 해보세요</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/quizzes/mbti">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">MBTI 테스트</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    당신의 성격 유형을 알아보세요
                  </p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/quizzes/love">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">연애 테스트</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    당신의 연애 스타일을 발견하세요
                  </p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/quizzes/iq">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">IQ 테스트</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    당신의 지능 수준을 테스트해보세요
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        <AdBanner type="horizontal" className="mt-8" />
      </div>
    </div>
  );
} 