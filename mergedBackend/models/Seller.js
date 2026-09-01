// const mongoose = require("mongoose");

// const sellerSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     phone: {
//       type: String,
//       required: true,
//     },

//     shopName: {
//       type: String,
//       required: true,
//     },

//     address: {
//       type: String,
//       required: true,
//     },

//     city: {
//       type: String,
//       required: true,
//     },

//     state: {
//       type: String,
//       required: true,
//     },

//     pincode: {
//       type: String,
//       required: true,
//     },

//     password: {
//       type: String,
//       required: true,
//     },

//     profileImage: {
//       type: String,
//       default: "",
//     },
//     status: {
//       type: String,
//       enum: ["Pending", "Approved", "Rejected"],
//       default: "Pending",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Seller", sellerSchema);



//1 sept 2026 morning



const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    shopName: {
      type: String,
      required: true,
    },

    brandName: {
      type: String,
      default: "",
    },

    brandLogo: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Seller", sellerSchema);