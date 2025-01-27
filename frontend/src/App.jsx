import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import CheckoutPage from "./components/CheckOutPage/CheckoutPage";
import Contact from "./components/Contact/Contact";
import LandingPage from "./components/LandingPage/LandingPage";
import CartPage from "./components/CartPage/CartPage";
import Product from "./components/ProductPage/ProductPage.jsx";
// import LandingPageSm from "./components/LandingPageSm/LandingPageSm";
import MainLayout from "./components/Layout/MainLayout";
import Login from "./components/Login_Signup_Page/Login";
import Signup from "./components/Login_Signup_Page/Signup";
<<<<<<< HEAD
<<<<<<< HEAD
import ProductView from "./components/ProductView/ProductView";
=======
=======
>>>>>>> 8de5bf848e10ff1ab746314d566ab08ebeeb9477
// import ProductView from "./components/Product/Product";
import ProductView from "./components/ProductView/ProductView.jsx";
>>>>>>> 8de5bf8 (some other changes)
import TrackingPage from "./components/Track_order/TrackingPage";
import OrderPage from "./components/OrderPage/OrderPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "product/:productId",
        element: <ProductView />,
      },
      {
        path: "/tracking",
        element: <TrackingPage />,
      },
      {
        path: "/cartPage",
        element: <CartPage />,
      },
      {
        path: "/auth",
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
        ],
      },
      {
        path: "/orderPage",
        element: <OrderPage />,
      },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
