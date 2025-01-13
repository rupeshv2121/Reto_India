import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import CheckoutPage from "./components/CheckOutPage/CheckoutPage";
import Contact from "./components/Contact/Contact";
import MainLayout from "./components/Layout/MainLayout";
import Product from "./components/Product/Product";
import TrackingPage from "./components/Track_order/TrackingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
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
        path: "/tracking",
        element: <TrackingPage />,
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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
