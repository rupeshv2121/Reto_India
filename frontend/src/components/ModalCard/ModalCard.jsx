import React from 'react';
import popup from "./popup.png";

const ModalCard = ({ isPopupVisible, closePopup }) => {
    return (
        <div className="popup-overlay" style={{ display: isPopupVisible ? 'flex' : 'none' }} >
            <div className="popup">
                <img src={popup} alt="Popup" />
                <h3>Message Sent!</h3>
                <p>We will contact you shortly. Thank you!</p>
                <button onClick={closePopup}>OK</button>
            </div>
        </div>
    );
};

export default ModalCard;
