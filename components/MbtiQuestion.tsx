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
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          {question.text}
        </h2>
        
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onAnswer(option.value)}
              className="w-full justify-start text-left py-4 px-6 bg-gray-50 hover:bg-indigo-50 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
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