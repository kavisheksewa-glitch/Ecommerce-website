// import "./SellerSignup.css";
// //import image0 from "../assets/logooo.png";
// import image0 from "../../assets/logooo.png";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";

// function SellerSignup() {
//     const navigate = useNavigate();
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [phone, setPhone] = useState("");
//     const [shopName, setShopName] = useState("");
//     const [address, setAddress] = useState("");
//     const [city, setCity] = useState("");
//     const [state, setState] = useState("");
//     const [pincode, setPincode] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [profilePic, setProfilePic] = useState(null);

//     const handleRegister = async (e) => {
//         e.preventDefault();

//         if (password !== confirmPassword) {
//             alert("Passwords do not match");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("name", name);
//         formData.append("email", email);
//         formData.append("phone", phone);
//         formData.append("shopName", shopName);
//         formData.append("address", address);
//         formData.append("city", city);
//         formData.append("state", state);
//         formData.append("pincode", pincode);
//         formData.append("password", password);
//         if (profilePic) {
//             formData.append("profilePicture", profilePic);
//         }

//         try {
//             const res = await axios.post(
//                 "http://localhost:5000/api/seller/auth/register",
//                 formData,
//                 {
//                     headers: { "Content-Type": "multipart/form-data" },
//                 }
//             );
//             alert(res.data.message);
//             navigate("/");
//         } catch (error) {
//             console.error("Error:", error.response?.data || error.message);
//             alert(error.response?.data?.message || "Registration failed");
//         }
//     };

//     return (
//         <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center py-5">
//             <div className="container">
//                 <div className="row justify-content-center">
//                     <div className="col-xl-4 col-lg-5 col-md-6 col-sm-10">
//                         <div className="card shadow-lg border-0 rounded-4 Seller_signup-card">
//                             <div className="card-body p-5">
//                                 {/* Logo */}
//                                 <div className="text-center mb-4">
//                                     <img
//                                         src={image0}
//                                         alt="Kavi Shawls"
//                                         className="seller-logo-img"
//                                     />

//                                     <h2 className="fw-bold Seller_text-brown">
//                                         Seller Registration
//                                     </h2>

//                                     <p className="text-muted">
//                                         Create your Kavi Shawls Seller Account
//                                     </p>
//                                 </div>

//                                 <form onSubmit={handleRegister}>
//                                     {/* Full Name */}
//                                     <div className="mb-3">
//                                         <label className="form-label fw-semibold">
//                                             Full Name
//                                         </label>
//                                         <input
//                                             type="text"
//                                             className="form-control Seller_form-control"
//                                             placeholder="Enter Full Name"
//                                             value={name}
//                                             onChange={(e) => setName(e.target.value)}
//                                             required
//                                         />
//                                     </div>

//                                     {/* Email */}
//                                     <div className="mb-3">
//                                         <label className="form-label fw-semibold">
//                                             Email Address
//                                         </label>
//                                         <input
//                                             type="email"
//                                             className="form-control Seller_form-control"
//                                             placeholder="seller@example.com"
//                                             value={email}
//                                             onChange={(e) => setEmail(e.target.value)}
//                                             required
//                                         />
//                                     </div>

//                                     {/* Phone */}
//                                     <div className="mb-3">
//                                         <label className="form-label fw-semibold">
//                                             Mobile Number
//                                         </label>
//                                         <input
//                                             type="tel"
//                                             className="form-control Seller_form-control"
//                                             placeholder="Enter Mobile Number"
//                                             value={phone}
//                                             onChange={(e) => setPhone(e.target.value)}
//                                             required
//                                         />
//                                     </div>

//                                     {/* Shop Name */}
//                                     <div className="mb-3">
//                                         <label className="form-label fw-semibold">
//                                             Shop Name
//                                         </label>
//                                         <input
//                                             type="text"
//                                             className="form-control Seller_form-control"
//                                             placeholder="Enter Shop Name"
//                                             value={shopName}
//                                             onChange={(e) => setShopName(e.target.value)}
//                                             required
//                                         />
//                                     </div>

//                                     {/* Address */}
//                                     <div className="mb-3">
//                                         <label className="form-label fw-semibold">
//                                             Address
//                                         </label>
//                                         <textarea
//                                             className="form-control Seller_form-control Seller_textarea"
//                                             rows="3"
//                                             placeholder="Enter Address"
//                                             value={address}
//                                             onChange={(e) => setAddress(e.target.value)}
//                                             required
//                                         ></textarea>
//                                     </div>

//                                     {/* City & State */}
//                                     <div className="row">
//                                         <div className="col-md-6 mb-3">
//                                             <label className="form-label fw-semibold">
//                                                 City
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 className="form-control Seller_form-control"
//                                                 placeholder="City"
//                                                 value={city}
//                                                 onChange={(e) => setCity(e.target.value)}
//                                                 required
//                                             />
//                                         </div>

//                                         <div className="col-md-6 mb-3">
//                                             <label className="form-label fw-semibold">
//                                                 State
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 className="form-control Seller_form-control"
//                                                 placeholder="State"
//                                                 value={state}
//                                                 onChange={(e) => setState(e.target.value)}
//                                                 required
//                                             />
//                                         </div>
//                                     </div>

//                                     {/* Pincode */}
//                                     <div className="mb-3">
//                                         <label className="form-label fw-semibold">
//                                             Pincode
//                                         </label>
//                                         <input
//                                             type="text"
//                                             className="form-control Seller_form-control"
//                                             placeholder="Enter Pincode"
//                                             value={pincode}
//                                             onChange={(e) => setPincode(e.target.value)}
//                                             required
//                                         />
//                                     </div>

