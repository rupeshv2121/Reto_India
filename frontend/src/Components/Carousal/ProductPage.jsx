import React from "react";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/CartSlice"; // Adjust the import based on your file structure
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider1 from "../../assets/slider1.png";
import slider2 from "../../assets/slider2.png";
import slider3 from "../../assets/slider3.png";
import { IoCartOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";

const ProductPage = () => {
  
  const dispatch = useDispatch();

  const images = [
    { src: slider1, name: "Product 1", price: 100, id: 1 },
    { src: slider2, name: "Product 2", price: 150, id: 2 },
    { src: slider3, name: "Product 3", price: 200, id: 3 },
    { src: slider1, name: "Product 4", price: 100, id: 4 },
    { src: slider2, name: "Product 5", price: 150, id: 5 },
    { src: slider3, name: "Product 6", price: 200, id: 6 },
    { src: slider1, name: "Product 7", price: 100, id: 7 },
    { src: slider2, name: "Product 8", price: 150, id: 8 },
    { src: slider3, name: "Product 9", price: 200, id: 9 },
    { src: slider1, name: "Product 10", price: 100, id: 10 },
    { src: slider2, name: "Product 11", price: 150, id: 11 },
    { src: slider3, name: "Product 12", price: 200, id: 12 },
    { src: slider1, name: "Product 13", price: 100, id: 13 },
    { src: slider2, name: "Product 14", price: 150, id: 14 },
    { src: slider3, name: "Product 15", price: 200, id: 15 },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
    console.log("Product added to cart:", product);
    dispatch(addToCart(product));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full lg:w-2/3 bg-white/20 rounded-lg shadow-2xl border border-white/30 p-6">
        <h2 className="text-2xl font-bold font-bricolage text-center mb-8">
          Our Products
        </h2>
        <Slider {...settings}>
          {images.map((image , index) => (
            <>
              <div
                key={index}
                className="p-[5px] overflow-hidden w-full mx-auto cursor-pointer rounded-xl relative group"
              >
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.name}
                  className="h-full w-full mx-auto object-cover rounded-xl hover:scale-105 duration-300 ease-linear"
                />

                {/* Hover Effects */}
                <div className="absolute w-full h-16 text-black bottom-0 left-0 bg-orange-300 opacity-90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex items-center justify-between px-3">
                  <button className="py-2 font-semibold">Buy Now</button>
                  <div className="flex gap-2">
                    <IoCartOutline
                      className="cursor-pointer w-7 h-7"
                      onClick={() => handleAddToCart(image)}
                    />
                    <IoMdHeartEmpty className="cursor-pointer w-7 h-7" />
                  </div>
                </div>

                {/* Rating (Visible on Hover) */}
                <div className="absolute top-3 right-3 bg-orange-300 px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-90 transition-opacity duration-300 ease-in-out flex items-center gap-1">
                  4.5 <AiFillStar />
                </div>
              </div>
              <div className="text-center mt-2">
                <h3 className="text-lg font-semibold">{image.name}</h3>
                <p className="text-md text-gray-600">${image.price}</p>
              </div>
            </>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductPage;
