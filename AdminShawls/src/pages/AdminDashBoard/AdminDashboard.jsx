



// new1






import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  FaBox, FaShoppingCart, FaUsers, FaSignOutAlt, 
  FaSearch, FaPlusCircle, FaEye, FaBars, 
  FaChartLine, FaArrowUp, FaArrowDown, FaStore 
} from "react-icons/fa";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from "recharts";

import logoImage from "../../assets/logooo.png";

function AdminDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  
  // 👉 Real orders fetch karne ke liye state
  const [recentOrders, setRecentOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Backend se orders load karna
  useEffect(() => {
    fetchDashboardOrders();
  }, []);

  const fetchDashboardOrders = async () => {
    try {
      const response = await fetch("https://ecommerce-website-ggui.onrender.com/api/shawls/orders");
      const data = await response.json();
      if (response.ok) {
        setRecentOrders(data);
      }
    } catch (err) {
      console.error("Error fetching dashboard orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const stats = [
    { title: "Total Revenue", value: "₹1,24,500", change: "+12.5%", isPositive: true, icon: <FaChartLine /> },
    { title: "Total Orders", value: recentOrders.length > 0 ? recentOrders.length : "356", change: "+8.2%", isPositive: true, icon: <FaShoppingCart /> },
    { title: "Products in Stock", value: "48", change: "-2.4%", isPositive: false, icon: <FaBox /> },
    { title: "Active Customers", value: "1,204", change: "+18.1%", isPositive: true, icon: <FaUsers /> },
  ];

  // Data for Sales Analytics Bar Chart
  const salesData = [
    { name: "Mon", sales: 12000 },
    { name: "Tue", sales: 19000 },
    { name: "Wed", sales: 15000 },
    { name: "Thu", sales: 22000 },
    { name: "Fri", sales: 30000 },
    { name: "Sat", sales: 25000 },
    { name: "Sun", sales: 35000 },
  ];

  // Data for Category Breakdown Pie Chart
  const categoryData = [
    { name: "Pashmina", value: 45 },
    { name: "Woolen", value: 30 },
    { name: "Stole", value: 15 },
    { name: "Designer", value: 10 },
  ];

  const COLORS = ["#064e3b", "#10b981", "#f59e0b", "#ef4444"];

  // Search filter logic for real recent orders
  const filteredOrders = recentOrders.filter((order) => {
    return (
      (order.fullName && order.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order._id && order._id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.productTitle && order.productTitle.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: "#f0fdf4", minHeight: "100vh", overflowX: "hidden" }}>
      <div className="row">
        
        {/* Mobile Navbar Header */}
        <div className="col-12 d-md-none d-flex justify-content-between align-items-center p-3 text-white shadow-sm" style={{ backgroundColor: "#064e3b" }}>
          <div className="d-flex align-items-center gap-2">
            <img src={logoImage} alt="Logo" style={{ maxHeight: "35px", width: "auto", objectFit: "contain" }} />
            <span className="fw-bold small">ADMIN PANEL</span>
          </div>
          <button 
            className="btn btn-outline-light btn-sm border-0" 
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <FaBars size={22} />
          </button>
        </div>

        {/* Sidebar for Desktop & Mobile Toggle */}
        <nav 
          className={`col-md-3 col-lg-2 d-md-block sidebar text-white min-vh-100 p-3 shadow-sm ${showSidebar ? "d-block" : "d-none d-md-block"}`} 
          style={{ backgroundColor: "#064e3b", position: "fixed", top: 0, bottom: 0, left: 0, zIndex: 1050, transition: "0.3s ease" }}
        >
          <div className="d-flex justify-content-end d-md-none mb-2">
            <button className="btn btn-sm text-white fw-bold" onClick={() => setShowSidebar(false)}>✕ Close</button>
          </div>

          <div className="text-center py-3 border-bottom border-success mb-3">
            <img src={logoImage} alt="Kavi Shawls Logo" style={{ maxHeight: "100px", width: "auto", objectFit: "contain" }} />
            <span className="d-block mt-2 fw-bold text-light small tracking-wider">ADMIN PANEL</span>
          </div>

          <ul className="nav flex-column gap-2 mt-2">
            <li className="nav-item">
              <Link to="/admin/dashboard" className="nav-link text-white active rounded py-2 px-3 shadow-sm" style={{ backgroundColor: "#047857" }}>
                📊 Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/orders" className="nav-link text-white py-2 px-3 rounded">
                📦 Manage Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/users" className="nav-link text-white py-2 px-3 rounded">
                👥 View Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/sellers" className="nav-link text-white py-2 px-3 rounded d-flex align-items-center gap-2">
                <FaStore /> View Sellers
              </Link>
            </li>
            <li className="nav-item mt-4">
              <button 
                onClick={handleLogout} 
                className="btn btn-light w-100 btn-sm d-flex align-items-center justify-content-center gap-2 fw-bold py-2 shadow-sm"
                style={{ color: "#064e3b" }}
              >
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        </nav>

        {/* Main Content Area */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-3 px-md-4 py-4" style={{ marginLeft: "auto" }}>
          
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-3 mb-4 border-bottom gap-3">
            <h1 className="h4 h-md-3 fw-bold m-0" style={{ color: "#064e3b" }}>Dashboard Overview</h1>
          </div>

          {/* Stats Cards */}
          <div className="row g-3 mb-4">
            {stats.map((item, index) => (
              <div className="col-12 col-sm-6 col-md-3" key={index}>
                <div className="card text-white shadow-sm border-0 rounded-4" style={{ backgroundColor: "#064e3b" }}>
                  <div className="card-body py-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="card-title text-light opacity-75 small m-0">{item.title}</h6>
                      <span className="fs-4 opacity-75">{item.icon}</span>
                    </div>
                    <h3 className="fw-bold mb-2">{item.value}</h3>
                    <div className="d-flex align-items-center gap-1 small">
                      <span className="fw-bold d-flex align-items-center gap-1 text-light">
                        {item.isPositive ? <FaArrowUp size={11} /> : <FaArrowDown size={11} />} {item.change}
                      </span>
                      <span className="text-light opacity-75 ms-1">vs last month</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CHARTS SECTION */}
          <div className="row g-4 mb-4">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm p-4 bg-white rounded-4">
                <h5 className="fw-bold mb-3" style={{ color: "#064e3b" }}>Weekly Sales Analytics (₹)</h5>
                <div style={{ width: "100%", height: "300px" }}>
                  <ResponsiveContainer>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#064e3b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card border-0 shadow-sm p-4 bg-white rounded-4">
                <h5 className="fw-bold mb-3" style={{ color: "#064e3b" }}>Top Categories</h5>
                <div style={{ width: "100%", height: "300px" }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders Section */}
          <div className="card shadow-sm border-0 rounded-4 p-2 p-md-3 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3 px-2 pt-2">
              <h5 className="fw-bold m-0 fs-6 fs-md-5" style={{ color: "#064e3b" }}>Recent Orders</h5>
              <Link to="/admin/orders" className="btn btn-sm btn-outline-secondary border-0 fw-semibold text-decoration-none">View All</Link>
            </div>

            <div className="table-responsive">
              <table className="table align-middle table-hover mb-0 text-nowrap">
                <thead className="table-light text-uppercase fs-7 text-muted">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingOrders ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">Loading orders...</td>
                    </tr>
                  ) : filteredOrders.length > 0 ? (
                    filteredOrders.slice(0, 7).map((order) => (
                      <tr key={order._id}>
                        <td className="fw-semibold" style={{ color: "#064e3b" }}>{order._id.slice(-6)}</td>
                        <td>{order.fullName}</td>
                        <td className="text-muted">{order.productTitle}</td>
                        <td className="fw-bold" style={{ color: "#064e3b" }}>₹{order.totalAmount}</td>
                        <td>
                          <span className={`badge px-2 py-1 ${
                            order.orderStatus === "Delivered" ? "bg-success" :
                            order.orderStatus === "Pending" ? "bg-warning text-dark" :
                            order.orderStatus === "Processing" ? "bg-info text-dark" : "bg-danger"
                          }`}>
                            {order.orderStatus || "Processing"}
                          </span>
                        </td>
                        <td>
                          <Link to="/admin/orders" className="btn btn-sm btn-light border" style={{ color: "#064e3b" }}>
                            <FaEye />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">No orders found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;