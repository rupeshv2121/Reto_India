/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./TrackingPage.css";
export default function TrackingPage() {
  const [show_dmd, setshow_dmd] = useState(true);
  function handleClick(e) {
    e.preventDefault();
    setshow_dmd(!show_dmd);
  }
  return (
    <div className="tracking_container">
      <h2>Track Order</h2>
      <div className="dotsandline"></div>
      <div className="tracking_content">
        <div className="track-box">
          {show_dmd ? (
            <div className="diamond-div">
              <img
                className="diamond"
                src="https://static.vecteezy.com/system/resources/previews/001/198/313/non_2x/diamond-png.png"
                alt="diamond"
              />
            </div>
          ) : (
            <div className="replace_dmd_box">
              <div className="divtext">Your order has been placed</div>
              <div className="divtext">Order reached xyz location</div>
              <div className="divtext">Out for delivery</div>
              <div className="divtext">Order delivered Successfully</div>
            </div>
          )}
          <div className="trackingPage-divider"></div>
          <div className="order-form-div">
            <form
              className="order-form"
              onSubmit={(e) => {
                handleClick(e);
              }}
            >
              <input
                className="input-details-tracking"
                type="text"
                id="order-id"
                name="order-id"
                placeholder="Your-Order-ID"
                required
              />
              <input
                className="input-details-tracking"
                type="text"
                id="registration"
                name="registration"
                placeholder="Email"
                required
              />
              <button type="submit" className="tracking-btn">
                Track Order
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="social-links">
        <div>
          <FaTwitter />
        </div>
        <div>
          <FaFacebook />
        </div>
        <div>
          <FaInstagram />
        </div>
        <div>
          <FaLinkedin />
        </div>
      </div>
    </div>
  );
}
