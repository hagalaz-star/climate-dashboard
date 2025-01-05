export const WEATHER_PARAMS = {
  REQUIRED: {
    LATITUDE: "latitude",
    LONGITUDE: "longitude",
  },
  OPTIONAL: {
    HOURLY: "hourly",
    DAILY: "daily",
    PAST_DAYS: "past_days",
    START_DATE: "start_date",
    END_DATE: "end_date",
    MODELS: "models",
    CELL_SELECTION: "cell_selection",
  },
  // Open-Meteo API가 제공하는 시간별 데이터 변수들
  HOURLY_VARIABLES: [
    "temperature_2m", // 기온
    "precipitation", // 강수량
    "cloud_cover", // 총 구름양
    "weather_code", // 날씨 코드
    "wind_speed_10m", // 풍속
    "apparent_temperature", //체감온도
    "precipitation_probability", // 강수확률
    // ... 필요한 다른 변수들
  ],

  // Open-Meteo API가 제공하는 일별 데이터 변수들
  DAILY_VARIABLES: [
    "temperature_2m_max", // 최고 기온
    "temperature_2m_min", // 최저 기온
    "precipitation_sum", // 일 강수량 합계
    "precipitation_hours", // 강수 시간
    "weather_code", // 날씨 코드
    "sunrise", // 일출
    "sunset", // 일몰
    // ... 필요한 다른 변수들
  ],
} as const;
