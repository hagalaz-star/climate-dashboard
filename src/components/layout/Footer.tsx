import React from "react";
import "../../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p className="copyright">© 2024 EARTHLIFE. All rights reserved.</p>
          <div className="footer-links">
            <a href="/privacy">개인정보처리방침</a>
            <span className="divider">|</span>
            <a href="/terms">이용약관</a>
            <span className="divider">|</span>
            <a href="/contact">문의하기</a>
          </div>
          <p className="address">서울특별시 강남구 테헤란로 123 지구생명빌딩</p>
          <p className="contact">
            Tel: 02-1234-5678 | Email: contact@earthlife.kr
          </p>
        </div>
      </div>
    </footer>
  );
}
