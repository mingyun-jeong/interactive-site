import { UserBirthInfo, FortuneResult } from '@/types';

/**
 * GPT-4o Mini를 활용하여 사주 결과를 생성합니다.
 */
export async function getFortuneTelling(
  userInfo: UserBirthInfo,
  customQuestion?: string
): Promise<FortuneResult> {
  try {
    // API 라우트 호출로 변경
    const timeoutPromise = new Promise<FortuneResult>((_, reject) => {
      setTimeout(() => reject(new Error('API 요청 시간이 초과되었습니다.')), 30000);
    });

    const apiRequest = fetch('/api/fortune', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userInfo,
        customQuestion,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('사주 분석 API 호출 실패');
      }
      return response.json();
    });

    // API 호출과 타임아웃 중 먼저 완료되는 것을 반환
    return Promise.race([apiRequest, timeoutPromise]);
  } catch (error) {
    console.error('Fortune generation error:', error);
    return { 
      fortune: '',
      error: error instanceof Error ? error.message : '사주 분석 중 오류가 발생했습니다. 다시 시도해 주세요.' 
    };
  }
} 