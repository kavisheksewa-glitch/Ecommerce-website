import React, { useState } from "react";
import { FaHeadset, FaPaperPlane, FaQuestionCircle, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

function SupportDesk() {
  const [ticket, setTicket] = useState({ subject: "", category: "General", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ticket.subject && ticket.message) {
      setSubmitted(true);
      setTicket({ subject: "", category: "General", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Support Form */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm p-4">
            <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <FaHeadset /> Customer Support Desk
            </h4>
            <p className="text-muted small mb-4">
              Having issues with an order or account? Submit a support request below and our team will get back to you within 24 hours.
            </p>

            {submitted && (
              <div className="alert alert-success" role="alert">
                Your support request has been submitted successfully! Ticket ID: #{Math.floor(100000 + Math.random() * 900000)}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Briefly describe the issue"
                  value={ticket.subject}
                  onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Issue Category</label>
                <select
                  className="form-select"
                  value={ticket.category}
                  onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
                >
                  <option value="General">General Query</option>
                  <option value="Order Issues">Order & Delivery Issue</option>
                  <option value="Payments">Payment & Refund</option>
                  <option value="Returns">Product Exchange / Return</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Provide detailed information regarding your concern..."
                  value={ticket.message}
                  onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-dark d-inline-flex align-items-center gap-2">
                <FaPaperPlane /> Submit Ticket
              </button>
            </form>
          </div>
        </div>

        {/* Info & FAQs */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-3">Direct Contact Info</h5>
            <div className="d-flex align-items-center gap-3 mb-3">
              <FaEnvelope className="text-dark fs-5" />
              <div>
                <small className="text-muted d-block">Email Us</small>
                <strong className="text-dark">support@kavishawls.com</strong>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <FaPhoneAlt className="text-dark fs-5" />
              <div>
                <small className="text-muted d-block">Helpline Number</small>
                <strong className="text-dark">+91 98765 43210</strong>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <FaQuestionCircle /> Quick FAQs
            </h5>
            <div className="accordion accordion-flush" id="faqAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed px-0 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                    How can I track my order?
                  </button>
                </h2>
                <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body px-0 text-muted small">
                    You can track your order status using the "Track Order" link in the navbar or from your Order History section.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed px-0 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                    What is the return policy?
                  </button>
                </h2>
                <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body px-0 text-muted small">
                    We offer a 7-day hassle-free return and exchange policy from the date of delivery.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportDesk;