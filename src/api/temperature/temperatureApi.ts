import axios from "axios";
import { API_CONFIG } from "../apiConfig";
import { WEATHER_PARAMS } from "../weatherParams";
import {
  WeatherResponse,
  WeatherParams,
  TemperatureUnit,
  WindSpeedUnit,
  PrecipitationUnit,
} from "./temperatureTypes";

// api 인스턴스 생성
const weatherApi = axios.create({
  baseURL: API_CONFIG.OPEN_WEATHER.BASE_URL,
  timeout: API_CONFIG.OPEN_WEATHER.TIMEOUT,
});

// 현재/예보 날씨 데이터 조회
export const fetchWeatherData = async ({
  latitude,
  longitude,
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
      params: {
        latitude,
        longitude,
        hourly: Array.isArray(hourly) ? hourly.join(",") : hourly,
        daily: Array.isArray(daily) ? hourly.join(",") : daily,
        timezone,
        temperature_unit,
        wind_speed_unit,
        precipitation_unit,
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

// 과거 날씨 데이터 조회
export const fetchHistoricalWeather = async (
  latitude: number,
  longitude: number,
  startDate: string,
  endDate: string,
  params: Partial<WeatherParams> = {}
): Promise<WeatherResponse> => {
  try {
    if (!latitude || !longitude || !startDate || !endDate) {
      throw new Error("위도 경도 시작일 종료일은 필수 파라메터입니다");
    }
    const response = await weatherApi.get("/archive", {
      params: {
        latitude,
        longitude,
        start_date: startDate,
        end_date: endDate,
        hourly: params.hourly?.join(""),
        daily: params.daily?.join(""),
        temperature_unit:
          params.temperature_unit || WEATHER_PARAMS.DEFAULTS.TEMPERATURE_UNIT,
        timezone: params.timezone || WEATHER_PARAMS.DEFAULTS.TIMEZONE,
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
