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
  try {
    // 서버 측에서 실행되거나 Supabase 클라이언트가 초기화되지 않은 경우
    if (!supabase) {
      console.log('Supabase 클라이언트가 초기화되지 않았습니다');
      return null;
    }
    
    // 먼저 현재 방문자 통계 데이터를 가져옴
    const { data: stats, error: fetchError } = await supabase
      .from('visitor_stats')
      .select('*')
      .limit(1)
      .single();
    
    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116: no rows returned
      console.error('방문자 데이터 조회 오류:', fetchError);
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
      
      const { data: insertedStats, error: insertError } = await supabase
        .from('visitor_stats')
        .insert([newStats])
        .select()
        .single();
      
      if (insertError) {
        console.error('방문자 데이터 생성 오류:', insertError);
        return null;
      }
      
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
      
      const { data: updatedStats, error: updateError } = await supabase
        .from('visitor_stats')
        .update({
          total_count: stats.total_count + 1,
          page_visits: updatedPageVisits,
          last_updated: now
        })
        .eq('id', stats.id)
        .select()
        .single();
      
      if (updateError) {
        console.error('방문자 데이터 업데이트 오류:', updateError);
        return null;
      }
      
      return {
        totalCount: stats.total_count + 1,
        pageVisits: updatedPageVisits,
        lastUpdated: Date.now()
      };
    }
  } catch (error) {
    console.error('방문자 수 업데이트 중 오류:', error);
    return null;
  }
}

// 방문자 수 조회
export async function getVisitorStats(): Promise<VisitorData | null> {
  try {
    if (!supabase) {
      console.log('Supabase 클라이언트가 초기화되지 않았습니다');
      return null;
    }
    
    const { data: stats, error } = await supabase
      .from('visitor_stats')
      .select('*')
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('방문자 데이터 조회 오류:', error);
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
    console.error('방문자 수 조회 중 오류:', error);
    return null;
  }
} 