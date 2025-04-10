"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";
import AdBanner from "@/components/AdBanner";

// 원피스 캐릭터 MBTI 데이터
const mbtiData = {
  'ENFP': {
    type: 'ENFP',
    characterName: '몽키 D. 루피',
    emoji: '🏴',
    image: '/images/characters/luffy.png',
    description: '자유롭고 긍정적이며 사람을 끌어당기는 에너지의 소유자. 즉흥적이나 열정적.',
    strengths: ['긍정적', '열정적', '적응력이 뛰어남', '카리스마'],
    weaknesses: ['충동적', '무모함', '계획성 부족'],
    compatibleTypes: ['INTJ', 'INFJ']
  },
  'ENTP': {
    type: 'ENTP',
    characterName: '우솝',
    emoji: '🎩',
    image: '/images/characters/usopp.png',
    description: '상상력이 풍부하고 수다스러우며, 창의적인 아이디어가 많음. 유쾌하고 변화를 즐김.',
    strengths: ['창의성', '적응력', '재치', '문제해결 능력'],
    weaknesses: ['일관성 부족', '과장', '때로는 비현실적'],
    compatibleTypes: ['INTJ', 'INFJ']
  },
  'ENFJ': {
    type: 'ENFJ',
    characterName: '비비',
    emoji: '🧑‍🏫',
    image: '/images/characters/vivi.png',
    description: '사람을 이끄는 리더십, 타인을 위하는 성향이 강함. 공감 능력 우수.',
    strengths: ['영감을 주는 능력', '공감력', '카리스마', '헌신'],
    weaknesses: ['지나친 이상주의', '자기희생', '타인의 기대에 스트레스'],
    compatibleTypes: ['INFP', 'ISFP']
  },
  'ENTJ': {
    type: 'ENTJ',
    characterName: '상디',
    emoji: '👑',
    image: '/images/characters/sanji.png',
    description: '목적 중심, 추진력 강하고 전략적 사고. 리더 자질 있음.',
    strengths: ['리더십', '결단력', '효율성', '전략적 사고'],
    weaknesses: ['통제적 경향', '감정 간과', '지나친 직설적임'],
    compatibleTypes: ['INFP', 'INTP']
  },
  'ESFP': {
    type: 'ESFP',
    characterName: '프랑키',
    emoji: '🌊',
    image: '/images/characters/franky.png',
    description: '쇼맨십 강하고 감정 표현이 풍부하며 즐거움을 추구함. 주변에 활기 전달.',
    strengths: ['적응력', '현실감각', '열정', '상황 대처 능력'],
    weaknesses: ['장기 계획 부족', '갈등 회피', '충동적 경향'],
    compatibleTypes: ['ISTJ', 'ISFJ']
  },
  'ESTP': {
    type: 'ESTP',
    characterName: '포트거스 D. 에이스',
    emoji: '💥',
    image: '/images/characters/ace.png',
    description: '충동적이고 열정적인 행동파. 전투를 즐기며 직관적으로 움직임.',
    strengths: ['적응력', '실용성', '대담함', '문제해결 능력'],
    weaknesses: ['충동적', '인내심 부족', '위험 감수'],
    compatibleTypes: ['ISFJ', 'ISTJ']
  },
  'ESFJ': {
    type: 'ESFJ',
    characterName: '샹크스',
    emoji: '🍰',
    image: '/images/characters/shanks.png',
    description: '책임감 있고 모두를 아끼며 평화를 중시. 분위기를 부드럽게 만드는 유형.',
    strengths: ['협력', '책임감', '친절함', '조직력'],
    weaknesses: ['비판에 민감', '지나친 자기희생', '갈등 회피'],
    compatibleTypes: ['ISTP', 'ISFP']
  },
  'ESTJ': {
    type: 'ESTJ',
    characterName: '스모커',
    emoji: '⚔️',
    image: '/images/characters/smoker.png',
    description: '원칙주의적이고 정의에 엄격함. 현실적이고 체계적 리더십을 선호함.',
    strengths: ['조직력', '결단력', '신뢰성', '효율성'],
    weaknesses: ['융통성 부족', '감정표현 어려움', '지나친 직설적임'],
    compatibleTypes: ['ISTP', 'ISFP']
  },
  'INFP': {
    type: 'INFP',
    characterName: '나미',
    emoji: '🐌',
    image: '/images/characters/nami.png',
    description: '감정이 깊고 이상주의적이면서도 자기중심적 감정 세계를 중시함. 돈과 감정 사이의 균형자.',
    strengths: ['창의성', '상상력', '충성심', '깊은 감정'],
    weaknesses: ['현실성 부족', '자기비판', '우유부단함'],
    compatibleTypes: ['ENFJ', 'ENTJ']
  },
  'INFJ': {
    type: 'INFJ',
    characterName: '니코 로빈',
    emoji: '🧙‍♀️',
    image: '/images/characters/robin.png',
    description: '조용하고 지적이며 신비로운 분위기. 깊이 있는 통찰력과 타인의 내면을 잘 이해함.',
    strengths: ['직관력', '지혜', '통찰력', '충성심'],
    weaknesses: ['완벽주의', '비관적 경향', '때로는 냉담함'],
    compatibleTypes: ['ENFP', 'ENTP']
  },
  'INTP': {
    type: 'INTP',
    characterName: '프랑키',
    emoji: '🧪',
    image: '/images/characters/franky.png',
    description: '호기심 많고 분석적이며 새로운 것에 관심 많음. 감정보다 논리를 우선함.',
    strengths: ['창의성', '문제해결 능력', '적응력', '발명 능력'],
    weaknesses: ['우유부단함', '실행력 부족', '때로는 비현실적'],
    compatibleTypes: ['ENTJ', 'ENFJ']
  },
  'INTJ': {
    type: 'INTJ',
    characterName: '트라팔가 로',
    emoji: '🧠',
    image: '/images/characters/law.png',
    description: '전략적이고 독립적이며 감정보다 목표 달성에 집중함. 카리스마 있는 냉정한 리더.',
    strengths: ['전략적 사고', '독립성', '결단력', '지적 호기심'],
    weaknesses: ['고집', '냉담할 수 있음', '완벽주의'],
    compatibleTypes: ['ENFP', 'ENTP']
  },
  'ISFP': {
    type: 'ISFP',
    characterName: '토니토니 쵸파',
    emoji: '🍖',
    image: '/images/characters/chopper.png',
    description: '조용하지만 따뜻한 감성을 가진 힐러. 감정이 풍부하고 예술적 감수성 있음.',
    strengths: ['공감능력', '창의성', '상냥함', '적응력'],
    weaknesses: ['갈등 회피', '우유부단함', '자신감 부족'],
    compatibleTypes: ['ENFJ', 'ENTJ']
  },
  'ISFJ': {
    type: 'ISFJ',
    characterName: '히나',
    emoji: '🧺',
    image: '/images/characters/hina.png',
    description: '헌신적이고 조용한 노력가. 주변을 잘 챙기고 배려 깊음.',
    strengths: ['친절함', '충성심', '세심함', '책임감'],
    weaknesses: ['자기희생적', '갈등 회피', '변화에 약함'],
    compatibleTypes: ['ENFP', 'ENTP']
  },
  'ISTP': {
    type: 'ISTP',
    characterName: '로로노아 조로',
    emoji: '🗡️',
    image: '/images/characters/zoro.png',
    description: '말수 적고 행동 중심. 혼자만의 시간도 좋아하며 실용적이고 강함.',
    strengths: ['적응력', '문제해결 능력', '효율성', '위기 대처 능력'],
    weaknesses: ['감정 표현 어려움', '규칙 무시', '방향감각 없음'],
    compatibleTypes: ['ESTJ', 'ESFJ']
  },
  'ISTJ': {
    type: 'ISTJ',
    characterName: '징베',
    emoji: '📚',
    image: '/images/characters/jinbe.png',
    description: '충직하고 신뢰감 있는 성격. 원칙을 중시하며 신념을 위해 헌신함.',
    strengths: ['충성심', '규율', '직설적임', '침착함'],
    weaknesses: ['융통성 부족', '변화에 저항', '고집스러움'],
    compatibleTypes: ['ESFP', 'ESTP']
  }
};

