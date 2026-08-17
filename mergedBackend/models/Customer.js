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


const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  dob: { type: String, required: true },
  password: { type: String, required: true },
  houseNo: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  country: { type: String, default: "India" },
}, { timestamps: true }); // <--- Yeh line add karni zaroori hai

module.exports = mongoose.model("Customer", customerSchema);