import axios from "axios";
import { useState } from "react";
import "./CheckOutPage.css";

const CheckoutPage = () => {
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pinCode: "",
    cartItems: [
      // { name: "Grinder 300hp blue colour variant", quantity: 1, price: 100 },
      // { name: "Grinder 300hp blue colour variant", quantity: 1, price: 100 },
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
      alert("Please fill all the fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/checkout", user);
      console.log(response.data);
      alert("Order placed successfully.");
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
      alert("There was an error placing your order.");
    }
  };

  return (
    <>
      <h1 className="heading">Checkout</h1>
      <div className="options">
        <p className="circle"></p>
        <p className="line"></p>
        <p className="circle"></p>
      </div>

      <div className="container">
        <h3 style={{ textAlign: "center" }}>Review Your Cart Item</h3>
        <div className="review">
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
    </>
  );
};

export default CheckoutPage;
