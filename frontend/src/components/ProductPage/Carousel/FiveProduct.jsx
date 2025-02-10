import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { addToCart } from "../../../Redux/CartSlice";

const ProductPage = ({ ProductItems = [] }) => {
  const dispatch = useDispatch();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldShowSlider =
    (screenWidth <= 768 && ProductItems.length >= 2) ||
    (screenWidth > 768 && ProductItems.length >= 3);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: Math.min(3, ProductItems.length),
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, ProductItems.length),
          slidesToScroll: 2,
          dots: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full lg:w-[90%] bg-white/20 rounded-lg shadow-2xl border border-white/30 p-6">
        <h2 className="text-2xl font-bold font-bricolage text-center mb-8">Our Products</h2>

        {shouldShowSlider ? (
          <Slider {...settings}>
            {ProductItems.map((product, index) => (
              <div key={`${product.name}-${index}`} className="flex flex-col items-center">
                <div className="p-2 overflow-hidden cursor-pointer rounded-xl relative group">
                  <NavLink to={`/product/${product.productId}`}>
                    <img
                      src={product.src}
                      alt={product.name}
                      className="h-full w-full object-cover rounded-xl group-hover:scale-105 transition duration-300 ease-in-out"
                    />
                  </NavLink>
                  <div className="absolute w-full h-16 text-black bottom-0 left-0 bg-orange-300 opacity-90 transform translate-y-full group-hover:translate-y-0 transition duration-500 ease-in-out flex items-center justify-between px-3">
                    <button className="py-2 font-semibold">Buy Now</button>
                    <div className="flex gap-2">
                      <IoEyeOutline className="cursor-pointer w-7 h-7" />
                      <IoCartOutline className="cursor-pointer w-7 h-7" onClick={() => handleAddToCart(product)} />
                      <IoMdHeartEmpty className="cursor-pointer w-7 h-7" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-orange-300 px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-90 transition duration-300 ease-in-out flex items-center gap-1">
                    4.5 <AiFillStar />
                  </div>
                </div>
                <div className="text-center mt-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-md text-gray-600">${product.price}</p>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="flex justify-center items-center">
              {ProductItems.map((product, index) => (
                <div key={`${product.name}-${index}`} className="flex flex-col items-center">
                  <div className="p-2 overflow-hidden  cursor-pointer rounded-xl relative group">
                    <NavLink to={`/product/${product.productId}`}>
                      <img
                        src={product.src}
                        alt={product.name}
                        className="h-full w-full object-cover rounded-xl group-hover:scale-105 transition duration-300 ease-in-out"
                      />
                    </NavLink>
                    <div className="absolute w-full h-16 text-black bottom-0 left-0 bg-orange-300 opacity-90 transform translate-y-full group-hover:translate-y-0 transition duration-500 ease-in-out flex items-center justify-between px-3">
                      <button className="py-2 font-semibold">Buy Now</button>
                      <div className="flex gap-2">
                        <IoEyeOutline className="cursor-pointer w-7 h-7" />
                        <IoCartOutline className="cursor-pointer w-7 h-7" onClick={() => handleAddToCart(product)} />
                        <IoMdHeartEmpty className="cursor-pointer w-7 h-7" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-orange-300 px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-90 transition duration-300 ease-in-out flex items-center gap-1">
                      4.5 <AiFillStar />
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-md text-gray-600">${product.price}</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
