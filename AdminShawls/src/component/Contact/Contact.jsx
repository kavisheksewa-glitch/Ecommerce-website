import React, { useState } from "react";

function Contact() {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you! Your message has been sent successfully.");

    console.log(contact);

    setContact({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="container py-5">
      <div className="row">

        <div className="col-md-6 mb-4">
          <h2>Contact Us</h2>
          <p>
            We'd love to hear from you. If you have any questions about our
            premium shawls, feel free to contact us.
          </p>

          <h5>📍 Address</h5>
          <p>Lucknow, Uttar Pradesh, India</p>

          <h5>📞 Phone</h5>
          <p>+91 98765 43210</p>

          <h5>📧 Email</h5>
          <p>support@kavishawls.com</p>

          <h5>🕒 Working Hours</h5>
          <p>Monday - Saturday (10:00 AM - 7:00 PM)</p>
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

        <div className="col-md-6">
          <div className="card shadow p-4">

            <h3 className="mb-4 text-center">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Your Name"
                name="name"
                value={contact.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                name="email"
                value={contact.email}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                className="form-control mb-3"
                placeholder="Phone Number"
                name="phone"
                value={contact.phone}
                onChange={handleChange}
              />

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Subject"
                name="subject"
                value={contact.subject}
                onChange={handleChange}
                required
              />

              <textarea
                className="form-control mb-3"
                rows="5"
                placeholder="Your Message"
                name="message"
                value={contact.message}
                onChange={handleChange}
                required
              ></textarea>

              <button className="btn btn-dark w-100">
                Send Message
              </button>

            </form>
            

          </div>
          
        </div>

      </div>
    </div>
  );
}

export default Contact;