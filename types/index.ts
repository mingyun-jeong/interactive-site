// User birth information for fortune telling
export interface UserBirthInfo {
  name?: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthHour?: number;
  gender: 'male' | 'female';
}

// Fortune telling result
export interface FortuneResult {
  fortune: string;
  error?: string;
} 