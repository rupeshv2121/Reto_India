import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import AboutUs from "./components/About/AboutUs.jsx";
import CartPage from "./components/CartPage/CartPage";
import CheckoutPage from "./components/CheckOutPage/CheckoutPage";
import Contact from "./components/Contact/Contact";
import LandingPage from "./components/LandingPage/LandingPage";
import MainLayout from "./components/Layout/MainLayout";
import Login from "./components/Login_Signup_Page/Login";
import Signup from "./components/Login_Signup_Page/Signup";
import OrderPage from "./components/OrderPage/OrderPage.jsx";
import CardPaymentTemplate from "./components/PaymentPage/CardPaymentTemplate.jsx";
import GPayPaymentTemplate from "./components/PaymentPage/GPayPaymentTemplate.jsx";
import PaymentPage from "./components/PaymentPage/MainPaymentPage.jsx";
import PhonepePaymentTemplate from "./components/PaymentPage/PhonePe.jsx";
import UPIPaymentTemplate from "./components/PaymentPage/Upi.jsx";
import Product from "./components/ProductPage/ProductPage.jsx";
import ProductView from "./components/ProductView/ProductView";
import TrackingPage from "./components/Track_order/TrackingPage";
import SuccessPage from "./components/successPage/Success.jsx";

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
        path: "/about",
        element: <AboutUs />,
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

      {
        path: "/payment",
        element: <PaymentPage />,
      },
      {
        path: "/order/:orderId/success",
        element: <SuccessPage />,
      },
      {
        path: "/gpayPayment",
        element: <GPayPaymentTemplate />,
      },
      {
        path: "/phonepe",
        element: <PhonepePaymentTemplate />,
      },
      {
        path: "/upipay",
        element: <UPIPaymentTemplate />,
      },
      {
        path: "/card",
        element: <CardPaymentTemplate />,
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
