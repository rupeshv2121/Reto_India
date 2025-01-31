import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import "./AuthNavbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const location = useLocation();

  return (
    <nav className="main-nav">
      <div className={`nav-container-auth ${isOpen ? "open" : ""}`}>
        <div className="logo-auth">
          <NavLink href="#">
            <img
              src="../../../public/img/LogoWoBcg.png"
              alt="Reto Logo"
              width="60px"
            />
          </NavLink>
        </div>
        <div className="nav-menu">
          <div className="nav-group">
            <ul>
              <li>
                <NavLink
                  className="nav-links ho-nv"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-links"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                >
                  Our Services
                </NavLink>
              </li>
              <li>
                <a
                  className="nav-links ab-ut"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                >
                  About Us
                </a>
              </li>
              <li>
                <NavLink
                  className="nav-links co-tc"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-links tr-k"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                >
                  Track Order
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-links car-t"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                >
                  Cart Items
                </NavLink>
              </li>
              {location.pathname === "/auth/login" ? (
                <NavLink className="nav-links lo-gin" to="/auth/signup">
                  Signup
                </NavLink>
              ) : (
                <NavLink className="nav-links lo-gin" to="/auth/login">
                  Login
                </NavLink>
              )}

              <li className="last">
                <NavLink className="header-cta ct-abtn" to="/auth/signup">
                  GET STARTED
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="res-nav" onClick={toggleMenu}>
          <span>☰</span>
        </div>
        <div className="close-nav" onClick={closeMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 8.293l3.707-3.707a1 1 0 111.414 1.414L11.414 9.707l3.707 3.707a1 1 0 11-1.414 1.414L10 11.121l-3.707 3.707a1 1 0 11-1.414-1.414L8.586 9.707 4.879 6a1 1 0 111.414-1.414L10 8.293z"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
