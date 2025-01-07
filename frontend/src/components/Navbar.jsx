import toggleMenu from "../../public/js/navBar";
import "./Navbar.css";

const Navbar = () => {
  return (
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
          <i className="fa-solid fa-cart-shopping ca-rt"></i>(0)
        </a>
        <i className="fa-solid fa-right-from-bracket lo-ut"></i>
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
          <i className="fa-solid fa-cart-plus"></i>&nbsp;&nbsp;(0)
        </a>
        <i className="fa-solid fa-right-from-bracket lo-ut"></i>
      </div>
    </header>
  );
};

export default Navbar;
