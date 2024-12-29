import axios from "axios";
import { API_CONFIG } from "../apiConfig";
import { WEATHER_PARAMS } from "../weatherParams";
<<<<<<< HEAD
import {
  WeatherResponse,
  WeatherParams,
  TemperatureUnit,
  WindSpeedUnit,
  PrecipitationUnit,
} from "./temperatureTypes";

// api 인스턴스 생성
=======
import { WeatherResponse, WeatherParam } from "./temperatureTypes";

// 환경 변수가 제대로 로드 되었는지 확인하는 디버깅 로그
console.log("환경변수 VITE_API_URL:", import.meta.env.VITE_API_URL);
console.log("API_CONFIG BASE_URL 확인:", API_CONFIG.OPEN_WEATHER.BASE_URL);

>>>>>>> 5726d96 (update)
const weatherApi = axios.create({
  baseURL: API_CONFIG.OPEN_WEATHER.BASE_URL,
  timeout: API_CONFIG.OPEN_WEATHER.TIMEOUT,
});

// 현재/예보 날씨 데이터 조회
export const fetchWeatherData = async ({
  latitude,
  longitude,
<<<<<<< HEAD
  hourly = [...WEATHER_PARAMS.DEFAULT_HOURLY],
  daily = [...WEATHER_PARAMS.DEFAULT_DAILY],
  timezone = WEATHER_PARAMS.DEFAULTS.TIMEZONE,
  temperature_unit = WEATHER_PARAMS.DEFAULTS.TEMPERATURE_UNIT,
  wind_speed_unit = WEATHER_PARAMS.DEFAULTS.WIND_SPEED_UNIT,
  precipitation_unit = WEATHER_PARAMS.DEFAULTS.PRECIPITATION_UNIT,
}: WeatherParams): Promise<WeatherResponse> => {
  try {
    if (!latitude || !longitude) {
      throw new Error("위도 와 경도 는 필수 파라메터 입니다 !");
    }
    const response = await weatherApi.get("/forecast", {
=======
  hourly = [...WEATHER_PARAMS.HOURLY_VARIABLES],
  daily = [...WEATHER_PARAMS.DAILY_VARIABLES],
  past_days = 7,
  models = "auto",
  cell_selection = "land",
}: WeatherParam): Promise<WeatherResponse> => {
  try {
    if (!latitude || !longitude) {
      throw new Error("위도 와 경도 는 필수 파라미터 입니다 !");
    }

    // API 요청 전 파라미터 로깅
    console.log("API 요청 파라미터:", {
      latitude,
      longitude,
      hourly: Array.isArray(hourly) ? hourly.join(",") : hourly,
      daily: Array.isArray(daily) ? daily.join(",") : daily,
      past_days,
      models,
      cell_selection,
    });
    const response = await weatherApi.get("", {
>>>>>>> 5726d96 (update)
      params: {
        latitude,
        longitude,
        hourly: Array.isArray(hourly) ? hourly.join(",") : hourly,
<<<<<<< HEAD
        daily: Array.isArray(daily) ? hourly.join(",") : daily,
        timezone,
        temperature_unit,
        wind_speed_unit,
        precipitation_unit,
=======
        daily: Array.isArray(daily) ? daily.join(",") : daily,
        past_days,
        models,
        cell_selection,
>>>>>>> 5726d96 (update)
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
<<<<<<< HEAD
=======
      console.error("API 에러 상세:", {
        상태: error.response?.status,
        메시지: error.response?.data,
        요청URL: error.config?.url,
        요청파라미터: error.config?.params,
      });
>>>>>>> 5726d96 (update)
      throw new Error(
        `날씨 데이터 조회 실패: ${
          error.response?.data?.message || error.message
        }`
      );
    }
    throw new Error("날씨 데이터를 가져오는데 실패했습니다.");
  }
};

// 과거 날씨 데이터 조회
export const fetchHistoricalWeather = async (
  latitude: number,
  longitude: number,
  startDate: string,
  endDate: string,
<<<<<<< HEAD
  params: Partial<WeatherParams> = {}
): Promise<WeatherResponse> => {
  try {
    if (!latitude || !longitude || !startDate || !endDate) {
      throw new Error("위도 경도 시작일 종료일은 필수 파라메터입니다");
    }
    const response = await weatherApi.get("/archive", {
=======
  params: Partial<WeatherParam> = {}
): Promise<WeatherResponse> => {
  try {
    if (!latitude || !longitude || !startDate || !endDate) {
      throw new Error("위도 경도 시작일 종료일은 필수 파라미터입니다");
    }
    const response = await weatherApi.get("archive", {
>>>>>>> 5726d96 (update)
      params: {
        latitude,
        longitude,
        start_date: startDate,
        end_date: endDate,
        hourly: params.hourly?.join(""),
        daily: params.daily?.join(""),
<<<<<<< HEAD
        temperature_unit:
          params.temperature_unit || WEATHER_PARAMS.DEFAULTS.TEMPERATURE_UNIT,
        timezone: params.timezone || WEATHER_PARAMS.DEFAULTS.TIMEZONE,
=======
        past_days: params.past_days,
        models: params.models,
        cell_selection: params.cell_selection,
>>>>>>> 5726d96 (update)
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `날씨 데이터 조회 실패: ${
          error.response?.data?.message || error.message
        }`
      );
    }
    throw new Error("날씨 데이터를 가져오는데 실패했습니다.");
  }
};
