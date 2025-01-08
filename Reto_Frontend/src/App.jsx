import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Router from "./Router/Router";
import Home from "./Components/Home/Home";
import CartPage from "./Components/CartPage/CartPage";
import OrderPage from "./Components/MyOrder/OrderPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Router />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/order",
          element:<OrderPage/>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
