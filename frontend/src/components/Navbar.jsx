// import "../../../public/js/navBar";

const Navbar = () => {
  return (
    <>
      {/* <header> */}
      <div className="logo">
        <img src="./img/LogoWoBcg.png" alt="Logo" />
      </div>

      {/* <!-- Desktop Navigation --> */}
      <nav>
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#about">About</a>
        <a href="#login">
          <span className="lo-gin">
            <i className="fa-solid fa-user"></i>Pooja Naitam
          </span>
        </a>
        <a href="#contact">Contact Us</a>
        <a href="#tracker">Tracker</a>
        <a href="#cart">
          <span>
            <i className="fa-solid fa-cart-plus"></i>(0)
          </span>
        </a>
        <a href="#logout">
          <i className="fa-solid fa-right-from-bracket"></i>
        </a>
      </nav>

      {/* <!-- Mobile Menu Toggle --> */}
      {/* <div className="menu-toggle">
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
        <img
          id="close-icon"
          src="./img/close.png"
          style={"display: none;"}
          width="{24px}"
          height="24px"
        />
      </div> */}

      {/* <!-- Mobile Menu --> */}
      {/* <div className="mobile-menu" id="mobileMenu" style="display: none;">
        <a href="#home">
          <i className="fa-solid fa-house ho-me" style="color: #f58634;"></i>
          &nbsp;Home
        </a>
        <a href="#products">
          <i
            className="fa-solid fa-cart-shopping pro-dct"
            style="color: #f58634;"
          ></i>
          &nbsp;Products
        </a>
        <a href="#about">
          <i className="fa-solid fa-book ab-ut" style="color: #f58634;"></i>
          &nbsp;About
        </a>
        <a href="#login">
          <i className="fa-solid fa-user lo-gin"></i>&nbsp;Login
        </a>
        <a href="#contact">
          <i className="fa-solid fa-phone con-tct" style="color: #f58634;"></i>
          &nbsp;Contact Us
        </a>
        <a href="#tracker">
          <i
            className="fa-solid fa-location-dot trc-ker"
            style="color: #f58634;"
          ></i>
          &nbsp;Tracker
        </a>

        <a href="#products">
          <i className="fa-solid fa-cart-plus" style="color: #f58634;"></i>
          &nbsp;&nbsp;(0)
        </a>
        <i
          className="fa-solid fa-right-from-bracket lo-ut"
          style="color: #f58634;"
        ></i>
      </div> */}
      {/* </header> */}
    </>
  );
};

export default Navbar;
