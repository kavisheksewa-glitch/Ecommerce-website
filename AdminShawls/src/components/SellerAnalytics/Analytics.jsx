import React from "react";
import "./Analytics.css";
import logo from "../../assets/logooo.png";
//import logo from "../assets/logooo.png";
//import SellerHeader from "../SellerHeader";
import SellerHeader from "../SellerHeader/SellerHeader";
function Analytics() {
  return (
    <div className="container py-5 mt-5">
      <SellerHeader />

      <h2 className="text-center fw-bold mb-5 Seller_dashboard-title">
        <img
          src={logo}
          alt="Kavi Shawls Logo"
          className="Seller_dashboard-logo"
        />
        📊 Sales Analytics
      </h2>

      <div className="row g-4">

        <div className="col-lg-3 col-md-6">
          <div className="Seller_card shadow border-0 text-center p-4">
            <h5>Total Sales</h5>
            <h2 className="text-success">₹4,80,000</h2>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="Seller_card shadow border-0 text-center p-4">
            <h5>Total Orders</h5>
            <h2 className="text-primary">320</h2>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="Seller_card shadow border-0 text-center p-4">
            <h5>Customers</h5>
            <h2 className="text-warning">215</h2>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="Seller_card shadow border-0 text-center p-4">
            <h5>Return Orders</h5>
            <h2 className="text-danger">12</h2>
          </div>
        </div>

      </div>

      <div className="row mt-5">

        <div className="col-md-6">
          <div className="Seller_card shadow border-0 p-4">
            <h4 className="mb-3">Top Selling Products</h4>

            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Product</th>
                  <th>Sold</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Pashmina Shawl</td>
                  <td>120</td>
                </tr>

                <tr>
                  <td>Cashmere Shawl</td>
                  <td>95</td>
                </tr>

                <tr>
                  <td>Silk Shawl</td>
                  <td>72</td>
                </tr>

                <tr>
                  <td>Wool Shawl</td>
                  <td>55</td>
                </tr>
              </tbody>

            </table>

          </div>
        </div>

        <div className="col-md-6 mt-4">
          <div className="Seller_card shadow border-0 p-4">

            <h4 className="mb-3">
              Monthly Performance
            </h4>

            <table className="table table-striped">

              <thead>
                <tr>
                  <th>Month</th>
                  <th>Revenue</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>January</td>
                  <td>₹45,000</td>
                </tr>

                <tr>
                  <td>February</td>
                  <td>₹52,000</td>
                </tr>

                <tr>
                  <td>March</td>
                  <td>₹68,000</td>
                </tr>

                <tr>
                  <td>April</td>
                  <td>₹80,000</td>
                </tr>

                <tr>
                  <td>May</td>
                  <td>₹95,000</td>
                </tr>

                <tr>
                  <td>June</td>
                  <td>₹1,40,000</td>
                </tr>

              </tbody>

            </table>

          </div>
        </div>

      </div>

    </div>
  );
}

export default Analytics;