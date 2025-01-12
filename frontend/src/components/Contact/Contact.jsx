import React, { useState } from 'react';
import './Contact.css';
import ContactI from "./assets/Contact.png";
import Popup from "./assets/popup.png";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import axios from "axios";
import ModalCard from "../ModalCard/ModalCard";

const Contact = () => {
    const [info, setInfo] = useState({
        name: "",
        email: "",
        PhoneNo: "",
        Message: ""
    });

    const [isPopupVisible, setPopupVisible] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        const { name, email, PhoneNo, Message } = info;

        if (name && email && PhoneNo && Message) {
            try {
                await axios.post("http://localhost:3000/ContactInfo", info);
                setPopupVisible(true);
            } catch (error) {
                console.error("An error occurred:", error);
                alert("Failed to send the message. Please try again.");
            }
            setInfo({ name: "", email: "", PhoneNo: "", Message: "" });
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div className='box'>
            <div className="circle"></div>
            <div className="heading">
                Connect Us
                <hr />
            </div>

            <div className="container">
                <div className="photo">
                    <img src={ContactI} alt="Profile" />
                </div>
                <div className="contact-form">
                    <form id="contactForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" value={info.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={info.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone No.:</label>
                            <input type="tel" id="phone" name="PhoneNo" value={info.PhoneNo} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <textarea id="message" name="Message" value={info.Message} onChange={handleChange} required></textarea>
                        </div>
                        <button type="submit">Submit Message</button>
                    </form>
                </div>
            </div>

            <div className="social-icons">
                <a href="#" target="_blank" rel="noopener noreferrer"><XIcon /></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><LinkedInIcon /></a>
            </div>

            <ModalCard isPopupVisible={isPopupVisible} closePopup={() => setPopupVisible(false)} />
        </div>
    );
};

export default Contact;
