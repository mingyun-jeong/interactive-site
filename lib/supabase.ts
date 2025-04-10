import { createClient } from '@supabase/supabase-js';

// Supabase 설정 (실제 프로젝트에서는 환경 변수로 관리하는 것이 좋습니다)
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseKey = 'your-anon-key';

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseKey);

// 타입 정의
export interface VisitorStats {
  id?: number;
  total_count: number;
  page_visits: Record<string, number>;
  last_updated: string;
} 