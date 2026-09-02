

//1 september 2026 morning







import React, { useState } from "react";
import "./AddProduct.css";
import logo from "../../assets/logooo.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProduct() {
  const [formData, setFormData] = useState({
    productName: "", category: "", fabric: "", color: "",
    size: "", price: "", discount: "", description: "", stockQuantity: "", washCare: ""
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    for (const key in formData) {
      productData.append(key, formData[key]);
    }
    if (image) {
      productData.append("productImage", image);
    }

    try {
      const token = localStorage.getItem("sellerToken");

      if (!token) {
        toast.error("Please login first to add a product!");
        return;
      }

      const response = await axios.post(
        "https://kavi-shawls.vercel.app/api/seller/products/add",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          },
        }
      );

      toast.success(response.data.message || "Product Added Successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="container py-5 add-product-unique-container mt-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-4 add-product-card">
            <div className="card-body p-5">

              <div className="text-center mb-5">
                <img
                  src={logo}
                  alt="Kavi Shawls Logo"
                  className="Seller_dashboard-logo1 mb-2"
                />
                <h2 className="Seller_dashboard-title mt-2">
                  Add New Product
                </h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Product Name</label>
                  <input type="text" name="productName" className="form-control add-product-input" placeholder="Enter Product Name" required onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Category</label>
                  <select name="category" className="form-select add-product-input" required onChange={handleChange}>
                    <option value="">Select Category</option>
                    <option value="Women's Shawls">Women's Shawls</option>
                    <option value="Men's Shawls">Men's Shawls</option>
                    <option value="Spring Summer Shawls">Spring Summer Shawls</option>
                    <option value="Featured Shawls">Featured Shawls</option>
                    <option value="BirthdayGift Shawls">Birthday Gift Shawls</option>
                    <option value="weddingGift Shawls">wedding Gift Shawls</option>
                    <option value="FestiveGift Shawls">Festive Gift Shawls</option>
                    <option value="LuxuryGift Shawls">Luxury Gift Shawls</option>
                  </select>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Fabric</label>
                    <input type="text" name="fabric" className="form-control add-product-input" placeholder="Pashmina, Wool..." onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Color</label>
                    <input type="text" name="color" className="form-control add-product-input" placeholder="Black" onChange={handleChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label fw-semibold">Wash Care / Instructions</label>
                    <input
                      type="text"
                      name="washCare"
                      className="form-control add-product-input"
                      placeholder="e.g., Dry Clean Only"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">Size</label>
                    <select name="size" className="form-select add-product-input" onChange={handleChange}>
                      <option value="">Select Size</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                      <option value="Free Size">Free Size</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">Price (₹)</label>
                    <input type="number" name="price" className="form-control add-product-input" placeholder="2500" required onChange={handleChange} />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label fw-semibold">Discount (%)</label>
                    <input type="number" name="discount" className="form-control add-product-input" placeholder="10" onChange={handleChange} />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea name="description" className="form-control add-product-input" rows="4" placeholder="Product Description" onChange={handleChange}></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Product Image</label>
                  <input type="file" name="productImage" className="form-control add-product-input" accept="image/*" required onChange={handleImageChange} />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Stock Quantity</label>
                  <input type="number" name="stockQuantity" className="form-control add-product-input" placeholder="50" required onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2 add-product-submit-btn">
                  Add Product
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;