'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdBanner from '@/app/components/AdBanner';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

// MBTI 문항 및 선택지
const questions = [
  {
    question: "새로운 사람들을 만날 때, 나는",
    options: [
      {
        text: "여러 사람들과 대화하며 에너지를 얻는다",
        value: "E",
      },
      {
        text: "소수의 사람들과 깊은 대화를 나누거나 혼자 있는 것을 선호한다",
        value: "I",
      },
    ],
  },
  {
    question: "정보를 처리할 때, 나는",
    options: [
      {
        text: "사실과 세부사항에 집중한다",
        value: "S",
      },
      {
        text: "의미와 가능성에 집중한다",
        value: "N",
      },
    ],
  },
  {
    question: "결정을 내릴 때, 나는 주로",
    options: [
      {
        text: "논리와 객관적인 분석을 중요시한다",
        value: "T",
      },
      {
        text: "가치와 사람들의 감정을 고려한다",
        value: "F",
      },
    ],
  },
  {
    question: "일상 생활에서 나는",
    options: [
      {
        text: "계획을 세우고 체계적으로 행동한다",
        value: "J",
      },
      {
        text: "유연하게 상황에 적응하며 즉흥적으로 행동한다",
        value: "P",
      },
    ],
  },
  {
    question: "나는 자유 시간이 생기면",
    options: [
      {
        text: "친구들과 만나거나 사교적인 활동을 한다",
        value: "E",
      },
      {
        text: "혼자 취미생활을 하거나 조용한 활동을 즐긴다",
        value: "I",
      },
    ],
  },
  {
    question: "문제를 해결할 때, 나는",
    options: [
      {
        text: "경험과 실제적인 해결책을 선호한다",
        value: "S",
      },
      {
        text: "창의적이고 새로운 접근 방식을 탐색한다",
        value: "N",
      },
    ],
  },
  {
    question: "대화에서 나는",
    options: [
      {
        text: "직접적이고 솔직하게 의견을 표현한다",
        value: "T",
      },
      {
        text: "상대방의 감정을 고려하여 조화롭게 대화한다",
        value: "F",
      },
    ],
  },
  {
    question: "여행을 갈 때, 나는",
    options: [
      {
        text: "미리 계획을 세우고 일정대로 움직인다",
        value: "J",
      },
      {
        text: "즉흥적으로 결정하고 유연하게 여행한다",
        value: "P",
      },
    ],
  },
  {
    question: "모임에서 나는",
    options: [
      {
        text: "여러 사람들과 폭넓게 대화한다",
        value: "E",
      },
      {
        text: "한두 명과 깊은 대화를 나눈다",
        value: "I",
      },
    ],
  },
  {
    question: "나는 주로",
    options: [
      {
        text: "현실적이고 실용적인 것에 집중한다",
        value: "S",
      },
      {
        text: "아이디어와 가능성에 집중한다",
        value: "N",
      },
    ],
  },
  {
    question: "갈등 상황에서 나는",
    options: [
      {
        text: "논리적으로 문제를 분석하고 해결책을 찾는다",
        value: "T",
      },
      {
        text: "모두의 감정을 고려하고 조화를 추구한다",
        value: "F",
      },
    ],
  },
  {
    question: "일을 할 때, 나는",
    options: [
      {
        text: "계획대로 순차적으로 진행하는 것을 선호한다",
        value: "J",
      },
      {
        text: "다양한 옵션을 열어두고 유연하게 진행한다",
        value: "P",
      },
    ],
  },
];

const MBTIQuiz = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showStart, setShowStart] = useState(true);

  const handleStart = () => {
    setShowStart(false);
  };

  const handleAnswer = (value: string) => {
    const updatedAnswers = { ...answers, [currentQuestionIndex]: value };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 퀴즈 완료, 결과 계산
      calculateResult(updatedAnswers);
    }
  };

  const calculateResult = (answers: Record<string, string>) => {
    // MBTI 차원별 카운트
    const counts = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    };

    // 응답 집계
    Object.values(answers).forEach(value => {
      counts[value as keyof typeof counts]++;
    });

    // MBTI 결정
    const mbtiResult = [
      counts.E > counts.I ? "E" : "I",
      counts.S > counts.N ? "S" : "N",
      counts.T > counts.F ? "T" : "F",
      counts.J > counts.P ? "J" : "P"
    ].join("");

    // 결과 페이지로 이동
    router.push(`/quizzes/mbti/result?type=${mbtiResult}`);
  };

  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {showStart ? (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-4">
                  애니메이션 캐릭터 MBTI 테스트
                </h1>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    MBTI 성격 유형을 기반으로 당신과 닮은 애니메이션 캐릭터를 알아보세요!
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>총 12개의 질문이 있습니다</li>
                    <li>각 질문에 솔직하게 답변해주세요</li>
                    <li>테스트 완료 후 당신의 MBTI와 닮은 애니메이션 캐릭터를 확인하세요</li>
                    <li>결과를 친구들과 공유하고 서로 비교해보세요</li>
                  </ul>
                  <p className="italic">
                    테스트는 약 5분 정도 소요됩니다
                  </p>
                </div>
                <div className="mt-6 flex justify-center">
                  <Button 
                    onClick={handleStart}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-full text-lg font-medium"
                  >
                    테스트 시작하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Link href="/" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              홈으로 돌아가기
            </Link>
            
            <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      질문 {currentQuestionIndex + 1}/{questions.length}
                    </span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-2 bg-gray-200 dark:bg-gray-700" />
                </div>
                
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                  {questions[currentQuestionIndex].question}
                </h2>
                
                <div className="space-y-4">
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(option.value)}
                      className="w-full justify-start text-left py-4 px-6 bg-gray-50 hover:bg-indigo-50 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
                      variant="outline"
                    >
                      {option.text}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* 광고 배너 */}
            <div className="mt-8">
              <AdBanner type="horizontal" position="inline" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MBTIQuiz; 