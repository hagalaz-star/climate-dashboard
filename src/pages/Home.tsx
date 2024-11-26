import React from "react";
import { useEffect, useState } from "react";
import { ProcessedClimateData } from "../types/climateTypes";
import { fetchAndProcessClimateData } from "../api/climateApi";



export default function Home() {
  const [climateData, setClimateData] = useState<ProcessedClimateData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const processedData = await fetchAndProcessClimateData('KOR');
        setClimateData(processedData);
        setError(null)
      } catch (err){
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
        console.error('기후 데이터 가져오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러: {error}</div>;

  return( 
    <div>
       <h1>기후 변화 대시보드</h1>
       {climateData.length > 0 && (
         <div>
           <p>데이터 포인트 수: {climateData.length}</p>
           <p>첫 번째 데이터: {climateData[0]?.value}</p>
         </div>
       )}
    </div>
  );
};
