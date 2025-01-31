import React from "react";
import firstImage from "../../assets/first.jpeg";
import FourthImage from "../../assets/fourth.jpeg";
import SecondImage from "../../assets/second.jpeg";
import ThirdImage from "../../assets/third.jpeg";
import "./AboutUs.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* About Section */}
      <section className="about-section">
        <h1>About us</h1>
        <p className="subtitle">Our Aim to helps needy people</p>
        <p className="description">
          At <span className="highlight">RETO INDIA</span>, our mission is to
          empower underprivileged artisans and vendors by providing them with a
          platform to showcase their handmade creations. In supporting talent
          that often goes unnoticed and helping them achieve financial
          independence.
        </p>
        <div className="underline"></div>
      </section>

      {/* Why Join Us Section */}
      <section className="why-join-section">
        <div className="image-container">
          <img src={firstImage} alt="Artisan Painting" />
        </div>
        <div className="content">
          <h2>WHY YOU JOIN US?</h2>
          <p>
            At <span className="highlight">RETO INDIA</span>, we believe in
            empowering the true artisans of our land—those who craft beautiful,
            handmade treasures but struggle to find a marketplace to showcase
            their work. By joining us, you are not just buying a product; you
            are becoming part of a movement to uplift lives, preserve
            traditional craftsmanship, and connect with our roots.
          </p>
        </div>
      </section>

      {/* Movement Section */}
      <section className="movement-section">
        <h2>
          What is our <span className="movement">Movement?</span>
        </h2>
        <p>
          <span className="highlight">Empowering</span> Artisans And Vendors.
          Our Movement Is Dedicated To Uplifting Underprivileged Artisans,
          Roadside Vendors, And Craftspeople By Giving Them A Platform To
          Showcase And Sell Their Handmade Products.
        </p>
      </section>

      {/* Cards Section */}
      <section className="cards-section">
        <div className="card">
          <img src={SecondImage} alt="Traditional Art" />
          <h3>Preserving Traditional Art and Craft</h3>
          <p>
            We Strive To Preserve And Promote The Rich Cultural Heritage Of Our
            Land By Supporting Handmade And Traditional Products Crafted With
            Skill And Passion.
          </p>
          <button>Read More</button>
        </div>
        <div className="card">
          <img src={ThirdImage} alt="Community Connection" />
          <h3>Connecting with Communities</h3>
          <p>
            Our Mission Is To Connect Local Creators With Global Buyers,
            Bridging The Gap And Creating Opportunities For Sustainable
            Livelihoods.
          </p>
          <button>Read More</button>
        </div>
        <div className="card">
          <img src={FourthImage} alt="Sustainability" />
          <h3>Building a Sustainable Future</h3>
          <p>
            By Encouraging Handmade And Eco-Friendly Products, We Are Committed
            To Promoting Sustainability And Reducing The Environmental Impact Of
            Mass Production.
          </p>
          <button>Read More</button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
