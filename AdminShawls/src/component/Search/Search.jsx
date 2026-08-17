// import React, { useState } from "react";
// import { FaSearch, FaTimes } from "react-icons/fa";
// import "./Search.css";
// import { useNavigate } from "react-router-dom";

// function Search(){
//   const [query, setQuery] = useState("");
//   const navigate = useNavigate();
//   const allProducts = [
//     "Royal Pashmina Shawl",
//     "Elegant Kashmiri Shawl",
//     "Luxury Winter Shawl",
//     "Embroidered Shawl",
//     "Silk Shawl",
//   ];

//   const results = query
//     ? allProducts.filter((item) =>
//         item.toLowerCase().includes(query.toLowerCase())
//       )
//     : [];

//   return (
//     <div className="Customer_search-overlay">
//       <div className="Customer_search-box">
//         <div className="Customer_search-input-wrapper">
//           <FaSearch className="Customer_search-icon" />
//           <input
//             type="text"
//             className="Customer_search-input-field"
//             placeholder="Search for shawls..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             autoFocus
//           />
//           <FaTimes
//             className="Customer_close-icon"
//             onClick={() => navigate("/")}
//           />
//         </div>

//         {query && (
//           <div className="Customer_search-results">
//             {results.length > 0 ? (
//               results.map((item, index) => (
//                 <div className="Customer_search-result-item" key={index}>
//                   {item}
//                 </div>
//               ))
//             ) : (
//               <div className="Customer_search-no-result">No results found for "{query}"</div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Search;


// new




// import React, { useState, useEffect } from "react";
// import { FaSearch, FaTimes } from "react-icons/fa";
// import "./Search.css";
// import { useNavigate } from "react-router-dom";

// function Search() {
//   const [query, setQuery] = useState("");
//   const [allProducts, setAllProducts] = useState([]);
//   const navigate = useNavigate();

//   // Component load hote hi products fetch karna
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/shawls/products"); 
//       const data = await response.json();
//       if (response.ok) {
//         setAllProducts(Array.isArray(data) ? data : data.products || []);
//       }
//     } catch (error) {
//       console.error("Error fetching products for search:", error);
//     }
//   };

//   // ManageProducts ki tarah safe filtering logic
//   const results = query
//     ? allProducts.filter((item) => {
//         const title = item.productTitle || item.name || item.title || "";
//         return title.toLowerCase().includes(query.toLowerCase());
//       })
//     : [];

//   return (
//     <div className="Customer_search-overlay">
//       <div className="Customer_search-box">
//         <div className="Customer_search-input-wrapper">
//           <FaSearch className="Customer_search-icon" />
//           <input
//             type="text"
//             className="Customer_search-input-field"
//             placeholder="Search for shawls..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             autoFocus
//           />
//           <FaTimes
//             className="Customer_close-icon"
//             onClick={() => navigate("/")}
//           />
//         </div>

//         {query && (
//           <div className="Customer_search-results">
//             {results.length > 0 ? (
//               results.map((item, index) => {
//                 const prodName = item.productTitle || item.name || item.title;
//                 const prodId = item._id || item.id;
//                 return (
//                   <div 
//                     className="Customer_search-result-item" 
//                     key={index}
//                     onClick={() => {
//                       navigate(`/product/${prodId}`);
//                     }}
//                     style={{ cursor: "pointer" }}
//                   >
//                     {prodName}
//                   </div>
//                 );
//               })
//             ) : (
//               <div className="Customer_search-no-result">No results found for "{query}"</div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Search;