import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../../styles/Header.css";
import logoImage from "../../assets/images/logo.png";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <img
          src={logoImage}
          alt="기후변화 분석 로고"
          className="logo-image"
          width={150}
          height={100}
        />
      </Link>
      <div className="header_container">
        <nav className="header_menu">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "header_menu-link active" : "header_menu-link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/highlights"
            className={({ isActive }) =>
              isActive ? "header_menu-link active" : "header_menu-link"
            }
          >
            Highlights
          </NavLink>
          <NavLink
            to="/regional-climate/:id"
            className={({ isActive }) =>
              isActive ? "header_menu-link active" : "header_menu-link"
            }
          >
            RegionalClimate
          </NavLink>
          <NavLink
            to="/trend-analysis"
            className={({ isActive }) =>
              isActive ? "header_menu-link active" : "header_menu-link"
            }
          >
            TrendAnalysis
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
