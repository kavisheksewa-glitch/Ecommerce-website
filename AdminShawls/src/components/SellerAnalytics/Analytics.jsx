


//claude office 




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Analytics.css";
import logo from "../../assets/logooo.png";
import SellerHeader from "../SellerHeader/SellerHeader";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function Analytics() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [returnOrders, setReturnOrders] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const sellerToken = localStorage.getItem("sellerToken");

      if (!sellerToken) {
        navigate("/seller/login");
        return;
      }

      try {
        // ✅ Naya secure route — server-side JWT se seller ki id nikal ke
        // sirf uske orders return karta hai, client-side decode ki zaroorat nahi
        const res = await fetch("https://kavi-shawls.vercel.app/api/shawls/orders/seller/my-orders", {
          headers: { Authorization: `Bearer ${sellerToken}` },
        });
        const data = await res.json();
        const myOrders = data.success && Array.isArray(data.orders) ? data.orders : [];

        const sales = myOrders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
        setTotalSales(sales);
        setTotalOrders(myOrders.length);

        const uniqueCustomers = new Set(myOrders.map((o) => String(o.userId)));
        setCustomerCount(uniqueCustomers.size);

        const returned = myOrders.filter(
          (o) => o.orderStatus === "Returned" || o.orderStatus === "Cancelled"
        ).length;
        setReturnOrders(returned);

        const productSales = {};
        myOrders.forEach((o) => {
          const key = o.productTitle || "Unknown Product";
          productSales[key] = (productSales[key] || 0) + (Number(o.quantity) || 1);
        });
        const sortedProducts = Object.entries(productSales)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([title, sold]) => ({ title, sold }));
        setTopProducts(sortedProducts);

        const monthlyTotals = new Array(12).fill(0);
        myOrders.forEach((o) => {
          if (!o.createdAt) return;
          const d = new Date(o.createdAt);
          monthlyTotals[d.getMonth()] += Number(o.totalAmount) || 0;
        });
        const monthlyData = MONTH_NAMES.map((name, idx) => ({
          month: name,
          revenue: monthlyTotals[idx],
        })).filter((m) => m.revenue > 0);
        setMonthlyRevenue(monthlyData);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [navigate]);

  return (
    <div>
      <SellerHeader />
      <div className="container py-5 mt-5">
        <h2 className="text-center fw-bold mb-5 Seller_dashboard-title">
          <img
            src={logo}
            alt="Kavi Shawls Logo"
            className="Seller_dashboard-logo"
          />
          📊 Sales Analytics
        </h2>

        {loading ? (
          <p className="text-center">Loading your analytics...</p>
        ) : (
          <>
            <div className="row g-4">
              <div className="col-lg-3 col-md-6">
                <div className="Seller_card shadow border-0 text-center p-4">
                  <h5>Total Sales</h5>
                  <h2 className="text-success">₹{totalSales.toLocaleString()}</h2>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="Seller_card shadow border-0 text-center p-4">
                  <h5>Total Orders</h5>
                  <h2 className="text-primary">{totalOrders}</h2>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="Seller_card shadow border-0 text-center p-4">
                  <h5>Customers</h5>
                  <h2 className="text-warning">{customerCount}</h2>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="Seller_card shadow border-0 text-center p-4">
                  <h5>Return Orders</h5>
                  <h2 className="text-danger">{returnOrders}</h2>
                </div>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-md-6">
                <div className="Seller_card shadow border-0 p-4">
                  <h4 className="mb-3">Top Selling Products</h4>

                  {topProducts.length === 0 ? (
                    <p className="text-muted">No sales data yet.</p>
                  ) : (
                    <table className="table table-bordered">
                      <thead className="table-dark">
                        <tr>
                          <th>Product</th>
                          <th>Sold</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topProducts.map((p, idx) => (
                          <tr key={idx}>
                            <td>{p.title}</td>
                            <td>{p.sold}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              <div className="col-md-6 mt-4">
                <div className="Seller_card shadow border-0 p-4">
                  <h4 className="mb-3">Monthly Performance</h4>

                  {monthlyRevenue.length === 0 ? (
                    <p className="text-muted">No revenue data yet.</p>
                  ) : (
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Month</th>
                          <th>Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        {monthlyRevenue.map((m, idx) => (
                          <tr key={idx}>
                            <td>{m.month}</td>
                            <td>₹{m.revenue.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Analytics;