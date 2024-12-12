# Climate Change Dashboard

기후 변화 데이터를 시각화하여 보여주는 대시보드 프로젝트입니다.

## 기술 스택

- React
- TypeScript
- Recharts (데이터 시각화)
- Axios (API 통신)

## 주요 기능

- 지역별 기후 변화 데이터 시각화
- 지역 간 데이터 비교
- 연도별 기후 변화 트렌드 분석

## 프로젝트 폴더 구조

```plaintext
src
├── api
│ ├── temperature
│ │ ├── temperatureApi.ts # Open-Meteo API 관련 함수
│ │ └── temperatureTypes.ts # 온도 데이터 타입 정의
│ ├── emissions
│ │ ├── emissionsApi.ts # Climate TRACE API 관련 함수
│ │ └── emissionsTypes.ts # 배출량 데이터 타입 정의
│ ├── apiConfig.ts # API 설정, 인증 관리
│ └── endpoints.ts # API 엔드포인트 상수
├── components
│ ├── charts
│ │ ├── temperature
│ │ │ ├── TemperatureChart.tsx
│ │ │ └── TemperatureAnalysis.tsx
│ │ ├── emissions
│ │ │ ├── EmissionsChart.tsx
│ │ │ └── EmissionsAnalysis.tsx
│ │ └── combined
│ │ ├── CombinedChart.tsx # 통합 데이터 차트
│ │ └── CorrelationView.tsx # 상관관계 분석 뷰
│ └── layout
│ ├── Footer.tsx
│ ├── Header.tsx
│ └── Layout.tsx
├── hooks
│ ├── useTemperatureData.ts # 기온 데이터 관련 훅
│ ├── useEmissionsData.ts # 배출량 데이터 관련 훅
│ ├── useCombinedData.ts # 통합 데이터 관련 훅
│ └── useRegionData.ts # 지역 데이터 관련 훅
├── pages
│ ├── Home.tsx
│ ├── RegionComparison.tsx
│ ├── RegionDetail.tsx
│ └── NotFound.tsx
├── types
│ ├── common.ts # 공통 타입
│ └── components.ts # 컴포넌트 props 타입
├── utils
│ ├── temperatureCalculations.ts
│ ├── emissionsCalculations.ts
│ ├── correlationAnalysis.ts
│ └── dataTransformers.ts
├── App.tsx
└── main.tsx
```
