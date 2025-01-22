import React from "react";
import logo from "../../assets/LogoWoBcg.png";
import "./LandingPageSm.css";
const LandingPageSm = () => {
  return (
    <>
      {/* <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="#">Home</a>
          </li>
          <li className="nav-item">
            <a href="#">About</a>
          </li>
          <li className="nav-item">
            <a href="#">Services</a>
          </li>
          <li className="nav-item">
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav> */}

      <div className="container-sm">
        <div className="logo-sm">
          <img src={logo} alt="Logo" />
          <div className="circle-sm">
            <p className="circle-text">
              <span className="reto">RETO</span>
              <br />
              <span className="india">INDIA</span>
            </p>
          </div>
        </div>
        <div className="description">
          <h1>NAMASTE!</h1>
          <p className="subtitle">LETS CONNECT WITH OUR SOIL, AGAIN!</p>
          <a href="#" className="shop-now">
            SHOP NOW
          </a>
          <p className="highlight">
            Reto INDIA is a new gen marketplace connecting with the old gems of
            our land.
          </p>
        </div>
      </div>
    </>
  );
};

export default LandingPageSm;
