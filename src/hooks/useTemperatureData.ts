import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  WeatherResponse,
  HourlyData,
  DailyData,
} from "../api/temperature/temperatureTypes";
import {
  fetchWeatherData,
  fetchHistoricalWeather,
} from "../api/temperature/temperatureApi";
import { WEATHER_PARAMS } from "../api/weatherParams";
import { useCallback, useMemo } from "react";

// 훅에서 사용할 파라미터 타입 정의
// 입력 파라미터 타입
interface UseTemperatureDataParams {
  latitude: number;
  longitude: number;
  timeRange: "hourly" | "daily";
  startDate?: string;
  endDate?: string;
  options?: Omit<
    UseQueryOptions<
      WeatherResponse,
      WeatherError,
      TransformedWeatherData,
      TemperatureQueryKey
    >,
    "queryKey" | "queryFn"
  >;
}

// 에러 타입 정의
interface WeatherError extends Error {
  code?: string;
  statusCode?: number;
  isOperational?: boolean;
}

// 쿼리 키 타입
type TemperatureQueryKey = readonly [
  "temperature",
  {
    latitude: number;
    longitude: number;
    timeRange: "hourly" | "daily";
    startDate?: string;
    endDate?: string;
  }
];

// API 파라미터 타입
interface QueryParams {
  latitude: number;
  longitude: number;
  hourly?: (keyof HourlyData)[];
  daily?: (keyof DailyData)[];
}

// API 응답을 차트에 사용하기 좋은 형대로 변환하기 위한 타입
interface TransformedWeatherData {
  data: {
    times?: string[];
    temperatures?: number[];
    dates?: string[];
    maxTemps?: number[];
    minTemps?: number[];
    precipitation?: number[];
  };
  metadata: {
    latitude: number;
    longitude: number;
    timezone: string;
    timeRange: "hourly" | "daily";
  };
}
export const useTemperatureData = ({
  latitude,
  longitude,
  timeRange,
  startDate,
  endDate,
  options,
}: UseTemperatureDataParams) => {
  const isHistoricalData = Boolean(startDate && endDate);

  const queryParams: QueryParams = useMemo(
    () => ({
      latitude,
      longitude,
      hourly:
        timeRange === "hourly"
          ? ([...WEATHER_PARAMS.DEFAULT_HOURLY] as (keyof HourlyData)[])
          : undefined,
      daily:
        timeRange === "daily"
          ? ([...WEATHER_PARAMS.DEFAULT_DAILY] as (keyof DailyData)[])
          : undefined,
    }),
    [latitude, longitude, timeRange]
  );

  const queryKey = useMemo(
    (): TemperatureQueryKey => [
      "temperature",
      {
        latitude,
        longitude,
        timeRange,
        ...(isHistoricalData && { startDate, endDate }),
      },
    ],
    [latitude, longitude, timeRange, isHistoricalData, startDate, endDate]
  );

  const transformWeatherData = useCallback(
    (data: WeatherResponse): TransformedWeatherData => {
      const baseMetadata = {
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone,
        timeRange,
      };

      const transformers = {
        hourly: () => ({
          data: {
            times: data.hourly?.time,
            temperatures: data.hourly?.temperature_2m,
            precipitation: data.hourly?.precipitation,
          },
          metadata: baseMetadata,
        }),
        daily: () => ({
          data: {
            dates: data.daily?.time,
            maxTemps: data.daily?.temperature_2m_max,
            minTemps: data.daily?.temperature_2m_min,
          },
          metadata: baseMetadata,
        }),
      };

      const transformer = transformers[timeRange];
      if (!transformer) throw new Error(`Invalid timeRange: ${timeRange}`);

      return transformer();
    },
    [timeRange]
  );

  const fetchData = useCallback(async () => {
    if (isHistoricalData && (!startDate || !endDate)) {
      throw new Error("Historical data requires both start and end dates");
    }

    return isHistoricalData
      ? fetchHistoricalWeather(
          latitude,
          longitude,
          startDate!,
          endDate!,
          queryParams
        )
      : fetchWeatherData(queryParams);
  }, [latitude, longitude, startDate, endDate, isHistoricalData, queryParams]);

  return useQuery<
    WeatherResponse,
    WeatherError,
    TransformedWeatherData,
    TemperatureQueryKey
  >({
    queryKey,
    queryFn: fetchData,
    select: transformWeatherData,
    retry: 3,
    retryDelay: (attemptIndex: number) =>
      Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: isHistoricalData ? Infinity : 300000,
    gcTime: isHistoricalData ? Infinity : 360000,
    ...options,
  });
};
