import { UserBirthInfo, FortuneResult } from '@/types';

/**
 * 임시로 사용할 사주 결과를 생성합니다.
 * 실제 API 연동 시 이 함수를 교체하세요.
 */

export async function getFortuneTelling(
  userInfo: UserBirthInfo,
  customQuestion?: string
): Promise<FortuneResult> {
  // API 호출 대신 1초 지연으로 비동기 처리 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 사용자 이름
  const userName = userInfo.name || '사용자';
  
  // 간단한 운세 생성 (나중에 실제 API로 교체)
  const fortune = `
# ${userName}님의 운세 분석 결과

## 기본 정보
- **생년월일**: ${userInfo.birthYear}년 ${userInfo.birthMonth}월 ${userInfo.birthDay}일${userInfo.birthHour !== undefined ? ` ${userInfo.birthHour}시` : ''}
- **성별**: ${userInfo.gender === 'male' ? '남성' : '여성'}

## 종합운세
당신은 ${userInfo.birthYear}년생으로, 현재 인생의 중요한 전환점에 서 있습니다. 
지금까지의 경험을 바탕으로 새로운 도전을 할 시기가 다가오고 있으며, 
특히 ${new Date().getFullYear()}년은 당신에게 의미 있는 변화의 해가 될 것입니다.

## 재물운
올해는 재물운이 상승하는 해입니다. 특히 ${userInfo.birthMonth}월생인 당신은 
예상치 못한 곳에서 금전적 이득을 얻을 수 있는 기회가 있을 것입니다. 
다만, 충동적인 소비는 자제하고 장기적인 안목으로 재테크를 고려해보세요.

## 건강운
건강 관리에 특별히 신경 써야 할 시기입니다. 
규칙적인 생활 습관과 적절한 운동이 필요하며, 특히 ${userInfo.birthDay}일생인 당신은 
${userInfo.gender === 'male' ? '허리와 무릎' : '목과 어깨'} 부분에 주의가 필요합니다.

## 연애운
${userInfo.gender === 'male' 
  ? '이성 관계에서 새로운 만남의 기회가 있을 것입니다. 적극적인 자세로 다가가되, 상대방의 감정을 존중하는 태도가 중요합니다.' 
  : '지금 당신 주변에는 당신에게 호감을 가진 이성이 있을 수 있습니다. 평소보다 주변을 더 살펴보고, 마음을 열어보세요.'}

## 학업/직장운
${customQuestion ? `\n## 특별 질문에 대한 답변\n${customQuestion}에 대한 답변: 앞으로의 시간은 당신에게 유리하게 작용할 것입니다. 조금만 더 인내하고 준비하면 좋은 결과가 있을 것입니다.\n` : ''}

## 조언
당신의 사주를 종합해볼 때, 올해는 새로운 시작과 변화의 에너지가 강한 해입니다. 
두려움보다는 용기를 가지고 한 걸음 내딛으면 예상보다 좋은 결과를 얻을 수 있을 것입니다.

## 행운의 요소
- **행운의 숫자**: ${Math.floor(Math.random() * 10) + 1}, ${Math.floor(Math.random() * 10) + 1}, ${Math.floor(Math.random() * 10) + 1}
- **행운의 색**: ${['빨간색', '파란색', '초록색', '보라색', '노란색'][Math.floor(Math.random() * 5)]}
- **행운의 방향**: ${['동쪽', '서쪽', '남쪽', '북쪽'][Math.floor(Math.random() * 4)]}
`;

  return { fortune };
}

function generateFortuneTellingPrompt(userInfo: UserBirthInfo, question?: string): string {
  const { name, birthYear, birthMonth, birthDay, birthHour, gender } = userInfo;
  
  let prompt = `
사용자 정보:
- 이름: ${name || '사용자'}
- 생년월일: ${birthYear}년 ${birthMonth}월 ${birthDay}일`;

  if (birthHour !== undefined) {
    prompt += ` ${birthHour}시`;
  }
  
  prompt += `
- 성별: ${gender === 'male' ? '남성' : '여성'}

위 정보를 바탕으로 다음을 포함한 상세한 사주 분석과 운세를 알려주세요:

1. 사주 분석 요약 (간단하게 사주팔자의 특징)
2. 종합 운세 (올해와 앞으로의 운세)
3. 연애운과 조언
4. 직업운과 조언
5. 건강운과 주의사항
6. 행운을 불러올 수 있는 색상, 숫자, 방향, 요일 등

응답은 마크다운 형식으로 깔끔하게 작성해주세요.`;

  if (question) {
    prompt += `\n\n사용자의 추가 질문: ${question}\n위 질문에 대해서도 사주를 바탕으로 답변해주세요.`;
  }

  return prompt;
}

export function getMockFortuneTelling(userInfo: UserBirthInfo): FortuneResult {
  const { name, birthYear, birthMonth, birthDay, gender } = userInfo;
  const genderText = gender === 'male' ? '남성' : '여성';
  
  const mockFortune = `
# ${name || '사용자'}님의 사주 분석 결과

> **생년월일**: ${birthYear}년 ${birthMonth}월 ${birthDay}일 (${genderText})

## 사주 기본 분석

귀하의 사주는 ${birthMonth}월에 태어난 ${birthMonth === 1 || birthMonth === 2 || birthMonth === 12 ? '겨울' : birthMonth >= 3 && birthMonth <= 5 ? '봄' : birthMonth >= 6 && birthMonth <= 8 ? '여름' : '가을'} 기운이 강하며, ${birthYear % 10 === 0 ? '금' : birthYear % 10 === 1 ? '금' : birthYear % 10 === 2 ? '토' : birthYear % 10 === 3 ? '토' : birthYear % 10 === 4 ? '목' : birthYear % 10 === 5 ? '목' : birthYear % 10 === 6 ? '수' : birthYear % 10 === 7 ? '수' : birthYear % 10 === 8 ? '화' : '화'}의 성질이 지배적입니다. 

## 종합 운세

현재 귀하는 인생의 중요한 전환점에 서 있습니다. 지난 시간 동안의 노력이 결실을 맺기 시작하는 시기로, 새로운 기회와 가능성이 열릴 것입니다. 다만, 성급하게 결정을 내리기보다는 신중하게 판단하는 것이 중요합니다.

올해는 특히 ${birthMonth % 3 === 0 ? '대인관계' : birthMonth % 3 === 1 ? '재물운' : '건강'}에 좋은 기운이 감돌고 있으며, 새로운 시작을 위한 에너지가 충만합니다.

## 연애운

${gender === 'male' ? 
  '당신은 따뜻하고 배려심 깊은 성향을 가지고 있어 파트너에게 신뢰감을 줍니다. 현재 관계에 있다면 더 깊은 이해와 소통을 통해 관계가 더욱 견고해질 것입니다. 싱글이라면, 공통 관심사나 취미를 통해 새로운 인연을 만날 가능성이 높습니다.' 
: 
  '당신은 지적이고 독립적인 성향으로 자신만의 매력을 가지고 있습니다. 현재 관계 속에 있다면 서로의 공간을 존중하면서도 함께하는 시간의 질을 높이는 것이 중요합니다. 싱글이라면, 진정한 자신의 모습을 보여줄 때 마음에 드는 인연이 찾아올 것입니다.'}

**조언**: 관계에서 가장 중요한 것은 진정성입니다. 자신의 감정을 솔직하게 표현하고, 상대방의 이야기에 귀 기울이는 노력이 필요합니다.

## 직업운

귀하는 ${birthDay % 4 === 0 ? '창의적인 분야' : birthDay % 4 === 1 ? '분석적인 분야' : birthDay % 4 === 2 ? '사람과 소통하는 분야' : '실용적인 분야'}에서 두각을 나타낼 수 있는 재능을 가지고 있습니다. 현재 직업에서는 새로운 프로젝트나 책임을 맡게 될 가능성이 있으며, 이를 통해 성장할 수 있는 기회가 주어질 것입니다.

**조언**: 자신의 강점을 최대한 활용하고, 약점은 보완하는 방향으로 역량을 개발하세요. 또한, 주변 동료나 선배와의 네트워크를 통해 새로운 기회를 발견할 수 있습니다.

## 건강운

전반적인 건강 상태는 양호하나, ${birthMonth >= 6 && birthMonth <= 8 ? '소화계통' : birthMonth >= 9 && birthMonth <= 11 ? '호흡기' : birthMonth >= 3 && birthMonth <= 5 ? '간 및 신경계' : '순환계'}에 특별한 관리가 필요할 수 있습니다. 규칙적인 생활 습관과 적절한 운동을 통해 건강을 유지하세요.

**조언**: 바쁜 일상 속에서도 자신의 건강을 최우선으로 생각하는 자세가 필요합니다. 정기적인 휴식과 스트레스 관리가 중요합니다.

## 행운을 불러오는 요소

- **행운의 색**: ${birthMonth % 5 === 0 ? '빨간색, 주황색' : birthMonth % 5 === 1 ? '파란색, 검은색' : birthMonth % 5 === 2 ? '녹색, 갈색' : birthMonth % 5 === 3 ? '흰색, 금색' : '보라색, 분홍색'}
- **행운의 숫자**: ${birthDay}, ${(birthDay + birthMonth) % 10 + 1}, ${(birthYear + birthDay) % 10 + 1}
- **행운의 방향**: ${birthDay % 4 === 0 ? '동쪽' : birthDay % 4 === 1 ? '서쪽' : birthDay % 4 === 2 ? '남쪽' : '북쪽'}
- **행운의 요일**: ${birthDay % 7 === 0 ? '월요일' : birthDay % 7 === 1 ? '화요일' : birthDay % 7 === 2 ? '수요일' : birthDay % 7 === 3 ? '목요일' : birthDay % 7 === 4 ? '금요일' : birthDay % 7 === 5 ? '토요일' : '일요일'}

---

*이 사주 풀이는 전통적인 사주 이론을 바탕으로 작성되었으며, 참고용으로만 활용하시기 바랍니다.*
`;

  return {
    fortune: mockFortune,
    error: ''
  };
} 