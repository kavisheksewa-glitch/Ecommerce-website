// const mongoose = require("mongoose");

// const customerSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   mobile: { type: String, required: true },
//   dob: { type: String, required: true },
//   password: { type: String, required: true },
//   houseNo: { type: String, required: true },
//   street: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   pincode: { type: String, required: true },
//   country: { type: String, default: "India" },
  
// });

// module.exports = mongoose.model("Customer", customerSchema);


// new


// const mongoose = require("mongoose");

// const customerSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   mobile: { type: String, required: false },
//   dob: { type: String, required: false },
//   password: { type: String, required: true },
//   houseNo: { type: String, required: false },
//   street: { type: String, required: false },
//   city: { type: String, required: false },
//   state: { type: String, required: false },
//   pincode: { type: String, required: false },
//   country: { type: String, default: "India" },
// }, { timestamps: true }); // <--- Yeh line add karni zaroori hai

// module.exports = mongoose.model("Customer", customerSchema);



//claude forget password



const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: false },
  dob: { type: String, required: false },
  password: { type: String, required: true },
  houseNo: { type: String, required: false },
  street: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  pincode: { type: String, required: false },
  country: { type: String, default: "India" },

  // ---- Forget Password fields ----
  resetOtp: { type: String, default: null },
  resetOtpExpiry: { type: Date, default: null },
  resetOtpVerified: { type: Boolean, default: false },

  // ---- Email Verification fields (fake email rokne ke liye) ----
  isEmailVerified: { type: Boolean, default: false },
  emailVerifyOtp: { type: String, default: null },
  emailVerifyOtpExpiry: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);