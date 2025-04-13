import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { UserBirthInfo, FortuneResult } from '@/types';

// OpenAI API 클라이언트 초기화 (서버 측에서만 실행)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    // 요청 바디 파싱
    const body = await request.json();
    const { userInfo, customQuestion }: { userInfo: UserBirthInfo; customQuestion?: string } = body;

    if (!userInfo || !userInfo.birthYear || !userInfo.birthMonth || !userInfo.birthDay) {
      return NextResponse.json(
        { error: '필요한 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 현재 년도 가져오기
    const currentYear = new Date().getFullYear();
    
    // 사용자 이름
    const userName = userInfo.name || '사용자';
    
    // 사용자의 사주 기본 정보
    const { birthYear, birthMonth, birthDay, birthHour, gender } = userInfo;

    // OpenAI에 요청할 프롬프트 생성
    const prompt = `
당신은 전문적인 사주 분석가입니다. 다음 정보를 바탕으로 사주 분석 결과를 작성해주세요:

사용자 정보:
- 이름: ${userName}
- 생년월일: ${birthYear}년 ${birthMonth}월 ${birthDay}일${birthHour !== undefined ? ` ${birthHour}시` : '(시간 미상)'}
- 성별: ${gender === 'male' ? '남성' : '여성'}

분석 요청:
${customQuestion ? `사용자의 특별 질문: ${customQuestion}` : '일반적인 운세 분석을 요청합니다.'}

다음 구조로 분석 결과를 작성해주세요:
1. 기본 사주 정보 (생년월일, 오행, 사주 성질 등)
2. ${currentYear}년 종합운세 (전체적인 운세 흐름, 시기별 운세)
3. 건강운
4. 재물운
5. 직업/학업운
6. 연애/결혼운
7. ${customQuestion ? '특별 질문에 대한 답변' : ''}
8. 행운의 요소 (행운의 숫자, 색상, 방향, 날짜 등)

결과는 markdown 형식으로 제공해주세요. 단, 강조를 위한 볼드 처리(**)는 사용하지 말고, 일반 텍스트로 작성해주세요.
헤더(#)와 리스트(-) 등의 기본적인 마크다운 구조만 사용하여 가독성 있게 작성해주세요.
사주에 관한 전통적인 동양 철학과 현대적 해석을 조화롭게 사용하세요.
`;

    // OpenAI API 호출
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: '당신은 사주와 운세 분석에 전문적인 지식을 갖춘 AI 분석가입니다. 사용자의 생년월일과 정보를 바탕으로 상세하고 개인화된 사주 분석을 제공합니다. 답변에서 강조를 위한 볼드 처리(**)는 사용하지 마세요.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    // 응답 반환
    const fortune = response.choices[0]?.message?.content || '';
    return NextResponse.json({ fortune });
  } catch (error) {
    console.error('Fortune API error:', error);
    return NextResponse.json(
      { 
        fortune: '',
        error: error instanceof Error ? error.message : '사주 분석 중 오류가 발생했습니다. 다시 시도해 주세요.' 
      }, 
      { status: 500 }
    );
  }
} 