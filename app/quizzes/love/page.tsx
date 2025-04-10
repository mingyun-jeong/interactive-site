'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdBanner from '@/app/components/AdBanner';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MbtiQuestion from '@/components/MbtiQuestion';

// 연애 스타일 질문 목록
const questions = [
  {
    id: 1,
    text: '새로운 사람을 만났을 때 당신은?',
    options: [
      { value: 'A', text: '적극적으로 다가가 대화를 시작한다' },
      { value: 'P', text: '상대방이 먼저 말을 걸어주길 기다린다' }
    ]
  },
  {
    id: 2,
    text: '연애 초기에 당신의 대화 스타일은?',
    options: [
      { value: 'D', text: '깊은 주제로 대화하며 상대방을 빠르게 알아가려 한다' },
      { value: 'C', text: '가벼운 주제로 천천히 친해지는 것을 선호한다' }
    ]
  },
  {
    id: 3,
    text: '데이트 계획을 세울 때 당신은?',
    options: [
      { value: 'P', text: '세부 일정과 장소를 미리 계획해두는 편이다' },
      { value: 'S', text: '즉흥적으로 그날 기분에 따라 결정한다' }
    ]
  },
  {
    id: 4,
    text: '상대방과 다툼이 생겼을 때 당신은?',
    options: [
      { value: 'C', text: '문제를 바로 해결하기 위해 대화를 시도한다' },
      { value: 'A', text: '일단 시간을 두고 감정이 가라앉기를 기다린다' }
    ]
  },
  {
    id: 5,
    text: '연인의 생일 선물을 고를 때 당신은?',
    options: [
      { value: 'P', text: '실용적이고 필요한 것을 선물한다' },
      { value: 'R', text: '의미 있고 감성적인 것을 선물한다' }
    ]
  },
  {
    id: 6,
    text: '연인에게 사랑을 표현하는 방식은?',
    options: [
      { value: 'R', text: '언어로 직접 사랑한다고 표현한다' },
      { value: 'A', text: '행동과 태도로 내 마음을 보여준다' }
    ]
  },
  {
    id: 7,
    text: '연애에서 당신이 가장 중요하게 생각하는 것은?',
    options: [
      { value: 'D', text: '서로 깊은 이해와 공감대를 형성하는 것' },
      { value: 'C', text: '함께 있을 때 즐겁고 편안한 시간을 보내는 것' }
    ]
  },
  {
    id: 8,
    text: '연인과 함께 있을 때 당신은?',
    options: [
      { value: 'S', text: '대화가 끊이지 않게 적극적으로 소통한다' },
      { value: 'P', text: '함께 있는 것만으로도 편안하고 침묵도 괜찮다' }
    ]
  },
  {
    id: 9,
    text: '연인의 단점이 보일 때 당신은?',
    options: [
      { value: 'D', text: '솔직하게 이야기하고 개선될 수 있도록 돕는다' },
      { value: 'R', text: '있는 그대로 받아들이고 장점에 더 집중한다' }
    ]
  },
  {
    id: 10,
    text: '연인이 바쁘다고 연락이 뜸할 때 당신은?',
    options: [
      { value: 'C', text: '이해하고 기다리지만 가끔 안부 메시지를 보낸다' },
      { value: 'S', text: '서운하지만 상대방이 먼저 연락할 때까지 기다린다' }
    ]
  },
  {
    id: 11,
    text: '장기적인 연애 관계에서 중요한 것은?',
    options: [
      { value: 'P', text: '서로의 성장과 목표를 지지하는 관계' },
      { value: 'R', text: '안정감과 정서적 유대감이 강한 관계' }
    ]
  },
  {
    id: 12,
    text: '이별의 위기가 찾아왔을 때 당신은?',
    options: [
      { value: 'A', text: '모든 방법을 동원해 관계를 회복하려 노력한다' },
      { value: 'D', text: '냉정하게 문제를 분석하고 필요하다면 이별도 수용한다' }
    ]
  }
];

