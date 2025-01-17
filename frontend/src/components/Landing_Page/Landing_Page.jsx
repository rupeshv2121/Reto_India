import React from 'react'
import LogoWoBcg from '../assets/LogoWoBcg.png'
import './Landing_Page.css'
function Landing_Page() {
  return (
    <div>
   

    <div className="container">
        <div className="logo">
            <img src={LogoWoBcg} alt="Logo"/>
            <div className="circle">
                <p className="circle-text">
                    <span className="reto">RETO</span><br/>
                    <span className="india">INDIA</span>
                </p>
            </div>
        </div>
        <div className="description">
            <h1>NAMASTE!</h1>
            <p className="subtitle">LET’S CONNECT WITH OUR SOIL, AGAIN!</p>
            <a href="#" className="shop-now">SHOP NOW</a>
            <p className="highlight">Reto INDIA is a new gen marketplace connecting with the old gems of our land.</p>
        </div>
    </div>
    </div>
  )
}

export default Landing_Page