'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdBanner from '@/app/components/AdBanner';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import MbtiQuestion from '@/components/MbtiQuestion';

// MBTI 질문 목록
const questions = [
  {
    id: 1,
    text: '새로운 해적단과 만났을 때 당신은?',
    options: [
      { value: 'E', text: '적극적으로 대화를 시작하고 친해지려 노력한다' },
      { value: 'I', text: '조용히 관찰하며 상대방이 먼저 다가오길 기다린다' }
    ]
  },
  {
    id: 2,
    text: '모험 중 뜻밖의 상황이 발생했을 때 당신은?',
    options: [
      { value: 'S', text: '구체적인 사실과 경험을 바탕으로 현실적으로 대처한다' },
      { value: 'N', text: '직감과 가능성을 바탕으로 창의적인 해결책을 찾는다' }
    ]
  },
  {
    id: 3,
    text: '중요한 결정을 내릴 때 당신은?',
    options: [
      { value: 'T', text: '논리적으로 분석하고 객관적인 기준에 따라 결정한다' },
      { value: 'F', text: '나와 동료들의 감정과 가치관을 고려하여 결정한다' }
    ]
  },
  {
    id: 4,
    text: '해적 생활에서 당신은?',
    options: [
      { value: 'J', text: '계획적으로 행동하며 규칙적인 일상을 선호한다' },
      { value: 'P', text: '상황에 따라 유연하게 대처하며 즉흥적인 모험을 즐긴다' }
    ]
  },
  {
    id: 5,
    text: '보물을 찾는 방법에 대해 논의할 때 당신은?',
    options: [
      { value: 'E', text: '다양한 의견을 나누며 활발하게 대화에 참여한다' },
      { value: 'I', text: '깊이 생각한 후에 신중하게 의견을 제시한다' }
    ]
  },
  {
    id: 6,
    text: '해적단 내 갈등이 생겼을 때 당신은?',
    options: [
      { value: 'T', text: '객관적인 사실을 바탕으로 문제를 해결한다' },
      { value: 'F', text: '모두의 감정을 고려하여 조화로운 해결책을 찾는다' }
    ]
  },
  {
    id: 7,
    text: '새로운 섬에 도착했을 때 당신은?',
    options: [
      { value: 'J', text: '탐험 계획을 세우고 체계적으로 움직인다' },
      { value: 'P', text: '즉흥적으로 호기심 가는 곳을 탐험한다' }
    ]
  },
  {
    id: 8,
    text: '원피스를 찾는 여정에서 당신은?',
    options: [
      { value: 'J', text: '목표를 향해 한 단계씩 계획적으로 나아간다' },
      { value: 'P', text: '모험 자체를 즐기며 유연하게 상황에 적응한다' }
    ]
  },
  {
    id: 9,
    text: '당신이 전투에서 중요하게 생각하는 것은?',
    options: [
      { value: 'S', text: '실제 경험과 검증된 전술을 활용하여 싸운다' },
      { value: 'N', text: '직관과 창의적인 전략으로 예상치 못한 공격을 한다' }
    ]
  },
  {
    id: 10,
    text: '휴식 시간에 당신은 어떻게 보내는 것을 선호하나요?',
    options: [
      { value: 'E', text: '동료들과 파티를 열거나 함께 시간을 보낸다' },
      { value: 'I', text: '혼자만의 시간을 가지며 조용히 에너지를 충전한다' }
    ]
  },
  {
    id: 11,
    text: '새로운 기술이나 능력을 배울 때 당신은?',
    options: [
      { value: 'S', text: '단계별로 차근차근 연습하며 실용적인 활용법을 익힌다' },
      { value: 'N', text: '전체적인 개념을 파악하고 자신만의 방식으로 응용한다' }
    ]
  },
  {
    id: 12,
    text: '동료가 실패했을 때 당신의 첫 반응은?',
    options: [
      { value: 'T', text: '무엇이 잘못되었는지 분석하고 개선점을 찾는다' },
      { value: 'F', text: '먼저 위로와 지지를 보내고 함께 해결책을 모색한다' }
    ]
  },
  {
    id: 13,
    text: '해적선에서 당신의 공간 정리 스타일은?',
    options: [
      { value: 'J', text: '항상 정돈되고 체계적으로 물건을 배치한다' },
      { value: 'P', text: '필요할 때 찾을 수 있으면 충분하다고 생각한다' }
    ]
  },
  {
    id: 14,
    text: '위기 상황에서 당신은?',
    options: [
      { value: 'S', text: '현재 상황에 집중하고 즉각적인 해결책을 찾는다' },
      { value: 'N', text: '여러 가능성을 빠르게 고려하고 창의적인 방법을 시도한다' }
    ]
  },
  {
    id: 15,
    text: '당신이 해적왕이 된다면 가장 하고 싶은 것은?',
    options: [
      { value: 'T', text: '세계의 비밀을 밝히고 논리적인 질서를 확립한다' },
      { value: 'F', text: '모두가 자유롭고 행복하게 살 수 있는 세상을 만든다' }
    ]
  }
];

const MBTIQuiz = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (answers: Record<string, string>) => {
    setLoading(true);
    
    const counts = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    };
    
    Object.values(answers).forEach((value) => {
      counts[value as keyof typeof counts]++;
    });
    
    const mbti = [
      counts.E > counts.I ? 'E' : 'I',
      counts.S > counts.N ? 'S' : 'N',
      counts.T > counts.F ? 'T' : 'F',
      counts.J > counts.P ? 'J' : 'P'
    ].join('');
    
    router.push(`/quizzes/mbti/result?type=${mbti}`);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">원피스 MBTI 테스트</h1>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8 dark:bg-gray-700">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {!loading && (
          <div className="max-w-2xl mx-auto">
            <MbtiQuestion
              question={questions[currentQuestion]}
              onAnswer={handleAnswer}
            />
            
            <div className="text-center mt-6 text-gray-500 dark:text-gray-400">
              {currentQuestion + 1} / {questions.length}
            </div>
          </div>
        )}
        
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="ml-3 text-lg">결과 분석 중...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MBTIQuiz; 