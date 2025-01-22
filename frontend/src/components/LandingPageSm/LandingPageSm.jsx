import React from "react";
import "./LandingPageSm.css";
import logo from "../../assets/LogoWoBcg.png";
const LandingPageSm = () => {
  return (
    <>
      {/* <nav class="navbar">
        <ul class="nav-list">
          <li class="nav-item">
            <a href="#">Home</a>
          </li>
          <li class="nav-item">
            <a href="#">About</a>
          </li>
          <li class="nav-item">
            <a href="#">Services</a>
          </li>
          <li class="nav-item">
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav> */}

      <div class="container-sm">
        <div class="logo-sm">
          <img src={logo} alt="Logo" />
          <div class="circle-sm">
            <p class="circle-text">
              <span class="reto">RETO</span>
              <br />
              <span class="india">INDIA</span>
            </p>
          </div>
        </div>
        <div class="description">
          <h1>NAMASTE!</h1>
          <p class="subtitle">LET'S CONNECT WITH OUR SOIL, AGAIN!</p>
          <a href="#" class="shop-now">
            SHOP NOW
          </a>
          <p class="highlight">
            Reto INDIA is a new gen marketplace connecting with the old gems of
            our land.
          </p>
        </div>
      </div>
    </>
  );
};

export default LandingPageSm;
