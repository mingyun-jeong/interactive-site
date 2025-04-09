export type MbtiType = 
  | "INTJ" | "INTP" | "ENTJ" | "ENTP" 
  | "INFJ" | "INFP" | "ENFJ" | "ENFP" 
  | "ISTJ" | "ISFJ" | "ESTJ" | "ESFJ" 
  | "ISTP" | "ISFP" | "ESTP" | "ESFP";

export const mbtiTypes: MbtiType[] = [
  "INTJ", "INTP", "ENTJ", "ENTP",
  "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ",
  "ISTP", "ISFP", "ESTP", "ESFP"
];

export interface MbtiData {
  type: MbtiType;
  characterName: string;
  anime: string;
  emoji: string[];
  image: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  compatibleTypes: MbtiType[];
} 