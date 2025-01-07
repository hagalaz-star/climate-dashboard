import axios from "axios";
import { API_CONFIG } from "../apiConfig";
import { WEATHER_PARAMS } from "../weatherParams";
import { WeatherResponse, WeatherParam } from "./temperatureTypes";
// 환경 변수가 제대로 로드 되었는지 확인하는 디버깅 로그
console.log("환경변수 VITE_API_URL:", import.meta.env.VITE_API_URL);
console.log("API_CONFIG BASE_URL 확인:", API_CONFIG.OPEN_WEATHER.BASE_URL);
const weatherApi = axios.create({
  baseURL: API_CONFIG.OPEN_WEATHER.BASE_URL,
  timeout: API_CONFIG.OPEN_WEATHER.TIMEOUT,
});
// 현재/예보 날씨 데이터 조회
export const fetchWeatherData = async ({
  latitude,
  longitude,
  hourly = ["temperature_2m", "apparent_temperature", "precipitation"],
  daily = ["temperature_2m_max", "temperature_2m_min"],
  timezone = "Asia/Seoul",
  past_days = 7,
}: WeatherParam): Promise<WeatherResponse> => {
  try {
    if (!latitude || !longitude) {
      throw new Error("위도와 경도는 필수 파라미터입니다!");
    }

    const response = await weatherApi.get("", {
      params: {
        latitude,
        longitude,
        hourly: Array.isArray(hourly) ? hourly.join(",") : hourly,
        daily: Array.isArray(daily) ? daily.join(",") : daily,
        timezone,
        past_days,
      },
    });
    console.log("API 응답 데이터:", response.data); // 디버깅을 위한 로그 추가
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API 에러 상세:", {
        상태: error.response?.status,
        메시지: error.response?.data,
        요청URL: error.config?.url,
        요청파라미터: error.config?.params,
      });
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
  params: Partial<WeatherParam> = {}
): Promise<WeatherResponse> => {
  try {
    if (!latitude || !longitude || !startDate || !endDate) {
      throw new Error("위도 경도 시작일 종료일은 필수 파라미터입니다");
    }
    const response = await weatherApi.get("archive", {
      params: {
        latitude,
        longitude,
        start_date: startDate,
        end_date: endDate,
        hourly: params.hourly?.join(""),
        daily: params.daily?.join(""),
        past_days: params.past_days,
        models: params.models,
        cell_selection: params.cell_selection,
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
