'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import AdBanner from '@/app/components/AdBanner';

type MBTIType = 'ISTJ' | 'ISFJ' | 'INFJ' | 'INTJ' | 'ISTP' | 'ISFP' | 'INFP' | 'INTP' | 'ESTP' | 'ESFP' | 'ENFP' | 'ENTP' | 'ESTJ' | 'ESFJ' | 'ENFJ' | 'ENTJ';

type MBTIResult = {
  type: MBTIType;
  title: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  compatibleTypes: MBTIType[];
};

const mbtiResults: Record<MBTIType, MBTIResult> = {
  'ISTJ': {
    type: 'ISTJ',
    title: '청렴결백한 논리주의자',
    description: '사실에 근거하여 신중하고 체계적으로 일을 처리하는 현실주의자입니다. 책임감이 강하고 신뢰할 수 있는 사람으로, 규칙과 전통을 중요시합니다.',
    strengths: ['정직함', '성실함', '직접적이고 명료함', '책임감', '침착함'],
    weaknesses: ['융통성 부족', '지나치게 완고함', '변화에 대한 저항', '감정 표현에 서툼'],
    compatibleTypes: ['ESFP', 'ESTP'],
  },
  'ISFJ': {
    type: 'ISFJ',
    title: '용감한 수호자',
    description: '주변 사람들을 보호하고 지지하는 헌신적인 사람입니다. 세심한 관찰력과 탁월한 기억력을 가지고 있으며, 다른 사람의 필요를 잘 파악합니다.',
    strengths: ['충실함', '헌신적임', '따뜻함', '책임감', '세심함'],
    weaknesses: ['변화를 꺼림', '자기희생적 경향', '비판에 예민함', '자신의 필요를 무시함'],
    compatibleTypes: ['ENFP', 'ENTP'],
  },
  'INFJ': {
    type: 'INFJ',
    title: '선의의 옹호자',
    description: '조용하고 신비로우며 영감을 주는 이상주의자입니다. 강한 직관력을 가지고 있으며, 사람들의 동기와 가능성을 잘 파악합니다.',
    strengths: ['창의적임', '통찰력', '확고한 원칙', '열정적임', '이타주의적'],
    weaknesses: ['지나치게 이상적임', '완벽주의', '비판에 민감함', '타인의 기대에 스트레스 받음'],
    compatibleTypes: ['ENFP', 'ENTP'],
  },
  'INTJ': {
    type: 'INTJ',
    title: '전략적인 사색가',
    description: '혁신적인 사고와 뛰어난 전략적 계획 능력을 가진 분석가입니다. 독립적이고 결단력이 있으며, 높은 기준을 가지고 있습니다.',
    strengths: ['지적 독립성', '분석적 사고', '자신감', '결단력', '창의성'],
    weaknesses: ['완벽주의', '냉정해 보임', '매우 비판적', '과도하게 독립적'],
    compatibleTypes: ['ENFP', 'ENTP'],
  },
  'ISTP': {
    type: 'ISTP',
    title: '만능 재주꾼',
    description: '대담하고 실용적인 문제 해결사입니다. 도구와 기계에 능숙하며, 효율성을 중시합니다. 적응력이 높고 관찰력이 뛰어납니다.',
    strengths: ['논리적 사고', '침착함', '독립성', '실용성', '문제 해결 능력'],
    weaknesses: ['감정표현 어려움', '장기적 계획 어려움', '타인과의 관계 형성 어려움'],
    compatibleTypes: ['ESFJ', 'ENFJ'],
  },
  'ISFP': {
    type: 'ISFP',
    title: '호기심 많은 예술가',
    description: '자유로운 영혼을 가진 예술가입니다. 감각적이고 온화하며, 자신의 내면 가치에 충실합니다. 현재의 순간을 즐기는 유연한 성격입니다.',
    strengths: ['창의성', '감수성', '충실함', '적응력', '조화로움'],
    weaknesses: ['지나치게 독립적', '갈등 회피', '쉽게 상처받음', '장기 계획 부족'],
    compatibleTypes: ['ESTJ', 'ENTJ'],
  },
  'INFP': {
    type: 'INFP',
    title: '열정적인 중재자',
    description: '이상주의적이고 충실한 열정가입니다. 창의적이고 사람들을 돕는 것에 관심이 많으며, 깊은 가치를 중요시합니다.',
    strengths: ['이상주의', '적응력', '열정', '창의성', '공감 능력'],
    weaknesses: ['비현실적 기대', '지나친 이상주의', '자기비판', '현실적 문제 해결 어려움'],
    compatibleTypes: ['ESTJ', 'ENTJ'],
  },
  'INTP': {
    type: 'INTP',
    title: '논리적인 사색가',
    description: '지식과 논리를 추구하는 혁신적인 발명가입니다. 추상적 개념과 이론적 가능성에 관심이 많으며, 분석적이고 객관적입니다.',
    strengths: ['논리적 사고', '독창성', '열린 마음', '지적 호기심', '객관성'],
    weaknesses: ['세부사항 간과', '규칙 무시', '사회적 상호작용 어려움', '과도한 분석'],
    compatibleTypes: ['ESTJ', 'ENTJ'],
  },
  'ESTP': {
    type: 'ESTP',
    title: '모험을 즐기는 사업가',
    description: '활동적이고 현실적인 문제 해결사입니다. 위험을 감수하는 것을 즐기며, 에너지가 넘치고 적응력이 뛰어납니다.',
    strengths: ['대담함', '직접적임', '사교성', '현실감각', '실용성'],
    weaknesses: ['규칙 무시', '민감하지 못함', '장기 계획 어려움', '쉽게 지루해함'],
    compatibleTypes: ['ISFJ', 'ISTJ'],
  },
  'ESFP': {
    type: 'ESFP',
    title: '자유로운 영혼의 연예인',
    description: '열정적이고 활기찬 연예인형입니다. 사교적이고 즉흥적이며, 주변 사람들에게 기쁨을 주는 것을 좋아합니다.',
    strengths: ['열정', '사교성', '실용성', '관찰력', '적응력'],
    weaknesses: ['장기 계획 어려움', '갈등 회피', '집중력 부족', '쉽게 지루해함'],
    compatibleTypes: ['ISFJ', 'ISTJ'],
  },
  'ENFP': {
    type: 'ENFP',
    title: '재기발랄한 활동가',
    description: '열정적이고 창의적인 자유로운 영혼입니다. 가능성을 보는 능력이 뛰어나며, 새로운 아이디어와 인간관계에 대한 열정이 있습니다.',
    strengths: ['열정', '창의성', '카리스마', '독립성', '적응력'],
    weaknesses: ['우유부단함', '집중력 부족', '실용성 부족', '스트레스에 취약'],
    compatibleTypes: ['INFJ', 'INTJ'],
  },
  'ENTP': {
    type: 'ENTP',
    title: '논쟁을 즐기는 변론가',
    description: '지적 도전을 즐기는 영리한 호기심형입니다. 빠른 생각과 다양한 관심사를 가지고 있으며, 새로운 아이디어를 탐구하는 것을 좋아합니다.',
    strengths: ['창의성', '지적 능력', '적응력', '유연성', '카리스마'],
    weaknesses: ['논쟁적', '일관성 부족', '민감하지 못함', '싫증을 빨리 냄'],
    compatibleTypes: ['INFJ', 'INTJ'],
  },
  'ESTJ': {
    type: 'ESTJ',
    title: '엄격한 관리자',
    description: '실용적이고 사실적인 관리자형입니다. 전통과 질서를 중요시하며, 체계적이고 효율적인 방식으로 일을 처리합니다.',
    strengths: ['조직력', '헌신', '실용성', '직접적임', '책임감'],
    weaknesses: ['융통성 부족', '지나치게 전통적', '감정 이해 부족', '인내심 부족'],
    compatibleTypes: ['ISFP', 'INFP'],
  },
  'ESFJ': {
    type: 'ESFJ',
    title: '사교적인 외교관',
    description: '친절하고 협조적인 돌봄형입니다. 조화를 중요시하며, 타인의 필요에 민감하게 반응합니다. 사회적 관계를 잘 유지합니다.',
    strengths: ['사교성', '충실함', '책임감', '협동심', '실용성'],
    weaknesses: ['지나친 의존성', '비판에 민감함', '융통성 부족', '지나치게 타인 중심적'],
    compatibleTypes: ['ISTP', 'INTP'],
  },
  'ENFJ': {
    type: 'ENFJ',
    title: '정의로운 사회운동가',
    description: '카리스마 있고 영감을 주는 지도자형입니다. 타인의 성장을 도우며, 사회적 상호작용에 능숙합니다. 공동체의 화합을 중요시합니다.',
    strengths: ['카리스마', '이타주의', '신뢰성', '열정', '통찰력'],
    weaknesses: ['지나치게 이상주의적', '자신을 돌보지 않음', '지나치게 민감함', '우유부단함'],
    compatibleTypes: ['ISTP', 'INTP'],
  },
  'ENTJ': {
    type: 'ENTJ',
    title: '대담한 통솔자',
    description: '결단력 있고 대담한 지도자형입니다. 전략적 사고와 계획 능력이 뛰어나며, 목표 달성을 위해 효율적으로 행동합니다.',
    strengths: ['결단력', '자신감', '효율성', '리더십', '전략적 사고'],
    weaknesses: ['직설적', '참을성 부족', '감정 표현 어려움', '지배적'],
    compatibleTypes: ['ISFP', 'INFP'],
  },
};

const ResultPage = () => {
  const searchParams = useSearchParams();
  const mbtiType = searchParams.get('type') as MBTIType || 'ENFP';
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<MBTIResult | null>(null);
  
  useEffect(() => {
    // 유효한 MBTI 타입인지 확인
    if (mbtiType in mbtiResults) {
      setResult(mbtiResults[mbtiType]);
    } else {
      // 기본값 설정
      setResult(mbtiResults['ENFP']);
    }
  }, [mbtiType]);

  const handleShareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShareSNS = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(`나의 MBTI 결과는 ${result?.type}(${result?.title}) 입니다!`);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'kakao':
        // 카카오톡 공유 (실제로는 Kakao SDK 필요)
        alert('카카오톡 공유는 Kakao SDK 설정이 필요합니다.');
        return;
    }
    
    window.open(shareUrl, '_blank');
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            홈으로 돌아가기
          </Link>
        </div>

        {/* 상단 광고 배너 */}
        <AdBanner type="horizontal" position="top" />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {/* 결과 헤더 */}
          <div className="bg-indigo-600 dark:bg-indigo-800 p-6 md:p-8 text-white">
            <div className="text-center">
              <div className="inline-block bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 text-4xl font-bold px-4 py-2 rounded-lg mb-3">
                {result.type}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {result.title}
              </h1>
              <p className="text-indigo-100 dark:text-indigo-200">
                당신의 MBTI 성격 유형입니다
              </p>
            </div>
          </div>

          {/* 광고 배너 (예시) */}
          <div className="bg-gray-100 dark:bg-gray-700 p-3 text-center text-gray-500 dark:text-gray-300 text-sm">
            광고 영역 - 다양한 콘텐츠를 더 제공하기 위해 광고가 표시됩니다
          </div>

          {/* 결과 내용 */}
          <div className="p-6 md:p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                성격 유형 설명
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {result.description}
              </p>
            </div>

            {/* 중간 광고 */}
            <AdBanner type="horizontal" position="inline" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  강점
                </h2>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  {result.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  약점
                </h2>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                  {result.weaknesses.map((weakness, index) => (
                    <li key={index}>{weakness}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                잘 맞는 MBTI 유형
              </h2>
              <div className="flex flex-wrap gap-2">
                {result.compatibleTypes.map((type) => (
                  <div key={type} className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full">
                    {type}
                  </div>
                ))}
              </div>
            </div>

            {/* 공유 버튼 */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                결과 공유하기
              </h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleShareLink}
                  className="flex items-center justify-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
                  </svg>
                  {copied ? '복사됨!' : '링크 복사'}
                </button>
                <button
                  onClick={() => handleShareSNS('twitter')}
                  className="flex items-center justify-center px-4 py-2 bg-[#1DA1F2] text-white rounded-md hover:bg-[#0d8bd9] transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  트위터
                </button>
                <button
                  onClick={() => handleShareSNS('facebook')}
                  className="flex items-center justify-center px-4 py-2 bg-[#1877F2] text-white rounded-md hover:bg-[#0d66d0] transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  페이스북
                </button>
                <button
                  onClick={() => handleShareSNS('kakao')}
                  className="flex items-center justify-center px-4 py-2 bg-[#FEE500] text-[#3C1E1E] rounded-md hover:bg-[#f4d800] transition-colors"
                >
                  카카오톡
                </button>
              </div>
            </div>
          </div>

          {/* 측면 광고 (데스크톱에서만 보임) */}
          <div className="hidden lg:block lg:absolute lg:right-8 lg:top-60">
            <AdBanner type="vertical" position="inline" />
          </div>

          {/* 관련 테스트 추천 */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              다른 테스트도 해보세요
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/quizzes/mbti" className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-md mr-3">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">MBTI</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">MBTI 테스트 다시하기</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">다른 결과가 나올 수도 있어요</p>
                </div>
              </Link>
              <div className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg opacity-60">
                <div className="bg-pink-100 dark:bg-pink-900 p-2 rounded-md mr-3">
                  <span className="text-pink-600 dark:text-pink-400 font-bold">LOVE</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">연애 성향 테스트</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">출시 예정</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 하단 광고 배너 */}
        <AdBanner type="horizontal" position="bottom" />
      </div>
    </div>
  );
};

export default ResultPage; 