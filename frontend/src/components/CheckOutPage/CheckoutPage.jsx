import { useGSAP } from "@gsap/react";
import { useMutation } from "@tanstack/react-query";
import { gsap } from "gsap";
import { useState, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { checkout } from "../../API/api";
import "./CheckOutPage.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  useGSAP(() => {
    gsap.from(".details", { x: 400, opacity: 0, duration: 1, delay: 0.5 });
    gsap.from(".photo", { x: -200, duration: 1, opacity: 0, delay: 0.5 });
    gsap.from(".checkout-btn", { delay: 1, scale: 0 });
  });
 

  console.log("Cart Items in Checkout:", cartItems); // ✅ Debugging

  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice =
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 5; // Including shipping fee
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pinCode: "",
    cartItems: cartItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),

    cartItems: [],

  });

  const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const { mutate } = useMutation({
    mutationFn: checkout,
    onSuccess: () => {
      toast.success("Order placed successfully!");
      setUser({ name: "", phone: "", email: "", address: "", pinCode: "", cartItems: [] });
      setPopupVisible(false);
    },
    onError: () => {
      toast.error("Failed to place order. Please try again.");
      setPopupVisible(false);
    },
  });

  const handleOnClick = async (e) => {
    e.preventDefault();
    if (!user.name || !user.phone || !user.email || !user.address || !user.pinCode) {
      toast.warn("Enter details in all fields");
      return;
    }
    if (user.cartItems.length === 0) {
      toast.warn("Your cart is empty!");
      return;
    }

    setPopupVisible(true);

    try {
      const response = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, cartItems: user.cartItems }),
      });

      const order = await response.json();
      if (!response.ok || !order || !order.orderId) {
        throw new Error("Invalid order response");
      }

      const options = {
        key: "rzp_test_xxDux3IIvlBSYN",
        amount: order.amount,
        currency: order.currency,
        name: "Reto India",
        description: "Purchase Description",
        order_id: order.orderId,
        handler: async function (response) {
          console.log("verifying")
          const verifyResponse = await fetch("http://localhost:5000/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          console.log("verifying....")

          const verifyResult = await verifyResponse.json();

          setPopupVisible(false); // ✅ Move this here

          if (verifyResult.success) {
            console.log("verified")
            window.location.href = `http://localhost:5173/success?orderId=${verifyResult.orderId}`;
          } else {
            toast.error("Payment verification failed!");
          }
        }
        ,
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
          paylater: false,
        },
        theme: { color: "#FF8400" },
        modal: {
          ondismiss: function () {
            toast.warn("Payment Cancelled!");
            setPopupVisible(false);
          },
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      toast.error("Payment processing failed. Try again later.");
      setPopupVisible(false);
    }
  };

  return (
    <>
      {isPopupVisible && (
        <div className="checkout-popup">
          <div className="popup-content">
            <div className="spinner"></div>
            <div className="popup-text">Processing payment...</div>
          </div>
        </div>
      )}

      <div className="checkout-wrapper">
        <h1 className="checkout-heading">Checkout</h1>
        <ToastContainer />

        <div className="options">
          <p className="underline-circle"></p>
          <p className="line"></p>
          <p className="underline-circle"></p>
        </div>

        <div className="checkout-container">
          {/* Review Your Cart */}
          <div className="review">
            <h3>Review Your Cart Items</h3>
            <div className="review-photo">
              {user.cartItems && user.cartItems.length > 0 ? (
                <>
                  {user.cartItems.map((item, index) => (
                    <div key={index} className="items-info">
                      <p>{item.name}</p>
                      <p className="quantity">Quantity: {item.quantity}</p>
                      <p className="price">Price: ${item.price}</p>
                    </div>
                  ))}
                  <hr />
                  <div className="items-info">
                    <p>Total Price:</p>
                    <p>
                      $
                      {user.cartItems.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )}
                    </p>
                  </div>
                </>
              ) : (
                <h2 className="empty-cart">Cart is empty</h2>
              )}
            </div>
          </div>

          <div className="vertical-line"></div>

          {/* User Details Form */}
          <form>
            <div className="details">
              <h3>Enter Your Details</h3>
              <div className="input-details">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={user.name}
                  onChange={handleOnChange}
                  required
                />
                <input
                  type="number"
                  placeholder="Phone No"
                  name="phone"
                  value={user.phone}
                  onChange={handleOnChange}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={user.email}
                  onChange={handleOnChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Address Details"
                  name="address"
                  value={user.address}
                  onChange={handleOnChange}
                  required
                />
                <input
                  type="number"
                  placeholder="Pin code"
                  name="pinCode"
                  value={user.pinCode}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>
          </form>
        </div>

        {/* Checkout Button */}
        <div className="checkout-btn">
          <button type="button" onClick={handleOnClick}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
