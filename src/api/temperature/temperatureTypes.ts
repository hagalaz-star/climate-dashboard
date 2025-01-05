// API 응답 데이터 타입
export interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  hourly?: HourlyData;
  daily?: DailyData;
}

// WEATHER_PARAMS의 HOURLY_VARIABLES에 맞춘 시간별 데이터 구조
export interface HourlyData {
  time: string[];
  temperature_2m: number[];
  precipitation: number[];
  weather_code: number[];
  cloud_cover: number[];
  wind_speed_10m: number[];
  apparent_temperature: number[];
  precipitation_probability: number[];
}

// 일별 데이터 타입
export interface DailyData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  precipitation_hours: number[];
  weather_code: number[];
  sunrise: string[];
  sunset: string[];
}

// API 요청 파라미터 타입
export interface WeatherParam {
  latitude: number;
  longitude: number;
  hourly?: Array<keyof HourlyData>;
  daily?: Array<keyof DailyData>;
  past_days?: number;
  models?: "auto";
  cell_selection?: "land" | "sea" | string;
  //과거 날씨 조회 파라미터
  start_date?: string;
  end_date?: string;
}
