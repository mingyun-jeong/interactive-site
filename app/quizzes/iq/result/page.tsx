"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Brain, ChevronLeft, Share2 } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";
import AdBanner from "@/components/AdBanner";
import Image from "next/image";

// IQ 점수 해석 데이터
const iqRanges = [
  {
    min: 130,
    max: 200,
    level: "매우 우수",
    description: "최상위 지능 수준으로, 인구의 약 2.1%만이 이 범위에 해당합니다. 복잡한 문제를 해결하는 능력이 탁월하며, 추상적 사고와. 논리적 추론 능력이 뛰어납니다.",
    image: "/images/iq/genius.png",
    emoji: "🧠",
    percentage: "상위 2.1%",
    strengths: [
      "매우 빠른 정보 처리 능력",
      "복잡한 패턴 인식에 탁월함",
      "추상적 개념을 쉽게 이해함",
      "창의적인 문제 해결 능력"
    ],
    careers: [
      "연구원", "과학자", "수학자", "전략가", "프로그래머"
    ]
  },
  {
    min: 120,
    max: 129,
    level: "우수",
    description: "높은 지능 수준으로, 인구의 약 6.7%가 이 범위에 속합니다. 학습 능력이 뛰어나며 복잡한 개념을 이해하는 데 탁월합니다.",
    image: "/images/iq/superior.png",
    emoji: "🔍",
    percentage: "상위 8.8%",
    strengths: [
      "빠른 학습 능력",
      "분석적 사고력이 뛰어남",
      "문제 해결 방법을 쉽게 발견함",
      "새로운 정보를 효율적으로 처리함"
    ],
    careers: [
      "엔지니어", "의사", "변호사", "교수", "기획자"
    ]
  },
  {
    min: 110,
    max: 119,
    level: "평균 이상",
    description: "우수한 지능으로, 인구의 약 16.1%가 이 범위에 속합니다. 대학 졸업자들의 평균적인 IQ 수준이며, 대부분의 전문직에서 요구되는 수준입니다.",
    image: "/images/iq/above_average.png",
    emoji: "📚",
    percentage: "상위 24.9%",
    strengths: [
      "개념을 빠르게 이해하는 능력",
      "논리적 추론 능력이 좋음",
      "효과적인 학습 전략 사용",
      "복잡한 정보를 정리하는 능력"
    ],
    careers: [
      "관리자", "교사", "회계사", "중간 관리직", "기술직"
    ]
  },
  {
    min: 90,
    max: 109,
    level: "평균",
    description: "일반적인 지능 수준으로, 인구의 약 50%가 이 범위에 속합니다. 대부분의 직업에서 요구되는 인지 능력을 충분히 갖추고 있습니다.",
    image: "/images/iq/average.png",
    emoji: "📊",
    percentage: "중앙 50%",
    strengths: [
      "실용적인 문제 해결 능력",
      "다양한 상황에 적응하는 능력",
      "일상적인 과제를 효과적으로 처리함",
      "사회적 상황을 잘 이해함"
    ],
    careers: [
      "사무직", "영업직", "서비스업", "기술직", "생산직"
    ]
  },
  {
    min: 80,
    max: 89,
    level: "평균 이하",
    description: "약간 낮은 지능 수준으로, 인구의 약 16.1%가 이 범위에 속합니다. 기본적인 학습 능력을 갖추고 있으며, 구체적이고 일상적인 업무에 적합합니다.",
    image: "/images/iq/below_average.png",
    emoji: "🔧",
    percentage: "하위 24.9%",
    strengths: [
      "반복적인 작업에 높은 집중력",
      "실용적인 기술 습득 능력",
      "구체적인 지시를 잘 따름",
      "체계적인 환경에서 효율적으로 작업함"
    ],
    careers: [
      "기술직", "서비스업", "생산직", "보조 업무"
    ]
  },
  {
    min: 0,
    max: 79,
    level: "낮음",
    description: "낮은 지능 수준으로, 인구의 약 8.9%가 이 범위에 속합니다. 일상적인 과제를 수행할 수 있으나, 복잡한 개념 이해에 어려움을 겪을 수 있습니다.",
    image: "/images/iq/low.png",
    emoji: "⚙️",
    percentage: "하위 8.9%",
    strengths: [
      "구체적인 작업에 집중력 발휘",
      "단순하고 명확한 지시를 잘 따름",
      "반복적인 작업에서 일관성 유지",
      "특정 분야에서 실용적인 기술 개발"
    ],
    careers: [
      "보조 업무", "단순 반복 작업", "감독하에 수행하는 업무"
    ]
  }
];

