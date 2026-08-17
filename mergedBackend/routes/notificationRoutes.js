const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

// 1. Get all notifications for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// 2. Mark notification as read (I Read)
router.put("/read/:id", async (req, res) => {
  try {
    const updated = await Notification.findByIdAndUpdate(
      req.params.id, 
      { read: true }, 
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// 3. Delete single notification
router.delete("/:id", async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: "Notification deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// 4. Clear all notifications for user
router.delete("/clear/:userId", async (req, res) => {
  try {
    await Notification.deleteMany({ userId: req.params.userId });
    res.json({ message: "All notifications cleared" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports = router;