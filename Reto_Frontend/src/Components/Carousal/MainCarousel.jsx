import React from "react";
import Slider from "react-slick";
import slider1 from "../../assets/slider1.png";
import slider2 from "../../assets/slider2.png";
import slider3 from "../../assets/slider3.png";
import { IoCartOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";

const MainCarousel = () => {
  const images = [
    { src: slider1, name: "Product 1", price: "$100" },
    { src: slider2, name: "Product 2", price: "$150" },
    { src: slider3, name: "Product 3", price: "$200" },
    { src: slider1, name: "Product 4", price: "$100" },
    { src: slider2, name: "Product 5", price: "$150" },
    { src: slider3, name: "Product 6", price: "$200" },
    { src: slider1, name: "Product 7", price: "$100" },
    { src: slider2, name: "Product 8", price: "$150" },
    { src: slider3, name: "Product 9", price: "$200" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="w-full lg:max-w-[50%] mx-auto p-5">
      <Slider {...settings}>
        {images.map((image, index) => (
          <>
            <div
              key={index}
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
                  <IoCartOutline className="cursor-pointer w-7 h-7" />
                  <IoMdHeartEmpty className="cursor-pointer w-7 h-7" />
                </div>
              </div>

              {/* Rating (Visible on Hover) */}
              <div className="absolute top-3 right-3 bg-orange-300  px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-90 transition-opacity duration-300 ease-in-out flex items-center gap-1">
                4.5 <AiFillStar/>                
              </div>
            </div>
            {/* Name and Price */}
            <div className="text-center mt-2">
              <h3 className="text-lg font-semibold">{image.name}</h3>
              <p className="text-sm text-gray-600">{image.price}</p>
            </div>
          </>
        ))}
      </Slider>
    </div>
  );
}

export default MainCarousel;
