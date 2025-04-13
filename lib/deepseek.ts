import { UserBirthInfo, FortuneResult } from '@/types';

/**
 * 사주 결과를 생성합니다.
 */
export async function getFortuneTelling(
  userInfo: UserBirthInfo,
  customQuestion?: string
): Promise<FortuneResult> {
  try {
    console.log('Starting fortune analysis request...');
    
    // API 요청 타임아웃 설정 (30초)
    const timeoutPromise = new Promise<FortuneResult>((_, reject) => {
      setTimeout(() => reject(new Error('요청 시간이 초과되었습니다. 잠시 후 다시 시도해 주세요.')), 30000);
    });

    // API 요청 생성
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
    .then(async response => {
      // 응답 확인
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || '사주 분석 중 오류가 발생했습니다.';
        
        if (response.status === 500) {
          console.error('Server error response:', errorData);
          throw new Error(errorMessage);
        } else {
          throw new Error(`${response.status} 오류: ${errorMessage}`);
        }
      }
      return response.json();
    });

    // API 호출과 타임아웃 중 먼저 완료되는 것을 반환
    const result = await Promise.race([apiRequest, timeoutPromise]);
    console.log('Fortune analysis request completed successfully');
    return result;
  } catch (error) {
    console.error('Fortune generation error:', error);
    
    // 사용자 친화적인 오류 메시지 반환
    let errorMessage = '사주 분석 중 오류가 발생했습니다. 다시 시도해 주세요.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return { 
      fortune: '',
      error: errorMessage
    };
  }
} 