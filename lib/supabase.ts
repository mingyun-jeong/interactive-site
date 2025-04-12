import { createClient } from '@supabase/supabase-js';

// .env.local 파일에서 환경 변수 가져오기
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 클라이언트 측에서만 Supabase 클라이언트 초기화
let supabase: ReturnType<typeof createClient> | null = null;

// 실제 URL과 키가 있고 브라우저 환경일 때만 클라이언트 초기화
if (typeof window !== 'undefined') {
  if (supabaseUrl && supabaseKey) {
    try {
      console.log('Supabase 클라이언트 초기화 시도');
      supabase = createClient(supabaseUrl, supabaseKey);
      console.log('Supabase 클라이언트 초기화 성공');
    } catch (error) {
      console.error('Supabase 클라이언트 초기화 중 오류 발생:', error);
      // 오류 발생 시 null로 설정하여 안전하게 처리
      supabase = null;
    }
  } else {
    console.warn('Supabase URL 또는 키가 제공되지 않았습니다. 방문자 통계가 저장되지 않습니다.');
  }
}

// 테스트 목적으로 임시 방문자 수 제공
export const DEFAULT_VISITOR_COUNT = 1234;

// Export the supabase client
export { supabase };

// 타입 정의
export interface VisitorStats {
  id?: number;
  total_count: number;
  page_visits: Record<string, number>;
  last_updated: string;
} 