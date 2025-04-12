import { supabase } from './supabase';

export interface UserBirthInfo {
  name: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthHour: number;
  gender: 'male' | 'female';
}

export interface FortuneResult {
  id?: string;
  userInfo: UserBirthInfo;
  fortuneText: string;
  summary: string;
  loveAdvice: string;
  careerAdvice: string;
  healthAdvice: string;
  luckyNumbers: number[];
  luckyColors: string[];
  luckyDays: string[];
  createdAt?: string;
}

export async function generateFortune(userInfo: UserBirthInfo): Promise<FortuneResult> {
  try {
    // For now, we'll generate a mock result
    // In a real implementation, this would call the DeepSeek API
    
    const mockResult: FortuneResult = {
      userInfo,
      fortuneText: `${userInfo.name}님의 사주를 분석한 결과입니다. ${userInfo.birthYear}년 ${userInfo.birthMonth}월 ${userInfo.birthDay}일 ${userInfo.birthHour}시에 태어난 당신은 창의적이고 분석적인 성향을 지니고 있습니다. 올해는 특히 자기 발전과 성장의 해가 될 것입니다. 주변 사람들과의 관계에서 좋은 에너지를 주고받을 수 있는 시기이니, 소통에 더 많은 노력을 기울이세요.`,
      summary: "창의적이고 분석적인 성향을 지닌 당신에게 올해는 성장의 해가 될 것입니다.",
      loveAdvice: "열린 마음으로 소통하면 인연이 찾아올 것입니다. 상대방의 이야기에 귀 기울이고, 진심을 표현하는 데 두려움을 갖지 마세요.",
      careerAdvice: "새로운 도전을 두려워하지 마세요. 지금까지 쌓아온 경험이 빛을 발할 때입니다. 협업에 적극적으로 참여하면 좋은 결과가 있을 것입니다.",
      healthAdvice: "규칙적인 생활과 적절한 운동이 필요합니다. 특히 수면 패턴에 주의를 기울이고, 가벼운 명상을 통해 정신적 건강도 챙기세요.",
      luckyNumbers: [3, 7, 12, 25, 36],
      luckyColors: ["파란색", "초록색", "보라색"],
      luckyDays: ["화요일", "금요일"],
    };
    
    // 실제 구현에서는 Supabase에 결과 저장하기
    // const { data, error } = await supabase
    //   .from('fortune_results')
    //   .insert([mockResult])
    //   .select();
    
    // if (error) throw error;
    
    return mockResult;
  } catch (error) {
    console.error('Fortune generation error:', error);
    throw new Error('사주 분석 중 오류가 발생했습니다. 다시 시도해 주세요.');
  }
}

export async function getFortune(id: string): Promise<FortuneResult | null> {
  try {
    // 실제 구현에서는 Supabase에서 결과 가져오기
    // const { data, error } = await supabase
    //   .from('fortune_results')
    //   .select('*')
    //   .eq('id', id)
    //   .single();
    
    // if (error) throw error;
    // if (!data) return null;
    
    // return data;
    
    // 현재는 목업 데이터 반환
    return {
      id,
      userInfo: {
        name: '사용자',
        birthYear: 1990,
        birthMonth: 1,
        birthDay: 1,
        birthHour: 12,
        gender: 'male'
      },
      fortuneText: `사용자님의 사주를 분석한 결과입니다. 1990년 1월 1일 12시에 태어난 당신은 창의적이고 분석적인 성향을 지니고 있습니다. 올해는 특히 자기 발전과 성장의 해가 될 것입니다. 주변 사람들과의 관계에서 좋은 에너지를 주고받을 수 있는 시기이니, 소통에 더 많은 노력을 기울이세요.`,
      summary: "창의적이고 분석적인 성향을 지닌 당신에게 올해는 성장의 해가 될 것입니다.",
      loveAdvice: "열린 마음으로 소통하면 인연이 찾아올 것입니다. 상대방의 이야기에 귀 기울이고, 진심을 표현하는 데 두려움을 갖지 마세요.",
      careerAdvice: "새로운 도전을 두려워하지 마세요. 지금까지 쌓아온 경험이 빛을 발할 때입니다. 협업에 적극적으로 참여하면 좋은 결과가 있을 것입니다.",
      healthAdvice: "규칙적인 생활과 적절한 운동이 필요합니다. 특히 수면 패턴에 주의를 기울이고, 가벼운 명상을 통해 정신적 건강도 챙기세요.",
      luckyNumbers: [3, 7, 12, 25, 36],
      luckyColors: ["파란색", "초록색", "보라색"],
      luckyDays: ["화요일", "금요일"],
      createdAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Fortune retrieval error:', error);
    return null;
  }
} 