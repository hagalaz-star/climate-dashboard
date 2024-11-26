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
- src/: 애플리케이션의 모든 소스 코드가 포함된 디렉토리
- api/: API 통신 및 엔드포인트 관
- climateApi.tsx: API 호출 함수
- endpoints.ts: API 엔드포인트 상수
- assets/: 이미지 및 전역 상수 관리
- images/: 프로젝트에서 사용하는 이미지 파일들
- constants.ts: 전역적으로 사용하는 상수 정의
- components/: UI 컴포넌트 모음
- layout/: 레이아웃 관련 컴포넌트 (예: Header, Footer)
- charts/: 데이터 시각화를 위한 차트 컴포넌트
- common/: 재사용 가능한 공통 컴포넌트 (예: 버튼, 카드)
- helpers/: 데이터 포맷팅 등 유틸리티 함수 모음
- hooks/: 커스텀 React 훅 모음 (예: 기후 데이터, 지역 데이터 처리)
- pages/: 주요 페이지 컴포넌트
- Home.tsx: 메인 페이지
- Compare.tsx: 비교 페이지
- RegionDetail.tsx: 지역 상세 페이지
- NotFound.tsx: 404 페이지
- types/: TypeScript 타입 정의 파일들
- utils/: 데이터 계산 등 유틸리티 함수 모음
  
