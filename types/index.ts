// DeepSeek API 관련 타입
export interface DeepSeekPrompt {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface DeepSeekResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

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