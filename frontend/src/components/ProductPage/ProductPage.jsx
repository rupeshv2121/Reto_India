import React, { useState, useEffect } from "react";
import ProductPage from "./Carousel/FiveProduct";
import { CiSearch } from "react-icons/ci";
import MainCarousel from "./Carousel/ThreeProduct";
import slider1 from "../../assets/slider1.png";
import slider2 from "../../assets/slider2.png";
import slider3 from "../../assets/slider3.png";

const Home = () => {
  const Trending = [
    { src: slider1, name: "Product 1", price: 100, id: 1 },
    { src: slider2, name: "Product 2", price: 150, id: 2 },
    { src: slider3, name: "Product 3", price: 200, id: 3 },
    { src: slider1, name: "Product 4", price: 100, id: 4 },
    { src: slider2, name: "Product 5", price: 150, id: 5 },
    { src: slider3, name: "Product 3", price: 200, id: 6 },
    { src: slider2, name: "Product 2", price: 100, id: 4 },
    { src: slider2, name: "Product 2", price: 150, id: 5 },
    
  ];

  const Products = [
    { src: slider1, name: "Product 1", price: 100, id: 1 },
    { src: slider2, name: "Product 2", price: 100, id: 2 },
    { src: slider3, name: "Product 3", price: 100, id: 3 },
    { src: slider1, name: "Product 4", price: 100, id: 4 },
    { src: slider2, name: "Product 5", price: 100, id: 5 },
    { src: slider3, name: "Product 3", price: 100, id: 6 },
    
    { src: slider1, name: "Product 2", price: 100, id: 4 },
    { src: slider2, name: "Product 2", price: 100, id: 5 },
   
    // Additional products can be added
  ];

  const [searchItems, setSearchItems] = useState("");
  const [filterTrending, setFilterTrending] = useState(Trending);
  const [filterProduct, setFilterProduct] = useState(Products);

  useEffect(() => {
    const lowercasedSearch = searchItems.trim().toLowerCase();

    if (!lowercasedSearch) {
      setFilterProduct(Products);
      setFilterTrending(Trending);
      return;
    }

    const filteredProducts = Products.filter((item) =>
      item.name.toLowerCase().includes(lowercasedSearch)
    );

    const filteredTrending = Trending.filter((item) =>
      item.name.toLowerCase().includes(lowercasedSearch)
    );
    if (filterProduct.length === 0 || filteredTrending.length === 0) {
      alert("No Product Found")
    } else {
      setFilterProduct(filteredProducts.length ? filteredProducts : Products);
      setFilterTrending(filteredTrending.length ? filteredTrending : Trending);
    }

  
  }, [searchItems]);

  return (
    <div
      className="background pt-[30px] md:pt-[50px] lg:pt-[30px] bg-cover bg-no-repeat bg-center min-h-lvh space-y-10 custom-padding"
      style={{
        background: "linear-gradient(462deg, #fdf2e3 51%, #ffd39c 70%)",
      }}
    >
      {/* Search Bar */}
      <div className="w-full flex justify-center items-center">
        <div className="w-full sm:w-4/5 md:w-2/3 lg:w-2/5 flex px-[30px] md:pt-0 relative justify-center">
          <input
            type="text"
            value={searchItems}
            onChange={(e) => setSearchItems(e.target.value)}
            className="p-3 w-full rounded-2xl shadow-2xl border-[1px] border-black"
            placeholder="Search for Products"
          />
          <div className="absolute flex right-10 top-4 text-2xl">
            <CiSearch />
          </div>

        </div>
      </div>

      {/* Product Carousels */}
      <MainCarousel trendingProduct={filterTrending} />
      <ProductPage ProductItems={filterProduct} />
    </div>
  );
};

export default Home;
