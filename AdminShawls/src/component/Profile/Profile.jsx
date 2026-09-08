import React, { useState, useEffect } from "react";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaCalendarAlt, 
  FaHome, 
  FaRoad, 
  FaCity, 
  FaMapMarkedAlt, 
  FaGlobe, 
  FaHashtag, 
  FaEdit, 
  FaSave, 
  FaTimes,
  FaSpinner
} from "react-icons/fa";

function Profile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // ✅ Fetch Profile Data from API
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
console.log("Profile fetch response:", data);
      if (data.success && data.customer) {
        setFormData({
          fullName: data.customer.name || "",
          email: data.customer.email || "",
          mobile: data.customer.phone || "",
          dob: data.customer.dob ? data.customer.dob.split("T")[0] : "", // Formatting YYYY-MM-DD
          houseNo: data.customer.houseNo || "",
          street: data.customer.street || "",
          city: data.customer.city || "",
          state: data.customer.state || "",
          pincode: data.customer.pincode || "",
          country: data.customer.country || "India",
        });
      } else {
        setMessage({ type: "danger", text: data.message || "Failed to fetch profile." });
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setMessage({ type: "danger", text: "Server error while loading profile details." });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Form Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save / Update Profile API Call
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://ecommerce-website-ggui.onrender.com/api/customer/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setIsEditing(false);
      } else {
        setMessage({ type: "danger", text: data.message || "Update failed!" });
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage({ type: "danger", text: "Something went wrong while saving!" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted fw-semibold">Loading Profile Details...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          
          {/* Notification Alert */}
          {message.text && (
            <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
              {message.text}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setMessage({ type: "", text: "" })}
              ></button>
            </div>
          )}

          <div className="card shadow-sm border-0">
            {/* Card Header */}
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3 px-4">
              <h5 className="mb-0 d-flex align-items-center gap-2 fw-bold">
                <FaUser /> My Account & Profile
              </h5>
              {!isEditing ? (
                <button
                  className="btn btn-outline-light btn-sm d-flex align-items-center gap-2"
                  onClick={() => setIsEditing(true)}
                >
                  <FaEdit /> Edit Profile
                </button>
              ) : (
                <button
                  className="btn btn-danger btn-sm d-flex align-items-center gap-2"
                  onClick={() => {
                    setIsEditing(false);
                    fetchProfile(); // Reset unsaved changes
                  }}
                >
                  <FaTimes /> Cancel
                </button>
              )}
            </div>

            {/* Card Body */}
            <div className="card-body p-4">
              <form onSubmit={handleUpdate}>
                <h6 className="text-muted fw-bold mb-3 text-uppercase border-bottom pb-2">
                  Personal Details
                </h6>

                <div className="row g-3 mb-4">
                  {/* Full Name */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Full Name</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaUser /></span>
                      <input
                        type="text"
                        name="fullName"
                        className="form-control"
                        value={formData.fullName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        required
                      />
                    </div>
                  </div>

                  {/* Email (Read Only) */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaEnvelope /></span>
                      <input
                        type="email"
                        className="form-control bg-light"
                        value={formData.email}
                        disabled
                        readOnly
                      />
                    </div>
                    <small className="text-muted" style={{ fontSize: "11px" }}>Email cannot be changed.</small>
                  </div>

                  {/* Mobile */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Mobile Number</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaPhone /></span>
                      <input
                        type="tel"
                        name="mobile"
                        className="form-control"
                        value={formData.mobile}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Enter 10-digit mobile number"
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Date of Birth</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaCalendarAlt /></span>
                      <input
                        type="date"
                        name="dob"
                        className="form-control"
                        value={formData.dob}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <h6 className="text-muted fw-bold mb-3 text-uppercase border-bottom pb-2">
                  Address Details
                </h6>

                <div className="row g-3">
                  {/* House No / Building */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">House No. / Building</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaHome /></span>
                      <input
                        type="text"
                        name="houseNo"
                        className="form-control"
                        value={formData.houseNo}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="e.g. Verka"
                      />
                    </div>
                  </div>

                  {/* Street */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Street / Area</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaRoad /></span>
                      <input
                        type="text"
                        name="street"
                        className="form-control"
                        value={formData.street}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="e.g. Batala Road"
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">City</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaCity /></span>
                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="e.g. Amritsar"
                      />
                    </div>
                  </div>

                  {/* State */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">State</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaMapMarkedAlt /></span>
                      <input
                        type="text"
                        name="state"
                        className="form-control"
                        value={formData.state}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="e.g. Punjab"
                      />
                    </div>
                  </div>

                  {/* Pincode */}
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Pincode</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaHashtag /></span>
                      <input
                        type="text"
                        name="pincode"
                        className="form-control"
                        value={formData.pincode}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="e.g. 143001"
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Country</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaGlobe /></span>
                      <input
                        type="text"
                        name="country"
                        className="form-control"
                        value={formData.country}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="mt-4 text-end">
                    <button
                      type="submit"
                      className="btn btn-dark btn-lg px-4 d-inline-flex align-items-center gap-2"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <FaSpinner className="spinner-border spinner-border-sm" /> Saving...
                        </>
                      ) : (
                        <>
                          <FaSave /> Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;