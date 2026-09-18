// import React, { useState } from "react";
// import { FaHeadset, FaPaperPlane, FaQuestionCircle, FaEnvelope, FaPhoneAlt, FaChevronDown } from "react-icons/fa";

// function SupportDesk() {
//   const [ticket, setTicket] = useState({ subject: "", category: "General", message: "" });
//   const [submitted, setSubmitted] = useState(false);

//   // ✅ Kis FAQ ka answer khula hai, uska index yahan store hota hai (null = sab band)
//   const [openFaq, setOpenFaq] = useState(null);

//   const faqs = [
//     {
//       question: "How can I track my order?",
//       answer:
//         'You can track your order status using the "Track Order" link in the navbar or from your Order History section.',
//     },
//     {
//       question: "What is the return policy?",
//       answer:
//         "We offer a 7-day hassle-free return and exchange policy from the date of delivery.",
//     },
//   ];

//   const toggleFaq = (index) => {
//     setOpenFaq((prev) => (prev === index ? null : index));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (ticket.subject && ticket.message) {
//       setSubmitted(true);
//       setTicket({ subject: "", category: "General", message: "" });
//       setTimeout(() => setSubmitted(false), 4000);
//     }
//   };

//   return (
//     <div className="container py-5">
//       <div className="row g-4">
//         {/* Support Form */}
//         <div className="col-lg-7">
//           <div className="card border-0 shadow-sm p-4">
//             <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
//               <FaHeadset /> Customer Support Desk
//             </h4>
//             <p className="text-muted small mb-4">
//               Having issues with an order or account? Submit a support request below and our team will get back to you within 24 hours.
//             </p>

//             {submitted && (
//               <div className="alert alert-success" role="alert">
//                 Your support request has been submitted successfully! Ticket ID: #{Math.floor(100000 + Math.random() * 900000)}
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label fw-semibold">Subject</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Briefly describe the issue"
//                   value={ticket.subject}
//                   onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label fw-semibold">Issue Category</label>
//                 <select
//                   className="form-select"
//                   value={ticket.category}
//                   onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
//                 >
//                   <option value="General">General Query</option>
//                   <option value="Order Issues">Order & Delivery Issue</option>
//                   <option value="Payments">Payment & Refund</option>
//                   <option value="Returns">Product Exchange / Return</option>
//                 </select>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label fw-semibold">Description</label>
//                 <textarea
//                   className="form-control"
//                   rows="5"
//                   placeholder="Provide detailed information regarding your concern..."
//                   value={ticket.message}
//                   onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
//                   required
//                 ></textarea>
//               </div>

//               <button type="submit" className="btn btn-dark d-inline-flex align-items-center gap-2">
//                 <FaPaperPlane /> Submit Ticket
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Info & FAQs */}
//         <div className="col-lg-5">
//           <div className="card border-0 shadow-sm p-4 mb-4">
//             <h5 className="fw-bold mb-3">Direct Contact Info</h5>
//             <div className="d-flex align-items-center gap-3 mb-3">
//               <FaEnvelope className="text-dark fs-5" />
//               <div>
//                 <small className="text-muted d-block">Email Us</small>
//                 <strong className="text-dark">support@kavishawls.com</strong>
//               </div>
//             </div>
//             <div className="d-flex align-items-center gap-3">
//               <FaPhoneAlt className="text-dark fs-5" />
//               <div>
//                 <small className="text-muted d-block">Helpline Number</small>
//                 <strong className="text-dark">+91 98765 43210</strong>
//               </div>
//             </div>
//           </div>

//           <div className="card border-0 shadow-sm p-4">
//             <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
//               <FaQuestionCircle /> Quick FAQs
//             </h5>

//             {/* ✅ Ab Bootstrap JS collapse pe depend nahi karta, React state se open/close hota hai */}
//             <div>
//               {faqs.map((faq, index) => {
//                 const isOpen = openFaq === index;
//                 return (
//                   <div
//                     key={index}
//                     className="border rounded mb-2"
//                     style={{ overflow: "hidden" }}
//                   >
//                     <button
//                       type="button"
//                       onClick={() => toggleFaq(index)}
//                       className="btn w-100 d-flex justify-content-between align-items-center px-3 py-2 fw-semibold text-start bg-white"
//                       style={{
//                         border: "none",
//                         borderRadius: 0,
//                       }}
//                     >
//                       <span>{faq.question}</span>
//                       <FaChevronDown
//                         style={{
//                           transition: "transform 0.2s ease",
//                           transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
//                           flexShrink: 0,
//                           marginLeft: "8px",
//                         }}
//                       />
//                     </button>

//                     {isOpen && (
//                       <div className="px-3 pb-3 text-muted small">
//                         {faq.answer}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SupportDesk;


//support


import React, { useState, useEffect, useCallback } from "react";
import {
  FaHeadset,
  FaPaperPlane,
  FaQuestionCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaChevronDown,
  FaSpinner,
} from "react-icons/fa";

