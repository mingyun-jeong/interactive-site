"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";
import AdBanner from "@/components/AdBanner";

// 연애 스타일 데이터
const loveTypes = [
  {
    id: 'RPCA',
    title: '로맨틱 파트너',
    description: '감성적이고 낭만적인 연애를 추구하며, 상대방에게 헌신적입니다. 작은 이벤트와 기념일을 챙기고 감정 표현에 솔직합니다.',
    image: '/images/love/romantic.png',
    emoji: '💖',
    characteristics: [
      '낭만적인 이벤트와 깜짝 선물을 좋아함',
      '감정 표현에 솔직하고 적극적',
      '기념일과 특별한 날을 중요시함',
      '관계에 헌신적이고 충실함'
    ],
    strengths: [
      '따뜻한 감성으로 파트너를 행복하게 만듦',
      '관계에 항상 새로움과 설렘을 유지함',
      '풍부한 감정 표현으로 파트너가 사랑받는다고 느끼게 함'
    ],
    weaknesses: [
      '현실적인 측면을 간과할 수 있음',
      '지나친 감정적 기복',
      '과도한 기대로 실망감 경험'
    ],
    advice: '지나친 감정 기복에 주의하세요. 현실적인 측면도 함께 고려하면 더 균형 잡힌 관계를 유지할 수 있습니다.'
  },
  {
    id: 'RPDA',
    title: '신중한 계획가',
    description: '관계의 미래를 중요시하고 계획적으로 연애를 이끌어 나갑니다. 안정적이고 신뢰할 수 있는 파트너입니다.',
    image: '/images/love/planner.png',
    emoji: '📝',
    characteristics: [
      '장기적인 관계 목표를 중요시함',
      '계획적이고 체계적인 데이트 선호',
      '약속과 신뢰를 중요하게 생각함',
      '감정보다 논리적인 판단을 우선시함'
    ],
    strengths: [
      '믿음직하고 안정적인 파트너',
      '미래를 함께 계획하고 준비함',
      '책임감 있고 의지할 수 있는 존재'
    ],
    weaknesses: [
      '융통성이 부족할 수 있음',
      '자발적인 순간을 놓칠 수 있음',
      '지나친 계획으로 스트레스 유발'
    ],
    advice: '때로는 계획에서 벗어나 즉흥적인 순간을 즐겨보세요. 모든 것이 계획대로 되지 않아도 괜찮습니다.'
  },
  {
    id: 'RSCA',
    title: '배려하는 지지자',
    description: '파트너의 필요와 감정에 세심하게 주의를 기울이며, 무조건적인 지지와 배려를 보여줍니다.',
    image: '/images/love/supporter.png',
    emoji: '🤗',
    characteristics: [
      '파트너의 이야기를 경청하고 공감함',
      '상대방의 필요를 먼저 생각함',
      '갈등보다 조화를 추구함',
      '지지와 격려를 아끼지 않음'
    ],
    strengths: [
      '따뜻하고 안정적인 관계 형성',
      '파트너가 정서적으로 안전하다고 느끼게 함',
      '문제 상황에서 든든한 지원군 역할'
    ],
    weaknesses: [
      '자신의 필요를 무시할 수 있음',
      '지나친 자기희생적 태도',
      '갈등을 회피하는 경향'
    ],
    advice: '자신의 필요와 감정도 중요합니다. 지나친 자기희생은 장기적으로 관계에 부정적 영향을 줄 수 있어요.'
  },
  {
    id: 'RPCD',
    title: '실용적 동반자',
    description: '현실적이고 실용적인 관계를 추구하며, 서로의 독립성과 성장을 중요시합니다.',
    image: '/images/love/practical.png',
    emoji: '🔄',
    characteristics: [
      '실용적이고 현실적인 관계 추구',
      '독립성과 개인 공간을 중요시함',
      '명확한 의사소통 선호',
      '문제 해결 중심적 접근'
    ],
    strengths: [
      '합리적이고 균형 잡힌 관계 유지',
      '서로의 성장과 발전을 지원함',
      '갈등 상황에서 효과적인 해결책 제시'
    ],
    weaknesses: [
      '감정적 측면을 간과할 수 있음',
      '때로는 너무 냉정해 보일 수 있음',
      '지나친 독립성으로 거리감 형성'
    ],
    advice: '때로는 논리보다 감정에 집중해보세요. 파트너의 감정적 필요에 더 민감하게 반응하면 관계가 더 깊어질 수 있습니다.'
  },
  {
    id: 'ASCD',
    title: '정열적 탐험가',
    description: '열정적이고 스릴 넘치는 관계를 추구하며, 새로운 경험과 도전을 함께 즐깁니다.',
    image: '/images/love/adventurer.png',
    emoji: '🔥',
    characteristics: [
      '활동적이고 모험적인 데이트 선호',
      '열정적인 감정 표현',
      '새로운 경험과 도전을 추구함',
      '자발적이고 즉흥적인 성향'
    ],
    strengths: [
      '관계에 활력과 흥미를 불어넣음',
      '지루함을 느낄 틈 없는 역동적인 관계',
      '파트너와 함께 성장하고 새로운 세계를 탐험함'
    ],
    weaknesses: [
      '지속적인 자극을 필요로 함',
      '안정과 일상을 소홀히 할 수 있음',
      '감정적 기복이 클 수 있음'
    ],
    advice: '때로는 안정과 일상의 소중함도 느껴보세요. 모든 순간이 극적이거나 흥미진진할 필요는 없습니다.'
  },
  {
    id: 'ASCA',
    title: '독립적 자유인',
    description: '자신과 파트너 모두의 독립성을 중요시하며, 서로 구속하지 않는 자유로운 관계를 추구합니다.',
    image: '/images/love/independent.png',
    emoji: '🕊️',
    characteristics: [
      '개인의 자유와 독립성을 중요시함',
      '구속되지 않는 관계 추구',
      '자신의 시간과 공간을 필요로 함',
      '파트너의 자율성을 존중함'
    ],
    strengths: [
      '서로에게 충분한 성장 공간 제공',
      '신선함과 독립성이 유지되는 관계',
      '상대방을 소유하려 하지 않고 있는 그대로 받아들임'
    ],
    weaknesses: [
      '지나친 독립성으로 정서적 거리감 형성',
      '친밀감 형성의 어려움',
      '관계에 충분한 시간과 노력을 투자하지 않을 수 있음'
    ],
    advice: '독립성도 중요하지만, 유대감과 친밀함을 위한 시간도 필요합니다. 적절한 균형을 찾아보세요.'
  },
  {
    id: 'APCD',
    title: '분석적 전략가',
    description: '관계의 패턴과 역학을 분석하고 이해하려 하며, 효과적인 의사소통과 문제 해결을 중요시합니다.',
    image: '/images/love/analyzer.png',
    emoji: '🧠',
    characteristics: [
      '관계의 패턴과 역학을 분석함',
      '논리적이고 체계적인 문제 해결 접근',
      '감정보다 이성적 판단 우선',
      '명확하고 직접적인 의사소통 선호'
    ],
    strengths: [
      '관계의 문제를 객관적으로 해결할 수 있음',
      '효과적인 의사소통으로 오해를 줄임',
      '장기적인 관계 발전을 위한 전략적 사고'
    ],
    weaknesses: [
      '감정적 측면을 간과할 수 있음',
      '지나친 분석으로 자연스러움 상실',
      '때로는 거리감 있게 느껴질 수 있음'
    ],
    advice: '때로는 분석을 멈추고 순간의 감정을 느껴보세요. 모든 관계의 측면이 논리적으로 설명될 수는 없습니다.'
  },
  {
    id: 'APDR',
    title: '헌신적 보호자',
    description: '파트너를 깊이 보살피고 보호하려는 성향이 강하며, 안정적이고 신뢰할 수 있는 관계를 중요시합니다.',
    image: '/images/love/protector.png',
    emoji: '🛡️',
    characteristics: [
      '파트너를 보호하고 돌보려는 성향',
      '안정적이고 신뢰할 수 있는 관계 추구',
      '책임감과 헌신이 강함',
      '파트너의 안전과 행복을 최우선시함'
    ],
    strengths: [
      '파트너에게 안정감과 신뢰를 제공함',
      '어려운 시기에도 변함없는 지지와 헌신',
      '강한 책임감으로 관계를 단단하게 유지'
    ],
    weaknesses: [
      '과잉보호로 파트너의 자율성 제한',
      '지나친 책임감으로 스트레스 경험',
      '자신의 필요를 희생하는 경향'
    ],
    advice: '과잉보호는 오히려 파트너의 성장을 방해할 수 있습니다. 때로는 거리를 두고 스스로 결정할 기회를 주세요.'
  }
];

