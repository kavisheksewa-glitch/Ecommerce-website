

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