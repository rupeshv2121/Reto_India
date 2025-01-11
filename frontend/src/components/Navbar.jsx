import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useLocation } from "react-router";
import toggleMenu from "../../public/js/navBar";
import "./Navbar.css";
import ProgressBar from "./ProgressBar/ProgressBar";

const Navbar = () => {
  // const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const tl = useRef();
  useGSAP(() => {
    tl.current = gsap
      .timeline()
      .from(".logo", {
        opacity: 0,
        y: -50,
        delay: 0.2,
        duration: 1,
      })
      .from("nav a", {
        opacity: 0,
        y: -50,
        duration: 0.7,
        stagger: 0.5,
      });

    return () => {
      if (tl.current) {
        tl.current.kill();
      }
    };
  });

  const location = useLocation(); // Hook to get the current location
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500); // Simulate loading delay
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <ProgressBar show={isLoading} />
      <header>
        <div className="logo">
          <img src="./img/LogoWoBcg.png" alt="Logo" />
        </div>

        {/* <!-- Desktop Navigation --> */}
        <nav>
          <a href="#home">
            <i className="fa-solid fa-house ho-me"></i>Home
          </a>
          <a href="#products">
            <i className="fa-solid fa-cart-shopping pro-dct"></i>Products
          </a>
          <a href="#about">
            <i className="fa-solid fa-book ab-ut"></i>About
          </a>
          <a href="#login">
            <span className="lo-gin">
              <i className="fa-solid fa-user lo-gin"></i>Pooja Naitam
            </span>
          </a>

          <a href="#contact">
            <i className="fa-solid fa-phone con-tct"></i>Contact Us
          </a>
          <a href="#tracker">
            <i className="fa-solid fa-location-dot trc-ker"></i>Tracker
          </a>

          <a href="#cart">
            {/* <i className="fa-solid fa-cart-shopping ca-rt"></i>(0) */}
            <div className="rounded-full relative ">
              <FaCartShopping className="text-xl cursor-pointer" />
              <p className="absolute -top-3 -right-3 text-lg text-red-600 ">
                0
              </p>
            </div>
          </a>
          <i className="fa-solid fa-right-from-bracket lo-ut"></i>

          {/* <div className="w-full flex justify-end align-center p-5 px-10 fixed z-10"> */}

          {/* </div> */}
        </nav>
        {/* <!-- Mobile Menu Toggle --> */}

        <div className="menu-toggle" onClick={toggleMenu}>
          <svg
            id="menu-icon"
            xmlns="http://www.w3.org/2000/svg"
            className="to-gl"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
          >
            <path fill="#000" d="M0 3h24v2H0zM0 11h24v2H0zM0 19h24v2H0z" />
          </svg>

          <img id="close-icon" className="close-btn" src="./img/close.png" />
        </div>

        {/* <!-- Mobile Menu --> */}
        <div className="mobile-menu" id="mobileMenu">
          <a href="#home">
            <i className="fa-solid fa-house ho-me"></i>&nbsp;Home
          </a>
          <a href="#products">
            <i className="fa-solid fa-cart-shopping pro-dct"></i>&nbsp;Products
          </a>
          <a href="#about">
            <i className="fa-solid fa-book ab-ut"></i>&nbsp;About
          </a>
          <a href="#login">
            <i className="fa-solid fa-user lo-gin"></i>&nbsp;Login
          </a>
          <a href="#contact">
            <i className="fa-solid fa-phone con-tct"></i>&nbsp;Contact Us
          </a>
          <a href="#tracker">
            <i className="fa-solid fa-location-dot trc-ker"></i>&nbsp;Tracker
          </a>

          <a href="#products">
            {/* <i className="fa-solid fa-cart-plus"></i>&nbsp;&nbsp;(0) */}
            <div className="rounded-full relative inline-block">
              <FaCartShopping className="text-xl cursor-pointer md-hidden" />
              <p className="absolute -top-3 -right-3 text-lg text-red-600 md-inline-block ">
                0
              </p>
            </div>
          </a>
          <i className="fa-solid fa-right-from-bracket lo-ut"></i>
        </div>
      </header>
    </>
  );
};

export default Navbar;
