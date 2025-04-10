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
    text: '새로운 모험에 대한 당신의 태도는?',
    options: [
      { value: 'E', text: '두근거리는 마음으로 새로운 바다를 향해 떠난다' },
      { value: 'I', text: '모험을 떠나기 전에 신중하게 계획을 세운다' }
    ]
  },
  {
    id: 2,
    text: '보물을 발견했을 때 당신은?',
    options: [
      { value: 'E', text: '친구들과 함께 축하하며 즐긴다' },
      { value: 'I', text: '조용히 혼자만의 시간을 갖고 생각에 잠긴다' }
    ]
  },
  {
    id: 3,
    text: '해적선에서 당신의 역할은?',
    options: [
      { value: 'S', text: '현실적인 문제를 해결하는 실용적인 선원' },
      { value: 'N', text: '미래의 항로와 가능성을 고민하는 탐험가' }
    ]
  },
  {
    id: 4,
    text: '바다 괴물을 만났을 때 당신은?',
    options: [
      { value: 'S', text: '지금 보이는 괴물의 약점을 찾아 공격한다' },
      { value: 'N', text: '괴물의 등장 이유와 패턴을 분석하여 대응한다' }
    ]
  },
  {
    id: 5,
    text: '동료가 위험에 처했을 때 당신은?',
    options: [
      { value: 'T', text: '가장 효율적인 구출 방법을 논리적으로 계산한다' },
      { value: 'F', text: '동료의 안전을 최우선으로 감정적으로 대응한다' }
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