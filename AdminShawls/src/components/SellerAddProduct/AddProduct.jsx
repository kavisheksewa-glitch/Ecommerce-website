import React, { useState, useEffect } from "react";
import "./AddProduct.css";
import logo from "../../assets/logooo.png";
import API from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MAX_IMAGES = 5;

function AddProduct() {
  const [formData, setFormData] = useState({
    productName: "", category: "", fabric: "", color: "",
    size: "", price: "", discount: "", description: "", stockQuantity: "", washCare: ""
  });

  // Multiple images: [{ file, preview }]
  const [images, setImages] = useState([]);

  // Loader state
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Memory leak se bachne ke liye previews revoke karo (unmount par)
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files || []);
    // same file dobara select kar sake, isliye input reset
    e.target.value = "";

    if (selected.length === 0) return;

    const remainingSlots = MAX_IMAGES - images.length;
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
      .map((file) => ({ file, preview: URL.createObjectURL(file) }));

    setImages((prev) => [...prev, ...newItems]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  // Chuni hui image ko "main" (cover) image bana do
  const handleMakeMain = (index) => {
    setImages((prev) => {
      const copy = [...prev];
      const [picked] = copy.splice(index, 1);
      return [picked, ...copy];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please add at least one product image");
      return;
    }

    const productData = new FormData();
    for (const key in formData) {
      productData.append(key, formData[key]);
    }
    // Backend field name: productImages (multiple). Pehli image = main image.
    images.forEach((img) => {
      productData.append("productImages", img.file);
    });

    setIsLoading(true);

    try {
      const token = localStorage.getItem("sellerToken");

      if (!token) {
        toast.error("Please login first to add a product!");
        setIsLoading(false);
        return;
      }

      const response = await API.post(
        "/api/seller/products/add",
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
    } finally {
      setIsLoading(false);
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
    <select 
      name="fabric" 
      className="form-control add-product-input" 
      onChange={handleChange}
      defaultValue=""
    >
      <option value="" disabled>Select fabric...</option>
      <option value="Pashmina">Pashmina / Cashmere</option>
      <option value="Wool">Wool (Merino / Lambswool)</option>
      <option value="Pashmina Silk Blend">Pashmina Silk Blend</option>
      <option value="Pashmina wool Blend">Pashmina wool Blend</option>
      <option value="Silk">Silk / Banarasi</option>
      <option value="Cotton">Cotton</option>
      <option value="Velvet">Velvet</option>
      <option value="Acrylic">Acrylic / Synthetic</option>
    </select>
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
  <option value="Small (50 × 180 cm)">Small (50 × 180 cm)</option>
  <option value="Medium (70 × 200 cm)">Medium (70 × 200 cm)</option>
  <option value="Large (100 × 230 cm)">Large (100 × 230 cm)</option>
  <option value="Free Size (100 × 200 cm)">Free Size (100 × 200 cm)</option>
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

                {/* MULTIPLE IMAGES */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Product Images ({images.length}/{MAX_IMAGES})
                  </label>
                  <input
                    type="file"
                    className="form-control add-product-input"
                    accept="image/*"
                    multiple
                    disabled={images.length >= MAX_IMAGES}
                    onChange={handleImageChange}
                  />
                  <div className="form-text">
                    Upto {MAX_IMAGES} images add kar sakte ho. Pehli image main image hogi.
                  </div>

                  {images.length > 0 && (
                    <div className="d-flex flex-wrap gap-3 mt-3">
                      {images.map((img, i) => (
                        <div
                          key={img.preview}
                          className="position-relative border rounded-3 overflow-hidden bg-light"
                          style={{
                            width: 110,
                            height: 110,
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
                              className="position-absolute bottom-0 start-0 w-100 text-center text-white fw-semibold"
                              style={{ background: "rgba(223,160,11,0.9)", fontSize: "0.7rem", padding: "2px 0" }}
                            >
                              Main
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleMakeMain(i)}
                              className="position-absolute bottom-0 start-0 w-100 border-0 text-white"
                              style={{ background: "rgba(0,0,0,0.6)", fontSize: "0.7rem", padding: "2px 0", cursor: "pointer" }}
                            >
                              Make main
                            </button>
                          )}

                          <button
                            type="button"
                            aria-label="Remove image"
                            onClick={() => handleRemoveImage(i)}
                            className="position-absolute top-0 end-0 m-1 border-0 rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                              width: 22,
                              height: 22,
                              background: "rgba(220,53,69,0.95)",
                              color: "#fff",
                              fontSize: 13,
                              lineHeight: 1,
                              cursor: "pointer",
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Stock Quantity</label>
                  <input type="number" name="stockQuantity" className="form-control add-product-input" placeholder="50" required onChange={handleChange} />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-success w-100 py-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span 
                        className="spinner-border spinner-border-sm me-2" 
                        role="status" 
                        aria-hidden="true"
                      ></span>
                      Adding Product...
                    </>
                  ) : (
                    "Add Product"
                  )}
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