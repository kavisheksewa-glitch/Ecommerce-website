import React from "react";
import { Link } from "react-router-dom";
import "./GiftGuide.css";
import image14 from "../../assets/gift0.png";
import image15 from "../../assets/giftbir.png";
import image16 from "../../assets/giftwed.png";
import image17 from "../../assets/giftfest.png";
import image18 from "../../assets/giftset.png";

function GiftGuide() {
  // Har gift object mein 'path' property jodh di gayi hai
  const gifts = [
    {
      title: "Birthday Gifts",
      image: image15,
      desc: "Elegant shawls to make birthdays memorable.",
      path: "/gifts/birthday"
    },
    {
      title: "Wedding Gifts",
      image: image16,
      desc: "Premium shawls for weddings and celebrations.",
      path: "/gifts/wedding"
    },
    {
      title: "Festive Collection",
      image: image17,
      desc: "Celebrate every festival with luxury shawls.",
      path: "/gifts/festive"
    },
    {
      title: "Luxury Gift Sets",
      image: image18,
      desc: "Exclusive gift boxes with premium packaging.",
      path: "/gifts/luxury-sets"
    }
  ];

  return (
    <div className="gift-page">
      {/* Hero Section */}
      <img src={image14} alt="Kavi Shawls Banner" className="hero-image w-100" />
      
      <section className="text-center py-4">
        <div className="container">
          <p>Find the perfect premium shawl for every special occasion.</p>
          <Link to="/customer" className="btn btn-warning btn-lg">
            Shop All Products
          </Link>
        </div>
      </section>

      {/* Cards */}
      <section className="container py-5">
        <div className="row">
          {gifts.map((item, index) => (
            <div className="col-lg-3 col-md-6 mb-4" key={index}>
              <div className="gift-card">
                <img src={item.image} alt={item.title} />
                <div className="gift-content">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>

                  {/* Yahan dynamic path use kiya gaya hai */}
                  <Link to={item.path} className="btn btn-dark">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="gift-banner py-5 bg-dark text-white text-center">
        <div className="container">
          <h2>Premium Gift Wrapping Available</h2>
          <p>Add a personalized message with every order.</p>
          <Link to="/customer" className="btn btn-outline-light">
            Order Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default GiftGuide;