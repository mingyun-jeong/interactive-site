import { supabase, VisitorStats, DEFAULT_VISITOR_COUNT } from './supabase';

// 방문자 수 데이터 타입
interface VisitorData {
  totalCount: number;
  pageVisits: Record<string, number>;
  lastUpdated: number;
}

// 방문자 수 증가
export async function incrementVisitorCount(pagePath: string): Promise<VisitorData | null> {
  // SSR 중에는 아무것도 하지 않음
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    // Supabase 클라이언트가 초기화되지 않은 경우 기본값 반환
    if (!supabase) {
      console.log('Supabase 클라이언트가 초기화되지 않았습니다. 기본 방문자 수를 반환합니다.');
      return {
        totalCount: DEFAULT_VISITOR_COUNT,
        pageVisits: { [pagePath]: 1 },
        lastUpdated: Date.now()
      };
    }
    
    // 먼저 현재 방문자 통계 데이터를 가져옴
    const { data: stats, error: fetchError } = await supabase
      .from('visitor_stats')
      .select('*')
      .limit(1)
      .single();
    
    // PGRST116: no rows returned - 이 오류는 예상되는 정상적인 경우임
    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('방문자 통계 조회 중 오류:', fetchError);
      return {
        totalCount: DEFAULT_VISITOR_COUNT,
        pageVisits: { [pagePath]: 1 },
        lastUpdated: Date.now()
      };
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
        pageVisits: { [pagePath]: 1 } as Record<string, number>,
        lastUpdated: Date.now()
      };
    } else {
      // 기존 데이터 업데이트
      const typedStats = stats as unknown as VisitorStats;
      const pageVisits = typedStats.page_visits as Record<string, number> || {};
      const updatedPageVisits = {
        ...pageVisits,
        [pagePath]: (pageVisits[pagePath] || 0) + 1
      };
      
      if (typedStats.id) {
        await supabase
          .from('visitor_stats')
          .update({
            total_count: (typedStats.total_count || 0) + 1,
            page_visits: updatedPageVisits,
            last_updated: now
          })
          .eq('id', typedStats.id);
      }
      
      return {
        totalCount: (typedStats.total_count || 0) + 1,
        pageVisits: updatedPageVisits,
        lastUpdated: Date.now()
      };
    }
  } catch (error) {
    console.error('방문자 수 증가 중 오류 발생:', error);
    // 실패해도 사용자 경험에 영향을 주지 않도록 기본값 반환
    return {
      totalCount: DEFAULT_VISITOR_COUNT,
      pageVisits: { [pagePath]: 1 },
      lastUpdated: Date.now()
    };
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
      console.log('Supabase 클라이언트가 초기화되지 않았습니다. 기본 방문자 수를 반환합니다.');
      return {
        totalCount: DEFAULT_VISITOR_COUNT,
        pageVisits: {},
        lastUpdated: Date.now()
      };
    }
    
    const { data: stats, error } = await supabase
      .from('visitor_stats')
      .select('*')
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('방문자 통계 조회 중 오류:', error);
      return {
        totalCount: DEFAULT_VISITOR_COUNT,
        pageVisits: {},
        lastUpdated: Date.now()
      };
    }
    
    if (!stats) {
      return {
        totalCount: DEFAULT_VISITOR_COUNT,
        pageVisits: {} as Record<string, number>,
        lastUpdated: Date.now()
      };
    }
    
    const typedStats = stats as unknown as VisitorStats;
    
    return {
      totalCount: typedStats.total_count || 0,
      pageVisits: typedStats.page_visits as Record<string, number> || {},
      lastUpdated: new Date(typedStats.last_updated).getTime()
    };
  } catch (error) {
    console.error('방문자 통계 조회 중 오류 발생:', error);
    // 실패해도 사용자 경험에 영향을 주지 않도록 기본값 반환
    return {
      totalCount: DEFAULT_VISITOR_COUNT,
      pageVisits: {} as Record<string, number>,
      lastUpdated: Date.now()
    };
  }
} 