import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const token = localStorage.getItem("token");

  // Backend se customer ki details fetch karna
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/customer/profile", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok && data.success) {
          setFormData({
            name: data.customer.name || "",
            email: data.customer.email || "",
            phone: data.customer.phone || "",
            address: data.customer.address || "",
          });
        } else {
          toast.error(data.message || "Failed to load profile data");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("Server connection failed");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Profile update karne ki API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const response = await fetch("http://localhost:5000/api/customer/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Server connection failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="text-center my-5 fw-bold fs-4">Loading Profile...</div>;
  }

  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      <ToastContainer />
      <div className="card shadow border-0 p-4">
        <h2 className="mb-4 text-center fw-bold text-dark">My Profile 👤</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address (Read-only)</label>
            <input
              type="email"
              className="form-control bg-light"
              value={formData.email}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Delivery Address</label>
            <textarea
              name="address"
              className="form-control"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your delivery address"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={updating}
            className="btn w-100 py-2 text-white fw-bold shadow-sm"
            style={{ backgroundColor: "#064e3b" }}
          >
            {updating ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;