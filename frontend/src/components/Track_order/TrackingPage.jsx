import { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./TrackingPage.css";

export default function TrackingPage() {
  const [showTracking, setShowTracking] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/track-order?orderId=${orderId}&email=${email}`
      );

      const data = await response.json();
      console.log("API Response:", data); // ✅ Debug log

      if (response.ok && data) {
        setTrackingData(data);
        setShowTracking(true);
      } else {
        setError(data?.message || "Order not found.");
        setTrackingData(null);
        setShowTracking(false);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setTrackingData(null);
      setShowTracking(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="tracking_container">
      <h2>Track Order</h2>
      <div className="dotsandline"></div>
      <div className="tracking_content">
        <div className="track-box">
          {loading ? (
            <div className="divtext">Fetching order details...</div>
          ) : showTracking ? (
            <div className="replace_dmd_box">
              {trackingData ? (
                <>
                  <div className="divtext"><strong>Order ID:</strong> {trackingData.orderId}</div>
                  <div className="divtext"><strong>Status:</strong> {trackingData.status}</div>
                </>
              ) : (
                <div className="divtext">No order found.</div>
              )}
            </div>
          ) : (
            <div className="diamond-div">
              <img
                className="diamond"
                src="https://static.vecteezy.com/system/resources/previews/001/198/313/non_2x/diamond-png.png"
                alt="diamond"
              />
            </div>
          )}
          <div className="trackingPage-divider"></div>
          <div className="order-form-div">
            <form className="order-form" onSubmit={handleSubmit}>
              <input
                className="input-details-tracking"
                type="text"
                placeholder="Your Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
              <input
                className="input-details-tracking"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="tracking-btn" disabled={loading}>
                {loading ? "Tracking..." : "Track Order"}
              </button>
            </form>
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
      </div>
      <div className="social-links">
        <div><FaTwitter /></div>
        <div><FaFacebook /></div>
        <div><FaInstagram /></div>
        <div><FaLinkedin /></div>
      </div>
    </div>
  );
}