// If your frontend and backend run on different ports, set this to your
// backend's base URL, e.g. "http://localhost:5000"
const API_BASE = "http://localhost:5000";

// Change "customerToken" below if you store the JWT under a different key
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const statusColors = {
  Open: "primary",
  "In Progress": "warning",
  Resolved: "success",
  Closed: "secondary",
};

function SupportDesk() {
  const [ticket, setTicket] = useState({
    subject: "",
    category: "General",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submittedTicketId, setSubmittedTicketId] = useState(null);

  const [myTickets, setMyTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [ticketsError, setTicketsError] = useState("");

  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How can I track my order?",
      answer:
        'You can track your order status using the "Track Order" link in the navbar or from your Order History section.',
    },
    {
      question: "What is the return policy?",
      answer:
        "We offer a 7-day hassle-free return and exchange policy from the date of delivery.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const fetchMyTickets = useCallback(async () => {
    setLoadingTickets(true);
    setTicketsError("");
    try {
      const res = await fetch(`${API_BASE}/api/customer/support/my-tickets`, {
        method: "GET",
        headers: getAuthHeaders(),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load your tickets");
      }

      setMyTickets(data.tickets || []);
    } catch (err) {
      setTicketsError(err.message || "Something went wrong");
    } finally {
      setLoadingTickets(false);
    }
  }, []);

  useEffect(() => {
    fetchMyTickets();
  }, [fetchMyTickets]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticket.subject || !ticket.message) return;

    setSubmitting(true);
    setSubmitError("");
    setSubmittedTicketId(null);

    try {
      const res = await fetch(`${API_BASE}/api/customer/support/create`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(ticket),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit ticket");
      }

      setSubmittedTicketId(data.ticket.ticketId);
      setTicket({ subject: "", category: "General", message: "" });
      // Refresh ticket history so the new ticket shows up immediately
      fetchMyTickets();

      setTimeout(() => setSubmittedTicketId(null), 6000);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
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
              Having issues with an order or account? Submit a support
              request below and our team will get back to you within 24
              hours.
            </p>

            {submittedTicketId && (
              <div className="alert alert-success" role="alert">
                Your support request has been submitted successfully! Ticket
                ID: <strong>#{submittedTicketId}</strong>
              </div>
            )}

            {submitError && (
              <div className="alert alert-danger" role="alert">
                {submitError}
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
                  onChange={(e) =>
                    setTicket({ ...ticket, subject: e.target.value })
                  }
                  required
                  disabled={submitting}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Issue Category
                </label>
                <select
                  className="form-select"
                  value={ticket.category}
                  onChange={(e) =>
                    setTicket({ ...ticket, category: e.target.value })
                  }
                  disabled={submitting}
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
                  onChange={(e) =>
                    setTicket({ ...ticket, message: e.target.value })
                  }
                  required
                  disabled={submitting}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-dark d-inline-flex align-items-center gap-2"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <FaSpinner className="fa-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Submit Ticket
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Ticket History */}
          <div className="card border-0 shadow-sm p-4 mt-4">
            <h5 className="fw-bold mb-3">Your Support Tickets</h5>

            {loadingTickets && (
              <div className="text-muted small d-flex align-items-center gap-2">
                <FaSpinner className="fa-spin" /> Loading your tickets...
              </div>
            )}

            {!loadingTickets && ticketsError && (
              <div className="alert alert-danger py-2 small" role="alert">
                {ticketsError}
              </div>
            )}

            {!loadingTickets && !ticketsError && myTickets.length === 0 && (
              <p className="text-muted small mb-0">
                You haven't raised any support tickets yet.
              </p>
            )}

            {!loadingTickets && myTickets.length > 0 && (
              <div className="table-responsive">
                <table className="table table-sm align-middle">
                  <thead>
                    <tr className="text-muted small">
                      <th>Ticket ID</th>
                      <th>Subject</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Raised On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myTickets.map((t) => (
                      <tr key={t._id}>
                        <td className="small">#{t.ticketId}</td>
                        <td className="small">{t.subject}</td>
                        <td className="small">{t.category}</td>
                        <td>
                          <span
                            className={`badge bg-${
                              statusColors[t.status] || "secondary"
                            }`}
                          >
                            {t.status}
                          </span>
                        </td>
                        <td className="small">
                          {new Date(t.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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

            <div>
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="border rounded mb-2"
                    style={{ overflow: "hidden" }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="btn w-100 d-flex justify-content-between align-items-center px-3 py-2 fw-semibold text-start bg-white"
                      style={{
                        border: "none",
                        borderRadius: 0,
                      }}
                    >
                      <span>{faq.question}</span>
                      <FaChevronDown
                        style={{
                          transition: "transform 0.2s ease",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          flexShrink: 0,
                          marginLeft: "8px",
                        }}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-3 pb-3 text-muted small">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportDesk;