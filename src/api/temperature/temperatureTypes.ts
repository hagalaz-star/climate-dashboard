// API 응답 데이터 타입
export interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
<<<<<<< HEAD
  timezone_abbreviation: string;
  elevation: number;
=======
>>>>>>> 5726d96 (update)
  hourly?: HourlyData;
  daily?: DailyData;
}

<<<<<<< HEAD
// 시간별 데이터 타입
export interface HourlyData {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  dew_point_2m: number[];
  apparent_temperature: number[];
=======
// WEATHER_PARAMS의 HOURLY_VARIABLES에 맞춘 시간별 데이터 구조
export interface HourlyData {
  time: string[];
  temperature_2m: number[];
>>>>>>> 5726d96 (update)
  precipitation: number[];
  weather_code: number[];
  cloud_cover: number[];
  wind_speed_10m: number[];
<<<<<<< HEAD
  wind_direction_10m: number[];
  wind_gusts_10m: number[];
  soil_temperature_0cm: number[];
  soil_moisture_0_1cm: number[];
  shortwave_radiation: number[];
  direct_radiation: number[];
  diffuse_radiation: number[];
  vapor_pressure_deficit: number[];
  precipitation_probability: number[];
  rain: number[];
  snowfall: number[];
  snow_depth: number[];
  freezing_level_height: number[];
  visibility: number[];
}

// 일별 데이터 타입s
=======
  apparent_temperature: number[];
  precipitation_probability: number[];
}

// 일별 데이터 타입
>>>>>>> 5726d96 (update)
export interface DailyData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
<<<<<<< HEAD
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  precipitation_sum: number[];
  precipitation_hours: number[];
  precipitation_probability_max: number[];
  precipitation_probability_min: number[];
  precipitation_probability_mean: number[];
  weather_code: number[];
  sunrise: string[];
  sunset: string[];
  sunshine_duration: number[];
  daylight_duration: number[];
  wind_speed_10m_max: number[];
  wind_gusts_10m_max: number[];
  wind_direction_10m_dominant: number[];
  shortwave_radiation_sum: number[];
=======
  precipitation_sum: number[];
  precipitation_hours: number[];
  weather_code: number[];
  sunrise: string[];
  sunset: string[];
>>>>>>> 5726d96 (update)
}

// API 요청 파라미터 타입
export interface WeatherParam {
  latitude: number;
  longitude: number;
  hourly?: Array<keyof HourlyData>;
  daily?: Array<keyof DailyData>;
<<<<<<< HEAD
  current?: string[];
  timezone?: string;
  temperature_unit?: TemperatureUnit;
  wind_speed_unit?: WindSpeedUnit;
  precipitation_unit?: PrecipitationUnit;
  forecast_days?: number;
  timeformat?: Timeformat;
=======
  past_days?: number;
  models?: "auto";
  cell_selection?: "land" | "sea" | string;
>>>>>>> 5726d96 (update)
  //과거 날씨 조회 파라미터
  start_date?: string;
  end_date?: string;
}
<<<<<<< HEAD

// 단위 타입
export const TEMPERATUREUNIT = "celsius";
export type TemperatureUnit = typeof TEMPERATUREUNIT;

export type WindSpeedUnit = "kmh" | "ms" | "mph" | "kn";

export const PRECIPITATIONUNIT = "mm";
export type PrecipitationUnit = typeof PRECIPITATIONUNIT;

export type Timeformat = "iso8601" | "unixtime";
=======
>>>>>>> 5726d96 (update)
