"use client";

import { useSearchParams } from "next/navigation";
import { MbtiType } from "./types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState, Suspense } from "react";
import ShareButtons from './ShareButtons';
import AdBanner from '@/app/components/AdBanner';

const mbtiData = {
  ISTJ: {
    name: "코난 (명탐정 코난)",
    image: "/images/characters/conan.png",
    description: "논리적이고 철저하며 책임감이 강한 당신은 문제 해결과 규칙 준수를 중요시합니다. 코난처럼 세부 사항을 놓치지 않고 끈기 있게 사건을 해결하는 능력이 있습니다.",
    traits: ["책임감", "논리적", "조직적", "철저함", "현실적"],
    match: "ESFP (료코)"
  },
  ISFJ: {
    name: "히나타 쇼요 (하이큐!!)",
    image: "/images/characters/hinata.png",
    description: "충성스럽고 헌신적인 당신은 남을 돕는 것에서 큰 보람을 느낍니다. 히나타처럼 팀을 위해 최선을 다하고, 끊임없이 성장하려는 의지가 있습니다.",
    traits: ["충성심", "배려심", "헌신적", "온화함", "보호본능"],
    match: "ENTP (오이카와 토오루)"
  },
  INFJ: {
    name: "루피 (원피스)",
    image: "/images/characters/luffy.png",
    description: "이상주의적이고 통찰력이 뛰어난 당신은 높은 도덕적 기준을 가지고 있습니다. 루피처럼 강한 직관과 리더십으로 주변 사람들에게 영감을 줍니다.",
    traits: ["통찰력", "이상주의", "창의성", "헌신", "확고한 신념"],
    match: "ESTP (조로)"
  },
  INTJ: {
    name: "L (데스노트)",
    image: "/images/characters/l.png",
    description: "전략적이고 독립적인 당신은 문제를 창의적으로 해결하는 능력이 뛰어납니다. L처럼 뛰어난 분석력과 논리력으로 복잡한 상황을 명쾌하게 풀어냅니다.",
    traits: ["전략적", "독립적", "분석적", "목표지향적", "통찰력"],
    match: "ENFP (마이트 가이)"
  },
  ISTP: {
    name: "레비 (진격의 거인)",
    image: "/images/characters/levi.png",
    description: "분석적이고 실용적인 당신은 신속하게 문제를 해결하는 능력이 있습니다. 레비처럼 침착하게 위기 상황을 극복하고 효율적으로 행동합니다.",
    traits: ["현실적", "논리적", "침착함", "적응력", "독립적"],
    match: "ENFJ (에렌 예거)"
  },
  ISFP: {
    name: "미도리야 이즈쿠 (나의 히어로 아카데미아)",
    image: "/images/characters/midoriya.png",
    description: "온화하고 감성적인 당신은 강한 개인적 가치관을 가지고 있습니다. 미도리야처럼 겸손하면서도 타인을 위해 자신을 희생할 줄 아는 용기가 있습니다.",
    traits: ["예술적", "개인주의", "충성심", "적응력", "감성적"],
    match: "ENTJ (바쿠고 카츠키)"
  },
  INFP: {
    name: "알폰스 엘릭 (강철의 연금술사)",
    image: "/images/characters/alphonse.png",
    description: "이상주의적이고 공감능력이 뛰어난 당신은 다른 사람들의 잠재력을 발견하는 데 능숙합니다. 알폰스처럼 순수한 마음과 깊은 공감능력으로 주변 사람들에게 긍정적인 영향을 줍니다.",
    traits: ["이상주의", "공감능력", "창의성", "호기심", "충성심"],
    match: "ESTJ (로이 머스탱)"
  },
  INTP: {
    name: "키라기리 쿄코 (단간론파)",
    image: "/images/characters/kirigiri.png",
    description: "논리적이고 창의적인 당신은 복잡한 문제를 해결하는 데 뛰어납니다. 키라기리처럼 뛰어난 분석력과 객관적인 시각으로 진실을 찾아내는 능력이 있습니다.",
    traits: ["분석적", "논리적", "창의적", "호기심", "독립적"],
    match: "ESFJ (아오이 아사히나)"
  },
  ESTP: {
    name: "조로 (원피스)",
    image: "/images/characters/zoro.png",
    description: "모험을 즐기고 행동적인 당신은 문제를 실용적으로 해결합니다. 조로처럼 위험을 두려워하지 않고 직접적인 방식으로 도전을 극복합니다.",
    traits: ["행동적", "현실적", "적응력", "관찰력", "효율적"],
    match: "INFJ (루피)"
  },
  ESFP: {
    name: "료코 (킬라킬)",
    image: "/images/characters/ryuko.png",
    description: "열정적이고 즉흥적인 당신은 삶을 즐기고 타인에게 에너지를 전달합니다. 료코처럼 자유로운 영혼과 강한 의지력으로 자신의 신념을 따릅니다.",
    traits: ["열정적", "사교적", "즉흥적", "실용적", "적응력"],
    match: "ISTJ (코난)"
  },
  ENFP: {
    name: "마이트 가이 (나루토)",
    image: "/images/characters/mightguy.png",
    description: "열정적이고 창의적인 당신은 새로운 가능성을 찾는 것을 좋아합니다. 마이트 가이처럼 넘치는 에너지와 긍정적인 태도로 주변 사람들에게 영감을 줍니다.",
    traits: ["열정적", "창의적", "공감능력", "적응력", "호기심"],
    match: "INTJ (L)"
  },
  ENTP: {
    name: "오이카와 토오루 (하이큐!!)",
    image: "/images/characters/oikawa.png",
    description: "창의적이고 지적 호기심이 강한 당신은 논쟁과 새로운 아이디어를 즐깁니다. 오이카와처럼 뛰어난 관찰력과 적응력으로 상황을 유리하게 이끌어 갑니다.",
    traits: ["창의적", "논쟁적", "지적 호기심", "적응력", "혁신적"],
    match: "ISFJ (히나타 쇼요)"
  },
  ESTJ: {
    name: "로이 머스탱 (강철의 연금술사)",
    image: "/images/characters/roy.png",
    description: "체계적이고 책임감이 강한 당신은 효율적으로 목표를 달성합니다. 로이처럼 명확한 비전과 리더십으로 팀을 성공으로 이끄는 능력이 있습니다.",
    traits: ["조직적", "실용적", "논리적", "책임감", "결단력"],
    match: "INFP (알폰스 엘릭)"
  },
  ESFJ: {
    name: "아오이 아사히나 (단간론파)",
    image: "/images/characters/aoi.png",
    description: "따뜻하고 협력적인 당신은 다른 사람들의 필요를 잘 챙기는 능력이 있습니다. 아오이처럼 조화와 화합을 중요시하며 주변 사람들에게 안정감을 줍니다.",
    traits: ["사교적", "협력적", "배려심", "책임감", "실용적"],
    match: "INTP (키라기리 쿄코)"
  },
  ENFJ: {
    name: "에렌 예거 (진격의 거인)",
    image: "/images/characters/eren.png",
    description: "카리스마 있고 영감을 주는 당신은 사람들을 이끌고 동기부여하는 능력이 있습니다. 에렌처럼 강한 신념과 열정으로 목표를 향해 나아가며 타인에게 영향력을 발휘합니다.",
    traits: ["카리스마", "이상주의", "공감능력", "설득력", "책임감"],
    match: "ISTP (레비)"
  },
  ENTJ: {
    name: "바쿠고 카츠키 (나의 히어로 아카데미아)",
    image: "/images/characters/bakugo.png",
    description: "결단력 있고 전략적인 당신은 효율적으로 목표를 달성합니다. 바쿠고처럼 높은 기준과 강한 의지로 끊임없이 발전하며 승리를 추구합니다.",
    traits: ["결단력", "리더십", "전략적", "논리적", "자신감"],
    match: "ISFP (미도리야 이즈쿠)"
  }
};

