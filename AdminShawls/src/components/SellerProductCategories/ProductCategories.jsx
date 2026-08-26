// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./ProductCategories.css";
// //import logo from "../assets/logooo.png";
// //import SellerHeader from "../SellerHeader";
// import logo from "../../assets/logooo.png";
// import SellerHeader from "../SellerHeader/SellerHeader";

// function ProductCategories() {
//   const navigate = useNavigate();
//   const [productCounts, setProductCounts] = useState({});

//   const categories = [
//     "Women's Shawls", "Men's Shawls", "Pashmina Shawls", "Cashmere Shawls",
//     "Wool Shawls", "Silk Shawls", "Printed Shawls", "Embroidered Shawls",
//     "Designer Shawls", "Luxury Shawls", "Winter Shawls", "Summer Shawls"
//   ];

//   // Backend se products fetch karke count calculate karna
//   useEffect(() => {
//     axios.get("http://localhost:5000/api/seller/products") // Apna backend port yahan check kar lein
//       .then((response) => {
//         const products = response.data;
        
//         // Count map banana (jaise: { "Pashmina Shawls": 5, ... })
//         const counts = {};
//         products.forEach((product) => {
//           const cat = product.category; // Maan lijiye product model mein 'category' field hai
//           counts[cat] = (counts[cat] || 0) + 1;
//         });

//         setProductCounts(counts);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//       });
//   }, []);

//   const handleViewProducts = (categoryName) => {
//     navigate(`/seller/products?category=${encodeURIComponent(categoryName)}`);
//   };

//   return (
//     <div className="Seller_dashboard-page">
//       <SellerHeader />
//       <div className="container py-5 mt-5">
//         <h2 className="text-center fw-bold mb-5 Seller_dashboard-title">
//           <img src={logo} alt="Kavi Shawls Logo" className="Seller_dashboard-logo" />
//           Product Categories
//         </h2>

//         <div className="row">
//           {categories.map((category, index) => (
//             <div className="col-lg-4 col-md-6 mb-4" key={index}>
//               <div className="card shadow border-0 rounded-4 h-100 Seller_card">
//                 <div className="card-body text-center p-4">
//                   <div style={{ fontSize: "45px" }}>🧣</div>
//                   <h5 className="mt-3 fw-bold">{category}</h5>
                  
//                   {/* Yeh line products count dikhayegi */}
//                   <p className="text-muted small">
//                     Products: {productCounts[category] || 0} available
//                   </p>

//                   <button 
//                     className="btn btn-primary mt-2"
//                     onClick={() => handleViewProducts(category)}
//                   >
//                     View Products
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductCategories;





// new



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./ProductCategories.css";
// import logo from "../../assets/logooo.png";
// import SellerHeader from "../SellerHeader/SellerHeader";

// function ProductCategories() {
//   const navigate = useNavigate();
//   const [productCounts, setProductCounts] = useState({});

//   const categories = [
//     "Women's Shawls", "Men's Shawls", "Pashmina Shawls", "Cashmere Shawls",
//     "Wool Shawls", "Silk Shawls", "Printed Shawls", "Embroidered Shawls",
//     "Designer Shawls", "Luxury Shawls", "Winter Shawls", "Summer Shawls"
//   ];

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/seller/products")
//       .then((response) => {
//         const products = response.data;
        
//         const counts = {};
//         categories.forEach((catName) => {
//           counts[catName] = 0;
//         });

//         products.forEach((product) => {
//           const productCat = product.category ? product.category.toLowerCase().trim() : "";
//           const productFabric = product.fabric ? product.fabric.toLowerCase().trim() : "";

//           categories.forEach((catName) => {
//             const lowerCatName = catName.toLowerCase();

//             if (
//               productCat === lowerCatName || 
//               (productFabric && lowerCatName.includes(productFabric))
//             ) {
//               counts[catName] = (counts[catName] || 0) + 1;
//             }
//           });
//         });

//         setProductCounts(counts);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//       });
//   }, []);

//   const handleViewProducts = (categoryName) => {
//     navigate(`/seller/products?category=${encodeURIComponent(categoryName)}`);
//   };

//   return (
//     <div className="Seller_dashboard-page">
//       <SellerHeader />
//       <div className="container py-5 mt-5">
//         <h2 className="text-center fw-bold mb-5 Seller_dashboard-title">
//           <img src={logo} alt="Kavi Shawls Logo" className="Seller_dashboard-logo" />
//           Product Categories
//         </h2>

//         <div className="row">
//           {categories.map((category, index) => (
//             <div className="col-lg-4 col-md-6 mb-4" key={index}>
//               <div className="shadow border-0 rounded-4 h-100 Seller_card bg-white p-4">
//                 <div className="text-center">
//                   <div style={{ fontSize: "45px" }}>🧣</div>
//                   <h5 className="mt-3 fw-bold">{category}</h5>
                  
