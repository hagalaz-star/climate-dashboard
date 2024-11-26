// API 응답의 메타데이터 타입
interface ApiMetadata{
    api_version: string;
    status: "success" | "error";
    message: string;
}

// 지역별 기후 데이터 타입
interface RegionData {
    [date: string]: number;

}

// 전체 API 응답 타입
export interface ClimateApiResponse{
    data:{
        [region: string]: RegionData;
    };
    metadata: ApiMetadata;
}

// 차트나 테이블에서 사용하기 쉽게 변환된 데이터 타입
export interface ProcessedClimateData{
    data: string;
    value: number;
    region: string;
}


