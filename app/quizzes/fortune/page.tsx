'use client';

import { useState } from 'react';
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
import AdBanner from '@/app/components/AdBanner';

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
      // Increment visitor count
      await incrementVisitorCount('fortune');
      
      // Prepare params
      const params = new URLSearchParams();
      if (userInfo.name) params.append('name', userInfo.name);
      params.append('year', userInfo.birthYear.toString());
      params.append('month', userInfo.birthMonth.toString());
      params.append('day', userInfo.birthDay.toString());
      if (userInfo.birthHour !== undefined) params.append('hour', userInfo.birthHour.toString());
      params.append('gender', userInfo.gender);
      if (customQuestion) params.append('question', encodeURIComponent(customQuestion));
      
      // Navigate to result page
      router.push(`/quizzes/fortune/result?${params.toString()}`);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">AI로 보는 사주</h1>
        <p className="text-gray-600 dark:text-gray-300">
          정확한 생년월일시를 입력하면 AI가 당신의 운세를 분석해 드립니다.
        </p>
      </div>
      
      <AdBanner type="horizontal" />
      
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>생년월일 정보 입력</CardTitle>
          <CardDescription>
            정확한 사주 분석을 위해 생년월일과 시간을 입력해주세요. 시간을 모르시면 비워두셔도 됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="name">이름 (선택사항)</Label>
              <Input
                id="name"
                placeholder="이름을 입력하세요"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">출생년도</Label>
                <Select
                  value={userInfo.birthYear.toString()}
                  onValueChange={(value) => setUserInfo({ ...userInfo, birthYear: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="년도" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}년
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="month">월</Label>
                <Select
                  value={userInfo.birthMonth.toString()}
                  onValueChange={(value) => setUserInfo({ ...userInfo, birthMonth: parseInt(value) })}
                >
                  <SelectTrigger>
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

              <div className="space-y-2">
                <Label htmlFor="day">일</Label>
                <Select
                  value={userInfo.birthDay.toString()}
                  onValueChange={(value) => setUserInfo({ ...userInfo, birthDay: parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="일" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}일
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hour">시간 (선택사항)</Label>
                <Select
                  value={userInfo.birthHour !== undefined ? userInfo.birthHour.toString() : ''}
                  onValueChange={(value) => setUserInfo({ ...userInfo, birthHour: value ? parseInt(value) : undefined })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="시간" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">모름</SelectItem>
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={hour.toString()}>
                        {hour}시
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>성별</Label>
              <RadioGroup
                defaultValue="male"
                value={userInfo.gender}
                onValueChange={(value) => setUserInfo({ ...userInfo, gender: value as 'male' | 'female' })}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">남성</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">여성</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="question">특별히 알고 싶은 질문 (선택사항)</Label>
              <Textarea
                id="question"
                placeholder="예: 올해 이직 운은 어떤가요? 또는 연애운에 대해 알고 싶어요."
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? '분석 중...' : '운세 보기'}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>* 이 테스트는 재미로 즐기는 용도로, 실제 사주 분석과는 차이가 있을 수 있습니다.</p>
        <p>* 입력하신 개인정보는 테스트 목적으로만 사용됩니다.</p>
      </div>
      
      <AdBanner type="horizontal" className="mt-8" />
    </div>
  );
} 