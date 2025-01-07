export interface BaseApiConfig {
  BASE_URL: string;
  TIMEOUT: number;
  RETRY_COUNT: number;
  RETRY_DELAY: number;
}

// API 기본 설정
export const API_CONFIG = {
  OPEN_WEATHER: {
    BASE_URL: "https://api.open-meteo.com/v1/forecast",
    TIMEOUT: 10000, // 타임아웃
    RETRY_COUNT: 3, // 재시도 횟수
    RETRY_DELAY: 1000, // 재시도 간격
  },
} as const;
