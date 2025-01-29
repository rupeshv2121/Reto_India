import React from "react";
import { useDispatch, useSelector } from "react-redux";

const UPIPaymentTemplate = () => {
    const handlePayment = () => {
        alert("Payment initiated via UPI!");
    };
    const cartItems = useSelector((state) => state.cart.items);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen flex items-center justify-center background p-4">
            <div className="max-w-md w-full shadow-lg rounded-2xl bg-white">
                <div className="p-6">
                    <div className="w-full justify-center items-center mb-3 flex">
                        <img src="https://logodix.com/logo/1763566.png" alt="" className="h-10" />
                    </div>
                    <p className="text-sm text-gray-600 mb-6 text-center">
                        Enter the details below to proceed with your payment.
                    </p>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                UPI ID
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your UPI ID"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Amount
                            </label>
                            <input
                                type="number"
                                value={totalPrice}
                                readOnly
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-700 mb-2">Or scan the QR code below:</p>
                            <div className="flex justify-center items-center border rounded-lg p-4 bg-gray-50">
                                <img
                                    src="https://tse1.mm.bing.net/th?id=OIP.XddA3we5txwZAP4fAJtYRQHaHa&pid=Api&P=0&h=180"
                                    alt="GPay QR Code"
                                    className="h-32 w-32"
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handlePayment}
                        className="w-full mt-6 background  py-2 px-4 rounded-lg hover:bg-green-700"
                    >
                        Pay with UPI
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UPIPaymentTemplate;