// 연애 스타일 유형
const loveTypes = [
  {
    id: 'RPCA',
    title: '로맨틱 파트너',
    description: '감성적이고 낭만적인 연애를 추구하며, 상대방에게 헌신적입니다. 작은 이벤트와 기념일을 챙기고 감정 표현에 솔직합니다.',
    image: '/images/love/romantic.png',
    characteristics: [
      '낭만적인 이벤트와 깜짝 선물을 좋아함',
      '감정 표현에 솔직하고 적극적',
      '기념일과 특별한 날을 중요시함',
      '관계에 헌신적이고 충실함'
    ],
    strengths: [
      '따뜻한 감성으로 파트너를 행복하게 만듦',
      '관계에 항상 새로움과 설렘을 유지함',
      '풍부한 감정 표현으로 파트너가 사랑받는다고 느끼게 함'
    ],
    advice: '지나친 감정 기복에 주의하세요. 현실적인 측면도 함께 고려하면 더 균형 잡힌 관계를 유지할 수 있습니다.'
  },
  {
    id: 'RPDA',
    title: '신중한 계획가',
    description: '관계의 미래를 중요시하고 계획적으로 연애를 이끌어 나갑니다. 안정적이고 신뢰할 수 있는 파트너입니다.',
    image: '/images/love/planner.png',
    characteristics: [
      '장기적인 관계 목표를 중요시함',
      '계획적이고 체계적인 데이트 선호',
      '약속과 신뢰를 중요하게 생각함',
      '감정보다 논리적인 판단을 우선시함'
    ],
    strengths: [
      '믿음직하고 안정적인 파트너',
      '미래를 함께 계획하고 준비함',
      '책임감 있고 의지할 수 있는 존재'
    ],
    advice: '때로는 계획에서 벗어나 즉흥적인 순간을 즐겨보세요. 모든 것이 계획대로 되지 않아도 괜찮습니다.'
  },
  {
    id: 'RSCA',
    title: '배려하는 지지자',
    description: '파트너의 필요와 감정에 세심하게 주의를 기울이며, 무조건적인 지지와 배려를 보여줍니다.',
    image: '/images/love/supporter.png',
    characteristics: [
      '파트너의 이야기를 경청하고 공감함',
      '상대방의 필요를 먼저 생각함',
      '갈등보다 조화를 추구함',
      '지지와 격려를 아끼지 않음'
    ],
    strengths: [
      '따뜻하고 안정적인 관계 형성',
      '파트너가 정서적으로 안전하다고 느끼게 함',
      '문제 상황에서 든든한 지원군 역할'
    ],
    advice: '자신의 필요와 감정도 중요합니다. 지나친 자기희생은 장기적으로 관계에 부정적 영향을 줄 수 있어요.'
  },
  {
    id: 'RPCD',
    title: '실용적 동반자',
    description: '현실적이고 실용적인 관계를 추구하며, 서로의 독립성과 성장을 중요시합니다.',
    image: '/images/love/practical.png',
    characteristics: [
      '실용적이고 현실적인 관계 추구',
      '독립성과 개인 공간을 중요시함',
      '명확한 의사소통 선호',
      '문제 해결 중심적 접근'
    ],
    strengths: [
      '합리적이고 균형 잡힌 관계 유지',
      '서로의 성장과 발전을 지원함',
      '갈등 상황에서 효과적인 해결책 제시'
    ],
    advice: '때로는 논리보다 감정에 집중해보세요. 파트너의 감정적 필요에 더 민감하게 반응하면 관계가 더 깊어질 수 있습니다.'
  },
  {
    id: 'ASCD',
    title: '정열적 탐험가',
    description: '열정적이고 스릴 넘치는 관계를 추구하며, 새로운 경험과 도전을 함께 즐깁니다.',
    image: '/images/love/adventurer.png',
    characteristics: [
      '활동적이고 모험적인 데이트 선호',
      '열정적인 감정 표현',
      '새로운 경험과 도전을 추구함',
      '자발적이고 즉흥적인 성향'
    ],
    strengths: [
      '관계에 활력과 흥미를 불어넣음',
      '지루함을 느낄 틈 없는 역동적인 관계',
      '파트너와 함께 성장하고 새로운 세계를 탐험함'
    ],
    advice: '때로는 안정과 일상의 소중함도 느껴보세요. 모든 순간이 극적이거나 흥미진진할 필요는 없습니다.'
  },
  {
    id: 'ASCA',
    title: '독립적 자유인',
    description: '자신과 파트너 모두의 독립성을 중요시하며, 서로 구속하지 않는 자유로운 관계를 추구합니다.',
    image: '/images/love/independent.png',
    characteristics: [
      '개인의 자유와 독립성을 중요시함',
      '구속되지 않는 관계 추구',
      '자신의 시간과 공간을 필요로 함',
      '파트너의 자율성을 존중함'
    ],
    strengths: [
      '서로에게 충분한 성장 공간 제공',
      '신선함과 독립성이 유지되는 관계',
      '상대방을 소유하려 하지 않고 있는 그대로 받아들임'
    ],
    advice: '독립성도 중요하지만, 유대감과 친밀함을 위한 시간도 필요합니다. 적절한 균형을 찾아보세요.'
  },
  {
    id: 'APCD',
    title: '분석적 전략가',
    description: '관계의 패턴과 역학을 분석하고 이해하려 하며, 효과적인 의사소통과 문제 해결을 중요시합니다.',
    image: '/images/love/analyzer.png',
    characteristics: [
      '관계의 패턴과 역학을 분석함',
      '논리적이고 체계적인 문제 해결 접근',
      '감정보다 이성적 판단 우선',
      '명확하고 직접적인 의사소통 선호'
    ],
    strengths: [
      '관계의 문제를 객관적으로 해결할 수 있음',
      '효과적인 의사소통으로 오해를 줄임',
      '장기적인 관계 발전을 위한 전략적 사고'
    ],
    advice: '때로는 분석을 멈추고 순간의 감정을 느껴보세요. 모든 관계의 측면이 논리적으로 설명될 수는 없습니다.'
  },
  {
    id: 'APDR',
    title: '헌신적 보호자',
    description: '파트너를 깊이 보살피고 보호하려는 성향이 강하며, 안정적이고 신뢰할 수 있는 관계를 중요시합니다.',
    image: '/images/love/protector.png',
    characteristics: [
      '파트너를 보호하고 돌보려는 성향',
      '안정적이고 신뢰할 수 있는 관계 추구',
      '책임감과 헌신이 강함',
      '파트너의 안전과 행복을 최우선시함'
    ],
    strengths: [
      '파트너에게 안정감과 신뢰를 제공함',
      '어려운 시기에도 변함없는 지지와 헌신',
      '강한 책임감으로 관계를 단단하게 유지'
    ],
    advice: '과잉보호는 오히려 파트너의 성장을 방해할 수 있습니다. 때로는 거리를 두고 스스로 결정할 기회를 주세요.'
  }
];

