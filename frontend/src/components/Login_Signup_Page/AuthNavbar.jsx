// import "../../../public/js/navbar-login-signup";
import "./AuthNavbar.css";

const Navbar = () => {
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="logo">
          <a href="#">
            <img
              src="../../../public/img/LogoWoBcg.png"
              alt="Reto Logo"
              width="60px"
            />
          </a>
        </div>
        <div className="nav-menu">
          <div className="nav-group">
            <ul>
              <li>
                <a
                  className="nav-links ho-nv"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="nav-links"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                >
                  Our Services
                </a>
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
                <a
                  className="nav-links co-tc"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  className="nav-links tr-k"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                >
                  Track Order
                </a>
              </li>
              <li>
                <a
                  className="nav-links car-t"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                >
                  Cart Items
                </a>
              </li>
              <a className="nav-links lo-gin" href="/auth/login">
                Login
              </a>
              <li className="last">
                <a className="header-cta ct-abtn" href="/auth/signup">
                  GET STARTED
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="res-nav">
          <span>☰</span>
        </div>
        <div className="close-nav">
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