//                                     {/* Password */}
//                                     <div className="mb-3">
//                                         <label className="form-label fw-semibold">
//                                             Password
//                                         </label>
//                                         <input
//                                             type="password"
//                                             className="form-control Seller_form-control"
//                                             placeholder="Create Password"
//                                             value={password}
//                                             onChange={(e) => setPassword(e.target.value)}
//                                             required
//                                         />
//                                     </div>

//                                     {/* Confirm Password */}
//                                     <div className="mb-4">
//                                         <label className="form-label fw-semibold">
//                                             Confirm Password
//                                         </label>
//                                         <input
//                                             type="password"
//                                             className="form-control Seller_form-control"
//                                             placeholder="Confirm Password"
//                                             value={confirmPassword}
//                                             onChange={(e) => setConfirmPassword(e.target.value)}
//                                             required
//                                         />
//                                     </div>

//                                     {/* Profile Picture */}
//                                     <div className="mb-3">
//                                         <label className="form-label fw-semibold">
//                                             Profile Picture
//                                         </label>
//                                         <input
//                                             type="file"
//                                             className="form-control Seller_form-control Seller_file-input"
//                                             accept="image/*"
//                                             onChange={(e) => setProfilePic(e.target.files[0])}
//                                         />
//                                     </div>

//                                     {/* Register Button */}
//                                     <button
//                                         type="submit"
//                                         className=" Seller_btn-brown btn-lg w-100"
//                                     >
                                       
//                                         Register
//                                     </button>

//                                     {/* Login Link */}
//                                     <p className="text-center mt-4 mb-0">
//                                         Already have an account?
//                                         <Link
//                                             to="/seller/login"
//                                             className="text-decoration-none fw-bold Seller_text-brown ms-1"
//                                         >
//                                             Login
//                                         </Link>
//                                     </p>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default SellerSignup;



//1 september 2026 morning




import "./SellerSignup.css";
import image0 from "../../assets/logooo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function SellerSignup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [shopName, setShopName] = useState("");
    const [brandName, setBrandName] = useState("");
    const [brandLogo, setBrandLogo] = useState(null);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePic, setProfilePic] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("shopName", shopName);
        formData.append("brandName", brandName);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("pincode", pincode);
        formData.append("password", password);
        if (profilePic) {
            formData.append("profilePicture", profilePic);
        }
        if (brandLogo) {
            formData.append("brandLogo", brandLogo);
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/api/seller/auth/register",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            alert(res.data.message);
            navigate("/");
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-4 col-lg-5 col-md-6 col-sm-10">
                        <div className="card shadow-lg border-0 rounded-4 Seller_signup-card">
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <img
                                        src={image0}
                                        alt="Kavi Shawls"
                                        className="seller-logo-img"
                                    />
                                    <h2 className="fw-bold Seller_text-brown">
                                        Seller Registration
                                    </h2>
                                    <p className="text-muted">
                                        Create your Kavi Shawls Seller Account
                                    </p>
                                </div>

                                <form onSubmit={handleRegister}>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control Seller_form-control"
                                            placeholder="Enter Full Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control Seller_form-control"
                                            placeholder="seller@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Mobile Number</label>
                                        <input
                                            type="tel"
                                            className="form-control Seller_form-control"
                                            placeholder="Enter Mobile Number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Shop Name</label>
                                        <input
                                            type="text"
                                            className="form-control Seller_form-control"
                                            placeholder="Enter Shop Name"
                                            value={shopName}
                                            onChange={(e) => setShopName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Brand Name</label>
                                        <input
                                            type="text"
                                            className="form-control Seller_form-control"
                                            placeholder="Enter Brand Name"
                                            value={brandName}
                                            onChange={(e) => setBrandName(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Brand Logo</label>
                                        <input
                                            type="file"
                                            className="form-control Seller_form-control Seller_file-input"
                                            accept="image/*"
                                            onChange={(e) => setBrandLogo(e.target.files[0])}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Address</label>
                                        <textarea
                                            className="form-control Seller_form-control Seller_textarea"
                                            rows="3"
                                            placeholder="Enter Address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-semibold">City</label>
                                            <input
                                                type="text"
                                                className="form-control Seller_form-control"
                                                placeholder="City"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-semibold">State</label>
                                            <input
                                                type="text"
                                                className="form-control Seller_form-control"
                                                placeholder="State"
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Pincode</label>
                                        <input
                                            type="text"
                                            className="form-control Seller_form-control"
                                            placeholder="Enter Pincode"
                                            value={pincode}
                                            onChange={(e) => setPincode(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Password</label>
                                        <input
                                            type="password"
                                            className="form-control Seller_form-control"
                                            placeholder="Create Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control Seller_form-control"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Profile Picture</label>
                                        <input
                                            type="file"
                                            className="form-control Seller_form-control Seller_file-input"
                                            accept="image/*"
                                            onChange={(e) => setProfilePic(e.target.files[0])}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className=" Seller_btn-brown btn-lg w-100"
                                    >
                                        Register
                                    </button>

                                    <p className="text-center mt-4 mb-0">
                                        Already have an account?
                                        <Link
                                            to="/seller/login"
                                            className="text-decoration-none fw-bold Seller_text-brown ms-1"
                                        >
                                            Login
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellerSignup;