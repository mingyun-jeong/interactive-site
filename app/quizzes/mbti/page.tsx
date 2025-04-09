'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdBanner from '@/app/components/AdBanner';

type Question = {
  id: number;
  text: string;
  options: {
    text: string;
    type: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
  }[];
};

const questions: Question[] = [
  {
    id: 1,
    text: '처음 만나는 사람들과 있을 때, 나는',
    options: [
      { text: '먼저 대화를 시작하고 쉽게 친해지는 편이다', type: 'E' },
      { text: '주로 다른 사람이 먼저 대화를 시작하기를 기다린다', type: 'I' },
    ],
  },
  {
    id: 2,
    text: '나는 보통',
    options: [
      { text: '현실적이고 구체적인 것에 집중한다', type: 'S' },
      { text: '미래의 가능성과 아이디어에 집중한다', type: 'N' },
    ],
  },
  {
    id: 3,
    text: '결정을 내릴 때 나는 주로',
    options: [
      { text: '논리와 사실에 기반하여 판단한다', type: 'T' },
      { text: '사람들의 감정과 상황을 고려한다', type: 'F' },
    ],
  },
  {
    id: 4,
    text: '일상생활에서 나는',
    options: [
      { text: '계획을 세우고 그대로 진행하는 것을 선호한다', type: 'J' },
      { text: '계획 없이 상황에 따라 유연하게 대처한다', type: 'P' },
    ],
  },
  {
    id: 5,
    text: '여가 시간에 나는',
    options: [
      { text: '친구들과 함께 시간을 보내는 것을 좋아한다', type: 'E' },
      { text: '혼자 시간을 보내며 충전하는 것을 좋아한다', type: 'I' },
    ],
  },
  {
    id: 6,
    text: '나는 정보를 받아들일 때',
    options: [
      { text: '직접 경험하고 실제적인 사례를 통해 이해한다', type: 'S' },
      { text: '패턴을 찾고 전체적인 의미를 파악하려 한다', type: 'N' },
    ],
  },
  {
    id: 7,
    text: '갈등 상황에서 나는',
    options: [
      { text: '객관적으로 문제를 분석하고 해결책을 찾는다', type: 'T' },
      { text: '모두가 만족할 수 있는 조화로운 해결책을 찾는다', type: 'F' },
    ],
  },
  {
    id: 8,
    text: '업무나 학업에서 나는',
    options: [
      { text: '마감 기한을 지키고 체계적으로 일을 진행한다', type: 'J' },
      { text: '마지막 순간에 집중해서 일을 처리하는 경향이 있다', type: 'P' },
    ],
  },
  {
    id: 9,
    text: '대화를 할 때 나는',
    options: [
      { text: '다양한 주제로 넓게 이야기하는 것을 좋아한다', type: 'E' },
      { text: '깊이 있는 주제로 심도 있게 대화하는 것을 좋아한다', type: 'I' },
    ],
  },
  {
    id: 10,
    text: '나는 주로',
    options: [
      { text: '구체적인 사실과 세부 사항에 주목한다', type: 'S' },
      { text: '추상적인 개념과 가능성에 주목한다', type: 'N' },
    ],
  },
  {
    id: 11,
    text: '비판을 받을 때 나는',
    options: [
      { text: '논리적으로 분석하고 개선점을 찾는다', type: 'T' },
      { text: '감정적으로 영향을 받고 개인적으로 받아들이는 경향이 있다', type: 'F' },
    ],
  },
  {
    id: 12,
    text: '여행을 갈 때 나는',
    options: [
      { text: '미리 계획을 세우고 일정에 따라 움직인다', type: 'J' },
      { text: '즉흥적으로 결정하고 상황에 따라 일정을 조정한다', type: 'P' },
    ],
  },
];

const MBTIQuiz = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (type: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: type };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 모든 질문에 답변했을 때
      setIsLoading(true);

      // MBTI 결과 계산
      const counts = {
        E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
      };

      Object.values(newAnswers).forEach(type => {
        counts[type as keyof typeof counts]++;
      });

      const result = [
        counts.E > counts.I ? 'E' : 'I',
        counts.S > counts.N ? 'S' : 'N',
        counts.T > counts.F ? 'T' : 'F',
        counts.J > counts.P ? 'J' : 'P'
      ].join('');

      // 결과 페이지로 이동
      setTimeout(() => {
        router.push(`/quizzes/mbti/result?type=${result}`);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
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

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              MBTI 성격 유형 검사
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              질문에 답하고 나의 MBTI 유형을 알아보세요
            </p>
          </header>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-t-4 border-b-4 border-indigo-600 dark:border-indigo-400 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">결과를 분석 중입니다...</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200 dark:bg-indigo-900">
                    <div 
                      style={{ width: `${progress}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 dark:bg-indigo-400"
                    ></div>
                  </div>
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                    {currentQuestionIndex + 1} / {questions.length}
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                  {currentQuestion.text}
                </h2>
                <div className="space-y-4">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.type)}
                      className="w-full text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-colors"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* 중간 광고 배너 (5번째 질문 이후 표시) */}
              {currentQuestionIndex >= 5 && (
                <AdBanner type="horizontal" position="inline" />
              )}
            </>
          )}
        </div>
        
        {/* 하단 광고 배너 */}
        <AdBanner type="horizontal" position="bottom" />
      </div>
    </div>
  );
};

export default MBTIQuiz; 