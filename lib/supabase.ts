import { createClient } from '@supabase/supabase-js';

// .env.local 파일에서 환경 변수 가져오기
// Vercel 배포 환경에서 오류 방지를 위한 기본값 설정
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// 클라이언트 측에서만 Supabase 클라이언트 초기화
let supabase: ReturnType<typeof createClient> | null = null;

// 실제 URL과 키가 있고 브라우저 환경일 때만 클라이언트 초기화
if (typeof window !== 'undefined' && 
    supabaseUrl !== 'https://placeholder-url.supabase.co' && 
    supabaseKey !== 'placeholder-key') {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
  } catch (error) {
    console.error('Supabase 클라이언트 초기화 중 오류 발생:', error);
    // 오류 발생 시 null로 설정하여 안전하게 처리
    supabase = null;
  }
}

// Export the supabase client
export { supabase };

// 타입 정의
export interface VisitorStats {
  id?: number;
  total_count: number;
  page_visits: Record<string, number>;
  last_updated: string;
} 