// 동물 IQ 비교 데이터
const animalIqComparisons = [
  { score: 140, animal: "돌고래", description: "돌고래는 가장 지능이 높은, 인간 이외의 동물로 알려져 있습니다. 복잡한 문제 해결 능력과 도구 사용, 자기 인식을 가지고 있습니다." },
  { score: 130, animal: "침팬지", description: "침팬지는 도구를 사용하고, 언어를 배우며, 심지어 계획을 세우는 등 인간과 매우 유사한 인지 능력을 보입니다." },
  { score: 120, animal: "고릴라", description: "고릴라는 추상적 사고가 가능하며, 문제 해결 능력이 뛰어나고 감정 이해와 표현이 가능합니다." },
  { score: 110, animal: "코끼리", description: "코끼리는 뛰어난 기억력과 공감 능력을 가지고 있으며, 복잡한 사회적 구조를 이해하고 유지합니다." },
  { score: 100, animal: "까마귀", description: "까마귀는 도구를 사용하고 복잡한 문제를 해결할 수 있는 놀라운 지능을 가지고 있습니다. 인과 관계를 이해하는 능력이 매우 뛰어납니다." },
  { score: 95, animal: "오랑우탄", description: "오랑우탄은 도구를 사용하고, 새로운 상황에 적응하는 창의적인 문제 해결 능력을 가지고 있습니다." },
  { score: 90, animal: "돼지", description: "돼지는 놀라울 정도로 학습 능력이 뛰어나며, 미로를 빠져나오는 문제 해결 능력이 우수합니다." },
  { score: 85, animal: "비둘기", description: "비둘기는 훌륭한 길 찾기 능력과 패턴 인식 능력을 가지고 있으며, 추상적인 개념도 이해할 수 있습니다." },
  { score: 80, animal: "고양이", description: "고양이는 문제 해결 능력이 있으며, 관찰을 통한 학습이 가능합니다." },
  { score: 75, animal: "다람쥐", description: "다람쥐는 복잡한 공간 기억력과 문제 해결 능력을 가지고 있습니다." },
  { score: 70, animal: "쥐", description: "쥐는 미로를 학습하고 문제를 해결하는 능력이 뛰어납니다." }
];

// 가장 가까운 동물 IQ 찾기 함수
function findClosestAnimalIq(score) {
  return animalIqComparisons.reduce((closest, current) => {
    return Math.abs(current.score - score) < Math.abs(closest.score - score) ? current : closest;
  });
}

function LoadingFallback() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
    </div>
  );
}

