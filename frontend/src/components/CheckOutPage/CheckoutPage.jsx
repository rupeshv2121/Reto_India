import { useGSAP } from "@gsap/react";
import axios from "axios";
import { gsap } from "gsap";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
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
    gsap.from(".btn", {
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

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleOnClick = async (e) => {
    e.preventDefault();
    if (
      !user.name ||
      !user.phone ||
      !user.email ||
      !user.address ||
      !user.pinCode
    ) {
      toast("enter details in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/checkout", user);
      console.log(response.data);
      toast("Successful");
      setUser({
        name: "",
        phone: "",
        email: "",
        address: "",
        pinCode: "",
        cartItems: [],
      });
    } catch (error) {
      console.error("Error saving user details:", error);
      toast("Something went's wrong");
    }
  };

  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <h1 className="heading">Checkout</h1>
        <ToastContainer />
        <div className="options">
          <p className="circle"></p>
          <p className="line"></p>
          <p className="circle"></p>
        </div>

        <div className="container">
          <div className="review">
            <h3>Review Your Cart Item</h3>
            <div className="photo">
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
        <div className="btn">
          <button type="button" onClick={handleOnClick}>
            Place Your Order
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
