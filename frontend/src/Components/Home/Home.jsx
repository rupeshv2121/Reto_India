import React from "react";
import ProductPage from "../Carousal/ProductPage";
import MainCarousel from "../Carousal/MainCarousel";

const Home = () => {
  return (
    <div className="background py-12 bg-cover bg-no-repeat bg-center min-h-lvh space-y-10 ">
      <h2 className="md:text-2xl text-black text-center font-semibold">
        3 Slides 3 Product Each
      </h2>
      <MainCarousel />
      <h2 className="md:text-2xl text-black text-center font-semibold">
        5 Slides 3 Product Each
      </h2>
      <ProductPage />
    </div>
  );
};

export default Home;
