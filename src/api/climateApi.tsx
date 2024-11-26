import axios from 'axios';
import { ClimateApiResponse, ProcessedClimateData } from '../types/climateTypes';

const API_ENDPOINT = {
    BASE_URL :'/api/cckp/v1',
    DATASET: 'cru-x0.5_timeseries-smooth_pr_timeseries_annual_1901-2022_mean_historical_cru_ts4.07_mean',
    REGION: 'region_eas'
} as const;

/**
 * 기후 데이터를 가져오고 처리하는 함수
 * @param region - 지역 코드 (예: 'KOR')
 * @returns Promise<ProcessedClimateData[]>
 */
export const fetchAndProcessClimateData  = async (region: string): Promise<ProcessedClimateData[]> =>{
    try {
        const endpoint = `${API_ENDPOINT.BASE_URL}/${API_ENDPOINT.DATASET}/${API_ENDPOINT.REGION}`;
        
        const response = await axios.get<ClimateApiResponse>(endpoint,{
            params: {_format: 'json'}}
        );
        if (response.data.metadata.status === 'error'){
           throw new Error(response.data.metadata.message);
       } 
        // 데이터 처리
        const regionData = response.data.data[region];
        if(!regionData) {
            console.warn(`지역 데이터가 없습니다: ${region}`);
            return [];
        }
        // 데이터 변환 
        return Object.entries(regionData).map(([date, value]) => ({
            data: date,
            value: value,
            region: region,
        }));
    } catch (error) {
        console.error('기후 데이터를 가져오는데 실패했습니다:', error);
        throw error;
    }
}

/**
 * API 응답 데이터를 가공하는 함수
 * @param data - API 응답 데이터
 * @param region - 지역 코드
 * @returns ProcessedClimateData[]
 */

export const processClimateData = (
    data: ClimateApiResponse,
    region: string
): ProcessedClimateData[] =>{
    const regionData = data.data[region];
    if (!regionData) {
        console.warn(`지역 데이터가 없습니다: ${region}`);
        return [];
    }
    return Object.entries(regionData).map(([date, value]) => ({
        data: date,
        value: value,
        region: region,
    }));
}

