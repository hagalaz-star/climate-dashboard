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

interface TemperatureChartProps {
  latitude: number;
  longitude: number;
  timeRange: "hourly" | "daily";
  showPrecipitation: boolean;
}

export const TemperatureChart: React.FC<TemperatureChartProps> = ({
  latitude,
  longitude,
  timeRange,
  showPrecipitation,
}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
        {showPrecipitation && <Bar dataKey="precipitation" fill="#82ca9d" />}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
