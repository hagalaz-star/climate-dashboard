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

## 파일구조 

📦 src
 ┣ 📂 api
 ┃ ┗ 📜 climateApi.tsx         // API 통신 관련 함수
 ┃ ┗ 📜 endpoints.ts           // API 엔드포인트 상수 관리
 ┣ 📂 assets
 ┃ ┣ 📂 images                 // 이미지 파일들
 ┃ ┗ 📜 constants.ts           // 전역 상수 관리
 ┣ 📂 components
 ┃ ┣ 📂 layout
 ┃ ┃ ┣ 📜 Footer.tsx
 ┃ ┃ ┣ 📜 Header.tsx
 ┃ ┃ ┗ 📜 Layout.tsx
 ┃ ┣ 📂 charts                 // 차트 컴포넌트들
 ┃ ┃ ┣ 📜 TemperatureChart.tsx
 ┃ ┃ ┗ 📜 EmissionsChart.tsx
 ┃ ┗ 📂 common                 // 공통 컴포넌트들
 ┃   ┣ 📜 Button.tsx
 ┃   ┗ 📜 Card.tsx
 ┣ 📂 helpers
 ┃ ┗ 📜 formatters.ts          // 데이터 포맷팅 유틸리티
 ┣ 📂 hooks
 ┃ ┣ 📜 useClimateData.ts      // 기후 데이터 관련 커스텀 훅
 ┃ ┗ 📜 useRegionData.ts       // 지역 데이터 관련 커스텀 훅
 ┣ 📂 pages
 ┃ ┣ 📜 Home.tsx
 ┃ ┣ 📜 Compare.tsx
 ┃ ┣ 📜 RegionDetail.tsx
 ┃ ┗ 📜 NotFound.tsx
 ┣ 📂 types
 ┃ ┣ 📜 climateTypes.ts
 ┃ ┗ 📜 components.ts
 ┣ 📂 utils
 ┃ ┗ 📜 calculations.ts        // 데이터 계산 관련 유틸리티
 ┣ 📜 App.tsx
 ┗ 📜 main.tsx


  
