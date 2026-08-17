import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaUserShield, FaStore } from "react-icons/fa";
import "./RoleSelection.css";
import logo from "./assets/logooo.png";

function FrontPage() {
  return (
    <div className="role-selection-container">
      <div className="role-header">
        {/* Added Logo Above Heading */}
        <div className="logo-wrapper">
          <img src={logo} alt="Kavi Shawls Logo" className="header-logo" />
        </div>
        <h1>Welcome to Kavi Shawls</h1>
        <p>Select your portal to continue</p>
      </div>

      <div className="role-cards-wrapper">
        {/* Div 1: Customer Portal */}
        <div className="role-card customer-card">
          <div className="icon-box">
            <FaUser />
          </div>
          <h3>Customer Portal</h3>
          <p>Explore luxury shawls, browse collections, and buy your favorite items.</p>
          <Link to="/customer" className="role-btn btn-customer">
            Enter Store
          </Link>
        </div>

        {/* Div 2: Admin Portal */}
        <div className="role-card admin-card">
          <div className="icon-box">
            <FaUserShield />
          </div>
          <h3>Admin Portal</h3>
          <p>Manage entire platform, approve sellers, view overall analytics & users.</p>
          <Link to="/admin/login" className="role-btn btn-admin">
            Admin Login
          </Link>
        </div>

        {/* Div 3: Seller Portal */}
        <div className="role-card seller-card">
          <div className="icon-box">
            <FaStore />
          </div>
          <h3>Seller Portal</h3>
          <p>Manage your inventory, add new products, and process customer orders.</p>
          <Link to="/seller/login" className="role-btn btn-seller">
            Seller Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;