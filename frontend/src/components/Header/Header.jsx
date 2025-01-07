import React from 'react'
import logo from './HeaderImg/logo.png'
import search from './HeaderImg/search.png'
import cart from './HeaderImg/cart.png'
import './Header.css'
const Header = () => {
  return (
         <div className='header'>
            <img src={logo} alt="logo" className="logo"/>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Product</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Tracker</a></li>
                </ul>
            </nav>
            <div className="login">
                <a href="#">LOGIN</a>
            </div>
            <div className="search-bar">
                <img src={search} alt="search" className="search"/>
                <input type="text" />
            </div>
            <div className="cart-logo">
                <img src={cart} alt="cart" className="cart"/>
                <p>(0)</p>
            </div>
        </div>
  )
}

export default Header