import { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";
import AdBanner from "./components/AdBanner";
import { 
  Users, 
  Sparkles, 
  Brain, 
  Compass, 
  ChevronRight, 
  Heart, 
  Star, 
  Clock,
  Share2,
  Beaker
} from "lucide-react";

export const metadata: Metadata = {
  title: '원피스 MBTI 테스트 - 당신과 닮은 원피스 캐릭터는?',
  description: 'MBTI 성격 유형으로 나와 닮은 원피스 캐릭터를 찾아보세요.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <div className="inline-block mb-4 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-300 font-medium text-sm">
            반응을 이끌어내는 콘텐츠 실험실
          </div>
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <Image 
                src="/pickly-lab-logo.svg" 
                alt="Pickly Lab Logo" 
                width={96} 
                height={96} 
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 text-transparent bg-clip-text">
            Pickly Lab
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            재미있고 몰입감 있는 심리 테스트와 퀴즈를 통해 자신을 발견하고 친구들과 공유해보세요.
          </p>
          
          <div className="mt-10">
            <Link 
              href="/quizzes/mbti"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              테스트 시작하기 
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </header>
        
        {/* 상단 광고 배너 */}
        <div className="my-16">
          <AdBanner type="horizontal" position="top" />
        </div>

        <section className="mb-20">
          <div className="flex items-center justify-center space-x-2 mb-12">
            <div className="h-px w-12 bg-blue-300 dark:bg-blue-700"></div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
              인기 테스트
            </h2>
            <div className="h-px w-12 bg-blue-300 dark:bg-blue-700"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/quizzes/mbti" className="group">
              <div className="h-full bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 border border-slate-100 dark:border-slate-700">
                <div className="relative h-56 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 flex items-center justify-center p-6">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <span className="relative text-4xl font-bold text-white">MBTI</span>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                    인기
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                    MBTI 애니메이션 캐릭터 검사
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    16가지 성격 유형 중 당신은 어떤 애니메이션 캐릭터와 닮았는지 알아보세요.
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                      <Users className="h-4 w-4 mr-1" />
                      <span>12,345+ 참여</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>약 5분</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* 연애 스타일 테스트 카드 */}
            <Link href="/quizzes/love" className="group">
              <div className="h-full bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 border border-slate-100 dark:border-slate-700">
                <div className="relative h-56 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 flex items-center justify-center p-6">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <span className="relative text-4xl font-bold text-white">LOVE</span>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                    신규
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                    연애 성향 테스트
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    당신의 연애 스타일과 이상형을 알아보세요.
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center text-sm text-pink-600 dark:text-pink-400">
                      <Heart className="h-4 w-4 mr-1" />
                      <span>9,876+ 참여</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>약 3분</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* IQ 테스트 카드 */}
            <Link href="/quizzes/iq" className="group">
              <div className="h-full bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 border border-slate-100 dark:border-slate-700">
                <div className="relative h-56 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 flex items-center justify-center p-6">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <span className="relative text-4xl font-bold text-white">IQ</span>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                    NEW
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                    IQ 테스트
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    당신의 지능지수를 테스트해보세요.
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center text-sm text-amber-600 dark:text-amber-400">
                      <Brain className="h-4 w-4 mr-1" />
                      <span>5,432+ 참여</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>약 10분</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* 중간 광고 배너 */}
        <div className="my-16">
          <AdBanner type="horizontal" position="inline" />
        </div>

        <section className="mb-20">
          <div className="flex items-center justify-center space-x-2 mb-12">
            <div className="h-px w-12 bg-blue-300 dark:bg-blue-700"></div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
              테스트 카테고리
            </h2>
            <div className="h-px w-12 bg-blue-300 dark:bg-blue-700"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-md border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">성격 테스트</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">당신의 성격과 특성을 알아보는 다양한 테스트</p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-md border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">연애 테스트</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">당신의 연애 스타일과 이상형을 분석하는 테스트</p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-md border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">지능 테스트</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">당신의 지능과 사고력을 측정하는 테스트</p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-md border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">적성 테스트</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">당신에게 맞는 직업과 진로를 찾는 테스트</p>
            </div>
          </div>
        </section>

        {/* Pickly Lab 소개 섹션 */}
        <section className="mb-20 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 shadow-lg border border-blue-100 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
            Pickly Lab과 함께하는 재미있는 심리 테스트
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Beaker className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">실험적 콘텐츠</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">재미있고 몰입감 있는 실험적 콘텐츠를 경험해보세요.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">빠른 결과</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">짧은 시간 안에 당신의 성향과 특성을 알아볼 수 있습니다.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Share2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">공유하기</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">테스트 결과를 친구들과 쉽게 공유할 수 있습니다.</p>
            </div>
          </div>
        </section>

        {/* 하단 광고 배너 */}
        <AdBanner type="horizontal" position="bottom" />

        <footer className="text-center text-slate-500 dark:text-slate-400 mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="mb-4">
            <Image 
              src="/pickly-lab-logo.svg" 
              alt="Pickly Lab Logo" 
              width={40} 
              height={40} 
              className="inline-block"
            />
          </div>
          <p className="mb-4">© 2025 Pickly Lab. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">이용약관</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">개인정보 처리방침</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">연락처</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

