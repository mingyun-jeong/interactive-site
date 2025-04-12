"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Share2, Twitter, Facebook, Repeat2 } from 'lucide-react';

// 원피스 캐릭터 MBTI 데이터
const mbtiData = {
  'ENFP': {
    type: 'ENFP',
    characterName: '몽키 D. 루피',
    emoji: '🏴',
    image: '/images/characters/luffy.png',
    description: '자유로운 영혼의 소유자로 열정적이고 창의적입니다. 새로운 가능성에 끊임없이 흥분하며, 사람들에게 영감을 주는 능력이 있습니다. 규칙보다는 자신만의 방식으로 문제를 해결하며, 모험과 자유를 갈망합니다. 주변 사람들에게 에너지를 불어넣고 항상 새로운 아이디어로 가득 차 있습니다.',
    strengths: ['뛰어난 적응력', '창의적인 문제해결 능력', '카리스마와 설득력', '열정적인 에너지', '공감 능력', '낙관적인 태도'],
    weaknesses: ['일관성과 인내심 부족', '현실적인 세부사항 간과', '지나친 충동성', '약속과 의무를 잊는 경향', '감정적으로 불안정할 수 있음'],
    compatibleTypes: ['INTJ', 'INFJ']
  },
  'ENTP': {
    type: 'ENTP',
    characterName: '우솝',
    emoji: '🎩',
    image: '/images/characters/usopp.png',
    description: '논쟁과 지적 도전을 즐기는 재기발랄한 유형입니다. 독창적이고 창의적인 사고로 새로운 아이디어를 끊임없이 생산하며, 기존의 규칙과 관습에 도전하는 것을 즐깁니다. 빠른 사고와 언변으로 다양한 상황에 적응하고, 남다른 시각으로 문제를 바라보는 능력이 뛰어납니다. 세상에 대한 호기심이 많고 지식 탐구에 열정적입니다.',
    strengths: ['뛰어난 분석력', '창의적인 문제해결 능력', '임기응변 능력', '유머 감각', '다재다능함', '지적 호기심'],
    weaknesses: ['논쟁적인 성향', '프로젝트 완성의 어려움', '규칙과 구조 무시', '민감한 주제에 대한 무신경', '때때로 지나치게 솔직함'],
    compatibleTypes: ['INTJ', 'INFJ']
  },
  'ENFJ': {
    type: 'ENFJ',
    characterName: '비비',
    emoji: '🧑‍🏫',
    image: '/images/characters/vivi.png',
    description: '타인의 성장과 발전을 돕는 데 열정적인 카리스마 있는 지도자입니다. 다른 사람의 감정을 깊이 이해하고 공감하며, 집단의 조화와 화합을 중요시합니다. 뛰어난 의사소통 능력으로 사람들을 설득하고 영감을 주며, 긍정적인 변화를 이끌어내는 능력이 있습니다. 자신보다 다른 사람의 필요를 우선시하는 이타적인 성향을 가지고 있습니다.',
    strengths: ['탁월한 리더십', '뛰어난 의사소통 능력', '깊은 공감 능력', '영감을 주는 존재감', '조직화 능력', '다른 사람의 잠재력 발견'],
    weaknesses: ['과도한 자기희생', '지나친 이상주의', '비판에 민감함', '갈등 회피 경향', '때로는 지나치게 통제적'],
    compatibleTypes: ['INFP', 'ISFP']
  },
  'ENTJ': {
    type: 'ENTJ',
    characterName: '상디',
    emoji: '👑',
    image: '/images/characters/sanji.png',
    description: '대담하고 결단력 있는 천부적인 리더입니다. 장기적인 계획과 목표 달성에 뛰어나며, 효율성과 논리를 바탕으로 전략을 수립합니다. 어려운 상황에서도 빠르게 결정을 내리고 행동으로 옮기는 실행력이 강하며, 직설적이고 솔직한 소통 방식을 선호합니다. 항상 더 나은 방법을 모색하고 지속적으로 자신과 환경을 개선하려는 의지가 강합니다.',
    strengths: ['뛰어난 계획 및 조직 능력', '목표 지향적인 리더십', '결단력', '효율적인 문제해결 능력', '직설적이고 명확한 소통', '자신감'],
    weaknesses: ['지나친 완벽주의', '타인의 감정 간과', '지나치게 비판적', '인내심 부족', '융통성 없는 경향'],
    compatibleTypes: ['INFP', 'INTP']
  },
  'ESFP': {
    type: 'ESFP',
    characterName: '프랑키',
    emoji: '🌊',
    image: '/images/characters/franky.png',
    description: '즉흥적이고 활기 넘치는 즐거움을 추구하는 사교적인 유형입니다. 현재 순간을 충분히 즐기며 살고, 주변 사람들에게 에너지와 열정을 전파합니다. 새로운 경험과 모험을 사랑하며, 실용적인 문제 해결 능력과 함께 창의적인 표현 방식을 가지고 있습니다. 사람들과 어울리는 것을 좋아하고 쉽게 친구를 사귀며, 유머 감각이 풍부합니다.',
    strengths: ['뛰어난 대인관계 능력', '강한 현실 감각', '실용적인 문제해결 능력', '열정과 에너지', '적응력', '즐거운 분위기 조성'],
    weaknesses: ['장기적 계획 부족', '깊은 이론적 문제 회피', '지루함에 약함', '감정적 깊이 부족할 수 있음', '책임감 회피 경향'],
    compatibleTypes: ['ISTJ', 'ISFJ']
  },
  'ESTP': {
    type: 'ESTP',
    characterName: '포트거스 D. 에이스',
    emoji: '💥',
    image: '/images/characters/ace.png',
    description: '즉각적인 행동과 모험을 즐기는 대담한 유형입니다. 위험을 두려워하지 않고 도전적인 상황에서 빛을 발하며, 현실적이고 실용적인 해결책을 선호합니다. 뛰어난 관찰력으로 주변 환경의 변화를 빠르게 감지하고 적응하는 능력이 있습니다. 사교적이고 활발하며, 자유롭고 구속받지 않는 생활방식을 추구합니다.',
    strengths: ['뛰어난 위기대처 능력', '실용적인 문제해결 능력', '유연한 적응력', '행동 지향적', '현실적인 접근 방식', '강한 설득력'],
    weaknesses: ['충동적인 의사결정', '규칙과 구조 무시', '장기적 계획 부족', '타인의 감정에 둔감할 수 있음', '지루함에 취약'],
    compatibleTypes: ['ISFJ', 'ISTJ']
  },
  'ESFJ': {
    type: 'ESFJ',
    characterName: '샹크스',
    emoji: '🍰',
    image: '/images/characters/shanks.png',
    description: '따뜻하고 친절하며 조화로운 관계를 중요시하는 배려심 깊은 유형입니다. 다른 사람의 필요에 민감하게 반응하고, 구체적인 방법으로 도움을 제공하는 것을 좋아합니다. 전통과 가치를 중요시하며, 사회적 규범과 질서를 유지하려는 경향이 있습니다. 모임과 행사를 조직하는 능력이 뛰어나고, 다른 사람들이 편안함을 느끼게 해주는 재능이 있습니다.',
    strengths: ['뛰어난 대인관계 능력', '실용적인 도움 제공', '충성심과 책임감', '협력적 태도', '조직력', '세심한 배려'],
    weaknesses: ['변화에 대한 저항', '비판에 민감함', '과도한 자기희생', '지나친 동조 경향', '독립적 판단 어려움'],
    compatibleTypes: ['ISTP', 'ISFP']
  },
  'ESTJ': {
    type: 'ESTJ',
    characterName: '스모커',
    emoji: '⚔️',
    image: '/images/characters/smoker.png',
    description: '실용적이고 현실적인 관리자 유형으로, 명확한 규칙과 구조를 중요시합니다. 책임감이 강하고 의무를 충실히 이행하며, 목표 달성을 위해 체계적으로 일합니다. 효율성과 정확성을 추구하고, 직설적이고 솔직한 의사소통을 선호합니다. 전통과 관습을 존중하며, 안정적이고 예측 가능한 환경을 선호합니다.',
    strengths: ['뛰어난 조직 및 계획 능력', '책임감과 신뢰성', '실용적인 문제해결 능력', '명확한 의사소통', '결단력', '높은 업무 효율성'],
    weaknesses: ['지나친 경직성', '감정적 고려 부족', '변화 수용의 어려움', '지나치게 독단적일 수 있음', '세부사항에 집착'],
    compatibleTypes: ['ISTP', 'ISFP']
  },
  'INFP': {
    type: 'INFP',
    characterName: '나미',
    emoji: '🐌',
    image: '/images/characters/nami.png',
    description: '깊은 내면 세계와 강한 개인적 가치관을 가진 이상주의자입니다. 감수성이 풍부하고 창의적이며, 다른 사람의 감정과 필요에 깊이 공감합니다. 자신의 신념과 일치하는 의미 있는 일을 추구하고, 진정성과 정직함을 중요시합니다. 혼자만의 시간을 통해 자신의 생각과 감정을 탐색하는 것을 좋아하며, 내면의 조화를 추구합니다.',
    strengths: ['깊은 공감 능력', '강한 창의성', '독창적인 사고방식', '개인적 가치에 대한 헌신', '적응력', '진정성'],
    weaknesses: ['현실적 문제에 취약', '비판에 민감함', '자기비판적 경향', '우유부단함', '혼자 문제를 떠안는 경향'],
    compatibleTypes: ['ENFJ', 'ENTJ']
  },
  'INFJ': {
    type: 'INFJ',
    characterName: '니코 로빈',
    emoji: '🧙‍♀️',
    image: '/images/characters/robin.png',
    description: '예리한 통찰력과 깊은 직관을 가진 신비로운 유형입니다. 복잡한 문제와 사람의 심리를 이해하는 능력이 뛰어나며, 내면의 풍부한 상상력으로 창의적인 해결책을 제시합니다. 강한 도덕적 신념을 바탕으로 세상에 긍정적인 변화를 가져오려는 열망이 있으며, 타인과의 진정한 연결을 추구합니다. 조용하지만 열정적이고, 인간의 가능성과 성장에 깊은 관심을 가지고 있습니다.',
    strengths: ['뛰어난 통찰력', '창의적인 문제해결 능력', '깊은 공감 능력', '강한 직관', '목적 지향적', '헌신적'],
    weaknesses: ['지나친 완벽주의', '비현실적 기대', '비판에 민감함', '고립 경향', '자기희생적 태도'],
    compatibleTypes: ['ENFP', 'ENTP']
  },
  'INTP': {
    type: 'INTP',
    characterName: '프랑키',
    emoji: '🧪',
    image: '/images/characters/franky.png',
    description: '논리적이고 분석적인 사고를 가진 지적 탐험가입니다. 복잡한 문제와 이론적 개념을 탐구하는 것을 즐기며, 독창적이고 혁신적인 해결책을 제시하는 능력이 있습니다. 객관적인 분석과 합리적인 판단을 중요시하며, 지식에 대한 끊임없는 갈증을 가지고 있습니다. 독립적인 사고방식과 유연한 적응력을 바탕으로 기존의 시스템을 개선하고 발전시키는 데 관심이 많습니다.',
    strengths: ['뛰어난 분석 능력', '창의적인 문제해결', '객관적인 판단력', '독립적인 사고', '지적 호기심', '혁신적인 아이디어'],
    weaknesses: ['감정 표현의 어려움', '현실적 세부사항 간과', '우유부단함', '사회적 상황에서의 불편함', '완벽주의로 인한 지연'],
    compatibleTypes: ['ENTJ', 'ENFJ']
  },
  'INTJ': {
    type: 'INTJ',
    characterName: '트라팔가 로',
    emoji: '🧠',
    image: '/images/characters/law.png',
    description: '전략적인 사고와 장기적인 비전을 가진 독립적인 전략가입니다. 복잡한 시스템과 이론을 이해하고 개선하는 능력이 탁월하며, 높은 기준과 목표를 설정합니다. 논리적이고 객관적인 판단을 중요시하며, 효율성과 지속적인 개선을 추구합니다. 독립적인 작업을 선호하고, 자신만의 방식으로 문제를 해결하는 것을 좋아합니다.',
    strengths: ['전략적 사고', '독창적인 문제해결 능력', '논리적 분석력', '장기적 계획 능력', '독립성', '지적 호기심'],
    weaknesses: ['감정 표현의 어려움', '지나친 완벽주의', '비판적 태도', '융통성 부족', '고집스러움'],
    compatibleTypes: ['ENFP', 'ENTP']
  },
  'ISFP': {
    type: 'ISFP',
    characterName: '토니토니 쵸파',
    emoji: '🍖',
    image: '/images/characters/chopper.png',
    description: '조용하고 겸손하면서도 깊은 감성을 가진 예술가적 유형입니다. 현재의 순간을 충분히 경험하고 즐기며, 아름다움과 조화를 중요시합니다. 타인의 감정에 민감하게 반응하고 공감하는 능력이 뛰어나며, 자신만의 가치관에 따라 독립적으로 행동합니다. 유연하고 적응력이 높으며, 실용적이면서도 창의적인 해결책을 찾는 능력이 있습니다.',
    strengths: ['뛰어난 미적 감각', '깊은 공감 능력', '실용적인 창의성', '적응력', '현재에 충실함', '충성심'],
    weaknesses: ['의견 표현의 어려움', '갈등 회피', '장기 계획의 어려움', '과도한 독립성', '스트레스에 취약'],
    compatibleTypes: ['ENFJ', 'ENTJ']
  },
  'ISFJ': {
    type: 'ISFJ',
    characterName: '히나',
    emoji: '🧺',
    image: '/images/characters/hina.png',
    description: '세심하고 헌신적이며 보호적인 성향의 수호자 유형입니다. 책임감이 강하고 의무를 충실히 이행하며, 다른 사람의 필요와 감정에 세심하게 주의를 기울입니다. 전통과 안정을 중요시하고, 실용적이고 구체적인 방식으로 도움을 제공합니다. 조용하고 겸손하지만, 친밀한 관계에서는 따뜻하고 관대한 모습을 보여줍니다.',
    strengths: ['세심한 배려', '높은 책임감', '실용적인 도움', '신뢰성', '충성심', '조직력'],
    weaknesses: ['변화에 대한 저항', '자신의 필요 무시', '과도한 자기희생', '비판에 민감함', '지나친 겸손함'],
    compatibleTypes: ['ENFP', 'ENTP']
  },
  'ISTP': {
    type: 'ISTP',
    characterName: '로로노아 조로',
    emoji: '🗡️',
    image: '/images/characters/zoro.png',
    description: '독립적이고 적응력이 뛰어난 문제 해결사입니다. 현실적이고 실용적인 접근 방식을 선호하며, 위기 상황에서 침착하게 대처하는 능력이 탁월합니다. 효율성과 논리를 중요시하고, 불필요한 규칙이나 제약을 싫어합니다. 자신만의 공간과 자유를 중요시하며, 손으로 직접 작업하는 것을 좋아합니다. 적은 말로 많은 것을 표현하고, 행동으로 자신의 가치를 증명합니다.',
    strengths: ['뛰어난 문제해결 능력', '위기 대처 능력', '적응력', '독립성', '실용적인 기술', '현실적인 접근 방식'],
    weaknesses: ['감정 표현의 어려움', '장기적 계획 부족', '약속에 대한 무관심', '사회적 관습 무시', '지루함에 취약'],
    compatibleTypes: ['ESTJ', 'ESFJ']
  },
  'ISTJ': {
    type: 'ISTJ',
    characterName: '징베',
    emoji: '📚',
    image: '/images/characters/jinbe.png',
    description: '책임감이 강하고 신뢰할 수 있는 현실주의자입니다. 체계적이고 조직적인 접근 방식을 선호하며, 사실과 세부사항에 주의를 기울입니다. 전통과 안정을 중요시하고, 약속을 지키는 것에 높은 가치를 둡니다. 실용적이고 논리적인 판단을 바탕으로 효율적으로 일하며, 일관된 결과를 제공합니다. 조용하고 진지하지만, 필요할 때는 단호하게 결정을 내릴 수 있습니다.',
    strengths: ['뛰어난 조직력', '신뢰성', '세부사항에 대한 주의력', '실용적인 접근 방식', '책임감', '인내심'],
    weaknesses: ['변화에 대한 저항', '감정 표현의 어려움', '새로운 아이디어에 대한 경직성', '지나친 완고함', '타인의 감정 간과'],
    compatibleTypes: ['ESFP', 'ESTP']
  }
};