function MbtiResultContent() {
  const searchParams = useSearchParams();
  const mbtiType = searchParams.get('type') || 'ENFP'; // 기본값은 루피(ENFP)
  
  const result = mbtiData[mbtiType as keyof typeof mbtiData] || mbtiData['ENFP'];
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <AdBanner type="horizontal" position="top" />
      
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h1 className="text-white text-2xl md:text-3xl font-bold text-center">
            당신의 원피스 캐릭터는
          </h1>
        </div>
        
        {/* 결과 내용 */}
        <div className="p-6">
          {/* 캐릭터 기본 정보 */}
          <div className="flex flex-col md:flex-row items-center mb-6">
            <div className="w-[300px] h-[370px] relative mb-4 md:mb-0 md:mr-6 flex-shrink-0">
              {result.image ? (
                <div className="w-full h-full rounded-lg overflow-hidden border-4 border-blue-500">
                  <Image
                    src={result.image}
                    alt={result.characterName}
                    width={300}
                    height={370}
                    className="object-cover w-full h-full object-center"
                    onError={() => {
                      // 이미지 로드 실패 시 처리 (콘솔에만 표시, 실제 UI에는 영향 없음)
                      console.log(`Failed to load image for ${result.characterName}`);
                    }}
                  />
                </div>
              ) : (
                <div className="w-[300px] h-[370px] rounded-lg border-4 border-blue-500 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                  <span className="text-7xl">{result.emoji}</span>
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-2">
                <span className="text-5xl mr-3">{result.emoji}</span>
                <h2 className="text-2xl md:text-3xl font-bold">{result.characterName}</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{result.type} - 원피스</p>
              <p className="text-gray-700 dark:text-gray-200 text-lg">{result.description}</p>
            </div>
          </div>
          
          {/* 특성 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* 강점 */}
            <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold text-xl mb-3 text-blue-700 dark:text-blue-300">강점</h3>
              <ul className="list-disc list-inside space-y-1">
                {result.strengths.map((strength, idx) => (
                  <li key={idx} className="text-gray-700 dark:text-gray-300">{strength}</li>
                ))}
              </ul>
            </div>
            
            {/* 약점 */}
            <div className="bg-red-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold text-xl mb-3 text-red-700 dark:text-red-300">약점</h3>
              <ul className="list-disc list-inside space-y-1">
                {result.weaknesses.map((weakness, idx) => (
                  <li key={idx} className="text-gray-700 dark:text-gray-300">{weakness}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* 궁합 정보 */}
          <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
            <h3 className="font-bold text-xl mb-3 text-purple-700 dark:text-purple-300">
              잘 맞는 MBTI 유형
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.compatibleTypes.map((type, idx) => (
                <span key={idx} className="px-3 py-1 bg-purple-200 dark:bg-purple-800 rounded-full text-purple-800 dark:text-purple-200">
                  {type}
                </span>
              ))}
            </div>
          </div>
          
          {/* 공유 버튼 */}
          <div className="mt-8">
            <h3 className="text-center text-lg font-medium mb-4">결과 공유하기</h3>
            <ShareButtons 
              title={`나의 원피스 캐릭터는 ${result.characterName}(${result.type})입니다!`} 
              hashtags={['원피스MBTI', '원피스캐릭터', 'MBTI테스트']}
            />
          </div>
          
          {/* 다시하기 버튼 */}
          <div className="mt-8 text-center">
            <Link 
              href="/quizzes/mbti" 
              className="inline-block px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
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

// 로딩 표시 컴포넌트
function LoadingResult() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p className="ml-3 text-lg">결과 분석 중...</p>
    </div>
  );
}

export default function MbtiResult() {
  return (
    <Suspense fallback={<LoadingResult />}>
      <MbtiResultContent />
    </Suspense>
  );
} 