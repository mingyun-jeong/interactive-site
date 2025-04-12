"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Brain, Users } from "lucide-react";
import AdBanner from "@/components/AdBanner";
import { incrementVisitorCount } from "@/lib/visitors";

// Option type definition
interface QuizOption {
  id: string;
  text: string;
  value: string;
  image?: string;
}

// Question type definition
interface QuizQuestion {
  id: number;
  type: string;
  question: string;
  content?: string;
  image?: string;
  options: QuizOption[];
  explanation: string;
}

// IQ 테스트 문제
const questions: QuizQuestion[] = [
  {
    id: 1,
    type: "pattern",
    question: "다음 수열의 다음 숫자는 무엇인가요?",
    content: "2, 4, 8, 16, 32, ?",
    options: [
      { id: "A", text: "36", value: "wrong" },
      { id: "B", text: "64", value: "correct" },
      { id: "C", text: "48", value: "wrong" },
      { id: "D", text: "54", value: "wrong" },
    ],
    explanation: "이 수열은 각 숫자가 이전 숫자의 2배가 되는 패턴입니다. 따라서 다음 숫자는 32 × 2 = 64입니다."
  },
  {
    id: 2,
    type: "logic",
    question: "모든 A는 B이다. 모든 B는 C이다. 이 경우 다음 중 반드시 참인 것은?",
    options: [
      { id: "A", text: "모든 C는 A이다", value: "wrong" },
      { id: "B", text: "모든 A는 C이다", value: "correct" },
      { id: "C", text: "어떤 C는 A가 아니다", value: "wrong" },
      { id: "D", text: "어떤 B는 A가 아니다", value: "wrong" },
    ],
    explanation: "삼단 논법에 따르면, 모든 A는 B이고 모든 B는 C이므로, 모든 A는 C입니다."
  },
  {
    id: 3,
    type: "spatial",
    question: "접힌 종이를 펼쳤을 때 나타날 모양으로 가장 적절한 것은?",
    image: "/images/iq/folded_paper.svg",
    options: [
      { id: "A", text: "모양 A", value: "wrong", image: "/images/iq/option_a.svg" },
      { id: "B", text: "모양 B", value: "wrong", image: "/images/iq/option_b.svg" },
      { id: "C", text: "모양 C", value: "correct", image: "/images/iq/option_c.svg" },
      { id: "D", text: "모양 D", value: "wrong", image: "/images/iq/option_d.svg" },
    ],
    explanation: "종이를 펼치면 접힌 부분에 따라 특정 패턴의 구멍이 생깁니다. 이 패턴을 고려하면 C가 정답입니다."
  },
  {
    id: 4,
    type: "math",
    question: "두 수의 합이 20이고 두 수의 곱이 96일 때, 두 수의 차는?",
    options: [
      { id: "A", text: "8", value: "correct" },
      { id: "B", text: "4", value: "wrong" },
      { id: "C", text: "12", value: "wrong" },
      { id: "D", text: "16", value: "wrong" },
    ],
    explanation: "두 수를 x와 y라고 할 때, x + y = 20, xy = 96입니다. (x - y)² = (x + y)² - 4xy = 20² - 4(96) = 400 - 384 = 16이므로, x - y = 4입니다. 따라서 두 수의 차는 8입니다."
  },
  {
    id: 5,
    type: "pattern",
    question: "다음 도형 패턴에서 다음에 올 도형은?",
    image: "/images/iq/pattern_sequence.svg",
    options: [
      { id: "A", text: "도형 A", value: "wrong", image: "/images/iq/pattern_a.svg" },
      { id: "B", text: "도형 B", value: "correct", image: "/images/iq/pattern_b.svg" },
      { id: "C", text: "도형 C", value: "wrong", image: "/images/iq/pattern_c.svg" },
      { id: "D", text: "도형 D", value: "wrong", image: "/images/iq/pattern_d.svg" },
    ],
    explanation: "이 패턴은 각 단계마다 도형이 90도씩 회전하고 내부 요소가 변화합니다. 이 패턴을 따르면 B가 다음 도형입니다."
  },
  {
    id: 6,
    type: "verbal",
    question: "'책'과 '지식'의 관계와 같은 관계를 가진 쌍은?",
    options: [
      { id: "A", text: "물 : 갈증", value: "wrong" },
      { id: "B", text: "음식 : 영양", value: "correct" },
      { id: "C", text: "차 : 운전", value: "wrong" },
      { id: "D", text: "의자 : 앉다", value: "wrong" },
    ],
    explanation: "책은 지식을 제공하는 매체이고, 음식은 영양을 제공하는 매체입니다. 따라서 두 쌍은 유사한 관계를 가집니다."
  },
  {
    id: 7,
    type: "logic",
    question: "다음 논리 퍼즐에서 참인 진술은?",
    content: "A, B, C 세 사람이 있는데, 한 명은 항상 진실을 말하고, 한 명은 항상 거짓을 말하며, 한 명은 때때로 진실을, 때때로 거짓을 말합니다.\nA: \"나는 항상 진실을 말한다.\"\nB: \"A는 때때로 진실을 말한다.\"\nC: \"나는 항상 거짓을 말한다.\"",
    options: [
      { id: "A", text: "A는 항상 진실을 말한다.", value: "wrong" },
      { id: "B", text: "B는 항상 거짓을 말한다.", value: "wrong" },
      { id: "C", text: "C는 때때로 진실을 말한다.", value: "correct" },
      { id: "D", text: "A는 항상 거짓을 말한다.", value: "wrong" },
    ],
    explanation: "C가 항상 거짓을 말한다고 했는데, 이 말 자체가 거짓이라면 C는 항상 거짓을 말하는 사람이 아닙니다. 따라서 C는 때때로 진실을 말하는 사람입니다."
  },
  {
    id: 8,
    type: "math",
    question: "한 상자에 빨간 공 3개와 파란 공 2개가 있습니다. 이 중에서 무작위로 2개의 공을 꺼낼 때, 두 공이 모두 같은 색일 확률은?",
    options: [
      { id: "A", text: "1/2", value: "wrong" },
      { id: "B", text: "3/5", value: "wrong" },
      { id: "C", text: "2/5", value: "correct" },
      { id: "D", text: "7/10", value: "wrong" },
    ],
    explanation: "전체 경우의 수는 5C2 = 10입니다. 두 공이 모두 빨간색인 경우의 수는 3C2 = 3이고, 두 공이 모두 파란색인 경우의 수는 2C2 = 1입니다. 따라서 확률은 (3+1)/10 = 4/10 = 2/5입니다."
  },
  {
    id: 9,
    type: "spatial",
    question: "거울에 비친 시계가 3시 15분을 가리키고 있습니다. 실제 시간은?",
    options: [
      { id: "A", text: "8시 45분", value: "wrong" },
      { id: "B", text: "9시 45분", value: "correct" },
      { id: "C", text: "8시 15분", value: "wrong" },
      { id: "D", text: "9시 15분", value: "wrong" },
    ],
    explanation: "거울에 비친 시계는 좌우가 반전됩니다. 3시 15분이 거울에 비치면, 시침은 9를 가리키고 분침은 45를 가리킵니다. 따라서 실제 시간은 9시 45분입니다."
  },
  {
    id: 10,
    type: "verbal",
    question: "다음 중 나머지와 다른 하나는?",
    options: [
      { id: "A", text: "해파리", value: "correct" },
      { id: "B", text: "상어", value: "wrong" },
      { id: "C", text: "고래", value: "wrong" },
      { id: "D", text: "돌고래", value: "wrong" },
    ],
    explanation: "해파리는 무척추동물이고, 나머지는 모두 척추동물입니다."
  }
];

