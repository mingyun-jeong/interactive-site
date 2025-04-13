'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UserBirthInfo } from '@/types';
import { incrementVisitorCount } from '@/lib/visitors';
import { trackPageView, trackQuizStart, trackQuizComplete } from '@/lib/analytics';

export default function FortunePage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserBirthInfo>({
    name: '',
    birthYear: new Date().getFullYear() - 20,
    birthMonth: 1,
    birthDay: 1,
    birthHour: undefined,
    gender: 'male'
  });
  const [customQuestion, setCustomQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 페이지 로드 시 이벤트 트래킹
  useEffect(() => {
    // 페이지 조회 이벤트 트래킹
    trackPageView('fortune', 'Fortune Page');
    
    // 방문자 카운트 증가 (페이지 로드 시 한 번만)
    incrementVisitorCount('fortune').catch((error) => {
      console.error('방문자 카운트 증가 실패:', error);
    });
  }, []);

  // Generate year options from 1950 to current year
  const years = Array.from({ length: new Date().getFullYear() - 1949 }, (_, i) => 1950 + i);
  // Generate month options (1-12)
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  // Generate day options (1-31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  // Generate hour options (0-23)
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 분석 시작 이벤트 트래킹
      trackQuizStart('fortune', 'Fortune Analysis');
      
      // Prepare params
      const params = new URLSearchParams();
      if (userInfo.name) params.append('name', userInfo.name);
      params.append('year', userInfo.birthYear.toString());
      params.append('month', userInfo.birthMonth.toString());
      params.append('day', userInfo.birthDay.toString());
      if (userInfo.birthHour !== undefined) params.append('hour', userInfo.birthHour.toString());
      params.append('gender', userInfo.gender);
      if (customQuestion) params.append('question', encodeURIComponent(customQuestion));
      
      // 분석 완료 이벤트 트래킹
      trackQuizComplete('fortune', 'Fortune Analysis');
      
      // Navigate to result page
      router.push(`/quizzes/fortune/result?${params.toString()}`);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">AI로 보는 사주</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          정확한 생년월일시를 입력하면 AI가 당신의 운세를 분석해 드립니다.
        </p>
      </div>
      
      <Card className="mx-auto border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"></div>
        
        <CardHeader className="px-6 pt-8 pb-4">
          <CardTitle className="text-2xl font-bold text-center">생년월일 정보 입력</CardTitle>
          <CardDescription className="text-center mt-2">
            정확한 사주 분석을 위해 정보를 입력해주세요
            <div className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
              * 입력하신 모든 개인정보는 저장되지 않으며, 오직 사주 정보를 확인하는 용도로만 일시적으로 활용됩니다.
            </div>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="px-6 pb-4">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="name" className="text-base font-medium">이름 (선택사항)</Label>
              <Input
                id="name"
                placeholder="이름을 입력하세요"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                className="rounded-lg h-11 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="space-y-3">
                <Label htmlFor="year" className="text-base font-medium">출생년도</Label>
                <Select
                  value={userInfo.birthYear.toString()}
                  onValueChange={(value) => setUserInfo({ ...userInfo, birthYear: parseInt(value) })}
                >
                  <SelectTrigger className="rounded-lg h-11 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500">
                    <SelectValue placeholder="년도" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[240px]">
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}년
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="month" className="text-base font-medium">월</Label>
                <Select
                  value={userInfo.birthMonth.toString()}
                  onValueChange={(value) => setUserInfo({ ...userInfo, birthMonth: parseInt(value) })}
                >
                  <SelectTrigger className="rounded-lg h-11 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500">
                    <SelectValue placeholder="월" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month.toString()}>
                        {month}월
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="day" className="text-base font-medium">일</Label>
                <Select
                  value={userInfo.birthDay.toString()}
                  onValueChange={(value) => setUserInfo({ ...userInfo, birthDay: parseInt(value) })}
                >
                  <SelectTrigger className="rounded-lg h-11 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500">
                    <SelectValue placeholder="일" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[240px]">
                    {days.map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}일
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="hour" className="text-base font-medium">시간 (선택)</Label>
                <Select
                  value={userInfo.birthHour !== undefined ? userInfo.birthHour.toString() : 'unknown'}
                  onValueChange={(value) => setUserInfo({ ...userInfo, birthHour: value !== 'unknown' ? parseInt(value) : undefined })}
                >
                  <SelectTrigger className="rounded-lg h-11 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500">
                    <SelectValue placeholder="시간" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[240px]">
                    <SelectItem value="unknown">모름</SelectItem>
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={hour.toString()}>
                        {hour}시
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">성별</Label>
              <RadioGroup
                defaultValue="male"
                value={userInfo.gender}
                onValueChange={(value) => setUserInfo({ ...userInfo, gender: value as 'male' | 'female' })}
                className="flex space-x-8"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="male" id="male" className="text-indigo-500" />
                  <Label htmlFor="male" className="font-medium">남성</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="female" id="female" className="text-indigo-500" />
                  <Label htmlFor="female" className="font-medium">여성</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label htmlFor="question" className="text-base font-medium">특별히 알고 싶은 질문 (선택사항)</Label>
              <Textarea
                id="question"
                placeholder="예: 올해 이직 운은 어떤가요? 또는 연애운에 대해 알고 싶어요."
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                className="rounded-lg min-h-[100px] border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5" 
              disabled={isSubmitting}
            >
              {isSubmitting ? '분석 중...' : '나의 운세 보기'}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="px-6 py-5 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-100 dark:border-gray-700/50">
          <div className="text-center w-full text-sm text-gray-500 dark:text-gray-400">
            <p>* 이 테스트는 재미로 즐기는 용도로, 실제 사주 분석과는 차이가 있을 수 있습니다.</p>
            <p>* 입력하신 개인정보는 서버에 저장되지 않으며, 오직 사주 정보를 확인하는 용도로만 사용됩니다.</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 