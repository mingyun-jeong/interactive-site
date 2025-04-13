/**
 * Google Analytics 이벤트 트래킹 유틸리티
 */

export type EventCategory = 'mbti' | 'iq' | 'love' | 'fortune';

export type EventAction = 
  | 'page_view'       // 페이지 조회
  | 'start_quiz'      // 퀴즈 시작
  | 'complete_quiz'   // 퀴즈 완료
  | 'view_result'     // 결과 조회
  | 'share_result'    // 결과 공유
  | 'click_button'    // 버튼 클릭
  | 'interaction';    // 기타 인터랙션

/**
 * Google Analytics 이벤트 트래킹 함수
 * 
 * @param category 이벤트 카테고리 (mbti, iq, love, fortune)
 * @param action 이벤트 액션 (page_view, start_quiz, complete_quiz, view_result, share_result, click_button, interaction)
 * @param label 이벤트 라벨 (선택사항)
 * @param value 이벤트 값 (선택사항)
 */
export const trackEvent = (
  category: EventCategory,
  action: EventAction,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
    console.log(`[Analytics] Event tracked: ${category} - ${action} - ${label || ''} - ${value || ''}`);
  }
};

/**
 * 페이지 조회 이벤트 트래킹
 * 
 * @param category 이벤트 카테고리
 * @param pageName 페이지 이름
 */
export const trackPageView = (category: EventCategory, pageName: string) => {
  trackEvent(category, 'page_view', pageName);
};

/**
 * 퀴즈 시작 이벤트 트래킹
 * 
 * @param category 이벤트 카테고리
 * @param quizName 퀴즈 이름
 */
export const trackQuizStart = (category: EventCategory, quizName: string) => {
  trackEvent(category, 'start_quiz', quizName);
};

/**
 * 퀴즈 완료 이벤트 트래킹
 * 
 * @param category 이벤트 카테고리
 * @param quizName 퀴즈 이름
 * @param score 점수 (선택사항)
 */
export const trackQuizComplete = (category: EventCategory, quizName: string, score?: number) => {
  trackEvent(category, 'complete_quiz', quizName, score);
};

/**
 * 결과 조회 이벤트 트래킹
 * 
 * @param category 이벤트 카테고리
 * @param resultType 결과 유형
 */
export const trackResultView = (category: EventCategory, resultType: string) => {
  trackEvent(category, 'view_result', resultType);
};

/**
 * 결과 공유 이벤트 트래킹
 * 
 * @param category 이벤트 카테고리
 * @param shareMethod 공유 방식
 */
export const trackResultShare = (category: EventCategory, shareMethod: string) => {
  trackEvent(category, 'share_result', shareMethod);
};

// TypeScript 타입 선언 - window 객체에 gtag 함수 추가
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: {
        [key: string]: any;
      }
    ) => void;
  }
} 