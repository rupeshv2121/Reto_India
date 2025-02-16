<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React from "react";
>>>>>>> 507c61d99f158c1109f18522ff109962b1fd0b6a
import { AiFillStar } from "react-icons/ai";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
<<<<<<< HEAD
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
=======
import { useNavigate } from "react-router";
import Slider from "react-slick";
import { toast, ToastContainer } from "react-toastify";
import slider1 from "../../../assets/slider1.png";
import slider2 from "../../../assets/slider2.png";
import slider3 from "../../../assets/slider3.png";
>>>>>>> 507c61d99f158c1109f18522ff109962b1fd0b6a
import { addToCart } from "../../../Redux/CartSlice";

const MainCarousel = ({ trendingProduct = [] }) => {
  const dispatch = useDispatch();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldShowSlider =
    (screenWidth <= 768 && trendingProduct.length >= 2) ||
    (screenWidth > 768 && trendingProduct.length >= 3);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: Math.min(3, trendingProduct.length),
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, trendingProduct.length),
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

<<<<<<< HEAD
  const handleAddToCart = (product) => {
=======
  const navigate = useNavigate();
  const handleAddToCart = (product) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setTimeout(() => {
        navigate("/auth/signup");
      });
      return;
    }
    console.log("Product added to cart:", product);
    toast("Item Added Successfully");
>>>>>>> 507c61d99f158c1109f18522ff109962b1fd0b6a
    dispatch(addToCart(product));
  };

  return (
<<<<<<< HEAD
    <div className="flex items-center justify-center">
      <div className="w-full lg:w-[90%] bg-white/20 rounded-lg shadow-2xl border border-white/30 p-6">
        <h2 className="text-2xl font-bold font-bricolage text-center mb-8">Trending Products</h2>

        {shouldShowSlider ? (
          <Slider {...settings}>
            {trendingProduct.map((product, index) => (
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
=======
    <div className="w-full bg-white/20 rounded-lg shadow-2xl lg:max-w-[80%] mx-auto p-5">
      <ToastContainer />
      <h1 className="md:text-3xl mb-4 text-black text-center font-semibold">
        Trending Product
      </h1>
      <Slider {...settings}>
        {images.map((image, id) => (
          <>
            <div
              key={id}
              className="p-[5px] overflow-hidden w-full mx-auto cursor-pointer rounded-xl relative group"
            >
              {/* Image */}
              <img
                src={image.src}
                alt={image.name}
                className="h-full w-full mx-auto object-cover rounded-xl group-hover:scale-105 duration-300 ease-linear"
              />

              {/* Hover Effects */}
              <div className="absolute top-2 right-2 flex gap-2"></div>
              <div className="absolute w-full h-16 text-black bottom-0 left-0 bg-orange-300 opacity-90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex items-center justify-between px-3">
                <button className="py-2 font-semibold">Buy Now</button>
                <div className="flex gap-2">
                  <IoEyeOutline className="cursor-pointer w-7 h-7" />
                  <IoCartOutline
                    className="cursor-pointer w-7 h-7"
                    onClick={() => handleAddToCart(image)}
                  />
                  <IoMdHeartEmpty className="cursor-pointer w-7 h-7" />
>>>>>>> 507c61d99f158c1109f18522ff109962b1fd0b6a
                </div>
               
              </div>
<<<<<<< HEAD
            ))}
          </Slider>
        ) : (
          <div className="flex justify-center items-center">
            {trendingProduct.map((product, index) => (
              <div key={index} className="p-2 overflow-hidden  cursor-pointer rounded-xl relative group">
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
              
=======

              {/* Rating (Visible on Hover) */}
              <div className="absolute top-3 right-3 bg-orange-300  px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-90 transition-opacity duration-300 ease-in-out flex items-center gap-1">
                4.5 <AiFillStar />
>>>>>>> 507c61d99f158c1109f18522ff109962b1fd0b6a
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainCarousel;
