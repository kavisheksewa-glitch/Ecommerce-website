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
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpiry: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);