function IQResultContent() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get('score') || '100', 10);
  
  // 점수 범위 확인 (85-145)
  const validScore = Math.max(70, Math.min(145, score));
  
  // IQ 레벨 찾기
  const iqLevel = iqRanges.find(range => validScore >= range.min && validScore <= range.max);
  
  // 가장 가까운 동물 IQ 찾기
  const closestAnimal = findClosestAnimalIq(validScore);
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <LoadingFallback />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-amber-50 to-yellow-100 dark:from-slate-900 dark:to-amber-900 min-h-screen">
      <AdBanner type="horizontal" position="top" />
      
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-8">
          <Link 
            href="/"
            className="inline-flex items-center text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full mb-6 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            홈으로
          </Link>
          <h1 className="text-white text-3xl md:text-4xl font-bold text-center">
            당신의 IQ 점수는
          </h1>
          <div className="flex justify-center mt-4">
            <div className="bg-white/20 backdrop-blur-sm px-8 py-4 rounded-xl">
              <span className="text-white text-5xl md:text-6xl font-bold">{validScore}</span>
            </div>
          </div>
          <p className="text-amber-100 text-center mt-4">IQ 테스트 결과</p>
        </div>
        
        {/* 결과 내용 */}
        <div className="p-8">
          {/* 레벨 정보 */}
          <div className="flex flex-col md:flex-row gap-8 mb-10">
            <div className="w-[300px] h-[300px] rounded-xl overflow-hidden flex-shrink-0 mx-auto md:mx-0 shadow-lg border-4 border-amber-100 dark:border-amber-900">
              <div className="w-full h-full bg-gradient-to-br from-amber-200 to-yellow-200 dark:from-amber-800 dark:to-yellow-800 flex items-center justify-center">
                <span className="text-8xl">{iqLevel?.emoji || '🧠'}</span>
              </div>
            </div>
            <div className="text-center md:text-left flex flex-col justify-center">
              <div className="inline-block px-4 py-1 bg-amber-100 dark:bg-amber-900 rounded-full text-amber-800 dark:text-amber-200 text-sm font-medium mb-3">
                {iqLevel?.percentage || ''}
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-yellow-600 mb-4">
                {iqLevel?.level || '평균'} 수준
              </h2>
              <p className="text-slate-700 dark:text-slate-200 text-lg leading-relaxed">
                {iqLevel?.description || '일반적인 지능 수준입니다.'}
              </p>
            </div>
          </div>
          
          {/* IQ 점수 그래프 */}
          <div className="mb-10 bg-slate-50 dark:bg-slate-700/30 p-6 rounded-xl">
            <h3 className="font-bold text-xl mb-6 text-slate-800 dark:text-white">IQ 분포에서 내 위치</h3>
            <div className="relative h-12 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="absolute h-full w-full flex items-center justify-between px-4 text-xs">
                <span>70</span>
                <span>85</span>
                <span>100</span>
                <span>115</span>
                <span>130</span>
                <span>145</span>
              </div>
              <div 
                className="absolute h-full bg-gradient-to-r from-amber-400 to-yellow-500"
                style={{ width: `${Math.min(100, Math.max(0, ((validScore - 70) / 75) * 100))}%` }}
              ></div>
              <div 
                className="absolute top-0 h-full w-4 bg-amber-600 border-2 border-white dark:border-slate-800"
                style={{ left: `calc(${Math.min(100, Math.max(0, ((validScore - 70) / 75) * 100))}% - 8px)` }}
              ></div>
            </div>
            <div className="mt-2 flex justify-between text-sm text-slate-500 dark:text-slate-400">
              <span>낮음</span>
              <span>평균 이하</span>
              <span>평균</span>
              <span>평균 이상</span>
              <span>우수</span>
              <span>매우 우수</span>
            </div>
          </div>
          
          {/* 동물 IQ 비교 섹션 추가 */}
          <div className="mb-10 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-amber-100 dark:border-amber-800">
            <h3 className="font-bold text-xl mb-4 text-amber-700 dark:text-amber-300">
              당신의 IQ와 비슷한 동물
            </h3>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-[120px] h-[120px] bg-amber-100 dark:bg-amber-800 rounded-full flex items-center justify-center overflow-hidden relative">
                <span className="text-5xl">{closestAnimal.animal === "돌고래" ? "🐬" : 
                                          closestAnimal.animal === "침팬지" ? "🐒" : 
                                          closestAnimal.animal === "고릴라" ? "🦍" : 
                                          closestAnimal.animal === "코끼리" ? "🐘" : 
                                          closestAnimal.animal === "까마귀" ? "🐦" : 
                                          closestAnimal.animal === "오랑우탄" ? "🦧" : 
                                          closestAnimal.animal === "돼지" ? "🐷" : 
                                          closestAnimal.animal === "비둘기" ? "🕊️" : 
                                          closestAnimal.animal === "고양이" ? "🐱" : 
                                          closestAnimal.animal === "다람쥐" ? "🐿️" : "🐭"}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="text-2xl font-bold text-amber-800 dark:text-amber-200 mr-2">{closestAnimal.animal}</span>
                  <span className="text-sm bg-amber-200 dark:bg-amber-700 px-2 py-1 rounded-full text-amber-800 dark:text-amber-200">
                    IQ 약 {closestAnimal.score}
                  </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  {closestAnimal.description}
                </p>
                <p className="mt-4 text-sm text-amber-600 dark:text-amber-400 italic">
                  * 동물의 IQ 측정은 직접적이지 않으며, 인간의 척도로 추정한 값입니다.
                </p>
              </div>
            </div>
          </div>
          
          {/* 강점 및 적합 직업 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* 강점 */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 p-6 rounded-xl shadow-sm border border-amber-100 dark:border-amber-800">
              <h3 className="font-bold text-xl mb-4 text-amber-700 dark:text-amber-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                당신의 강점
              </h3>
              <ul className="space-y-2">
                {iqLevel?.strengths.map((strength, idx) => (
                  <li key={idx} className="text-slate-700 dark:text-slate-300 flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-amber-400 mt-2 mr-2 flex-shrink-0"></span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* 적합 직업 */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 p-6 rounded-xl shadow-sm border border-yellow-100 dark:border-yellow-800">
              <h3 className="font-bold text-xl mb-4 text-yellow-700 dark:text-yellow-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                적합한 직업군
              </h3>
              <div className="flex flex-wrap gap-2">
                {iqLevel?.careers.map((career, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 rounded-full text-sm"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* 참고 사항 */}
          <div className="bg-slate-50 dark:bg-slate-700/30 p-6 rounded-xl mb-10">
            <h3 className="font-bold text-xl mb-4 text-slate-800 dark:text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              참고 사항
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              이 IQ 테스트는 간단한 온라인 테스트이므로 결과는 참고용으로만 활용해 주세요. 정확한 IQ 측정을 원하신다면 전문가가 관리하는 표준화된 테스트를 받는 것이 좋습니다. 지능은 단일 수치로 표현할 수 없는 복합적인 특성이며, 논리-수학적 지능, 언어적 지능, 공간적 지능, 대인관계 지능 등 다양한 유형이 있습니다.
            </p>
          </div>
          
          {/* 공유 버튼 */}
          <div className="mt-10 pb-4 border-t border-slate-200 dark:border-slate-700 pt-8">
            <h3 className="text-center text-lg font-medium mb-5 text-slate-700 dark:text-slate-300">결과 공유하기</h3>
            <ShareButtons 
              title={`내 IQ 점수는 ${validScore}점입니다! (${iqLevel?.level || '평균'} 수준)`} 
              hashtags={['IQ테스트', '지능검사', '심리테스트']}
            />
          </div>
          
          {/* 다시하기 버튼 */}
          <div className="mt-10 text-center">
            <Link 
              href="/quizzes/iq" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-medium rounded-full hover:from-amber-700 hover:to-yellow-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
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

export default function IQResult() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <IQResultContent />
    </Suspense>
  );
} 