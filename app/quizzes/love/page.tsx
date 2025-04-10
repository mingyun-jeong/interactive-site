'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { incrementVisitorCount } from '@/lib/visitors';

// 타입 정의
interface Option {
  text: string;
  type: string;
}

interface Question {
  question: string;
  options: Option[];
}

// 연애 성향 테스트 질문
const questions: Question[] = [
  {
    question: "Q1. 누군가에게 호감이 생기면 어떻게 행동해?",
    options: [
      { text: "먼저 연락하고 표현해!", type: "직진파" },
      { text: "일단 주변부터 맴돌아", type: "감성가" },
      { text: "기다리면 오겠지~", type: "쿨한 타입" },
    ]
  },
  {
    question: "Q2. 썸 타는 중, 가장 중요하게 생각하는 건?",
    options: [
      { text: "설렘과 감정의 흐름", type: "로맨티스트" },
      { text: "말보단 행동", type: "무심한 듯 다정" },
      { text: "상대의 리액션과 밀당 타이밍", type: "밀당파" },
    ]
  },
  {
    question: "Q3. 데이트할 때 가장 좋은 순간은?",
    options: [
      { text: "함께 걷는 조용한 길", type: "감성가" },
      { text: "예고 없는 깜짝 이벤트", type: "로맨티스트" },
      { text: "서로 대화로 가까워질 때", type: "현실주의자" },
    ]
  },
  {
    question: "Q4. 연애할 때 내가 가장 중요하게 여기는 건?",
    options: [
      { text: "신뢰와 약속", type: "현실주의자" },
      { text: "진심 어린 감정", type: "감성가" },
      { text: "긴장감 있는 설렘", type: "밀당파" },
    ]
  },
  {
    question: "Q5. 상대가 연락이 뜸하면?",
    options: [
      { text: "먼저 연락해서 무슨 일인지 물어봐", type: "직진파" },
      { text: "그냥 기다려. 각자 사정 있겠지", type: "쿨한 타입" },
      { text: "나도 똑같이 안 해. 자존심이 더 중요", type: "나쁜남자/여자" },
    ]
  },
  {
    question: "Q6. 사랑은 ______ 이다.",
    options: [
      { text: "기적", type: "로맨티스트" },
      { text: "협력", type: "현실주의자" },
      { text: "게임", type: "밀당파" },
    ]
  },
  {
    question: "Q7. 고백은 언제 해?",
    options: [
      { text: "마음이 꽉 찼을 때 바로!", type: "직진파" },
      { text: "상대도 나를 좋아한다는 확신이 들 때", type: "신중파" },
      { text: "고백은 그쪽이 먼저 하는 게 좋아", type: "나쁜남자/여자" },
    ]
  },
  {
    question: "Q8. 내 연애 스타일은?",
    options: [
      { text: "낭만적이고 드라마틱", type: "로맨티스트" },
      { text: "조용하지만 깊은 애정", type: "감성가" },
      { text: "실용적이고 깔끔하게", type: "현실주의자" },
    ]
  },
  {
    question: "Q9. 내가 사랑에 빠질 때는?",
    options: [
      { text: "서로 웃을 때", type: "감성가" },
      { text: "그 사람이 날 리드할 때", type: "나쁜남자/여자" },
      { text: "내가 보호해 주고 싶을 때", type: "순정파" },
    ]
  },
  {
    question: "Q10. 이별 후 나는?",
    options: [
      { text: "금방 다시 잘 살아", type: "쿨한 타입" },
      { text: "몇 달 동안 힘들어함", type: "감성가" },
      { text: "계속 연락하고 싶은 마음을 참는다", type: "로맨티스트" },
    ]
  },
  {
    question: "Q11. 연애 초반, 당신의 가장 큰 고민은?",
    options: [
      { text: "내가 더 좋아하는 것 같아서 불안해", type: "감성가" },
      { text: "이 관계가 오래 갈 수 있을까?", type: "현실주의자" },
      { text: "상대가 나에게 얼마나 빠졌는지가 궁금해", type: "밀당파" },
    ]
  },
  {
    question: "Q12. 내가 상대에게 자주 듣는 말은?",
    options: [
      { text: "너는 진짜 다정하다", type: "순정파" },
      { text: "넌 좀 어렵다, 무슨 생각하는지 모르겠어", type: "무심한 듯 다정" },
      { text: "너는 정말 재밌어", type: "유쾌한 타입" },
    ]
  },
  {
    question: "Q13. 데이트 장소를 정할 때 당신은?",
    options: [
      { text: "분위기 좋은 곳을 찾아 깜짝 제안함", type: "로맨티스트" },
      { text: "현실적으로 가까운 곳, 가격, 시간 고려", type: "현실주의자" },
      { text: "어디든 너만 있으면 돼라며 넘김", type: "감성가" },
    ]
  },
  {
    question: "Q14. 애인에게 가장 받고 싶은 건?",
    options: [
      { text: "예고 없는 선물이나 메시지", type: "로맨티스트" },
      { text: "내 감정을 공감해주는 말 한마디", type: "감성가" },
      { text: "같이 있는 시간, 함께 하는 루틴", type: "현실주의자" },
    ]
  },
  {
    question: "Q15. 이 중 가장 마음이 끌리는 대사는?",
    options: [
      { text: "네가 웃으면 나도 좋아", type: "감성가" },
      { text: "나 너 좋아해. 많이.", type: "직진파" },
      { text: "오늘부터 1일이야, 반박 불가.", type: "밀당파" },
    ]
  }
];

