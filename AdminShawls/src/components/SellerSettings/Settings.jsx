
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Settings.css";
import logo from "../../assets/logooo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (err) {
    return null;
  }
}

function Settings() {
  const navigate = useNavigate();

  const sellerToken = localStorage.getItem("sellerToken");
  const decoded = sellerToken ? decodeToken(sellerToken) : null;
  const sellerId = decoded?.id;

  const [seller, setSeller] = useState({
    name: "",
    shopName: "",
    brandName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
    brandLogo: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [brandLogoFile, setBrandLogoFile] = useState(null);

  useEffect(() => {
    if (!sellerId) {
      return;
    }
    getSeller();
  }, [sellerId]);

  const getSeller = async () => {
    try {
      const res = await axios.get(
        `https://ecommerce-website-ggui.onrender.com/api/seller/auth/${sellerId}`,
        {
          headers: {
            Authorization: `Bearer ${sellerToken}`,
          },
        }
      );

      setSeller({
        ...res.data,
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch seller details. Ensure backend server is running.", {
        position: "top-right",
        autoClose: 3000,
      });

      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("sellerToken");
        navigate("/seller/login");
      }
    }
  };

  const handleChange = (e) => {
    setSeller({
      ...seller,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sellerId) {
      toast.error("Seller ID is missing. Please log in again.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (
      seller.password &&
      seller.password !== seller.confirmPassword
    ) {
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", seller.name);
    formData.append("shopName", seller.shopName);
    formData.append("brandName", seller.brandName);
    formData.append("email", seller.email);
    formData.append("phone", seller.phone);
    formData.append("address", seller.address);
    formData.append("city", seller.city);
    formData.append("state", seller.state);
    formData.append("pincode", seller.pincode);

    if (seller.password) {
      formData.append("password", seller.password);
    }

    if (profilePic) {
      formData.append("profileImage", profilePic);
    }

    if (brandLogoFile) {
      formData.append("brandLogo", brandLogoFile);
    }

    try {
      const res = await axios.put(
        `https://ecommerce-website-ggui.onrender.com/api/seller/auth/update/${sellerId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sellerToken}`,
          },
        }
      );

      setSeller((prev) => ({
        ...prev,
        ...res.data.seller,
        password: "",
        confirmPassword: "",
      }));
      setProfilePic(null);
      setBrandLogoFile(null);

      toast.success("Profile Updated Successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Update Failed", {
        position: "top-right",
        autoClose: 3000,
      });

      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("sellerToken");
        navigate("/seller/login");
      }
    }
  };

  if (!sellerId) {
    return (
      <div className="container py-5 text-center">
        <h3 className="text-danger">Access Denied</h3>
        <p>Please log in as a seller to view settings.</p>
        <button className="btn btn-dark mt-2" onClick={() => navigate("/seller/login")}>
          Go to Seller Login
        </button>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <ToastContainer />

        <div className="text-center mb-4">
          <img
            src={logo}
            alt="logo"
            className="img-fluid mb-2 Seller_signup-logo mt-5"
          />
          <h2 className="fw-bold Seller_text-brown">
            ⚙️ Seller Settings
          </h2>
          <p className="text-muted">Manage your store details and profile settings</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card shadow-lg border-0 rounded-4 Seller_signup-card">
              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>

                  <div className="row">
                    {seller.profileImage && (
                      <div className="mb-3 text-center">
                        <label className="form-label fw-semibold d-block">My Profile Picture</label>
                        <img
                          src={seller.profileImage}
                          alt="Seller Profile"
                          className="rounded-circle shadow-sm"
                          style={{ width: "150px", height: "150px", objectFit: "cover" }}
                        />
                      </div>
                    )}

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Seller Name
                      </label>
                      <input
                        type="text"
                        className="form-control Seller_form-control"
                        name="name"
                        value={seller.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Shop Name
                      </label>
                      <input
                        type="text"
                        className="form-control Seller_form-control"
                        name="shopName"
                        value={seller.shopName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Update My Profile Picture
                    </label>
                    <input
                      type="file"
                      className="form-control Seller_form-control Seller_file-input"
                      accept="image/*"
                      onChange={(e) => setProfilePic(e.target.files[0])}
                    />
                  </div>

                  <hr className="my-4" />

                  <h5 className="fw-bold Seller_text-brown mb-3">🏷️ Brand Details</h5>
                  <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                    Ye naam aur logo aapke saare products pe dikhega — dobara add karne ki zaroorat nahi.
                  </p>

                  <div className="row">
                    {seller.brandLogo && (
                      <div className="mb-3 text-center">
                        <label className="form-label fw-semibold d-block">Current Brand Logo</label>
                        <img
                          src={seller.brandLogo}
                          alt="Brand Logo"
                          className="rounded shadow-sm"
                          style={{ width: "150px", height: "150px", objectFit: "cover" }}
                        />
                      </div>
                    )}

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Brand Name
                      </label>
                      <input
                        type="text"
                        className="form-control Seller_form-control"
                        name="brandName"
                        placeholder="e.g., Kavi Shawls Premium"
                        value={seller.brandName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Update Brand Logo
                      </label>
                      <input
                        type="file"
                        className="form-control Seller_form-control Seller_file-input"
                        accept="image/*"
                        onChange={(e) => setBrandLogoFile(e.target.files[0])}
                      />
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control Seller_form-control"
                      name="email"
                      value={seller.email}
                      onChange={handleChange}
                      autoComplete="off"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      className="form-control Seller_form-control"
                      name="phone"
                      value={seller.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Business Address
                    </label>
                    <textarea
                      className="form-control Seller_form-control Seller_textarea"
                      rows="3"
                      name="address"
                      value={seller.address}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control Seller_form-control"
                        name="city"
                        value={seller.city}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold">
                        State
                      </label>
                      <input
                        type="text"
                        className="form-control Seller_form-control"
                        name="state"
                        value={seller.state}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-semibold">
                        Pincode
                      </label>
                      <input
                        type="text"
                        className="form-control Seller_form-control"
                        name="pincode"
                        value={seller.pincode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control Seller_form-control"
                      name="password"
                      value={seller.password}
                      onChange={handleChange}
                      placeholder="Leave blank if you don't want to change"
                      autoComplete="new-password"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control Seller_form-control"
                      name="confirmPassword"
                      value={seller.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                    />
                  </div>

                  <button
                    type="submit"
                    className="Seller_btn-brown btn-lg w-100"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;