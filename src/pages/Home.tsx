// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>지구의 변화를 마주하다</h1>
        <p className="subtitle">기후 변화 데이터 시각화 플랫폼</p>
      </section>

      <section className="info-section">
        <div className="info-content">
          <h2>기후 변화를 한눈에</h2>
          <p>
            지역별 기온 변화, 탄소 배출량 등 다양한 기후 데이터를 직관적인
            시각화를 통해 확인하세요.
          </p>

          <div className="features">
            <Link to="/highlights" className="feature-item">
              <h3>🔍 기후 하이라이트</h3>
              <p>대한민국의 주요 기후 지표와 최근 변화 동향을 살펴보세요</p>
            </Link>

            <Link to="/region" className="feature-item">
              <h3>🌍 지역 맞춤형</h3>
              <p>관심 있는 지역의 상세 기후 데이터를 분석해보세요</p>
            </Link>

            <Link to="/compare" className="feature-item">
              <h3>📈 추세 분석</h3>
              <p>여러 지역의 기후 변화 추이를 비교해보세요</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
