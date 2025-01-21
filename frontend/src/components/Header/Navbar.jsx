import React from "react";
import { IoBagHandle } from "react-icons/io5";

import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function Navbar() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-end items-center p-3 md:py-5  md:px-10 fixed z-10">
      <div className="p-3 justify-center items-center ">
        <IoBagHandle
          className="md:text-3xl text-xl cursor-pointer"
          onClick={() => navigate("/order")}
        />
      </div>
      <div className="p-3 relative">
        <FaCartShopping
          className="md:text-3xl text-xl cursor-pointer"
          onClick={() => navigate("/cart")}
        />
        <p className="absolute -top-1 -right-1 text-md md:text-xl ">
          {totalQuantity}
        </p>
      </div>
    </div>
  );
}

export default Navbar;