export default function IQTest() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [score, setScore] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // 단일 useEffect로 통합
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
  
  const handleAnswer = (questionId: number, value: string) => {
    // 현재 답변 저장
    setAnswers({
      ...answers,
      [questionId]: value
    });
    
    // 정답 체크
    if (value === "correct") {
      setScore(prevScore => prevScore + 1);
    }
    
    // 다음 문제로 자동 이동
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prevQuestion => prevQuestion + 1);
      }, 500); // 0.5초 후 다음 문제로 이동
    } else {
      // 마지막 문제인 경우 결과 페이지로 이동
      setTimeout(() => {
        const iqScore = calculateIQ();
        router.push(`/quizzes/iq/result?score=${iqScore}`);
      }, 500);
    }
  };
  
  const calculateIQ = () => {
    // 오답률을 고려한 IQ 점수 계산
    // 정답률이 높을수록 높은 IQ, 오답률이 높을수록 낮은 IQ
    const correctRate = score / questions.length;
    
    // 정답이 없으면 최저점, 모두 맞추면 최고점으로 계산
    const baseScore = 70 + correctRate * 70;
    
    // 약간의 변동성 추가 (±5)
    const variation = Math.floor(Math.random() * 11) - 5;
    
    return Math.round(baseScore + variation);
  };
  
  if (!mounted) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }
  
  const question = questions[currentQuestion];
  const hasAnswered = answers[question.id] !== undefined;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-yellow-100 dark:from-slate-900 dark:to-amber-900">
      <div className="container mx-auto px-4 py-8">
        {/* 상단 내비게이션 */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center text-amber-700 dark:text-amber-300 hover:text-amber-500 dark:hover:text-amber-200 transition-colors">
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>홈으로</span>
          </Link>
          <div className="text-amber-800 dark:text-amber-200 font-medium">
            {currentQuestion + 1} / {questions.length}
          </div>
        </div>
        
        {/* 상단 광고 배너 */}
        <AdBanner type="horizontal" position="top" />
        
        {/* 문제 카드 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 max-w-3xl mx-auto mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mr-4">
              <Brain className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">IQ 테스트</h1>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-3">
              <span className="text-amber-600 dark:text-amber-400">Q{question.id}.</span> {question.question}
            </h2>
            
            {question.content && (
              <p className="text-slate-600 dark:text-slate-300 mb-4 p-4 bg-amber-50 dark:bg-slate-700/50 rounded-lg font-mono">
                {question.content}
              </p>
            )}
            
            {question.image && (
              <div className="flex justify-center my-6">
                <div className="relative w-64 h-64 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    이미지 예시
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* 객관식 옵션 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {question.options.map((option) => (
              <button
                key={option.id}
                className={`p-4 rounded-xl border transition-all ${
                  answers[question.id] === option.value
                    ? option.value === "correct"
                      ? "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700"
                      : "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700"
                    : "bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-amber-50 dark:hover:bg-amber-900/10"
                } ${hasAnswered ? "cursor-default" : "hover:shadow-md"}`}
                onClick={() => !hasAnswered && handleAnswer(question.id, option.value)}
                disabled={hasAnswered}
              >
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 flex items-center justify-center mr-3">
                    {option.id}
                  </span>
                  <span className="text-left text-slate-700 dark:text-slate-200">{option.text}</span>
                </div>
                
                {option.image && (
                  <div className="mt-3 relative w-full h-32 bg-slate-100 dark:bg-slate-600 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                      보기 이미지
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {/* 정답 설명 */}
          {hasAnswered && (
            <div className={`p-4 rounded-lg mb-6 ${
              answers[question.id] === "correct"
                ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
            }`}>
              <h3 className={`font-bold mb-2 ${
                answers[question.id] === "correct"
                  ? "text-green-700 dark:text-green-400"
                  : "text-red-700 dark:text-red-400"
              }`}>
                {answers[question.id] === "correct" ? "정답입니다!" : "틀렸습니다."}
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                {question.explanation}
              </p>
            </div>
          )}
          
          {/* 네비게이션 버튼 */}
          <div className="flex justify-between">
            <button
              onClick={() => {
                setCurrentQuestion(prevQuestion => prevQuestion - 1);
              }}
              disabled={currentQuestion === 0}
              className={`flex items-center px-4 py-2 rounded-full ${
                currentQuestion === 0
                  ? "text-slate-400 dark:text-slate-600 cursor-not-allowed"
                  : "text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/10"
              }`}
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              이전 문제
            </button>
            
            <div className="text-sm text-slate-500 dark:text-slate-400 italic flex items-center">
              답변 선택 시 자동으로 다음 문제로 이동합니다
            </div>
          </div>
        </div>
        
        {/* 하단 광고 배너 */}
        <AdBanner type="horizontal" position="bottom" />
      </div>
    </div>
  );
} 