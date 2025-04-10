import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 클래스명을 조합하는 유틸리티 함수
 * clsx와 tailwind-merge를 활용하여 클래스명 충돌 해결
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 