// 성향별 카운트 초기화
const initialTypeCounts = {
  "로맨티스트": 0,
  "현실주의자": 0,
  "밀당파": 0,
  "감성가": 0,
  "직진파": 0,
  "쿨한 타입": 0,
  "나쁜남자/여자": 0,
  "순정파": 0,
  "신중파": 0,
  "무심한 듯 다정": 0,
  "유쾌한 타입": 0
};

export default function LoveTest() {
  const router = useRouter();
  const [step, setStep] = useState<'gender' | 'questions'>('gender');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [typeCounts, setTypeCounts] = useState(initialTypeCounts);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
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
  }, []);
  
  const handleGenderSelect = (selected: 'male' | 'female') => {
    setGender(selected);
    setStep('questions');
  };
  
  const handleOptionSelect = (type: string) => {
    // 현재 타입 카운트 증가
    const newTypeCounts = {
      ...typeCounts,
      [type]: typeCounts[type as keyof typeof typeCounts] + 1
    };
    setTypeCounts(newTypeCounts);
    
    // 답변 저장
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);
    
    // 다음 질문으로 이동 또는 결과 페이지로 이동
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 결과 계산
      const result = calculateResult(newTypeCounts);
      router.push(`/quizzes/love/result?type=${result}&gender=${gender}`);
    }
  };
  
  const calculateResult = (counts: typeof initialTypeCounts) => {
    // 가장 높은 점수의 성향 찾기
    let maxType = "";
    let maxCount = -1;
    
    Object.entries(counts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxType = type;
        maxCount = count;
      }
    });
    
    return encodeURIComponent(maxType);
  };
  
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
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
          <Link href="/" className="flex items-center text-pink-700 dark:text-pink-300 hover:text-pink-500 dark:hover:text-pink-200 transition-colors">
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>홈으로</span>
          </Link>
        </div>
        
        {/* 상단 광고 배너 */}
        <AdBanner type="horizontal" position="top" />
        
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-pink-600 dark:text-pink-400">
            K-드라마 연애 성향 테스트
          </h1>
          
          {step === 'gender' ? (
            <div className="space-y-8">
              <p className="text-lg text-center mb-8">
                당신의 성별을 선택하세요
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleGenderSelect('male')}
                  className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 font-medium py-6 px-4 rounded-xl transition-all transform hover:scale-105"
                >
                  <div className="text-5xl mb-2">👨</div>
                  <div>남성</div>
                </button>
                
                <button
                  onClick={() => handleGenderSelect('female')}
                  className="bg-pink-100 hover:bg-pink-200 dark:bg-pink-900 dark:hover:bg-pink-800 text-pink-800 dark:text-pink-200 font-medium py-6 px-4 rounded-xl transition-all transform hover:scale-105"
                >
                  <div className="text-5xl mb-2">👩</div>
                  <div>여성</div>
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* 진행 상태 바 */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 dark:bg-gray-700">
                <div 
                  className="bg-pink-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              <div className="text-sm text-gray-500 dark:text-gray-400 text-right mb-4">
                {currentQuestion + 1} / {questions.length}
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                  {questions[currentQuestion].question}
                </h2>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(option.type)}
                      className="w-full text-left bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-pink-300 dark:hover:border-pink-500 p-4 rounded-xl transition-all hover:shadow-md"
                    >
                      <div className="flex items-center">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 flex items-center justify-center mr-3">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-gray-800 dark:text-gray-200">{option.text}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* 하단 광고 배너 */}
        <AdBanner type="horizontal" position="bottom" />
      </div>
    </div>
  );
} 