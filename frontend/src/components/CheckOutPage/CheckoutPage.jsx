import { useGSAP } from "@gsap/react";
import { useMutation } from "@tanstack/react-query";
import { gsap } from "gsap";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { checkout } from "../../API/api";
import "./CheckOutPage.css";

const CheckoutPage = () => {
  useGSAP(() => {
    gsap.from(".details", {
      x: 400,
      opacity: 0,
      duration: 1,
      delay: 0.5,
    });
  });

  useGSAP(() => {
    gsap.from(".photo", {
      x: -200,
      duration: 1,
      opacity: 0,
      delay: 0.5,
    });
  });

  useGSAP(() => {
    gsap.from(".checkout-btn", {
      delay: 1,
      scale: 0,
    });
  });

  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pinCode: "",
    cartItems: [
      { name: "Grinder 300hp blue colour variant", quantity: 1, price: 100 },
      { name: "Grinder 300hp blue colour variant", quantity: 1, price: 100 },
    ],
  });

  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const { mutate } = useMutation({
    mutationFn: (newOrder) => checkout(newOrder),
    onSuccess: () => {
      // console.log("Order successful:", response);
      toast("Order placed successfully!");
      setUser({
        name: "",
        phone: "",
        email: "",
        address: "",
        pinCode: "",
        cartItems: [],
      });
      setPopupVisible(false);
    },
    onError: (error) => {
      console.error("Error placing order:", error);
      toast("Failed to place order. Please try again.");
    },
  });

  const handleOnClick = (e) => {
    e.preventDefault();
    if (
      !user.name ||
      !user.phone ||
      !user.email ||
      !user.address ||
      !user.pinCode
    ) {
      toast("Enter details in all fields");
      return;
    }

    // Check if cartItems is not empty before mutation
    if (user.cartItems.length === 0) {
      toast("Your cart is empty!");
      return;
    }

    // Ensure we log the data being sent
    console.log("Sending order data:", user);
    setPopupVisible(true);
    mutate(user); // Trigger the mutation
  };

  return (
    <>
      {isPopupVisible && (
        <div className="checkout-popup">
          <div className="popup-content">
            <div className="spinner"></div>
            <div className="popup-text">Please wait...</div>
          </div>
        </div>
      )}
      <div
        style={{
          marginBottom: "2rem",
          background: "linear-gradient(462deg, #fdf2e3 51%, #ffd39c 70%)",
        }}
      >
        <h1 className="checkout-heading">Checkout</h1>
        <ToastContainer />
        <div className="options">
          <p className="underline-circle"></p>
          <p className="line"></p>
          <p className="underline-circle"></p>
        </div>

        <div className="checkout-container">
          <div className="review">
            <h3>Review Your Cart Item</h3>
            <div className="review-photo">
              {user.cartItems.length ? (
                <>
                  {user.cartItems.map((item, index) => (
                    <div key={index} className="items-info">
                      <p>{item.name}</p>
                      <p className="quantity">{item.quantity}</p>
                      {/* <p className="price">Price: ${item.price}</p> */}
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
                <h2
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  Cart is empty
                </h2>
              )}
            </div>
          </div>

          <div className="vertical-line"></div>

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
        <div className="checkout-btn">
          <button type="button" onClick={handleOnClick}>
            Place Your Order
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
