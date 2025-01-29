import React, { useState } from "react";

const CardPaymentTemplate = () => {
    const [cardType, setCardType] = useState("debit");

    const handlePayment = () => {
        alert(`Payment initiated via ${cardType === "debit" ? "Debit" : "Credit"} Card!`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center background p-4">
            <div className="max-w-md w-full shadow-lg rounded-2xl bg-white">
                <div className="p-6">
                    <div className="w-full justify-center items-center mb-3 flex">
                        <img src="http://www.hookedonpinball.com/uploads/2/7/1/9/27191227/credit-cards-logos_orig.png" alt="" className="h-10" />
                    </div>
                    <p className="text-sm text-gray-600 mb-6 text-center">
                        Enter the details below to proceed with your payment.
                    </p>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Card Type
                            </label>
                            <div className="flex space-x-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="cardType"
                                        value="debit"
                                        checked={cardType === "debit"}
                                        onChange={() => setCardType("debit")}
                                        className="form-radio text-blue-500 focus:ring-blue-500"
                                    />
                                    <span>Debit Card</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="cardType"
                                        value="credit"
                                        checked={cardType === "credit"}
                                        onChange={() => setCardType("credit")}
                                        className="form-radio text-blue-500 focus:ring-blue-500"
                                    />
                                    <span>Credit Card</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Card Number
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your card number"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date
                            </label>
                            <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                CVV
                            </label>
                            <input
                                type="password"
                                placeholder="Enter CVV"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handlePayment}
                        className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                        Pay with {cardType === "debit" ? "Debit" : "Credit"} Card
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardPaymentTemplate;
