import axios from "axios";

export interface BaseApiConfig {
  BASE_URL: string;
  TIMEOUT: number;
  RETRY_COUNT: number;
  RETRY_DELAY: number;
}

// API 기본 설정
export const API_CONFIG = {
  OPEN_WEATHER: {
    BASE_URL: import.meta.env.VITE_API_URL,
    TIMEOUT: 10000, // 타임아웃
    RETRY_COUNT: 3, // 재시도 횟수
    RETRY_DELAY: 1000, // 재시도 간격
  },
} as const;
