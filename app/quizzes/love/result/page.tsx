"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Share2, Twitter, Facebook, Repeat2 } from 'lucide-react';
import { incrementVisitorCount } from '@/lib/visitors';
import { trackPageView, trackResultView, trackResultShare } from '@/lib/analytics';

// 결과 유형 인터페이스
interface ResultType {
  title: string;
  description: string;
  character: string;
  drama: string;
  image: string;
  traits: string[];
  advice: string;
}

// 성별에 따른 캐릭터 매핑
const maleResults: Record<string, ResultType> = {
  "로맨티스트": {
    title: "로맨틱 드림보이",
    description: "당신은 사랑에 올인하는 낭만적인 사람입니다. 작은 이벤트와 감동적인 고백을 준비하는 데 소질이 있어요.",
    character: "남도산",
    drama: "스타트업",
    image: "/images/love/romantic_male.jpg",
    traits: [
      "작은 기념일도 놓치지 않고 챙김",
      "감정 표현이 풍부하고 진심을 전하는 데 망설이지 않음",
      "상대방을 위해 이벤트와 깜짝 선물을 자주 준비함"
    ],
    advice: "너무 완벽한 로맨스를 추구하다 보면 현실의 소중함을 놓칠 수 있어요. 때로는 평범한 일상의 소중함도 느껴보세요."
  },
  "현실주의자": {
    title: "믿음직한 인생 파트너",
    description: "당신은 안정적이고 신뢰할 수 있는 파트너입니다. 현실적인 계획과 꾸준함으로 관계를 단단하게 만들어가요.",
    character: "차은호",
    drama: "로맨스는 별책부록",
    image: "/images/love/realist_male.jpg",
    traits: [
      "약속을 중요하게 여기고 책임감이 강함",
      "장기적인 관계를 중요시하며 미래를 함께 계획함",
      "실용적인 선물과 진정성 있는 행동을 보여줌"
    ],
    advice: "때로는 계획에서 벗어나 즉흥적인 순간을 즐겨보세요. 작은 낭만이 관계에 활력을 불어넣을 수 있어요."
  },
  "밀당파": {
    title: "매력적인 츤데레",
    description: "당신은 적절한 거리감으로 상대방의 마음을 설레게 하는 데 능숙합니다. 쿨한 매력과 따뜻함 사이의 갭이 매력적이에요.",
    character: "이동진",
    drama: "월계수 양복점 신사들",
    image: "/images/love/push_pull_male.jpg",
    traits: [
      "매력적인 미스터리함으로 상대의 호기심을 자극",
      "쿨한 척하지만 은근히 챙겨주는 츤데레 매력",
      "적절한 밀당으로 관계의 설렘을 유지"
    ],
    advice: "밀당이 길어지면 상대방이 지칠 수 있어요. 때로는 솔직한 마음을 보여주는 용기도 필요합니다."
  },
  "감성가": {
    title: "감성 충만 로맨티스트",
    description: "당신은 깊은 감성과 따뜻한 공감 능력을 가진 사람입니다. 상대방의 미묘한 감정 변화도 놓치지 않는 세심함이 매력이에요.",
    character: "정환",
    drama: "응답하라 1988",
    image: "/images/love/emotional_male.jpg",
    traits: [
      "감정을 섬세하게 표현하고 공감 능력이 뛰어남",
      "상대방의 작은 변화도 놓치지 않는 관찰력",
      "진심 어린 대화와 깊은 교감을 중요시함"
    ],
    advice: "감정에 너무 몰입하면 객관성을 잃을 수 있어요. 때로는 한 발 떨어져서 상황을 바라보는 여유도 필요합니다."
  },
  "직진파": {
    title: "솔직 담백 스트레이트",
    description: "당신은 솔직하고 직설적인 매력이 있습니다. 마음에 드는 사람에게 거침없이 다가가는 용기가 있어요.",
    character: "김탄",
    drama: "상속자들",
    image: "/images/love/straightforward_male.jpg",
    traits: [
      "마음에 드는 사람에게 적극적으로 표현",
      "거짓말이나 숨기는 것을 싫어하는 솔직함",
      "원하는 것을 위해 노력하는 추진력"
    ],
    advice: "너무 직진하면 상대방이 부담을 느낄 수 있어요. 상대방의 반응과 페이스도 존중해보세요."
  }
};


