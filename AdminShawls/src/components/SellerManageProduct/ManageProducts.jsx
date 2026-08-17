// import React, { useState } from "react";
// import "./ManageProducts.css";
// import logo from "../assets/logooo.png";
// import SellerHeader from "./SellerHeader";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function ManageProducts() {
//   const [search, setSearch] = useState("");
//   const [products, setProducts] = useState([
//     { id: 1, image: "https://via.placeholder.com/80", name: "Luxury Pashmina Shawl", category: "Pashmina", price: 4500, stock: 25 },
//     { id: 2, image: "https://via.placeholder.com/80", name: "Cashmere Shawl", category: "Cashmere", price: 3800, stock: 5 },
//     { id: 3, image: "https://via.placeholder.com/80", name: "Silk Shawl", category: "Silk", price: 2500, stock: 0 },
//     { id: 4, image: "https://via.placeholder.com/80", name: "Designer Shawl", category: "Designer", price: 5200, stock: 10 },
//   ]);

//   // State for tracking which product is being edited
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({ name: "", category: "", price: "", stock: "" });

//   const filteredProducts = products.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   // Delete Product Handler
//   const handleDelete = (id) => {
//     setProducts(products.filter((item) => item.id !== id));
//     toast.error("Product deleted successfully!", {
//       position: "top-right",
//       autoClose: 2000,
//     });
//   };

//   // Start Editing Handler
//   const handleStartEdit = (product) => {
//     setEditingId(product.id);
//     setEditForm({ name: product.name, category: product.category, price: product.price, stock: product.stock });
//   };

//   // Handle Edit Input Change
//   const handleEditChange = (e) => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   // Save Edited Product Handler
//   const handleSaveEdit = (id) => {
//     if (!editForm.name || !editForm.price || !editForm.stock) {
//       toast.error("Please fill out all required fields.", { position: "top-right", autoClose: 2000 });
//       return;
//     }

//     setProducts(
//       products.map((item) => (item.id === id ? { ...item, ...editForm, price: Number(editForm.price), stock: Number(editForm.stock) } : item))
//     );
//     setEditingId(null);
//     toast.success("Product updated successfully!", {
//       position: "top-right",
//       autoClose: 2000,
//     });
//   };

//   // Cancel Edit
//   const handleCancelEdit = () => {
//     setEditingId(null);
//   };

//   return (
//     <div className="container py-5 mt-5">
//       <ToastContainer />
//       <SellerHeader />
      
//       {/* Title & Logo */}
//       <h2 className="text-center fw-bold mb-5 d-flex flex-column align-items-center Seller_dashboard-title">
//         <img src={logo} alt="Logo" className="mb-2" style={{ width: "80px" }} />
//         Manage Products
//       </h2>

//       {/* Search Bar */}
//       <div className="mb-4">
//         <input
//           type="text"
//           className="form-control shadow-sm"
//           placeholder="🔍 Search Product by name..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Grid Layout */}
//       <div className="row g-4">
//         {filteredProducts.map((product) => (
//           <div key={product.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
//             <div className="card h-100 shadow-sm border-0 p-3 d-flex flex-column justify-content-between Seller_card">
//               <div>
//                 <div className="text-center">
//                   <img src={product.image} alt={product.name} className="rounded mb-3" style={{ width: "100px" }} />
//                 </div>

//                 {editingId === product.id ? (
//                   /* Inline Edit Form */
//                   <div className="mb-3 p-2 bg-light rounded border">
//                     <input
//                       type="text"
//                       className="form-control form-control-sm mb-2"
//                       name="name"
//                       value={editForm.name}
//                       onChange={handleEditChange}
//                       placeholder="Product Name"
//                     />
//                     <input
//                       type="text"
//                       className="form-control form-control-sm mb-2"
//                       name="category"
//                       value={editForm.category}
//                       onChange={handleEditChange}
//                       placeholder="Category"
//                     />
//                     <input
//                       type="number"
//                       className="form-control form-control-sm mb-2"
//                       name="price"
//                       value={editForm.price}
//                       onChange={handleEditChange}
//                       placeholder="Price"
//                     />
//                     <input
//                       type="number"
//                       className="form-control form-control-sm mb-2"
//                       name="stock"
//                       value={editForm.stock}
//                       onChange={handleEditChange}
//                       placeholder="Stock"
//                     />
//                     <div className="d-flex gap-2">
//                       <button className="btn btn-success btn-sm w-50" onClick={() => handleSaveEdit(product.id)}>Save</button>
//                       <button className="btn btn-secondary btn-sm w-50" onClick={handleCancelEdit}>Cancel</button>
//                     </div>
//                   </div>
//                 ) : (
//                   /* Normal View */
//                   <>
//                     <h5 className="fw-bold">{product.name}</h5>
//                     <p className="text-muted mb-1 small">Category: {product.category}</p>
//                     <p className="fw-bold text-primary mb-1">₹{product.price}</p>
//                     <p className="small">Stock: {product.stock} units</p>
                    
