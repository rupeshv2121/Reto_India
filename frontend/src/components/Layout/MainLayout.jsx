import { Provider } from "react-redux";
import { Outlet, useLocation } from "react-router";
import store from "../../Redux/Store.jsx";
import AuthNavbar from "../Login_Signup_Page/AuthNavbar";
import Navbar from "../Navbar.jsx";

function MainLayout() {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/auth/login" || location.pathname === "/auth/signup";
  return (
    <>
      <Provider store={store}>
        {isAuthRoute ? (
          <nav
            className="auth-navbar "
            style={{ backgroundColor: "rgb(255, 218, 170)" }}
          >
            <AuthNavbar />
          </nav>
        ) : (
          <nav className="main-navbar w-full">
            <Navbar />
          </nav>
        )}

        <Outlet />
      </Provider>
    </>
  );
}

export default MainLayout;
