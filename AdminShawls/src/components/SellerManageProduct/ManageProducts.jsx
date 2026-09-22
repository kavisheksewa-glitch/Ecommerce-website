import React, { useState, useEffect } from "react";
import "./ManageProducts.css";
import logo from "../../assets/logooo.png";
import SellerHeader from "../SellerHeader/SellerHeader";
import API from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MAX_IMAGES = 5;

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
  });

  // Edit mode ke liye multiple images state: [{ file, preview, isExisting, path }]
  const [editImages, setEditImages] = useState([]);

  // Modal states to view all images on click
  const [modalImages, setModalImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModalImage, setActiveModalImage] = useState("");

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("sellerToken");
      const response = await API.get("/api/seller/products", {
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

  const fetchSellerBrand = async () => {
    const token = localStorage.getItem("sellerToken");
    const decoded = token ? decodeToken(token) : null;
    const sellerId = decoded?.id;
    if (!sellerId) return;

    try {
      const res = await API.get(`/api/seller/auth/${sellerId}`, {
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

  // Delete Product Handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("sellerToken");
      await API.delete(`/api/seller/products/delete/${id}`, {
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

  // Helper to process raw image lists for display
  const getProcessedImages = (product) => {
    let rawImageList = [];
    if (Array.isArray(product.productImages) && product.productImages.length > 0) {
      rawImageList = product.productImages;
    } else {
      const single = product.productImage || product.image || "";
      if (single) rawImageList = [single];
    }

    return rawImageList.map((rawImage) =>
      rawImage.startsWith("http")
        ? rawImage
        : `${API.defaults.baseURL}/${rawImage.replace(/\\/g, "/")}`
    );
  };

  // Start Editing Handler (Load existing images into editImages state)
  const handleStartEdit = (product) => {
    const prodId = product._id || product.id;
    setEditingId(prodId);
    setEditForm({
      productName: product.productName || product.name,
      category: product.category,
      price: product.price,
      stockQuantity: product.stockQuantity || product.stock,
    });

    let existingList = [];
    if (Array.isArray(product.productImages) && product.productImages.length > 0) {
      existingList = product.productImages;
    } else {
      const single = product.productImage || product.image;
      if (single) existingList = [single];
    }

    const formattedImages = existingList.map((imgStr) => {
      const fullUrl = imgStr.startsWith("http")
        ? imgStr
        : `${API.defaults.baseURL}/${imgStr.replace(/\\/g, "/")}`;
      return { file: null, preview: fullUrl, isExisting: true, path: imgStr };
    });

    setEditImages(formattedImages);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // Handle adding new images during edit
  const handleEditImageChange = (e) => {
    const selected = Array.from(e.target.files || []);
    e.target.value = "";

    if (selected.length === 0) return;

    const remainingSlots = MAX_IMAGES - editImages.length;
    if (remainingSlots <= 0) {
      toast.warning(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }
    if (selected.length > remainingSlots) {
      toast.warning(`Only ${remainingSlots} more image(s) can be added (max ${MAX_IMAGES})`);
    }

    const newItems = selected
      .slice(0, remainingSlots)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({ file, preview: URL.createObjectURL(file), isExisting: false }));

    setEditImages((prev) => [...prev, ...newItems]);
  };

  const handleRemoveEditImage = (index) => {
    setEditImages((prev) => {
      const target = prev[index];
      if (!target.isExisting && target.preview) {
        URL.revokeObjectURL(target.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleMakeMainEdit = (index) => {
    setEditImages((prev) => {
      const copy = [...prev];
      const [picked] = copy.splice(index, 1);
      return [picked, ...copy];
    });
  };

  const handleCancelEdit = () => {
    editImages.forEach((img) => {
      if (!img.isExisting && img.preview) URL.revokeObjectURL(img.preview);
    });
    setEditingId(null);
    setEditImages([]);
  };

  // Save Edited Product Handler (Sending existing paths + new image files)
  const handleSaveEdit = async (id) => {
    if (!editForm.productName || !editForm.price || !editForm.stockQuantity) {
      toast.error("Please fill out all required fields.", { position: "top-right", autoClose: 2000 });
      return;
    }

    if (editImages.length === 0) {
      toast.error("Please keep at least one product image.", { position: "top-right", autoClose: 2000 });
      return;
    }

    try {
      const token = localStorage.getItem("sellerToken");
      const formData = new FormData();
      
      formData.append("productName", editForm.productName);
      formData.append("category", editForm.category);
      formData.append("price", editForm.price);
      formData.append("stockQuantity", editForm.stockQuantity);

      const existingPaths = [];
      editImages.forEach((img) => {
        if (img.isExisting) {
          existingPaths.push(img.path); // Purani images ke relative/database paths
        } else {
          formData.append("productImages", img.file); // Nayi upload files
        }
      });

      // Purane paths ko JSON string mein convert karke bhejna zaroori hai
      formData.append("existingImages", JSON.stringify(existingPaths));

      const response = await API.put(`/api/seller/products/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data"
        }
      });

      fetchProducts();
      setEditingId(null);
      setEditImages([]);

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

  const handleOpenImageModal = (product) => {
    const images = getProcessedImages(product);
    if (images.length === 0) {
      images.push("https://via.placeholder.com/130");
    }
    setModalImages(images);
    setActiveModalImage(images[0]);
    setIsModalOpen(true);
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

          const processedImages = getProcessedImages(product);
          const prodImage = processedImages.length > 0 ? processedImages[0] : "https://via.placeholder.com/130";

          return (
            <div key={prodId} className="col-12 col-md-6 col-lg-4 col-xl-3">
              <div className="card h-100 shadow-sm border-0 p-3 d-flex flex-column justify-content-between Seller_card">
                <div>
                  {/* Normal View: Main Image Clickable */}
                  {editingId !== prodId && (
                    <div className="text-center mb-3 position-relative">
                      <img
                        src={prodImage}
                        alt={prodName}
                        className="rounded shadow-sm ing"
                        style={{ width: "100px", height: "100px", objectFit: "cover", cursor: "pointer" }}
                        title="Click to view all images"
                        onClick={() => handleOpenImageModal(product)}
                      />
                      {processedImages.length > 1 && (
                        <span 
                          className="badge bg-dark position-absolute bottom-0 start-50 translate-middle-x" 
                          style={{ fontSize: "0.6rem", cursor: "pointer" }}
                          onClick={() => handleOpenImageModal(product)}
                        >
                          +{processedImages.length - 1} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Editing View: Up to 5 Images Management */}
                  {editingId === prodId ? (
                    <div className="mb-3 p-2 bg-light rounded border">
                      <label className="form-label small fw-bold mb-1">
                        Product Images ({editImages.length}/{MAX_IMAGES}):
                      </label>
                      <input
                        type="file"
                        className="form-control form-control-sm mb-2"
                        accept="image/*"
                        multiple
                        disabled={editImages.length >= MAX_IMAGES}
                        onChange={handleEditImageChange}
                      />
                      
                      {/* Edit Image Previews & Make Main / Delete controls */}
                      {editImages.length > 0 && (
                        <div className="d-flex flex-wrap gap-2 mb-2">
                          {editImages.map((img, i) => (
                            <div
                              key={i}
                              className="position-relative border rounded overflow-hidden bg-white"
                              style={{
                                width: 55,
                                height: 55,
                                border: i === 0 ? "2px solid #dfa00b" : undefined,
                              }}
                            >
                              <img
                                src={img.preview}
                                alt={`Preview ${i + 1}`}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              />
                              {i === 0 ? (
                                <span
                                  className="position-absolute bottom-0 start-0 w-100 text-center text-white"
                                  style={{ background: "rgba(223,160,11,0.9)", fontSize: "0.55rem" }}
                                >
                                  Main
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleMakeMainEdit(i)}
                                  className="position-absolute bottom-0 start-0 w-100 border-0 text-white"
                                  style={{ background: "rgba(0,0,0,0.6)", fontSize: "0.55rem", cursor: "pointer" }}
                                >
                                  Main
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleRemoveEditImage(i)}
                                className="position-absolute top-0 end-0 border-0 rounded-circle text-white d-flex align-items-center justify-content-center"
                                style={{ width: 16, height: 16, background: "rgba(220,53,69,0.9)", fontSize: 10, cursor: "pointer" }}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

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
                      
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="fw-bold text-success">
                          ₹{product.discount > 0 
                              ? Math.round(product.price - (product.price * product.discount) / 100) 
                              : product.price}
                        </span>
                        {product.discount > 0 && (
                          <span className="text-decoration-line-through text-muted small">
                            ₹{product.price}
                          </span>
                        )}
                      </div>
                      
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
                    <button className="btn btn-success btn-sm flex-fill" onClick={() => handleStartEdit(product)}>Edit</button>
                    <button className="btn btn-danger btn-sm flex-fill" onClick={() => handleDelete(prodId)}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* VIEW ALL IMAGES POPUP MODAL */}
      {isModalOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.7)", zIndex: 1050 }}
        >
          <div className="bg-white p-4 rounded shadow-lg position-relative" style={{ width: "90%", maxWidth: "500px" }}>
            <button 
              type="button" 
              className="btn-close position-absolute top-0 end-0 m-3" 
              onClick={() => setIsModalOpen(false)}
            ></button>
            
            <h5 className="fw-bold mb-3 text-center">Product Images Preview</h5>
            
            <div className="text-center mb-3 border rounded p-2 bg-light">
              <img 
                src={activeModalImage} 
                alt="Active Preview" 
                className="rounded"
                style={{ width: "100%", height: "280px", objectFit: "contain" }}
              />
            </div>

            <div className="d-flex justify-content-center gap-2 flex-wrap">
              {modalImages.map((imgSrc, idx) => (
                <img
                  key={idx}
                  src={imgSrc}
                  alt={`Thumb ${idx + 1}`}
                  className="rounded border"
                  style={{ 
                    width: "60px", 
                    height: "60px", 
                    objectFit: "cover", 
                    cursor: "pointer",
                    border: activeModalImage === imgSrc ? "2px solid #dfa00b" : "1px solid #ddd"
                  }}
                  onClick={() => setActiveModalImage(imgSrc)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageProducts;