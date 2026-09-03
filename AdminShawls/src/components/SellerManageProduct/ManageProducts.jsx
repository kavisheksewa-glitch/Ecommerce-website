



// import React, { useState, useEffect } from "react";
// import "./ManageProducts.css";
// import logo from "../../assets/logooo.png";
// import SellerHeader from "../SellerHeader/SellerHeader";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function decodeToken(token) {
//   try {
//     const payload = token.split(".")[1];
//     return JSON.parse(atob(payload));
//   } catch (err) {
//     return null;
//   }
// }

// function ManageProducts() {
//   const [search, setSearch] = useState("");
//   const [products, setProducts] = useState([]);
//   const [sellerBrand, setSellerBrand] = useState({ brandName: "", brandLogo: "" });

//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({
//     productName: "",
//     category: "",
//     price: "",
//     stockQuantity: "",
//     productImage: null,
//   });

//   const fetchProducts = async () => {
//     try {
//       const token = localStorage.getItem("sellerToken");
//       const response = await axios.get("https://ecommerce-website-ggui.onrender.com/api/seller/products", {
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

//   // Seller ka current brand info fetch karo (Settings.jsx jaisa hi endpoint)
//   const fetchSellerBrand = async () => {
//     const token = localStorage.getItem("sellerToken");
//     const decoded = token ? decodeToken(token) : null;
//     const sellerId = decoded?.id;
//     if (!sellerId) return;

//     try {
//       const res = await axios.get(`https://ecommerce-website-ggui.onrender.com/api/seller/auth/${sellerId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setSellerBrand({
//         brandName: res.data.brandName || "",
//         brandLogo: res.data.brandLogo || "",
//       });
//     } catch (error) {
//       console.log("Failed to fetch seller brand info", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchSellerBrand();
//   }, []);

//   const filteredProducts = products.filter((item) =>
//     (item.productName || item.name || "").toLowerCase().includes(search.toLowerCase())
//   );

//   // Delete Product Handler (Database + UI)
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;

//     try {
//       const token = localStorage.getItem("sellerToken");
//       await axios.delete(`https://ecommerce-website-ggui.onrender.com/api/seller/products/delete/${id}`, {
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
//       productImage: null,
//     });
//   };

//   // Handle Edit Input Change (Text aur File dono ke liye)
//   const handleEditChange = (e) => {
//     if (e.target.name === "productImage") {
//       setEditForm({ ...editForm, productImage: e.target.files[0] });
//     } else {
//       setEditForm({ ...editForm, [e.target.name]: e.target.value });
//     }
//   };

//   // Save Edited Product Handler (Database + UI)
//   const handleSaveEdit = async (id) => {
//     if (!editForm.productName || !editForm.price || !editForm.stockQuantity) {
//       toast.error("Please fill out all required fields.", { position: "top-right", autoClose: 2000 });
//       return;
//     }

//     try {
//       const token = localStorage.getItem("sellerToken");

//       const formData = new FormData();
//       formData.append("productName", editForm.productName);
//       formData.append("category", editForm.category);
//       formData.append("price", editForm.price);
//       formData.append("stockQuantity", editForm.stockQuantity);

//       if (editForm.productImage) {
//         formData.append("productImage", editForm.productImage);
//       }

//       const response = await axios.put(`https://ecommerce-website-ggui.onrender.com/api/seller/products/update/${id}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data"
//         }
//       });

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

//   const handleCancelEdit = () => {
//     setEditingId(null);
//   };

//   return (
//     <div className="container py-5 mt-5">
//       <ToastContainer />
//       <SellerHeader />

//       <h2 className="text-center fw-bold mb-5 d-flex flex-column align-items-center Seller_dashboard-title">
//         <img src={logo} alt="Logo" className="mb-2" style={{ width: "80px" }} />
//         Manage Products
//       </h2>

//       <div className="mb-4">
//         <input
//           type="text"
//           className="form-control shadow-sm"
//           placeholder="🔍 Search Product by name..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <div className="row g-4">
//         {filteredProducts.map((product) => {
//           const prodId = product._id || product.id;
//           const prodName = product.productName || product.name;
//           const prodStock = product.stockQuantity !== undefined ? product.stockQuantity : product.stock;
          
//           const rawImage = product.productImage || product.image || "";
//           const prodImage = rawImage.startsWith("http")
//             ? rawImage
//             : rawImage
//             ? `https://ecommerce-website-ggui.onrender.com/${rawImage.replace(/\\/g, "/")}`
//             : "https://via.placeholder.com/130";

//           const rawLogo = sellerBrand.brandLogo || "";
//           const prodLogo = rawLogo.startsWith("http")
//             ? rawLogo
//             : rawLogo
//             ? `https://ecommerce-website-ggui.onrender.com/${rawLogo.replace(/\\/g, "/")}`
//             : "";

//           return (
//             <div key={prodId} className="col-12 col-md-6 col-lg-4 col-xl-3">
//               <div className="card h-100 shadow-sm border-0 p-3 d-flex flex-column justify-content-between Seller_card">
//                 <div>
//                   <div className="text-center mb-3 position-relative">
//                     <img
//                       src={editForm.productImage && editingId === prodId ? URL.createObjectURL(editForm.productImage) : prodImage}
//                       alt={prodName}
//                       className="rounded shadow-sm ing"
//                       style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                     />
//                     {/* Brand Logo Display on Card — seller ke profile se aata hai, yahan sirf dikhaya jaata hai */}
//                     {prodLogo && (
//                       <div className="mt-2">
//                         <img
//                           src={prodLogo}
//                           alt="Brand Logo"
//                           className="rounded-circle border bg-white shadow-sm"
//                           style={{ width: "70px", height: "70px", objectFit: "cover" }}
//                         />
//                       </div>
//                     )}
//                   </div>

//                   {editingId === prodId ? (
//                     <div className="mb-3 p-2 bg-light rounded border">
//                       <label className="form-label small fw-bold mb-1">Change Image:</label>
//                       <input
//                         type="file"
//                         className="form-control form-control-sm mb-2"
//                         name="productImage"
//                         accept="image/*"
//                         onChange={handleEditChange}
//                       />

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
//                     <>
//                       <h5 className="fw-bold">{prodName}</h5>
//                       <p className="text-muted mb-1 small">Category: {product.category}</p>
//                       <p className="fw-bold text-primary mb-1">₹{product.price}</p>
//                       <p className="small">Stock: {prodStock} units</p>

//                       <div className="mb-3">
//                         <span className={`badge ${prodStock === 0 ? "bg-danger" : prodStock <= 5 ? "bg-warning text-dark" : "bg-success"}`}>
//                           {prodStock === 0 ? "Out of Stock" : prodStock <= 5 ? "Low Stock" : "Available"}
//                         </span>
//                       </div>
//                     </>
//                   )}
//                 </div>

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



//3 sept remove brand logo and stock right





import React, { useState, useEffect } from "react";
import "./ManageProducts.css";
import logo from "../../assets/logooo.png";
import SellerHeader from "../SellerHeader/SellerHeader";
import axios from "axios";
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

function ManageProducts() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [sellerBrand, setSellerBrand] = useState({ brandName: "", brandLogo: "" });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    productName: "",
    category: "",
    price: "",
    stockQuantity: "",
    productImage: null,
  });

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("sellerToken");
      const response = await axios.get("https://ecommerce-website-ggui.onrender.com/api/seller/products", {
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

  // Seller ka current brand info fetch karo (Settings.jsx jaisa hi endpoint)
  const fetchSellerBrand = async () => {
    const token = localStorage.getItem("sellerToken");
    const decoded = token ? decodeToken(token) : null;
    const sellerId = decoded?.id;
    if (!sellerId) return;

    try {
      const res = await axios.get(`https://ecommerce-website-ggui.onrender.com/api/seller/auth/${sellerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSellerBrand({
        brandName: res.data.brandName || "",
        brandLogo: res.data.brandLogo || "",
      });
    } catch (error) {
      console.log("Failed to fetch seller brand info", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSellerBrand();
  }, []);

  const filteredProducts = products.filter((item) =>
    (item.productName || item.name || "").toLowerCase().includes(search.toLowerCase())
  );

  // Delete Product Handler (Database + UI)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("sellerToken");
      await axios.delete(`https://ecommerce-website-ggui.onrender.com/api/seller/products/delete/${id}`, {
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
      productImage: null,
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
      const token = localStorage.getItem("sellerToken");

      const formData = new FormData();
      formData.append("productName", editForm.productName);
      formData.append("category", editForm.category);
      formData.append("price", editForm.price);
      formData.append("stockQuantity", editForm.stockQuantity);

      if (editForm.productImage) {
        formData.append("productImage", editForm.productImage);
      }

      const response = await axios.put(`https://ecommerce-website-ggui.onrender.com/api/seller/products/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

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

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="container py-5 mt-5">
      <ToastContainer />
      <SellerHeader />

      <h2 className="text-center fw-bold mb-5 d-flex flex-column align-items-center Seller_dashboard-title">
        <img src={logo} alt="Logo" className="mb-2" style={{ width: "80px" }} />
        Manage Products
      </h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control shadow-sm"
          placeholder="🔍 Search Product by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row g-4">
        {filteredProducts.map((product) => {
          const prodId = product._id || product.id;
          const prodName = product.productName || product.name;
          const prodStock = product.stockQuantity !== undefined ? product.stockQuantity : product.stock;

          const rawImage = product.productImage || product.image || "";
          const prodImage = rawImage.startsWith("http")
            ? rawImage
            : rawImage
            ? `https://ecommerce-website-ggui.onrender.com/${rawImage.replace(/\\/g, "/")}`
            : "https://via.placeholder.com/130";

          return (
            <div key={prodId} className="col-12 col-md-6 col-lg-4 col-xl-3">
              <div className="card h-100 shadow-sm border-0 p-3 d-flex flex-column justify-content-between Seller_card">
                <div>
                  <div className="text-center mb-3 position-relative">
                    <img
                      src={editForm.productImage && editingId === prodId ? URL.createObjectURL(editForm.productImage) : prodImage}
                      alt={prodName}
                      className="rounded shadow-sm ing"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  </div>

                  {editingId === prodId ? (
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
                    <>
                      <h5 className="fw-bold">{prodName}</h5>
                      <p className="text-muted mb-1 small">Category: {product.category}</p>
                      <p className="fw-bold text-primary mb-1">₹{product.price}</p>

                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="small">Stock: {prodStock} units</span>
                        <span className={`badge ${prodStock === 0 ? "bg-danger" : prodStock <= 5 ? "bg-warning text-dark" : "bg-success"}`}>
                          {prodStock === 0 ? "Out of Stock" : prodStock <= 5 ? "Low Stock" : "Available"}
                        </span>
                      </div>
                    </>
                  )}
                </div>

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