function LoadingFallback() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
    </div>
  );
}

function LoveStyleResultContent() {
  const searchParams = useSearchParams();
  const typeId = searchParams.get('type') || 'RPCA'; // 기본값은 로맨틱 파트너
  
  const result = loveTypes.find(type => type.id === typeId) || loveTypes[0];
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <LoadingFallback />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-pink-50 to-purple-100 dark:from-gray-900 dark:to-purple-900 min-h-screen">
      <AdBanner type="horizontal" position="top" />
      
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-8">
          <h1 className="text-white text-3xl md:text-4xl font-bold text-center">
            당신의 연애 스타일은
          </h1>
          <p className="text-pink-100 text-center mt-2">나만의 연애 유형 테스트 결과</p>
        </div>
        
        {/* 결과 내용 */}
        <div className="p-8">
          {/* 유형 기본 정보 */}
          <div className="flex flex-col md:flex-row gap-8 mb-10">
            <div className="w-[300px] h-[300px] rounded-xl overflow-hidden flex-shrink-0 mx-auto md:mx-0 shadow-lg border-4 border-pink-100 dark:border-pink-900">
              <div className="w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-800 dark:to-purple-800 flex items-center justify-center">
                <span className="text-8xl">{result.emoji}</span>
              </div>
            </div>
            <div className="text-center md:text-left flex flex-col justify-center">
              <div className="inline-block px-4 py-1 bg-pink-100 dark:bg-pink-900 rounded-full text-pink-800 dark:text-pink-200 text-sm font-medium mb-3">
                연애 유형
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
                {result.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed">{result.description}</p>
            </div>
          </div>
          
          {/* 특성 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* 특징 */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/30 dark:to-purple-900/30 p-6 rounded-xl shadow-sm border border-pink-100 dark:border-pink-800">
              <h3 className="font-bold text-xl mb-4 text-pink-700 dark:text-pink-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                당신의 특징
              </h3>
              <ul className="space-y-2">
                {result.characteristics.map((trait, idx) => (
                  <li key={idx} className="text-gray-700 dark:text-gray-300 flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-pink-400 mt-2 mr-2 flex-shrink-0"></span>
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* 강점 */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 p-6 rounded-xl shadow-sm border border-purple-100 dark:border-purple-800">
              <h3 className="font-bold text-xl mb-4 text-purple-700 dark:text-purple-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                강점
              </h3>
              <ul className="space-y-2">
                {result.strengths.map((strength, idx) => (
                  <li key={idx} className="text-gray-700 dark:text-gray-300 flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mt-2 mr-2 flex-shrink-0"></span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* 약점 및 조언 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* 약점 */}
            <div className="bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-900/30 dark:to-red-900/30 p-6 rounded-xl shadow-sm border border-rose-100 dark:border-rose-800">
              <h3 className="font-bold text-xl mb-4 text-rose-700 dark:text-rose-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                주의할 점
              </h3>
              <ul className="space-y-2">
                {result.weaknesses.map((weakness, idx) => (
                  <li key={idx} className="text-gray-700 dark:text-gray-300 flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-rose-400 mt-2 mr-2 flex-shrink-0"></span>
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* 조언 */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 p-6 rounded-xl shadow-sm border border-amber-100 dark:border-amber-800">
              <h3 className="font-bold text-xl mb-4 text-amber-700 dark:text-amber-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                조언
              </h3>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "{result.advice}"
              </p>
            </div>
          </div>
          
          {/* 공유 버튼 */}
          <div className="mt-10 pb-4 border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-center text-lg font-medium mb-5 text-gray-700 dark:text-gray-300">결과 공유하기</h3>
            <ShareButtons 
              title={`내 연애 스타일은 ${result.title}입니다!`} 
              hashtags={['연애스타일테스트', '연애유형', '심리테스트']}
            />
          </div>
          
          {/* 다시하기 버튼 */}
          <div className="mt-10 text-center">
            <Link 
              href="/quizzes/love" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium rounded-full hover:from-pink-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              테스트 다시 하기
            </Link>
          </div>
        </div>
      </div>
      
      <AdBanner type="horizontal" position="bottom" />
    </div>
  );
}

export default function LoveStyleResult() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LoveStyleResultContent />
    </Suspense>
  );
} 