const femaleResults: Record<string, ResultType> = {
  "로맨티스트": {
    title: "로맨틱 드림걸",
    description: "당신은 사랑에 올인하는 낭만적인 사람입니다. 작은 이벤트와 감동적인 고백을 준비하는 데 소질이 있어요.",
    character: "백설희",
    drama: "쌈, 마이웨이",
    image: "/images/love/romantic_female.jpg",
    traits: [
      "작은 기념일도 놓치지 않고 챙김",
      "감정 표현이 풍부하고 진심을 전하는 데 망설이지 않음",
      "상대방을 위해 이벤트와 깜짝 선물을 자주 준비함"
    ],
    advice: "너무 완벽한 로맨스를 추구하다 보면 현실의 소중함을 놓칠 수 있어요. 때로는 평범한 일상의 소중함도 느껴보세요."
  },
  "현실주의자": {
    title: "믿음직한 인생 파트너",
    description: "당신은 안정적이고 신뢰할 수 있는 파트너입니다. 현실적인 계획과 꾸준함으로 관계를 단단하게 만들어가요.",
    character: "윤혜진",
    drama: "갯마을 차차차",
    image: "/images/love/realist_female.jpg",
    traits: [
      "약속을 중요하게 여기고 책임감이 강함",
      "장기적인 관계를 중요시하며 미래를 함께 계획함",
      "실용적인 선물과 진정성 있는 행동을 보여줌"
    ],
    advice: "때로는 계획에서 벗어나 즉흥적인 순간을 즐겨보세요. 작은 낭만이 관계에 활력을 불어넣을 수 있어요."
  },
  "밀당파": {
    title: "매력적인 츤데레",
    description: "당신은 적절한 거리감으로 상대방의 마음을 설레게 하는 데 능숙합니다. 쿨한 매력과 따뜻함 사이의 갭이 매력적이에요.",
    character: "장만월",
    drama: "호텔 델루나",
    image: "/images/love/push_pull_female.jpg",
    traits: [
      "매력적인 미스터리함으로 상대의 호기심을 자극",
      "쿨한 척하지만 은근히 챙겨주는 츤데레 매력",
      "적절한 밀당으로 관계의 설렘을 유지"
    ],
    advice: "밀당이 길어지면 상대방이 지칠 수 있어요. 때로는 솔직한 마음을 보여주는 용기도 필요합니다."
  },
  "감성가": {
    title: "감성 충만 로맨티스트",
    description: "당신은 깊은 감성과 따뜻한 공감 능력을 가진 사람입니다. 상대방의 미묘한 감정 변화도 놓치지 않는 세심함이 매력이에요.",
    character: "서희수",
    drama: "마인",
    image: "/images/love/emotional_female.jpg",
    traits: [
      "감정을 섬세하게 표현하고 공감 능력이 뛰어남",
      "상대방의 작은 변화도 놓치지 않는 관찰력",
      "진심 어린 대화와 깊은 교감을 중요시함"
    ],
    advice: "감정에 너무 몰입하면 객관성을 잃을 수 있어요. 때로는 한 발 떨어져서 상황을 바라보는 여유도 필요합니다."
  },
  "직진파": {
    title: "솔직 담백 스트레이트",
    description: "당신은 솔직하고 직설적인 매력이 있습니다. 마음에 드는 사람에게 거침없이 다가가는 용기가 있어요.",
    character: "성나정",
    drama: "응답하라 1994",
    image: "/images/love/straightforward_female.jpg",
    traits: [
      "마음에 드는 사람에게 적극적으로 표현",
      "거짓말이나 숨기는 것을 싫어하는 솔직함",
      "원하는 것을 위해 노력하는 추진력"
    ],
    advice: "너무 직진하면 상대방이 부담을 느낄 수 있어요. 상대방의 반응과 페이스도 존중해보세요."
  }
};


