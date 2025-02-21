import React from "react";
import ProductPage from "./Carousel/FiveProduct";
import MainCarousel from "./Carousel/ThreeProduct";

const Home = () => {
  return (
    <div
      className="background py-12 bg-cover bg-no-repeat bg-center min-h-lvh space-y-10 "
      style={{
        background: "linear-gradient(462deg, #fdf2e3 51%, #ffd39c 70%)",
      }}
    >
      {/* <h2 className="md:text-2xl text-black text-center font-semibold"></h2> */}
      <MainCarousel />
      {/* <h2 className="md:text-2xl text-black text-center font-semibold"></h2> */}
      <ProductPage />
    </div>
  );
};

export default Home;
