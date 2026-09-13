const SellerNotification = require("../models/SellerNotification");
const SellerProduct = require("../models/SellerProduct");

const getSellerNotifications = async (req, res) => {
  try {
    const sellerId = req.seller?.id || req.seller?._id || req.seller?.sellerId;

    if (!sellerId) {
      return res.status(401).json({ error: "Unauthorized seller ID from token" });
    }

    const notifications = await SellerNotification.find({
      sellerId,
      is_read: { $ne: true },
    }).sort({ createdAt: -1 });

    // seller apna low stock product check karta <5
    const lowStockProducts = await SellerProduct.find({
      sellerId: sellerId,
      $or: [{ stockQuantity: { $lt: 5 } }, { stock: { $lt: 5 } }],
    });

    // Low stock products ko notification format mein convert karein
    const lowStockNotifications = lowStockProducts.map((p) => ({
      _id: `lowstock-${p._id}`, // Unique virtual ID taaki frontend error na de
      sellerId: sellerId,
      title: "⚠️ Low Stock Alert!",
      message: `Aapka product "${p.productName || p.name || p.title}" low stock mein hai. Bacha hua stock: ${p.stockQuantity ?? p.stock ?? 0}`,
      type: "danger", // Bootstrap alert-danger ke liye red look
      is_read: false,
      createdAt: p.updatedAt || new Date(),
    }));

    // Dono notifications ko combine karke frontend ko bhej dein
    const allNotifications = [...notifications, ...lowStockNotifications];

    res.status(200).json(allNotifications);
  } catch (err) {
    console.error("Error fetching seller notifications:", err);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

const markSellerNotificationAsRead = async (req, res) => {
  try {
    const sellerId = req.seller?.id || req.seller?._id || req.seller?.sellerId;

    if (!sellerId) {
      return res.status(401).json({ error: "Unauthorized seller ID from token" });
    }

    const notificationId = req.params.id;

    if (notificationId.startsWith("lowstock-")) {
      // Low stock ko sirf frontend view se hatane ke liye success response bhej sakte hain
      return res.status(200).json({ message: "Low stock alert dismissed for session" });
    }

    const updatedNotification = await SellerNotification.findOneAndUpdate(
      { _id: notificationId, sellerId: sellerId },
      { is_read: true },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ error: "Notification not found or unauthorized" });
    }

    res.status(200).json({ message: "Notification marked as read", updatedNotification });
  } catch (err) {
    console.error("Error updating notification status:", err);
    res.status(500).json({ error: "Failed to update notification" });
  }
};

module.exports = {
  getSellerNotifications,
  markSellerNotificationAsRead,
};