//                   <p className="text-muted small">
//                     Products: {productCounts[category] || 0} available
//                   </p>

//                   <button 
//                     className="btn btn-primary mt-2"
//                     onClick={() => handleViewProducts(category)}
//                   >
//                     View Products
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductCategories;


// new1



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./ProductCategories.css";
// import logo from "../../assets/logooo.png";
// import SellerHeader from "../SellerHeader/SellerHeader";

// function ProductCategories() {
//   const [productCounts, setProductCounts] = useState({});
//   const [allProducts, setAllProducts] = useState([]); // Saare products store karne ke liye
//   const [selectedCategoryProducts, setSelectedCategoryProducts] = useState(null); // Jis category par click ho uske products

//   const categories = [
//     "Women's Shawls", "Men's Shawls", "Pashmina Shawls", "Cashmere Shawls",
//     "Wool Shawls", "Silk Shawls", "Printed Shawls", "Embroidered Shawls",
//     "Designer Shawls", "Luxury Shawls", "Winter Shawls", "Summer Shawls"
//   ];

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     axios.get("http://localhost:5000/api/seller/products", {
//       headers: { "Authorization": `Bearer ${token}` }
//     })
//       .then((response) => {
//         const products = response.data;
//         setAllProducts(products); // Saare products save kar liye
        
//         const counts = {};
//         categories.forEach((catName) => { counts[catName] = 0; });

//         products.forEach((product) => {
//           const productCat = product.category ? product.category.toLowerCase().trim() : "";
//           const productFabric = product.fabric ? product.fabric.toLowerCase().trim() : "";

//           categories.forEach((catName) => {
//             const lowerCatName = catName.toLowerCase().trim();

//             if (
//               productCat === lowerCatName || 
//               (productFabric && (productFabric.includes(lowerCatName) || lowerCatName.includes(productFabric)))
//             ) {
//               counts[catName] = (counts[catName] || 0) + 1;
//             }
//           });
//         });

//         setProductCounts(counts);
//       })
//       .catch((error) => {
//         console.error("Error fetching products:", error);
//       });
//   }, []);

//   // "View Products" par click hone par wahi ke wahi products filter karna
//   const handleViewProducts = (categoryName) => {
//     const lowerCatName = categoryName.toLowerCase().trim();

//     const filtered = allProducts.filter((product) => {
//       const productCat = product.category ? product.category.toLowerCase().trim() : "";
//       const productFabric = product.fabric ? product.fabric.toLowerCase().trim() : "";

//       return (
//         productCat === lowerCatName || 
//         (productFabric && (productFabric.includes(lowerCatName) || lowerCatName.includes(productFabric)))
//       );
//     });

//     setSelectedCategoryProducts({ categoryName, products: filtered });
//   };

//   return (
//     <div className="Seller_dashboard-page">
//       <SellerHeader />
//       <div className="container py-5 mt-5">
//         <h2 className="text-center fw-bold mb-5 Seller_dashboard-title">
//           <img src={logo} alt="Kavi Shawls Logo" className="Seller_dashboard-logo" />
//           Product Categories
//         </h2>

//         {/* Agar koi category select ki gayi hai toh sirf uske products aur images dikhayein */}
//         {selectedCategoryProducts ? (
//           <div>
//             <div className="d-flex justify-content-between align-items-center mb-4">
//               <h3>Products in "{selectedCategoryProducts.categoryName}"</h3>
//               <button className="btn btn-secondary" onClick={() => setSelectedCategoryProducts(null)}>
//                 Back to Categories
//               </button>
//             </div>

//             {selectedCategoryProducts.products.length === 0 ? (
//               <p className="text-center text-muted">No products found in this category.</p>
//             ) : (
//               <div className="row">
//                 {selectedCategoryProducts.products.map((prod, idx) => (
//                   <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={idx}>
//                     <div className="shadow border-0 rounded-4 bg-white p-3 h-100 text-center">
//                       <img 
//                         src={`http://localhost:5000/${prod.productImage}`} 
//                         alt={prod.productName} 
//                         style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
//                         className="mb-3"
//                       />
//                       <h6 className="fw-bold">{prod.productName}</h6>
//                       <p className="text-muted small mb-1">Price: ₹{prod.price}</p>
//                       <p className="text-muted small">Fabric: {prod.fabric || "N/A"}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ) : (
//           /* Normal Categories Grid */
//           <div className="row">
//             {categories.map((category, index) => (
//               <div className="col-lg-4 col-md-6 mb-4" key={index}>
//                 <div className="shadow border-0 rounded-4 h-100 Seller_card bg-white p-4">
//                   <div className="text-center">
//                     <div style={{ fontSize: "45px" }}>🧣</div>
//                     <h5 className="mt-3 fw-bold">{category}</h5>
                    
//                     <p className="text-muted small">
//                       Products: {productCounts[category] || 0} available
//                     </p>

//                     <button 
//                       className="btn btn-primary mt-2"
//                       onClick={() => handleViewProducts(category)}
//                     >
//                       View Products
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductCategories;



//claude office 




import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductCategories.css";
import logo from "../../assets/logooo.png";
import SellerHeader from "../SellerHeader/SellerHeader";

function ProductCategories() {
  const [productCounts, setProductCounts] = useState({});
  const [allProducts, setAllProducts] = useState([]); // Saare products store karne ke liye
  const [selectedCategoryProducts, setSelectedCategoryProducts] = useState(null); // Jis category par click ho uske products

  const categories = [
    "Women's Shawls", "Men's Shawls", "Pashmina Shawls", "Cashmere Shawls",
    "Wool Shawls", "Silk Shawls", "Printed Shawls", "Embroidered Shawls",
    "Designer Shawls", "Luxury Shawls", "Winter Shawls", "Summer Shawls"
  ];

  useEffect(() => {
    // ✅ FIX: seller ka token "sellerToken" key mein save hota hai (SellerLogin.jsx dekhein),
    // "token" key sirf customer login ke liye use hoti hai — isi mismatch ki wajah se
    // yeh page pehle kaam nahi kar raha tha (Authorization: Bearer undefined ja raha tha).
    const token = localStorage.getItem("sellerToken");

    if (!token) {
      console.error("No seller token found — please login again.");
      return;
    }

    axios.get("http://localhost:5000/api/seller/products", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then((response) => {
        const products = Array.isArray(response.data)
          ? response.data
          : response.data.products || [];
        setAllProducts(products); // Saare products save kar liye

        const counts = {};
        categories.forEach((catName) => { counts[catName] = 0; });

        products.forEach((product) => {
          const productCat = product.category ? product.category.toLowerCase().trim() : "";
          const productFabric = product.fabric ? product.fabric.toLowerCase().trim() : "";

          categories.forEach((catName) => {
            const lowerCatName = catName.toLowerCase().trim();

            if (
              productCat === lowerCatName ||
              (productFabric && (productFabric.includes(lowerCatName) || lowerCatName.includes(productFabric)))
            ) {
              counts[catName] = (counts[catName] || 0) + 1;
            }
          });
        });

        setProductCounts(counts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // "View Products" par click hone par wahi ke wahi products filter karna
  const handleViewProducts = (categoryName) => {
    const lowerCatName = categoryName.toLowerCase().trim();

    const filtered = allProducts.filter((product) => {
      const productCat = product.category ? product.category.toLowerCase().trim() : "";
      const productFabric = product.fabric ? product.fabric.toLowerCase().trim() : "";

      return (
        productCat === lowerCatName ||
        (productFabric && (productFabric.includes(lowerCatName) || lowerCatName.includes(productFabric)))
      );
    });

    setSelectedCategoryProducts({ categoryName, products: filtered });
  };

  return (
    <div className="Seller_dashboard-page">
      <SellerHeader />
      <div className="container py-5 mt-5">
        <h2 className="text-center fw-bold mb-5 Seller_dashboard-title">
          <img src={logo} alt="Kavi Shawls Logo" className="Seller_dashboard-logo" />
          Product Categories
        </h2>

        {selectedCategoryProducts ? (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>Products in "{selectedCategoryProducts.categoryName}"</h3>
              <button className="btn btn-secondary" onClick={() => setSelectedCategoryProducts(null)}>
                Back to Categories
              </button>
            </div>

            {selectedCategoryProducts.products.length === 0 ? (
              <p className="text-center text-muted">No products found in this category.</p>
            ) : (
              <div className="row">
                {selectedCategoryProducts.products.map((prod, idx) => (
                  <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={idx}>
                    <div className="shadow border-0 rounded-4 bg-white p-3 h-100 text-center">
                      <img
                        src={`http://localhost:5000/${prod.productImage}`}
                        alt={prod.productName}
                        style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
                        className="mb-3"
                      />
                      <h6 className="fw-bold">{prod.productName}</h6>
                      <p className="text-muted small mb-1">Price: ₹{prod.price}</p>
                      <p className="text-muted small">Fabric: {prod.fabric || "N/A"}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="row">
            {categories.map((category, index) => (
              <div className="col-lg-4 col-md-6 mb-4" key={index}>
                <div className="shadow border-0 rounded-4 h-100 Seller_card bg-white p-4">
                  <div className="text-center">
                    <div style={{ fontSize: "45px" }}>🧣</div>
                    <h5 className="mt-3 fw-bold">{category}</h5>

                    <p className="text-muted small">
                      Products: {productCounts[category] || 0} available
                    </p>

                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => handleViewProducts(category)}
                    >
                      View Products
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCategories;