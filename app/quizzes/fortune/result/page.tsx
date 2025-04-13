'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Copy, Share2, ArrowRight, CalendarDays, Clock, User } from 'lucide-react';
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
    <div className="container mx-auto py-16 px-4 md:px-6 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center max-w-md w-full">
        <div className="relative mx-auto mb-8 w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 animate-pulse opacity-50"></div>
          <div className="absolute inset-1 rounded-full bg-white dark:bg-gray-900"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">사주를 분석하고 있습니다</h3>
        <p className="text-gray-600 dark:text-gray-300">당신만을 위한 상세한 사주 분석이 준비 중입니다. 잠시만 기다려주세요...</p>
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
  const [activeSection, setActiveSection] = useState('');

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
      <div className="container mx-auto py-16 px-4 md:px-6 flex items-center justify-center min-h-[70vh]">
        <div className="max-w-md w-full">
          <Card className="border-0 shadow-xl bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"></div>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold">오류가 발생했습니다</CardTitle>
            </CardHeader>
            <CardContent className="text-center pb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{fortuneResult.error}</p>
              <Link href="/quizzes/fortune">
                <Button className="w-full h-12 text-base font-medium rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all">
                  다시 시도하기
                </Button>
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

  // 마크다운 내용에서 섹션 제목 추출 (## 로 시작하는 부분)
  const extractSections = (markdownContent: string) => {
    const sectionRegex = /^## (.+)$/gm;
    const sections = [];
    let match;
    
    while ((match = sectionRegex.exec(markdownContent)) !== null) {
      sections.push(match[1]);
    }
    
    return sections;
  };
  
  const sections = extractSections(fortuneResult.fortune);
  
  // 섹션으로 스크롤하는 함수
  const scrollToSection = (sectionTitle: string) => {
    setActiveSection(sectionTitle);
    const element = document.getElementById(sectionTitle.replace(/\s+/g, '-').toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 포춘 결과의 마크다운에 ID 추가하기
  const addIdsToMarkdown = (markdown: string) => {
    return markdown.replace(/^## (.+)$/gm, (match, title) => {
      const id = title.replace(/\s+/g, '-').toLowerCase();
      return `<h2 id="${id}" class="scroll-mt-24">${title}</h2>`;
    });
  };

  const decoratedFortune = addIdsToMarkdown(fortuneResult.fortune);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30 -z-10 overflow-hidden">
        <div className="w-full h-full absolute">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -top-12 -right-24 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-48 left-48 w-96 h-96 bg-pink-200 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </div>
      
      <div className="container mx-auto py-10 px-4 md:px-6">
        {/* 상단 네비게이션 */}
        <div className="mb-8 sticky top-0 z-40 py-4 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-100 dark:border-gray-800">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/quizzes/fortune" className="group inline-flex items-center text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors mr-2">
                <ChevronLeft className="h-4 w-4" />
              </span>
              <span>다시 테스트하기</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={handleCopyToClipboard}
                className="flex items-center text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              >
                <Copy className="h-4 w-4 mr-1" />
                {copied ? '복사됨!' : '복사'}
              </button>
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
              <button 
                onClick={handleShare}
                className="flex items-center text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              >
                <Share2 className="h-4 w-4 mr-1" />
                공유
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* 헤더 섹션 */}
          <div className="relative mb-16 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-700 p-0.5 mb-4 shadow-lg shadow-indigo-500/20 dark:shadow-indigo-900/30">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                  <span className="text-3xl">🔮</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {userInfo.name || '사용자'}님의 사주 분석
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-xl mx-auto">
                당신만을 위해 분석된 상세한 사주 결과입니다. 개인의 특성과 잠재력을 확인하세요.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <div className="flex items-center space-x-1 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                <CalendarDays className="h-4 w-4 text-indigo-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {userInfo.birthYear}년 {userInfo.birthMonth}월 {userInfo.birthDay}일
                </span>
              </div>
              {userInfo.birthHour !== undefined && (
                <div className="flex items-center space-x-1 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                  <Clock className="h-4 w-4 text-indigo-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {userInfo.birthHour}시생
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-1 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md">
                <User className="h-4 w-4 text-indigo-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {userInfo.gender === 'male' ? '남성' : '여성'}
                </span>
              </div>
            </div>
            
            {/* 목차 네비게이션 */}
            {sections.length > 0 && (
              <div className="hidden md:block">
                <div className="flex items-center justify-center flex-wrap gap-2 mb-4">
                  {sections.map((section, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(section)}
                      className={`px-4 py-2 text-sm rounded-full transition-all ${
                        activeSection === section
                          ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-medium"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {section}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 결과 카드 */}
          <Card className="mb-12 border-0 shadow-2xl bg-white dark:bg-gray-900 rounded-2xl overflow-hidden relative z-10">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500"></div>
            <CardHeader className="pt-8 pb-4 border-b border-gray-100 dark:border-gray-800 px-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">상세 사주 분석</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    사주팔자를 기반으로 작성된 개인 맞춤형 운세 분석입니다
                  </CardDescription>
                </div>
                <div className="hidden md:flex items-center space-x-2 text-sm">
                  <span className="flex items-center text-green-600 dark:text-green-400">
                    <span className="relative flex h-3 w-3 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    AI 분석 완료
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-8 pb-6 px-8">
              <div className="prose prose-lg prose-indigo dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:relative prose-h2:pt-6 prose-h2:border-t prose-h2:border-gray-100 dark:prose-h2:border-gray-800 prose-h2:first:border-0 prose-h2:first:pt-0">
                <div dangerouslySetInnerHTML={{ __html: decoratedFortune.replace(/\n/g, '<br />') }} />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4 pt-2 pb-8 px-8 border-t border-gray-100 dark:border-gray-800">
              <Button
                onClick={handleCopyToClipboard}
                variant="outline"
                className="flex-1 flex items-center justify-center gap-2 py-6 rounded-xl border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                <Copy className="h-4 w-4" />
                {copied ? '결과가 복사되었습니다!' : '결과 복사하기'}
              </Button>
              
              <Button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 py-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/20 dark:shadow-indigo-900/30 hover:shadow-xl"
              >
                <Share2 className="h-4 w-4" />
                결과 공유하기
              </Button>
            </CardFooter>
          </Card>

          {/* 프리미엄 추천 배너 */}
          <div className="mb-16 rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-0.5 shadow-xl shadow-indigo-500/10 dark:shadow-indigo-900/20 transform hover:-translate-y-1 transition-all duration-300">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center">
                    <span className="inline-block w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-2 text-indigo-600 dark:text-indigo-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                      </svg>
                    </span>
                    프리미엄 사주 분석 서비스
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    더 상세한 사주 분석과 운세, 인생 주요 시기별 특징, 직업 적성, 금전운 등을 확인하세요.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-2 text-indigo-600 dark:text-indigo-400">
                        <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      월별 운세 보고서
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-2 text-indigo-600 dark:text-indigo-400">
                        <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      궁합 분석
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-2 text-indigo-600 dark:text-indigo-400">
                        <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      직업 적성 분석
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-2 text-indigo-600 dark:text-indigo-400">
                        <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      금전운 상세 분석
                    </li>
                  </ul>
                </div>
                <div className="flex-shrink-0">
                  <Button className="w-full md:w-auto py-6 px-8 text-base font-medium rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all group">
                    <span>프리미엄 구독하기</span>
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 다른 테스트 추천 */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center justify-center">
              <span className="bg-indigo-100 dark:bg-indigo-900/30 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-indigo-600 dark:text-indigo-400">
                  <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                  <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                  <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                </svg>
              </span>
              다른 테스트도 해보세요
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/quizzes/mbti">
                <Card className="h-full bg-white dark:bg-gray-800 border-0 shadow-md hover:shadow-xl transition-all hover:-translate-y-2 duration-300 rounded-xl overflow-hidden cursor-pointer">
                  <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <span className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                      </span>
                      MBTI 테스트
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      당신의 성격 유형을 알아보세요
                    </p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/quizzes/love">
                <Card className="h-full bg-white dark:bg-gray-800 border-0 shadow-md hover:shadow-xl transition-all hover:-translate-y-2 duration-300 rounded-xl overflow-hidden cursor-pointer">
                  <div className="h-1 bg-gradient-to-r from-pink-400 to-pink-600"></div>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <span className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600 dark:text-pink-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </span>
                      연애 테스트
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      당신의 연애 스타일을 발견하세요
                    </p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/quizzes/iq">
                <Card className="h-full bg-white dark:bg-gray-800 border-0 shadow-md hover:shadow-xl transition-all hover:-translate-y-2 duration-300 rounded-xl overflow-hidden cursor-pointer">
                  <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <span className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 dark:text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                        </svg>
                      </span>
                      IQ 테스트
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      당신의 지능 수준을 테스트해보세요
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 