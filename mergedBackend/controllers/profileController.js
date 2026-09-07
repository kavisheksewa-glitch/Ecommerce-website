const Customer = require("../models/Customer");

// ✅ GET Profile API
exports.getProfile = async (req, res) => {
  try {
    // Password aur OTP fields exclude kar rahe hain security ke liye
    const user = await Customer.findById(req.userId).select(
      "-password -resetOtp -resetOtpExpiry -emailVerifyOtp -emailVerifyOtpExpiry"
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Fetch profile error:", error);
    res.status(500).json({ success: false, message: "Server Error fetching profile" });
  }
};

// ✅ PUT Update Profile API
exports.updateProfile = async (req, res) => {
  try {
    const { fullName, mobile, dob, houseNo, street, city, state, pincode, country } = req.body;

    // Email update restrict rakhte hain generally
    const updatedUser = await Customer.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          fullName,
          mobile,
          dob,
          houseNo,
          street,
          city,
          state,
          pincode,
          country,
        },
      },
      { new: true, runValidators: true }
    ).select("-password -resetOtp -resetOtpExpiry -emailVerifyOtp -emailVerifyOtpExpiry");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: "Server Error updating profile" });
  }
};