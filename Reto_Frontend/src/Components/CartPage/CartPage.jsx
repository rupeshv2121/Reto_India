import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";

import {
  incrementQuantity,
  decrementQuantity,
  removeItemCompletely,
} from "../../Redux/CartSlice";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemoveCompletely = (id) => {
    dispatch(removeItemCompletely(id));
  };

  const handleContinueShopping = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="bg-gray-100 py-10 min-h-screen background">
      <div className="container mx-auto px-3 md:px-4">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Shopping Cart
        </h2>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-xl p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col gap-6 items-center">
                <p className="text-center text-xl text-gray-600">
                  Your cart is empty
                </p>
                <button
                    onClick={handleContinueShopping}
                    className="text-black  text-sm font-medium md:mb-0 mb-3"
                  >
                  <p className="background px-4 py-3 rounded-md  border-[1px] border-orange-200 hover:scale-105 duration-100 ease-in">
                    
                    Continue Shopping
                    </p>
                  </button>
              </div>
            ) : (
              <>
                <table className="w-full border-collapse">
                  <thead className="max-md:hidden">
                    <tr className="border-b text-left">
                      <th className="p-2">Product Details</th>
                      <th className="p-2">Quantity</th>
                      <th className="p-2">Price</th>
                      <th className="p-2">Total</th>
                      <th className="p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b max-md:flex max-md:flex-col"
                      >
                        <td className="md:px-4 py-4 px-0  flex items-center max-md:w-full max-md:justify-between">
                          <img
                            src={item.src}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md mr-4"
                          />
                          <div>
                            <h3 className="text-sm font-medium text-gray-800">
                              {item.name}
                            </h3>
                            <p>
                              <button
                                onClick={() => handleRemoveCompletely(item.id)}
                                className="text-gray-500 hover:underline hover:text-red-600 text-sm"
                              >
                                Remove
                              </button>
                            </p>
                          </div>
                        </td>
                        <td className="md:px-2 py-2 px-0 text-sm text-gray-700">
                          <button
                            onClick={() => handleDecrement(item.id)}
                            className="hover:bg-gray-200 rounded-md text-black font-semibold py-1 px-2 text-lg mr-2"
                          >
                            -
                          </button>
                          <span className="text-sm  border-[1px] border-gray-400 px-3 py-2 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleIncrement(item.id)}
                            className=" hover:bg-gray-200 rounded-md text-black font-semibold py-1 px-2 text-lg ml-2"
                          >
                            +
                          </button>
                        </td>
                        <td className="p-2 text-sm text-gray-700">
                          ${item.price}
                        </td>
                        <td className="p-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-6 md:flex md:justify-between text-center">
                   <button
                                                          onClick={handleContinueShopping}
                                                          className="text-blue-500 hover:underline text-sm font-medium md:mb-0 mb-3 flex justify-center items-center gap-3"
                                                          >
                                                              <FaArrowLeftLong/>
                                                          Continue Shopping
                                                      </button>
                  <div className="md:text-right">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Total Items: <span>{totalQuantity}</span>
                    </h3>
                    <h3 className="text-sm font-semibold text-gray-800">
                      Total Price: <span>${totalPrice.toFixed(2)}</span>
                    </h3>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-slate-100 max-h-fit rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Order Summary
            </h3>
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Items</span>
                <span className="text-sm font-medium text-gray-800">
                  {totalQuantity}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  Shipping
                </span>
                <span className="text-sm font-medium text-gray-800">$5.00</span>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="promo-code"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Promo Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="promo-code"
                  className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm"
                  placeholder="Enter promo code"
                />
                <button className="bg-red-500 text-white px-4 py-2 rounded-r-md hover:bg-red-600">
                  Apply
                </button>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  Total Cost
                </span>
                <span className="text-sm font-medium text-gray-800">
                  ${(totalPrice + 5).toFixed(2)}
                </span>
              </div>
              <button className="w-full background text-black hover:scale-105 duration-200 ease-linear border-[1px] border-orange-200 py-2 rounded-md mt-4">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