// 결과 컴포넌트
function ResultContent() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  
  const type = searchParams?.get('type') || "로맨티스트";
  const gender = searchParams?.get('gender') || "female";
  
  const results = gender === 'male' ? maleResults : femaleResults;
  const result = results[decodeURIComponent(type)] || results["로맨티스트"];
  
  useEffect(() => {
    setMounted(true);
    
    // 결과 페이지 조회 이벤트 트래킹
    trackPageView('love', 'Love Result Page');
    trackResultView('love', `Type: ${type}, Gender: ${gender}`);
    
    // 브라우저 환경에서만 실행
    if (typeof window !== 'undefined') {
      try {
        const pathname = window.location.pathname;
        incrementVisitorCount(pathname).catch(() => {
          // 오류가 발생해도 앱 기능에 영향을 주지 않음
        });
      } catch {
        // 예외 처리가 되어도 앱이 계속 작동
      }
    }
  }, [type, gender]);
  
  const handleShare = () => {
    // 공유 이벤트 트래킹
    trackResultShare('love', 'native_share');
    
    if (navigator.share) {
      navigator.share({
        title: '내 K-드라마 연애 성향 테스트 결과',
        text: `나는 ${result.title} 타입! ${result.character}(${result.drama})과 비슷한 연애 스타일을 가졌어요.`,
        url: window.location.href
      }).catch(error => console.log('공유하기 실패:', error));
    } else {
      // 클립보드에 복사
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert('링크가 클립보드에 복사되었습니다!');
          trackResultShare('love', 'clipboard');
        })
        .catch(error => console.error('클립보드 복사 실패:', error));
    }
  };
  
  if (!mounted) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-red-100 dark:from-gray-900 dark:to-red-900">
      <div className="container mx-auto px-4 py-8">
        {/* 상단 내비게이션 */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/quizzes/love" className="flex items-center text-pink-700 dark:text-pink-300 hover:text-pink-500 dark:hover:text-pink-200 transition-colors">
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>테스트 다시하기</span>
          </Link>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* 결과 헤더 */}
          <div className="bg-gradient-to-r from-pink-400 to-red-400 p-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold text-center">
              당신의 K-드라마 연애 유형은
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-center mt-2">
              {result.title}
            </h2>
          </div>
          
          {/* 결과 본문 */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="flex-1 order-2 md:order-1">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {result.character} ({result.drama})
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {result.description}
                </p>
                
                <h4 className="font-medium text-pink-600 dark:text-pink-400 mt-6 mb-2">
                  당신의 특징
                </h4>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                  {result.traits.map((trait, index) => (
                    <li key={index}>{trait}</li>
                  ))}
                </ul>
                
                <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg mt-6">
                  <h4 className="font-medium text-pink-700 dark:text-pink-300 mb-2">
                    연애 조언
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {result.advice}
                  </p>
                </div>
              </div>
              
              <div className="flex-1 order-1 md:order-2">
                <div className="rounded-lg overflow-hidden h-48 md:h-64 relative">
                  <Image
                    src={result.image}
                    alt={`${result.character} from ${result.drama}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
            
            {/* 공유 버튼 */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleShare}
                className="flex items-center bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full transition-colors"
              >
                <Share2 className="h-5 w-5 mr-2" />
                결과 공유하기
              </button>
            </div>
            
            {/* 다시하기 버튼 */}
            <div className="text-center mt-6">
              <Link
                href="/quizzes/love"
                className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 underline font-medium"
              >
                테스트 다시 하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 로딩 컴포넌트
function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
    </div>
  );
}

// 메인 내보내기 함수
export default function LoveTestResult() {
  return (
    <Suspense fallback={<Loading />}>
      <ResultContent />
    </Suspense>
  );
} 