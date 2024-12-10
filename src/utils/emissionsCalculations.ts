import {
  KoreaClimateData,
  ProcessedTemperatureData,
  ProcessedRainfallData,
  ProcessedHeatIndexData,
} from "../types/common";

// 기준 기간 설정 (1991- 2020)

const BASELINE_PERIOD = {
  START_YEAR: 1991,
  END_YEAR: 2020,
};

// 기온 데이터 처리 함수
export function processTemperatureData(
  data: KoreaClimateData[]
): ProcessedTemperatureData[] {
  // 기준 기간의 평균 기온 계산
  const baselineTemps = data
    .filter((item) => {
      const year = parseInt(item.time.split("-")[0]);
      return (
        year >= BASELINE_PERIOD.START_YEAR && year <= BASELINE_PERIOD.END_YEAR
      );
    })
    .map((item) => item.value);

  const baselineMean =
    baselineTemps.reduce((sum, temp) => sum + temp, 0) / baselineTemps.length;

  return data.map((item): ProcessedTemperatureData => {
    // 연간 변화율 계산 (이전 5년 데이터 사용)
    const index = data.indexOf(item);
    const previousYears = data.slice(Math.max(0, index - 5), index);
    const yearlyChangeRate =
      previousYears.length > 0
        ? (item.value - previousYears[0].value) / previousYears.length
        : 0;
    return {
      date: item.time,
      currentTemp: item.value,
      tempDifference: item.value - baselineMean,
      yearlyChangeRate: Number(yearlyChangeRate.toFixed(2)),
      averageTemp: baselineMean,
      maxTemp: Math.max(...previousYears.map((d) => d.value), item.value),
      minTemp: Math.min(...previousYears.map((d) => d.value), item.value),
      frostDayCount: item.value < 0 ? 1 : 0, // 0도 미만일 경우 서리 발생으로 간주
    };
  });
}

export function processPrecipitationData(
  data: KoreaClimateData[]
): ProcessedRainfallData[] {
  const HEAVY_RAIN_THRESHOLD = 80; // 시간당 80mm 이상을 호우로 정의

  return data.map((item) => {
    // 강수 강도 레벨 계산(0-4단계)
    const calculateIntensityLevel = (rainfall: number): number => {
      if (rainfall === 0) return 0;
      if (rainfall < 20) return 1;
      if (rainfall < 50) return 2;
      if (rainfall < HEAVY_RAIN_THRESHOLD) return 3;
      return 4;
    };
    // 월간 총 강수량 계산 (같은 달의 데이터 합산)
    const currentMonth = item.time.split("-")[1];
    const monthlyData = data.filter((d) => d.time.spl);
  });
}
