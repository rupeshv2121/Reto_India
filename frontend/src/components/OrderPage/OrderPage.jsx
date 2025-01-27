import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate

const OrderPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate

  const handleContinueShopping = () => {
    navigate("/product"); // Redirect to the home page
  };

  return (
    <div className="py-10 min-h-screen background">
      <div className="container mx-auto px-3 md:px-4">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center md:text-start">My Orders</h2>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 order-2 lg:order-1 bg-white rounded-lg flex justify-center items-center shadow-xl p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col gap-6 items-center">
                <p className="text-center text-4xl max-md:text-2xl text-gray-600">No order</p>
                <button
                  onClick={handleContinueShopping}
                  className="text-black  text-sm font-medium md:mb-0 mb-3"
                >
                  <NavLink to="/product" className="background px-4 py-3 rounded-md  border-[1px] border-orange-200 hover:bg-orange-400 hover:scale-105 duration-200 ease-linear">
                    Continue Shopping
                  </NavLink>
                </button>
              </div>
            ) : (
              <div className="w-full">
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
                          </div>
                        </td>
                        <td className="md:px-2 py-2 px-0 text-sm text-gray-700">
                          <span className="text-sm  px-3 py-2 text-center">
                            Qty: {item.quantity}
                          </span>
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
                <div className="mt-6 md:flex md:justify-between text-center ">
                  <button
                    onClick={handleContinueShopping}
                    className="text-blue-500 hover:underline text-sm font-medium md:mb-0 mb-3 flex justify-center items-center gap-3"
                  >
                    <FaArrowLeftLong />
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-slate-200 order-1 lg:oder-2 rounded-lg shadow p-6">
            <div className="pb-4 mb-4">
              <div className="flex justify-between items-center pt-2 mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Order ID:
                </span>
                <span className="text-sm font-medium text-gray-800">
                  #2312343
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 mb-2 border-t-[1px] border-gray-300 ">
                <span className="text-sm font-medium text-gray-600">
                  Delivery Status:
                </span>
                <span className="text-sm font-medium text-gray-800">
                  Delivered
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 mb-2 border-t-[1px] border-gray-300 ">
                <span className="text-sm font-medium text-gray-600">
                  Payment Method:
                </span>
                <span className="text-sm font-medium text-gray-800">
                  Online
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 mb-2 border-t-[1px] border-gray-300 ">
                <span className="text-sm font-medium text-gray-600">Date:</span>
                <span className="text-sm font-medium text-gray-800">
                  01/01/2025
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 mb-2 border-t-[1px] border-gray-300 ">
                <span className="text-sm font-medium text-gray-600">
                  Delivery Address:
                </span>
                <span className="text-sm text-right font-medium text-gray-800">
                  247,Aagman Society, Surat
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 mb-2 border-t-[1px] border-gray-300">
                <span className="text-sm font-medium text-gray-600">
                  Total Items:
                </span>
                <span className="text-sm font-medium text-gray-800">
                  {totalQuantity}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 mb-2 border-t-[1px] border-gray-300 ">
                <span className="text-sm font-medium text-gray-600">
                  Total Price:
                </span>
                <span className="text-sm font-medium text-gray-800">
                  $ {totalPrice}.00
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t-[1px] border-gray-300 ">
                <span className="text-sm font-medium text-gray-600">
                  Shipping Charge:
                </span>
                <span className="text-sm font-medium text-gray-800">
                  $ 5.00
                </span>
              </div>
            </div>

            <div className="border-t-[1px] border-gray-400 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  Total Cost:
                </span>
                <span className="text-sm font-medium text-gray-800">
                  $ {(totalPrice + 5).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
