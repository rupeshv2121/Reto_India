import { Outlet, useLocation } from "react-router";
import AuthNavbar from "../Login_Signup_Page/AuthNavbar";
import Navbar from "../Navbar.jsx";

function MainLayout() {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/auth/login" || location.pathname === "/auth/signup";
  return (
    <>
      {isAuthRoute ? (
        <nav
          className="auth-navbar"
          style={{ backgroundColor: "rgb(255, 218, 170)" }}
        >
          <AuthNavbar />
        </nav>
      ) : (
        <nav className="main-navbar">
          <Navbar />
        </nav>
      )}
      <Outlet />
    </>
  );
}

export default MainLayout;
