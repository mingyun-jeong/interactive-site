'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

type Option = {
  value: string;
  text: string;
};

type Question = {
  id: number;
  text: string;
  options: Option[];
};

type MbtiQuestionProps = {
  question: Question;
  onAnswer: (value: string) => void;
};

const MbtiQuestion: React.FC<MbtiQuestionProps> = ({ question, onAnswer }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 break-words leading-relaxed">
          {question.text}
        </h2>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onAnswer(option.value)}
              className="w-full min-h-[60px] h-auto justify-start text-left py-3 px-4 bg-gray-50 hover:bg-indigo-50 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 break-words text-sm md:text-base whitespace-normal"
              variant="outline"
            >
              {option.text}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MbtiQuestion; 