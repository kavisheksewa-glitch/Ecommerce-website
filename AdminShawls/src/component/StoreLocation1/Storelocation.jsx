import React from "react";

function StoreLocation() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Our Store</h2>

      <div className="row">

        <div className="col-md-6">
          <h1 className="luxury-title">Kavi Shawls</h1>

          <p>
            MG Road,<br />
            Indore, Madhya Pradesh - 452001<br />
            India
          </p>

          <p><strong>Phone:</strong> +91 98765 43210</p>

          <p><strong>Email:</strong> support@kavishawls.com</p>

          <p>
            <strong>Business Hours</strong><br />
            Monday - Saturday: 10:00 AM - 8:00 PM<br />
            Sunday: 11:00 AM - 6:00 PM
          </p>
        </div>

        <div className="col-md-6">
          <iframe
            title="Kavi Shawls Store"
            src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAP_EMBED_LINK"
            width="100%"
            height="350"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </div>
  );
}

export default StoreLocation;