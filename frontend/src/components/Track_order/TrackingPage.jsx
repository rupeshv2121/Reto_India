/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import {
  FaCameraRetro,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import "./TrackingPage.css";
export default function TrackingPage() {
  const [show_dmd, setshow_dmd] = useState(true);
  function handleClick(e) {
    e.preventDefault();
    setshow_dmd(!show_dmd);
  }
  return (
    <div className="tracking_container">
      <div className="tracking_content">
        <div className="dotsandline">
          <h2>Track Order</h2>
        </div>
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
          <div>
            <form
              className="order-form"
              onSubmit={(e) => {
                handleClick(e);
              }}
            >
              <label for="order-id">Your Order ID</label>
              <input
                className="input-details"
                type="text"
                id="order-id"
                name="order-id"
                placeholder="dmd-asxxyy-zz..."
                required
              />
              <label for="registration">Registration No</label>
              <input
                className="input-details"
                type="text"
                id="registration"
                name="registration"
                placeholder="registration no..."
                required
              />
              <label for="order-status">Order Status</label>
              <input
                className="input-details"
                type="text"
                id="order-status"
                name="order-status"
                placeholder="Order status.."
                required
              />
              <label for="details">Order Details</label>
              <textarea
                id="details"
                rows="5"
                name="details"
                placeholder="Write details..."
                required
              />
              <button type="submit" className="btn">
                Track Order
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="social-links">
        <div style={{ color: "aqua" }}>
          <FaTwitter />
        </div>
        <div>
          <FaFacebook style={{ color: "blue" }} />
        </div>
        <div>
          <FaCameraRetro />
        </div>
        <div>
          <FaLinkedin style={{ color: "blue" }} />
        </div>
      </div>
    </div>
  );
}
