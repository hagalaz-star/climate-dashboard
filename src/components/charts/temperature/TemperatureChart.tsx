import React, { useMemo, useState } from "react";
import {
  AreaChart,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  TransformedWeatherData,
  formatForRecharts,
  useWeatherDataQuery,
} from "../../../hooks/useTemperatureData";

interface TemperatureChartProps {
  latitude: number;
  longitude: number;
  timeRange: "hourly" | "daily";

  // 어떤 온도 데이터를 보여줄지 선택
  showCurrentTemp?: boolean;
  showMaxTemp?: boolean;
  showMinTemp?: boolean;
  showFeelsLike?: boolean;

  // 강수량
  showPrecipitation?: boolean;

  // 시각적 옵션들
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
}
// 날씨 데이터를 시각화 하는 컴포넌트
const TemperatureChart = ({
  latitude,
  longitude,
  timeRange,
  showCurrentTemp = true,
  showMinTemp = true,
  showMaxTemp = true,
  showFeelsLike = false,
  showPrecipitation = false,
  height = 400,
  showLegend = true,
  showGrid = true,
}: TemperatureChartProps) => {
  const { weatherData, loading, error } = useWeatherDataQuery(
    latitude,
    longitude,
    timeRange
  );

  // 차트에 표시할 데이터 계산
  const chartData = useMemo(() => {
    if (!weatherData) return [];
    // 표시할 온도 지표들을 배열로 구성
    const metrics = [];
    if (showCurrentTemp) metrics.push("temperatures"); // 기본 온도 데이터
    if (showMaxTemp) metrics.push("maxTemps");
    if (showMinTemp) metrics.push("minTemps");
    if (showFeelsLike) metrics.push("apparentTemps");
    if (showPrecipitation) metrics.push("precipitation");

    // formatForRecharts 함수를 사용하여 Recharts에 맞는 데이터 형식으로 변환
    return formatForRecharts(weatherData, metrics);
  }, [
    weatherData,
    showCurrentTemp,
    showMinTemp,
    showMaxTemp,
    showFeelsLike,
    showPrecipitation,
  ]);

  // 시간 포맷팅 함수
  const formatXAxis = useMemo(() => {
    return (value: string) => {
      const date = new Date(value);
      if (timeRange === "hourly") {
        return `${date.getHours()}:00`;
      }
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${month}-${day}`;
    };
  }, [timeRange]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!weatherData) return <div>데이터가 없습니다</div>;

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" aspect={3}>
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}

          <XAxis
            dataKey="time"
            tickFormatter={formatXAxis}
            interval="preserveStartEnd"
          />
          <YAxis
            label={{ value: "온도 ℃", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            labelFormatter={(label) => formatXAxis(label as string)}
            formatter={(value) => [`${value}℃`]}
          />
          {showLegend && <Legend />}

          {/*현재 기온  */}
          {showCurrentTemp && (
            <Line
              dataKey="temperatures"
              type="monotone"
              stroke="#8884d8"
              name="현재 기온"
              dot={false}
            />
          )}
          {/* 최고 기온 */}
          {showMaxTemp && (
            <Line
              dataKey="maxTemps"
              type="monotone"
              stroke="#ff7300"
              name="최고 기온"
              dot={false}
            />
          )}
          {/* 최저 기온 */}
          {showMinTemp && (
            <Line
              dataKey="minTemps"
              type="monotone"
              stroke="#82ca9d"
              name="최저 기온"
              dot={false}
            />
          )}
          {/* 체감 온도 */}
          {showFeelsLike && (
            <Line
              dataKey="apparentTemps"
              type="monotone"
              stroke="#ffc658"
              name="체감 온도"
              dot={false}
              strokeDasharray="5 5"
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
