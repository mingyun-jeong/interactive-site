import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Option {
  value: string;
  text: string;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface QuizFormProps {
  questions: Question[];
}

export default function QuizForm({ questions }: QuizFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const router = useRouter();
  
  // 현재 진행 상태 계산
  const progress = ((currentQuestion + 1) / 15) * 100;
  
  const handleOptionSelect = (value: string) => {
    // 현재 질문 ID에 선택한 값 저장
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);
    
    // 다음 질문으로 넘어가거나 결과 계산
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };
  
  const calculateResult = (answersData: Record<string, string>) => {
    // 각 유형별 점수 계산
    let scores = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    };
    
    // 응답에 따라 점수 계산
    Object.values(answersData).forEach(value => {
      scores[value as keyof typeof scores] += 1;
    });
    
    // MBTI 유형 결정
    const type = [
      scores.E > scores.I ? 'E' : 'I',
      scores.S > scores.N ? 'S' : 'N',
      scores.T > scores.F ? 'T' : 'F',
      scores.J > scores.P ? 'J' : 'P'
    ].join('');
    
    // 결과 페이지로 이동
    router.push(`/quizzes/mbti/result?type=${type}`);
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      {/* 진행 상황 표시 */}
      <div className="mb-8">
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-right mt-2 text-sm text-gray-600">
          {currentQuestion + 1} / {questions.length}
        </p>
      </div>
      
      {/* 현재 질문 */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
          {questions[currentQuestion].text}
        </h2>
        
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(option.value)}
              className="w-full py-4 px-6 bg-white border-2 border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors text-left"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 