function ResultContent() {
  const searchParams = useSearchParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const type = searchParams.get("type") as MbtiType | null;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!type) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">No MBTI type found</h1>
        <p className="mb-8 text-center">You need to take the test to get your anime character match!</p>
        <Button asChild>
          <Link href="/quizzes/mbti">Take the MBTI Test</Link>
        </Button>
      </div>
    );
  }

  if (!mbtiData[type as keyof typeof mbtiData]) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Invalid MBTI type</h1>
        <p className="mb-8 text-center">The MBTI type "{type}" is not valid. Please take the test again.</p>
        <Button asChild>
          <Link href="/quizzes/mbti">Take the MBTI Test</Link>
        </Button>
      </div>
    );
  }

  const character = mbtiData[type as keyof typeof mbtiData];
  
  // Convert data structure to match the component expectations
  const characterData = {
    characterName: character.name.split(' (')[0],
    anime: character.name.split(' (')[1]?.replace(')', '') || '',
    emoji: ['✨', '🌟', '🎭'], // Default emojis
    image: character.image,
    description: character.description,
    strengths: character.traits,
    weaknesses: [
      '때로는 고집이 세게 보일 수 있음',
      '스트레스 상황에서 감정을 숨기는 경향',
      '너무 높은 기준으로 자신을 평가함',
      '변화를 받아들이는 데 어려움을 겪을 수 있음'
    ],
    compatibleTypes: [character.match.split(' (')[0]]
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <Button variant="outline" asChild className="mb-4">
          <Link href="/quizzes/mbti">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Take the test again
          </Link>
        </Button>
        
        <h1 className="text-4xl font-bold mb-2">Your MBTI Type is {type}</h1>
        <div className="flex items-center mb-8">
          <p className="text-xl opacity-80">You are like {characterData.characterName} from {characterData.anime}</p>
          <div className="ml-4 flex space-x-1">
            {characterData.emoji.map((em, i) => (
              <span key={i} className="text-2xl">{em}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Character Image */}
        <div className="flex justify-center md:justify-start">
          <div className="relative h-[400px] w-[300px] overflow-hidden rounded-lg shadow-lg">
            <Image 
              src={characterData.image} 
              alt={characterData.characterName}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <Card className="p-6 h-full flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">{characterData.characterName} ({type})</h2>
            <p className="mb-6 text-lg">{characterData.description}</p>
            <div className="text-sm opacity-70 italic">From {characterData.anime}</div>
          </Card>
        </div>
      </div>

      {/* Strengths and Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 text-green-500">Strengths</h3>
          <ul className="list-disc pl-5 space-y-2">
            {characterData.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 text-red-500">Weaknesses</h3>
          <ul className="list-disc pl-5 space-y-2">
            {characterData.weaknesses.map((weakness, index) => (
              <li key={index}>{weakness}</li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Compatible Types */}
      <Card className="p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">Compatible Types</h3>
        <div className="flex flex-wrap gap-2">
          {characterData.compatibleTypes.map((compatibleType) => (
            <Link 
              key={compatibleType} 
              href={`/quizzes/mbti/result?type=${compatibleType}`}
              className="px-3 py-1 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
            >
              {compatibleType}
            </Link>
          ))}
        </div>
      </Card>

      <div className="text-center mt-12">
        <p className="mb-4">Want to share your results?</p>
        <div className="flex justify-center space-x-4">
          <ShareButtons 
            url={typeof window !== 'undefined' ? window.location.href : ''} 
            title={`I am ${type} like ${characterData.characterName} from ${characterData.anime}!`} 
          />
        </div>
      </div>
    </div>
  );
}

export default function MbtiResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
} 