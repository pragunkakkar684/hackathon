const express = require("express");
const router = express.Router();
const Activity = require("../models/activity");
const User = require("../models/user");

// Get inactive users
router.get("/inactive", async (req, res) => {
  try {
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - 7);

    const inactiveUsers = await Activity.find({ lastActive: { $lt: threshold } })
      .populate("userId", "name email");

    res.json(inactiveUsers.map(user => ({
      _id: user.userId._id,
      name: user.userId.name,
      email: user.userId.email,
    })));
  } catch (error) {
    console.error("Error fetching inactive users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Check if a user will churn
router.get("/churn/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userActivity = await Activity.findOne({ userId });

    if (!userActivity) {
      return res.status(404).json({ message: "User not found" });
    }

    const threshold = new Date();
    threshold.setDate(threshold.getDate() - 7);
    const willChurn = userActivity.lastActive < threshold;

    res.json({ userId, willChurn });
  } catch (error) {
    console.error("Error checking churn status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
