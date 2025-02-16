import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const SuccessPage = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");

    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (orderId) {
            fetch(`http://localhost:5000/order-details/${orderId}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setOrderDetails({
                            orderId: data.data.orderId,
                            paymentId: data.data.paymentDetails?.paymentId || "N/A",
                            amount: data.data.amount,
                            method: data.data.paymentDetails?.method || "N/A",
                        });
                        setLoading(false);
                    } else {
                        setError("Order not found.");
                        setLoading(false);
                    }
                })
                .catch(() => {
                    setError("Failed to fetch details.");
                    setLoading(false);
                });
        }
    }, [orderId]);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-600">{error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br  p-6">
            <div className="bg-white shadow-xl rounded-lg p-8 text-center max-w-md">
                <div className="flex justify-center">
                    <CheckCircle className="text-green-600 w-16 h-16 animate-bounce" />
                </div>
                <h1 className="text-3xl font-bold text-green-700 mt-4">Payment Successful 🎉</h1>
                <p className="text-lg mt-2 text-gray-700">Thank you for your payment!</p>

                <div className="mt-6 text-left bg-gray-100 p-4 rounded-lg shadow">
                    <p className="text-gray-600 mt-2"><strong>Order ID:</strong> {orderDetails?.orderId}</p>
                    <p className="text-gray-600 mt-2"><strong>Payment ID:</strong> {orderDetails?.paymentId}</p>
                    <p className="text-gray-600 mt-2"><strong>Total Amount:</strong> ₹{orderDetails?.amount}</p>
                    <p className="text-gray-600 mt-2"><strong>Payment Method:</strong> {orderDetails?.method}</p>
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                    <a href="/" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
                        Go to Home
                    </a>
                   
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
