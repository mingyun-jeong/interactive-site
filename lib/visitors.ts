import { supabase, VisitorStats } from './supabase';

// 방문자 수 데이터 타입
interface VisitorData {
  totalCount: number;
  pageVisits: {
    [key: string]: number;
  };
  lastUpdated: number;
}

// 방문자 수 증가
export async function incrementVisitorCount(pagePath: string): Promise<VisitorData | null> {
  // SSR 중에는 아무것도 하지 않음
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    // Supabase 클라이언트가 초기화되지 않은 경우
    if (!supabase) {
      return null;
    }
    
    // 먼저 현재 방문자 통계 데이터를 가져옴
    const { data: stats, error: fetchError } = await supabase
      .from('visitor_stats')
      .select('*')
      .limit(1)
      .single();
    
    // PGRST116: no rows returned - 이 오류는 예상되는 정상적인 경우임
    if (fetchError && fetchError.code !== 'PGRST116') {
      return null;
    }
    
    const now = new Date().toISOString();
    
    if (!stats) {
      // 데이터가 없으면 새 레코드 생성
      const newStats = {
        total_count: 1,
        page_visits: { [pagePath]: 1 },
        last_updated: now
      };
      
      await supabase
        .from('visitor_stats')
        .insert([newStats]);
      
      return {
        totalCount: 1,
        pageVisits: { [pagePath]: 1 },
        lastUpdated: Date.now()
      };
    } else {
      // 기존 데이터 업데이트
      const pageVisits = stats.page_visits || {};
      const updatedPageVisits = {
        ...pageVisits,
        [pagePath]: (pageVisits[pagePath] || 0) + 1
      };
      
      await supabase
        .from('visitor_stats')
        .update({
          total_count: stats.total_count + 1,
          page_visits: updatedPageVisits,
          last_updated: now
        })
        .eq('id', stats.id);
      
      return {
        totalCount: stats.total_count + 1,
        pageVisits: updatedPageVisits,
        lastUpdated: Date.now()
      };
    }
  } catch (error) {
    // 실패해도 사용자 경험에 영향을 주지 않도록 null 반환
    return null;
  }
}

// 방문자 수 조회
export async function getVisitorStats(): Promise<VisitorData | null> {
  // SSR 중에는 아무것도 하지 않음
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    if (!supabase) {
      return null;
    }
    
    const { data: stats, error } = await supabase
      .from('visitor_stats')
      .select('*')
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      return null;
    }
    
    if (!stats) {
      return {
        totalCount: 0,
        pageVisits: {},
        lastUpdated: Date.now()
      };
    }
    
    return {
      totalCount: stats.total_count,
      pageVisits: stats.page_visits || {},
      lastUpdated: new Date(stats.last_updated).getTime()
    };
  } catch (error) {
    // 실패해도 사용자 경험에 영향을 주지 않도록 기본값 반환
    return {
      totalCount: 0,
      pageVisits: {},
      lastUpdated: Date.now()
    };
  }
} 