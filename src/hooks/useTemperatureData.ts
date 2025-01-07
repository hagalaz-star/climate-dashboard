import {
  WeatherResponse,
  WeatherParam,
  HourlyData,
  DailyData,
} from "../api/temperature/temperatureTypes";
import {
  fetchWeatherData,
  fetchHistoricalWeather,
} from "../api/temperature/temperatureApi";
import { useState, useEffect } from "react";

interface WeatherQueryParams {
  latitude: number;
  longitude: number;
  timeRange: "hourly" | "daily"; // 우리 앱에 필요한 구분
  hourlyParams?: Array<keyof HourlyData>; // API 요청을 위한 설정
  dailyParams?: Array<keyof DailyData>; // API 요청을 위한 설정
  startDate?: string;
  endDate?: string;
  past_days?: number;
}

// API 응답을 차트에 사용하기 좋은 형태로 변환하기 위한 타입
interface WeatherMeasurements {
  time?: string[];
  dates?: string[];

  //기온 관련 데이터
  temperatures?: number[];
  maxTemps?: number[];
  minTemps?: number[];
  apparentTemps?: number[];

  // 강수량 관련 데이터
  precipitation?: number[];
  precipitationSum?: number[];
  precipitationHours?: number[];
  precipitationProbability?: number[]; // 강수 확률

  cloudCover?: number[];
  weatherCode?: number[];
  windSpeed?: number[];
  sunrise?: string[];
  sunset?: string[];
}

interface WeatherMetadata {
  latitude: number;
  longitude: number;
  timezone: string;
  startTime?: string;
  endTime?: string;
}

export interface TransformedWeatherData {
  measurements: WeatherMeasurements; // data 대신 measurements
  metadata: WeatherMetadata;
}
// 커스텀 훅 추가
export const useWeatherDataQuery = (
  latitude: number,
  longitude: number,
  timeRange: "hourly" | "daily"
) => {
  const [weatherData, setWeatherData] = useState<TransformedWeatherData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await fetchCurrentWeatherData({
          latitude,
          longitude,
          timeRange,
          hourlyParams: [
            "temperature_2m",
            "apparent_temperature",
            "precipitation",
          ],
          dailyParams: ["temperature_2m_max", "temperature_2m_min"],
        });
        setWeatherData(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "날씨 데이터를 가져오는데 실패했습니다"
        );
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [latitude, longitude, timeRange]);

  return { weatherData, loading, error };
};

// 데이터 변환 함수
const transformToChartData = (
  response: WeatherResponse
): TransformedWeatherData => {
  return {
    measurements: {
      // 시간 관련 데이터
      time: response.hourly?.time,
      dates: response.daily?.time,

      // 기온 관련 데이터
      temperatures: response.hourly?.temperature_2m,
      maxTemps: response.daily?.temperature_2m_max,
      minTemps: response.daily?.temperature_2m_min,
      apparentTemps: response.hourly?.apparent_temperature,

      //강수량 관련 데이터
      precipitation: response.hourly?.precipitation,
      precipitationSum: response.daily?.precipitation_sum,
      precipitationHours: response.daily?.precipitation_hours,
      precipitationProbability: response.hourly?.precipitation_probability,

      // 구름 / 날씨 관련 데이터
      cloudCover: response.hourly?.cloud_cover,
      weatherCode: response.hourly?.weather_code,

      // 바람 관련 데이터
      windSpeed: response.hourly?.wind_speed_10m,

      // 일출/일몰 시간
      sunrise: response.daily?.sunrise,
      sunset: response.daily?.sunset,
    },
    metadata: {
      latitude: response.latitude,
      longitude: response.longitude,
      timezone: response.timezone,
      startTime: response.daily?.time[0] || response.hourly?.time[0],
      endTime:
        response.daily?.time[response.daily.time.length - 1] ||
        response.hourly?.time[response.hourly.time.length - 1],
    },
  };
};

// 현재 / 예보 날씨 데이터 fetch 함수
export const fetchCurrentWeatherData = async (
  params: WeatherQueryParams
): Promise<TransformedWeatherData> => {
  const weatherParams: WeatherParam = {
    latitude: params.latitude,
    longitude: params.longitude,
    hourly: params.hourlyParams,
    daily: params.dailyParams,
    past_days: params.past_days,
    models: "auto", // 기본값 설정
    cell_selection: "land", // 기본값 설정
    timezone: "auto",
  };
  const response = await fetchWeatherData(weatherParams);
  return transformToChartData(response);
};

// 과거 날씨 데이터 fetch 함수
export const fetchHistoricalWeatherData = async (
  params: WeatherQueryParams
): Promise<TransformedWeatherData> => {
  if (!params.startDate || !params.endDate) {
    throw new Error("과거 데이터 조회 시 시작일과 종료일이 필요합니다");
  }
  const response = await fetchHistoricalWeather(
    params.latitude,
    params.longitude,
    params.startDate,
    params.endDate,
    {
      hourly: params.hourlyParams,
      daily: params.dailyParams,
      past_days: params.past_days,
      models: "auto",
      cell_selection: "land",
      timezone: "auto",
    }
  );
  return transformToChartData(response);
};

// Recharts 데이터 포맷 변환 함수
export const formatForRecharts = (
  weatherData: TransformedWeatherData,
  metrics: string[]
) => {
  const timeArray =
    weatherData.measurements.time || weatherData.measurements.dates || [];
  return timeArray.map((time, index) => {
    const dataPoint: Record<string, string | number | undefined> = {
      time: time,
    };

    metrics.forEach((metric) => {
      const metricData =
        weatherData.measurements[metric as keyof WeatherMeasurements];
      if (Array.isArray(metricData)) {
        dataPoint[metric] = metricData[index];
      }
    });
    return dataPoint;
  });
};

// 데이터 필터링 함수
export const filterWeatherData = (
  data: TransformedWeatherData,
  dateRange?: { start: string; end: string },
  selectedMetrics?: Array<keyof WeatherMeasurements>
): TransformedWeatherData => {
  const filteredData: TransformedWeatherData = {
    measurements: { ...data.measurements },
    metadata: { ...data.metadata },
  };

  // 날짜 필터링
  if (dateRange) {
    const { start, end } = dateRange;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeArray = data.measurements.time || data.measurements.dates;

    if (timeArray) {
      // 필터링된 인덱스 찾기
      const filteredIndexes = timeArray
        .map((time, index) => ({ time, index }))
        .filter(({ time }) => {
          const currentDate = new Date(time);
          return currentDate >= startDate && currentDate <= endDate;
        })
        .map(({ index }) => index);

      // 측정값 필터링
      Object.entries(data.measurements).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          filteredData.measurements[key as keyof WeatherMeasurements] =
            filteredIndexes.map((index) => value[index]);
        }
      });
    }
  }

  // 선택된 메트릭만 필터링
  if (selectedMetrics) {
    const newMeasurements = {} as WeatherMeasurements;
    selectedMetrics.forEach((metric) => {
      (newMeasurements[
        metric
      ] as WeatherMeasurements[keyof WeatherMeasurements]) =
        filteredData.measurements[metric];
    });
    filteredData.measurements = newMeasurements;
  }
  return filteredData;
};
