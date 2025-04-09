import Link from "next/link";
import AdBanner from "./components/AdBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
            인터랙티브 테스트
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            재미있는 퀴즈와 테스트로 자신에 대해 알아보세요!
          </p>
        </header>
        
        {/* 상단 광고 배너 */}
        <AdBanner type="horizontal" position="top" />

        <section className="mb-16 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            인기 테스트
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/quizzes/mbti" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <div className="relative h-48 bg-indigo-100 dark:bg-indigo-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">MBTI</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    MBTI 성격 유형 검사
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    16가지 성격 유형 중 당신은 어떤 유형인지 알아보세요.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-indigo-600 dark:text-indigo-400">
                      12개 질문
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      평균 5분 소요
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* 추가 퀴즈 카드 - 추후 확장 가능 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden opacity-60">
              <div className="relative h-48 bg-pink-100 dark:bg-pink-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-pink-600 dark:text-pink-400">LOVE</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  연애 성향 테스트
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  당신의 연애 스타일과 이상형을 알아보세요.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-pink-600 dark:text-pink-400">
                    준비 중
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    출시 예정
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden opacity-60">
              <div className="relative h-48 bg-amber-100 dark:bg-amber-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-amber-600 dark:text-amber-400">IQ</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  IQ 테스트
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  당신의 지능지수를 테스트해보세요.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-amber-600 dark:text-amber-400">
                    준비 중
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    출시 예정
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 중간 광고 배너 */}
        <div className="my-8">
          <AdBanner type="horizontal" position="inline" />
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            테스트 카테고리
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="block text-indigo-600 dark:text-indigo-400 font-semibold mb-1">성격 테스트</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="block text-pink-600 dark:text-pink-400 font-semibold mb-1">연애 테스트</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="block text-amber-600 dark:text-amber-400 font-semibold mb-1">지능 테스트</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="block text-emerald-600 dark:text-emerald-400 font-semibold mb-1">적성 테스트</span>
            </div>
          </div>
        </section>

        {/* 측면 광고 (데스크톱에서만 보임) */}
        <div className="hidden lg:block lg:fixed lg:right-4 lg:top-1/2 lg:-translate-y-1/2">
          <AdBanner type="vertical" position="inline" />
        </div>

        {/* 하단 광고 배너 */}
        <AdBanner type="horizontal" position="bottom" />

        <footer className="text-center text-gray-500 dark:text-gray-400 mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="mb-2">© 2025 인터랙티브 테스트. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">이용약관</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">개인정보 처리방침</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">연락처</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
