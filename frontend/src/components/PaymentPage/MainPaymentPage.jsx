import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PaymentPage() {
    const [selectpaymentMethod, setSelectPaymentMethod] = useState(null);
    const Nevigate = useNavigate();

    const handlePaymentMethod = (id) => {
        setSelectPaymentMethod(id);
    };
    const handleOrderButton = () => {
        if (selectpaymentMethod) {
            Nevigate(`/${selectpaymentMethod}`);
        } else {
            alert("Please Select Payment Method");
        }
    };

    const cartItems = useSelector((state) => state.cart.items);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const dispatch = useDispatch();
    return (
        <div className="background w-full min-h-screen flex justify-center items-center  p-1 md:p-5">
            {/* Main Container */}
            <div className="flex flex-wrap lg:flex-nowrap w-full lg:w-4/5 xl:w-3/5 gap-5 bg-white/20 rounded-lg shadow-2xl border border-white/30 p-0 mt-10 md:mt-5 lg:mt-0 md:p-5">
                {/* Payment Method Section */}
                <div className="w-full lg:w-1/2 flex flex-col gap-3 p-0 md:p-2">
                    <h1 className="font-semibold text-lg">Payment Method</h1>
                    <div className="w-full border-2 border-red-400 p-2 flex flex-col gap-3 rounded-md">
                        {/* Payment Options */}
                        <div
                            className={`w-full p-1 px-2 py-3 pr-2 md:pr-5 flex justify-between items-center cursor-pointer rounded-md ${selectpaymentMethod === "card"
                                ? "border-4 border-green-600"
                                : "border-gray-400 border-[1px]"
                                }`}
                            onClick={() => handlePaymentMethod("card")}
                        >
                            <div className="flex gap-1 md:gap-4 items-center">
                                <img
                                    src="https://cdn3.iconfinder.com/data/icons/banking-flat/614/933_-_Credit_card-512.png"
                                    alt=""
                                    className="w-16 h-12"
                                />
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold">Pay with Card</span>
                                    <div className="flex gap-1 items-center">
                                        <img
                                            src="https://logos-world.net/wp-content/uploads/2020/09/Mastercard-Logo.png"
                                            alt=""
                                            className="w-7 h-5"
                                        />
                                        <img
                                            src="https://tse3.mm.bing.net/th?id=OIP.Dn3g8D_KAysK68B4WlPeOQHaC0&pid=Api&P=0&h=180"
                                            alt=""
                                            className="w-7 h-5"
                                        />
                                        <img
                                            src="https://cdn.iconscout.com/icon/free/png-256/rupay-credit-debit-bank-transaction-card-32274.png"
                                            alt=""
                                            className="w-8 h-8"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="text-slate-600">No Fee</div>
                        </div>

                        {/* Upi Option */}
                        <div
                            className={`w-full px-2 py-3 pr-2 md:pr-5 flex justify-between items-center cursor-pointer rounded-md ${selectpaymentMethod === "upipay"
                                ? "border-4 border-green-600"
                                : "border-gray-400 border-[1px]"
                                }`}
                            onClick={() => handlePaymentMethod("upipay")}
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://i.postimg.cc/ZqS4c98s/12-123369-bhim-upi-logo-png-transparent-png-removebg-preview.png"
                                    alt=""
                                    className="w-16 h-12"
                                />
                                <p className="text-slate-600">Pay with UPI</p>
                            </div>
                            <div className="text-slate-600">No Fee</div>
                        </div>

                        {/* gpay Option */}
                        <div
                            className={`w-full px-2 py-3 pr-2 md:pr-5 flex justify-between cursor-pointer items-center rounded-md ${selectpaymentMethod === "gpayPayment"
                                ? "border-4 border-green-600"
                                : "border-gray-400 border-[1px]"
                                }`}
                            onClick={() => handlePaymentMethod("gpayPayment")}
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://fullforms.com/images/image/GPay_24481.png"
                                    alt=""
                                    className="w-16 h-12"
                                />
                                <p className="text-slate-600">Pay with GPay</p>
                            </div>
                            <div className="text-slate-600">No Fee</div>
                        </div>

                        {/* PhonePe Option */}
                        <div
                            className={`w-full px-2 py-3 pr-2 md:pr-5 flex justify-between items-center cursor-pointer rounded-md ${selectpaymentMethod === "phonepe"
                                ? "border-4 border-green-600"
                                : "border-gray-400 border-[1px]"
                                }`}
                            onClick={() => handlePaymentMethod("phonepe")}
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://www.vhv.rs/dpng/f/411-4117619_phone-logo-png.png"
                                    alt=""
                                    className="w-16 h-12"
                                />
                                <p className="text-slate-600">Pay with PhonePe</p>
                            </div>
                            <div className="text-slate-600">No Fee</div>
                        </div>
                    </div>
                    <button
                        className="p-2 text-white font-medium bg-red-400 rounded-md"
                        onClick={handleOrderButton}
                    >
                        Order and Pay
                    </button>
                </div>

                {/* Order Summary Section */}
                <div className="w-full lg:w-1/2 flex flex-col gap-3 p-2">
                    <h1 className="font-semibold text-lg">Order Summary</h1>
                    <div className="border-gray-400 border-[1px] p-2 rounded-md">
                        {/* Cart Items */}
                        {cartItems.map((item) => (
                            <div
                                className="flex items-center p-3 w-full border-b border-gray-300"
                                key={item.id}
                            >
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex gap-3 items-center">
                                        <img
                                            src={item.src}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover"
                                        />
                                        <div>{item.name}</div>
                                    </div>
                                    <div>x{item.quantity}</div>
                                    <div>${item.price} +5</div>
                                </div>
                            </div>
                        ))}

                        {/* Summary Details */}
                        <div className="border-t-2 border-gray-400 mt-3 pt-3 flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <h1>SUB TOTAL</h1>
                                <p>${totalPrice}.00</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <h1>DELIVERY</h1>
                                <p>$5.00</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <h1>DISCOUNT</h1>
                                <p>$0.00</p>
                            </div>
                            <div className="flex justify-between items-center font-semibold">
                                <h1>TOTAL</h1>
                                <p>${totalPrice + 5}.00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;
