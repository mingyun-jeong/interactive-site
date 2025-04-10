import { createClient } from '@supabase/supabase-js';

// .env.local 파일에서 환경 변수 가져오기
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 클라이언트 측에서만 Supabase 클라이언트 초기화
let supabase: ReturnType<typeof createClient> | null = null;

if (typeof window !== 'undefined') {
  supabase = createClient(supabaseUrl, supabaseKey);
}

// 타입 정의
export interface VisitorStats {
  id?: number;
  total_count: number;
  page_visits: Record<string, number>;
  last_updated: string;
} 