const LoveStyleQuiz = () => {
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
      R: 0, P: 0, // Romantic vs Practical
      S: 0, D: 0, // Supportive vs Direct
      C: 0, A: 0, // Communicative vs Autonomous
    };
    
    Object.values(answers).forEach((value) => {
      counts[value as keyof typeof counts]++;
    });
    
    // 가장 높은 점수의 유형을 선택
    const type = [
      counts.R >= counts.P ? 'R' : 'P',
      counts.S >= counts.D ? 'S' : 'D',
      counts.C >= counts.A ? 'C' : 'A',
    ].join('');
    
    // 유형이 정확히 일치하지 않으면 가장 가까운 유형 선택
    const closestType = findClosestType(type);
    
    router.push(`/quizzes/love/result?type=${closestType}`);
  };
  
  // 사전 정의된 유형 중 가장 가까운 유형 찾기
  const findClosestType = (type: string) => {
    // 미리 정의된 유형 ID들
    const availableTypes = loveTypes.map(t => t.id);
    
    // 정확한 일치가 있으면 그것을 반환
    if (availableTypes.includes(type)) {
      return type;
    }
    
    // 없으면 가장 문자가 많이 일치하는 유형 찾기
    let maxMatches = 0;
    let closestType = availableTypes[0];
    
    availableTypes.forEach(availableType => {
      let matches = 0;
      for (let i = 0; i < Math.min(type.length, availableType.length); i++) {
        if (type[i] === availableType[i]) {
          matches++;
        }
      }
      
      if (matches > maxMatches) {
        maxMatches = matches;
        closestType = availableType;
      }
    });
    
    return closestType;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 dark:from-gray-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-pink-700 dark:text-pink-300">연애 스타일 테스트</h1>
        
        <div className="max-w-xl mx-auto mb-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            당신의 연애 스타일을 알아보세요. 12개의 질문에 답하고 나만의 연애 유형을 확인하세요.
          </p>
        </div>
        
        <AdBanner type="horizontal" position="top" />
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8 dark:bg-gray-700">
          <div 
            className="bg-pink-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {!loading && (
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-3">
                  <p className="text-white text-center font-medium">
                    질문 {currentQuestion + 1}/{questions.length}
                  </p>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                    {questions[currentQuestion].text}
                  </h2>
                  
                  <div className="space-y-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleAnswer(option.value)}
                        className="w-full justify-start text-left py-4 px-6 bg-gray-50 hover:bg-pink-50 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
                        variant="outline"
                      >
                        {option.text}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {loading && (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        )}
        
        <AdBanner type="horizontal" position="bottom" />
      </div>
    </div>
  );
};

export default LoveStyleQuiz; 