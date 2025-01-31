import { Provider } from "react-redux";
import { Outlet } from "react-router";
import store from "../../Redux/Store.jsx";
import AuthNavbar from "../Login_Signup_Page/AuthNavbar";

function MainLayout() {
  // const location = useLocation();
  // const isAuthRoute =
  //   location.pathname === "/auth/login" || location.pathname === "/auth/signup";
  return (
    <>
      <Provider store={store}>
        {/* {isAuthRoute ? ( */}
        <nav
          className="auth-navbar "
          style={{
            background: "linear-gradient(462deg, #fdf2e3 51%, #ffd39c 70%)",
          }}
        >
          <AuthNavbar />
        </nav>

        {/* //   <nav className="main-navbar w-full">
        //     <Navbar />
        //   </nav> */}

        <Outlet />
      </Provider>
    </>
  );
}

export default MainLayout;