//                     {/* Status Badge */}
//                     <div className="mb-3">
//                       <span className={`badge ${product.stock === 0 ? "bg-danger" : product.stock <= 5 ? "bg-warning text-dark" : "bg-success"}`}>
//                         {product.stock === 0 ? "Out of Stock" : product.stock <= 5 ? "Low Stock" : "Available"}
//                       </span>
//                     </div>
//                   </>
//                 )}
//               </div>

//               {/* Action Buttons */}
//               {editingId !== product.id && (
//                 <div className="d-flex gap-2 mt-auto">
//                   <button className="btn btn-primary btn-sm flex-fill" onClick={() => handleStartEdit(product)}>Edit</button>
//                   <button className="btn btn-outline-danger btn-sm flex-fill" onClick={() => handleDelete(product.id)}>Delete</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ManageProducts;







// newwwwwwww

// import React, { useState, useEffect } from "react";
// import "./ManageProducts.css";
// import logo from "../assets/logooo.png";
// import SellerHeader from "./SellerHeader";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function ManageProducts() {
//   const [search, setSearch] = useState("");
//   const [products, setProducts] = useState([]);
  
//   // State for tracking which product is being edited
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({ 
//     productName: "", 
//     category: "", 
//     price: "", 
//     stockQuantity: "" 
//   });

//   // Fetch products from the database when the component loads
//   const fetchProducts = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("http://localhost:5000/api/seller/products", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setProducts(response.data.products || response.data);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch products", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const filteredProducts = products.filter((item) =>
//     (item.productName || item.name || "").toLowerCase().includes(search.toLowerCase())
//   );

//   // Delete Product Handler (Database + UI)
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;

//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:5000/api/seller/products/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setProducts(products.filter((item) => (item._id || item.id) !== id));
//       toast.error("Product deleted successfully!", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to delete product", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     }
//   };

//   // Start Editing Handler
//   const handleStartEdit = (product) => {
//     setEditingId(product._id || product.id);
//     setEditForm({ 
//       productName: product.productName || product.name, 
//       category: product.category, 
//       price: product.price, 
//       stockQuantity: product.stockQuantity || product.stock 
//     });
//   };

//   // Handle Edit Input Change
//   const handleEditChange = (e) => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   // Save Edited Product Handler (Database + UI)
//   const handleSaveEdit = async (id) => {
//     if (!editForm.productName || !editForm.price || !editForm.stockQuantity) {
//       toast.error("Please fill out all required fields.", { position: "top-right", autoClose: 2000 });
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.put(`http://localhost:5000/api/seller/products/update/${id}`, editForm, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       // Refresh product list from database to ensure sync
//       fetchProducts();
//       setEditingId(null);
      
//       toast.success(response.data.message || "Product updated successfully!", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update product", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     }
//   };

//   // Cancel Edit
//   const handleCancelEdit = () => {
//     setEditingId(null);
//   };

//   return (
//     <div className="container py-5 mt-5">
//       <ToastContainer />
//       <SellerHeader />
      
//       {/* Title & Logo */}
//       <h2 className="text-center fw-bold mb-5 d-flex flex-column align-items-center Seller_dashboard-title">
//         <img src={logo} alt="Logo" className="mb-2" style={{ width: "80px" }} />
//         Manage Products
//       </h2>

//       {/* Search Bar */}
//       <div className="mb-4">
//         <input
//           type="text"
//           className="form-control shadow-sm"
//           placeholder="🔍 Search Product by name..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Grid Layout */}
//       <div className="row g-4">
//         {filteredProducts.map((product) => {
//           const prodId = product._id || product.id;
//           const prodName = product.productName || product.name;
//           const prodStock = product.stockQuantity !== undefined ? product.stockQuantity : product.stock;
//           const rawImage = product.productImage || product.image || "";
// const prodImage = rawImage.startsWith("http") 
//   ? rawImage 
//   : rawImage 
//     ? `http://localhost:5000/${rawImage.replace(/\\/g, "/")}` 
//     : "https://via.placeholder.com/80";

//           return (
//             <div key={prodId} className="col-12 col-md-6 col-lg-4 col-xl-3">
//               <div className="card h-100 shadow-sm border-0 p-3 d-flex flex-column justify-content-between Seller_card">
//                 <div>
//                   <div className="text-center">
//                     <img src={prodImage} alt={prodName} className="rounded mb-3 ing" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
//                   </div>

//                   {editingId === prodId ? (
//                     /* Inline Edit Form */
//                     <div className="mb-3 p-2 bg-light rounded border">
//                       <input
//                         type="text"
//                         className="form-control form-control-sm mb-2"
//                         name="productName"
//                         value={editForm.productName}
//                         onChange={handleEditChange}
//                         placeholder="Product Name"
//                       />
//                       <input
//                         type="text"
//                         className="form-control form-control-sm mb-2"
//                         name="category"
//                         value={editForm.category}
//                         onChange={handleEditChange}
//                         placeholder="Category"
//                       />
//                       <input
//                         type="number"
//                         className="form-control form-control-sm mb-2"
//                         name="price"
//                         value={editForm.price}
//                         onChange={handleEditChange}
//                         placeholder="Price"
//                       />
//                       <input
//                         type="number"
//                         className="form-control form-control-sm mb-2"
//                         name="stockQuantity"
//                         value={editForm.stockQuantity}
//                         onChange={handleEditChange}
//                         placeholder="Stock Quantity"
//                       />
//                       <div className="d-flex gap-2">
//                         <button className="btn btn-success btn-sm w-50" onClick={() => handleSaveEdit(prodId)}>Save</button>
//                         <button className="btn btn-secondary btn-sm w-50" onClick={handleCancelEdit}>Cancel</button>
//                       </div>
//                     </div>
//                   ) : (
//                     /* Normal View */
//                     <>
//                       <h5 className="fw-bold">{prodName}</h5>
//                       <p className="text-muted mb-1 small">Category: {product.category}</p>
//                       <p className="fw-bold text-primary mb-1">₹{product.price}</p>
//                       <p className="small">Stock: {prodStock} units</p>
                      
//                       {/* Status Badge */}
//                       <div className="mb-3">
//                         <span className={`badge ${prodStock === 0 ? "bg-danger" : prodStock <= 5 ? "bg-warning text-dark" : "bg-success"}`}>
//                           {prodStock === 0 ? "Out of Stock" : prodStock <= 5 ? "Low Stock" : "Available"}
//                         </span>
//                       </div>
//                     </>
//                   )}
//                 </div>

//                 {/* Action Buttons */}
//                 {editingId !== prodId && (
//                   <div className="d-flex gap-2 mt-auto">
//                     <button className="btn btn-primary btn-sm flex-fill" onClick={() => handleStartEdit(product)}>Edit</button>
//                     <button className="btn btn-outline-danger btn-sm flex-fill" onClick={() => handleDelete(prodId)}>Delete</button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default ManageProducts;









// import React, { useState, useEffect } from "react";
// import "./ManageProducts.css";
// import logo from "../assets/logooo.png";
// import SellerHeader from "./SellerHeader";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function ManageProducts() {
//   const [search, setSearch] = useState("");
//   const [products, setProducts] = useState([]);
  
//   // State for tracking which product is being edited
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({ 
//     productName: "", 
//     category: "", 
//     price: "", 
//     stockQuantity: "",
//     productImage: null // Image file track karne ke liye
//   });

//   // Fetch products from the database when the component loads
//   const fetchProducts = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("http://localhost:5000/api/seller/products", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setProducts(response.data.products || response.data);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch products", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const filteredProducts = products.filter((item) =>
//     (item.productName || item.name || "").toLowerCase().includes(search.toLowerCase())
//   );

//   // Delete Product Handler (Database + UI)
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;

//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:5000/api/seller/products/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setProducts(products.filter((item) => (item._id || item.id) !== id));
//       toast.error("Product deleted successfully!", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to delete product", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     }
//   };

//   // Start Editing Handler
//   const handleStartEdit = (product) => {
//     setEditingId(product._id || product.id);
//     setEditForm({ 
//       productName: product.productName || product.name, 
//       category: product.category, 
//       price: product.price, 
//       stockQuantity: product.stockQuantity || product.stock,
//       productImage: null // Reset image input on start edit
//     });
//   };

//   // Handle Edit Input Change (Text vs File)
//   const handleEditChange = (e) => {
//     if (e.target.name === "productImage") {
//       setEditForm({ ...editForm, productImage: e.target.files[0] });
//     } else {
//       setEditForm({ ...editForm, [e.target.name]: e.target.value });
//     }
//   };

//   // Save Edited Product Handler (Database + UI using FormData)
//   const handleSaveEdit = async (id) => {
//     if (!editForm.productName || !editForm.price || !editForm.stockQuantity) {
//       toast.error("Please fill out all required fields.", { position: "top-right", autoClose: 2000 });
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
      
//       // FormData ka use karna zaroori hai jab file/image bhi bhejni ho
//       const formData = new FormData();
//       formData.append("productName", editForm.productName);
//       formData.append("category", editForm.category);
//       formData.append("price", editForm.price);
//       formData.append("stockQuantity", editForm.stockQuantity);
      
//       if (editForm.productImage) {
//         formData.append("productImage", editForm.productImage);
//       }

//       const response = await axios.put(`http://localhost:5000/api/seller/products/update/${id}`, formData, {
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data"
//         }
//       });

//       // Refresh product list from database to ensure sync
//       fetchProducts();
//       setEditingId(null);
      
//       toast.success(response.data.message || "Product updated successfully!", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update product", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     }
//   };

//   // Cancel Edit
//   const handleCancelEdit = () => {
//     setEditingId(null);
//   };

//   return (
//     <div className="container py-5 mt-5">
//       <ToastContainer />
//       <SellerHeader />
      
//       {/* Title & Logo */}
//       <h2 className="text-center fw-bold mb-5 d-flex flex-column align-items-center Seller_dashboard-title">
//         <img src={logo} alt="Logo" className="mb-2" style={{ width: "80px" }} />
//         Manage Products
//       </h2>

//       {/* Search Bar */}
//       <div className="mb-4">
//         <input
//           type="text"
//           className="form-control shadow-sm"
//           placeholder="🔍 Search Product by name..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Grid Layout */}
//       <div className="row g-4">
//         {filteredProducts.map((product) => {
//           const prodId = product._id || product.id;
//           const prodName = product.productName || product.name;
//           const prodStock = product.stockQuantity !== undefined ? product.stockQuantity : product.stock;
//           const rawImage = product.productImage || product.image || "";
//           const prodImage = rawImage.startsWith("http") 
//             ? rawImage 
//             : rawImage 
//               ? `http://localhost:5000/${rawImage.replace(/\\/g, "/")}` 
//               : "https://via.placeholder.com/80";

//           return (
//             <div key={prodId} className="col-12 col-md-6 col-lg-4 col-xl-3">
//               <div className="card h-100 shadow-sm border-0 p-3 d-flex flex-column justify-content-between Seller_card">
//                 <div>
//                   <div className="text-center">
//                     <img src={prodImage} alt={prodName} className="rounded mb-3" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
//                   </div>

//                   {editingId === prodId ? (
//                     /* Inline Edit Form with Image Upload Field */
//                     <div className="mb-3 p-2 bg-light rounded border">
//                       <label className="form-label small fw-bold mb-1">Product Name</label>
//                       <input
//                         type="text"
//                         className="form-control form-control-sm mb-2"
//                         name="productName"
//                         value={editForm.productName}
//                         onChange={handleEditChange}
//                         placeholder="Product Name"
//                       />
                      
//                       <label className="form-label small fw-bold mb-1">Category</label>
//                       <input
//                         type="text"
//                         className="form-control form-control-sm mb-2"
//                         name="category"
//                         value={editForm.category}
//                         onChange={handleEditChange}
//                         placeholder="Category"
//                       />
                      
//                       <label className="form-label small fw-bold mb-1">Price</label>
//                       <input
//                         type="number"
//                         className="form-control form-control-sm mb-2"
//                         name="price"
//                         value={editForm.price}
//                         onChange={handleEditChange}
//                         placeholder="Price"
//                       />
                      
//                       <label className="form-label small fw-bold mb-1">Stock Quantity</label>
//                       <input
//                         type="number"
//                         className="form-control form-control-sm mb-2"
//                         name="stockQuantity"
//                         value={editForm.stockQuantity}
//                         onChange={handleEditChange}
//                         placeholder="Stock Quantity"
//                       />

//                       {/* Image Update Field */}
//                       <label className="form-label small fw-bold mb-1">Update Image (Optional)</label>
//                       <input
//                         type="file"
//                         className="form-control form-control-sm mb-2"
//                         name="productImage"
//                         accept="image/*"
//                         onChange={handleEditChange}
//                       />

//                       <div className="d-flex gap-2 mt-2">
//                         <button className="btn btn-success btn-sm w-50" onClick={() => handleSaveEdit(prodId)}>Save</button>
//                         <button className="btn btn-secondary btn-sm w-50" onClick={handleCancelEdit}>Cancel</button>
//                       </div>
//                     </div>
//                   ) : (
//                     /* Normal View */
//                     <>
//                       <h5 className="fw-bold">{prodName}</h5>
//                       <p className="text-muted mb-1 small">Category: {product.category}</p>
//                       <p className="fw-bold text-primary mb-1">₹{product.price}</p>
//                       <p className="small">Stock: {prodStock} units</p>
                      
//                       {/* Status Badge */}
//                       <div className="mb-3">
//                         <span className={`badge ${prodStock === 0 ? "bg-danger" : prodStock <= 5 ? "bg-warning text-dark" : "bg-success"}`}>
//                           {prodStock === 0 ? "Out of Stock" : prodStock <= 5 ? "Low Stock" : "Available"}
//                         </span>
//                       </div>
//                     </>
//                   )}
//                 </div>

//                 {/* Action Buttons */}
//                 {editingId !== prodId && (
//                   <div className="d-flex gap-2 mt-auto">
//                     <button className="btn btn-primary btn-sm flex-fill" onClick={() => handleStartEdit(product)}>Edit</button>
//                     <button className="btn btn-outline-danger btn-sm flex-fill" onClick={() => handleDelete(prodId)}>Delete</button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default ManageProducts;









import React, { useState, useEffect } from "react";
import "./ManageProducts.css";
//import logo from "../assets/logooo.png";
import logo from "../../assets/logooo.png";
//import SellerHeader from "../SellerHeader";
import SellerHeader from "../SellerHeader/SellerHeader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ManageProducts() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  
  // State for tracking which product is being edited
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ 
    productName: "", 
    category: "", 
    price: "", 
    stockQuantity: "",
    productImage: null // Image ke liye field add kiya gaya hai
  });

  // Fetch products from the database when the component loads
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/seller/products", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data.products || response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch products", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((item) =>
    (item.productName || item.name || "").toLowerCase().includes(search.toLowerCase())
  );

  // Delete Product Handler (Database + UI)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/seller/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setProducts(products.filter((item) => (item._id || item.id) !== id));
      toast.error("Product deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // Start Editing Handler
  const handleStartEdit = (product) => {
    setEditingId(product._id || product.id);
    setEditForm({ 
      productName: product.productName || product.name, 
      category: product.category, 
      price: product.price, 
      stockQuantity: product.stockQuantity || product.stock,
      productImage: null 
    });
  };

  // Handle Edit Input Change (Text aur File dono ke liye)
  const handleEditChange = (e) => {
    if (e.target.name === "productImage") {
      setEditForm({ ...editForm, productImage: e.target.files[0] });
    } else {
      setEditForm({ ...editForm, [e.target.name]: e.target.value });
    }
  };

  // Save Edited Product Handler (Database + UI)
  const handleSaveEdit = async (id) => {
    if (!editForm.productName || !editForm.price || !editForm.stockQuantity) {
      toast.error("Please fill out all required fields.", { position: "top-right", autoClose: 2000 });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      
      // FormData ka use image file bhejne ke liye kiya gaya hai
      const formData = new FormData();
      formData.append("productName", editForm.productName);
      formData.append("category", editForm.category);
      formData.append("price", editForm.price);
      formData.append("stockQuantity", editForm.stockQuantity);
      
      if (editForm.productImage) {
        formData.append("productImage", editForm.productImage);
      }

      const response = await axios.put(`http://localhost:5000/api/seller/products/update/${id}`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      // Refresh product list from database to ensure sync
      fetchProducts();
      setEditingId(null);
      
      toast.success(response.data.message || "Product updated successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // Cancel Edit
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="container py-5 mt-5">
      <ToastContainer />
      <SellerHeader />
      
      {/* Title & Logo */}
      <h2 className="text-center fw-bold mb-5 d-flex flex-column align-items-center Seller_dashboard-title">
        <img src={logo} alt="Logo" className="mb-2" style={{ width: "80px" }} />
        Manage Products
      </h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control shadow-sm"
          placeholder="🔍 Search Product by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid Layout */}
      <div className="row g-4">
        {filteredProducts.map((product) => {
          const prodId = product._id || product.id;
          const prodName = product.productName || product.name;
          const prodStock = product.stockQuantity !== undefined ? product.stockQuantity : product.stock;
          const rawImage = product.productImage || product.image || "";
          const prodImage = rawImage.startsWith("http") 
            ? rawImage 
            : rawImage 
              ? `http://localhost:5000/${rawImage.replace(/\\/g, "/")}` 
              : "https://via.placeholder.com/130";

          return (
            <div key={prodId} className="col-12 col-md-6 col-lg-4 col-xl-3">
              <div className="card h-100 shadow-sm border-0 p-3 d-flex flex-column justify-content-between Seller_card">
                <div>
                  {/* Image size 130px aur proper styling ke sath */}
                  <div className="text-center mb-3">
                    <img 
                      src={editForm.productImage && editingId === prodId ? URL.createObjectURL(editForm.productImage) : prodImage} 
                      alt={prodName} 
                      className="rounded shadow-sm ing" 
                      style={{ width: "100px", height: "100px", objectFit: "cover",  }} 
                    />
                  </div>

                  {editingId === prodId ? (
                    /* Inline Edit Form with Image Input */
                    <div className="mb-3 p-2 bg-light rounded border">
                      <label className="form-label small fw-bold mb-1">Change Image:</label>
                      <input
                        type="file"
                        className="form-control form-control-sm mb-2"
                        name="productImage"
                        accept="image/*"
                        onChange={handleEditChange}
                      />
                      <input
                        type="text"
                        className="form-control form-control-sm mb-2"
                        name="productName"
                        value={editForm.productName}
                        onChange={handleEditChange}
                        placeholder="Product Name"
                      />
                      <input
                        type="text"
                        className="form-control form-control-sm mb-2"
                        name="category"
                        value={editForm.category}
                        onChange={handleEditChange}
                        placeholder="Category"
                      />
                      <input
                        type="number"
                        className="form-control form-control-sm mb-2"
                        name="price"
                        value={editForm.price}
                        onChange={handleEditChange}
                        placeholder="Price"
                      />
                      <input
                        type="number"
                        className="form-control form-control-sm mb-2"
                        name="stockQuantity"
                        value={editForm.stockQuantity}
                        onChange={handleEditChange}
                        placeholder="Stock Quantity"
                      />
                      <div className="d-flex gap-2">
                        <button className="btn btn-success btn-sm w-50" onClick={() => handleSaveEdit(prodId)}>Save</button>
                        <button className="btn btn-secondary btn-sm w-50" onClick={handleCancelEdit}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    /* Normal View */
                    <>
                      <h5 className="fw-bold">{prodName}</h5>
                      <p className="text-muted mb-1 small">Category: {product.category}</p>
                      <p className="fw-bold text-primary mb-1">₹{product.price}</p>
                      <p className="small">Stock: {prodStock} units</p>
                      
                      {/* Status Badge */}
                      <div className="mb-3">
                        <span className={`badge ${prodStock === 0 ? "bg-danger" : prodStock <= 5 ? "bg-warning text-dark" : "bg-success"}`}>
                          {prodStock === 0 ? "Out of Stock" : prodStock <= 5 ? "Low Stock" : "Available"}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                {editingId !== prodId && (
                  <div className="d-flex gap-2 mt-auto">
                    <button className="btn btn-primary btn-sm flex-fill" onClick={() => handleStartEdit(product)}>Edit</button>
                    <button className="btn btn-outline-danger btn-sm flex-fill" onClick={() => handleDelete(prodId)}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ManageProducts;