// ShareButtons 컴포넌트 추가
function ShareButtons({ title, hashtags }: { title: string, hashtags: string[] }) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <a 
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags.join(',')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-full flex items-center"
      >
        <Twitter className="w-5 h-5 mr-2" />
        <span>트위터</span>
      </a>
      <a 
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center"
      >
        <Facebook className="w-5 h-5 mr-2" />
        <span>페이스북</span>
      </a>
      <button 
        onClick={() => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(shareUrl)
              .then(() => alert('URL이 클립보드에 복사되었습니다!'))
              .catch(err => console.error('Could not copy URL: ', err));
          }
        }}
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full flex items-center"
      >
        <Share2 className="w-5 h-5 mr-2" />
        <span>URL 복사</span>
      </button>
    </div>
  );
}

function MbtiResultContent() {
  const searchParams = useSearchParams();
  const mbtiType = searchParams.get('type') || 'ENFP'; // 기본값은 루피(ENFP)
  
  const result = mbtiData[mbtiType as keyof typeof mbtiData] || mbtiData['ENFP'];
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-8">
          <h1 className="text-white text-3xl md:text-4xl font-bold text-center">
            당신의 원피스 캐릭터는
          </h1>
          <p className="text-indigo-100 text-center mt-2">MBTI 성격 유형에 기반한 캐릭터 분석</p>
        </div>
        
        {/* 결과 내용 */}
        <div className="p-8">
          {/* 캐릭터 기본 정보 */}
          <div className="flex flex-col md:flex-row gap-8 mb-10">
            <div className="w-[300px] h-[370px] rounded-xl overflow-hidden flex-shrink-0 mx-auto md:mx-0 shadow-lg border-4 border-indigo-100 dark:border-indigo-900">
              <Image 
                src={result.image} 
                alt={result.characterName} 
                width={300} 
                height={370}
                className="w-full h-full object-fill"
                priority
                onError={() => {
                  console.error(`Failed to load image: ${result.image}`);
                }}
                unoptimized
              />
            </div>
            <div className="text-center md:text-left flex flex-col justify-center">
              <div className="inline-block px-4 py-1 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-800 dark:text-indigo-200 text-sm font-medium mb-3">
                {result.type}
              </div>
              <div className="flex items-center justify-center md:justify-start mb-4">
                <span className="text-5xl mr-4">{result.emoji}</span>
                <h2 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                  {result.characterName}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-3 italic">원피스 시리즈</p>
              <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed">{result.description}</p>
            </div>
          </div>
          
          {/* 특성 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* 강점 */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-6 rounded-xl shadow-sm border border-indigo-100 dark:border-indigo-800">
              <h3 className="font-bold text-xl mb-4 text-indigo-700 dark:text-indigo-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                강점
              </h3>
              <ul className="space-y-2">
                {result.strengths.map((strength, idx) => (
                  <li key={idx} className="text-gray-700 dark:text-gray-300 flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-indigo-400 mt-2 mr-2 flex-shrink-0"></span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* 약점 */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 p-6 rounded-xl shadow-sm border border-rose-100 dark:border-rose-800">
              <h3 className="font-bold text-xl mb-4 text-rose-700 dark:text-rose-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                약점
              </h3>
              <ul className="space-y-2">
                {result.weaknesses.map((weakness, idx) => (
                  <li key={idx} className="text-gray-700 dark:text-gray-300 flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-rose-400 mt-2 mr-2 flex-shrink-0"></span>
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* 궁합 정보 */}
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 p-6 rounded-xl shadow-sm border border-violet-100 dark:border-violet-800 mb-10">
            <h3 className="font-bold text-xl mb-4 text-violet-700 dark:text-violet-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              잘 맞는 MBTI 유형
            </h3>
            <div className="flex flex-wrap gap-3">
              {result.compatibleTypes.map((type, idx) => (
                <span key={idx} className="px-4 py-2 bg-violet-200 dark:bg-violet-800 rounded-full text-violet-800 dark:text-violet-200 font-medium shadow-sm">
                  {type}
                </span>
              ))}
            </div>
          </div>
          
          {/* 공유 버튼 */}
          <div className="mt-10 pb-4 border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-center text-lg font-medium mb-5 text-gray-700 dark:text-gray-300">결과 공유하기</h3>
            <ShareButtons 
              title={`나의 원피스 캐릭터는 ${result.characterName}(${result.type})입니다!`} 
              hashtags={['원피스MBTI', '원피스캐릭터', 'MBTI테스트']}
            />
          </div>
          
          {/* 다시하기 버튼 */}
          <div className="mt-10 text-center">
            <Link 
              href="/quizzes/mbti" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium rounded-full hover:from-indigo-700 hover:to-violet-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              테스트 다시 하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// 로딩 표시 컴포넌트
function LoadingResult() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p className="ml-3 text-lg">결과 분석 중...</p>
    </div>
  );
}

export default function MbtiResult() {
  return (
    <Suspense fallback={<LoadingResult />}>
      <MbtiResultContent />
    </Suspense>
  );
} 