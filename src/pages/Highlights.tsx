<<<<<<< HEAD
export default function Highlights() {
  return <div>Highlights</div>;
}
=======
// src/pages/Highlights.tsx
import React from "react";
import { TemperatureChart } from "../components/charts/temperature/TemperatureChart";

const Highlights = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">기후 하이라이트</h1>

      {/* 서울의 위도/경도로 차트 표시 */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">서울 날씨 현황</h2>
        <TemperatureChart
          latitude={37.5665}
          longitude={126.978}
          timeRange="hourly"
          showPrecipitation={true}
        />
      </div>
    </div>
  );
};

export default Highlights;
>>>>>>> 5726d96 (update)
