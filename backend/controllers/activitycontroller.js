const mongoose = require("mongoose");
const Activity = require("../models/activity");

exports.trackActivity = async (req, res) => {
    try {
        let { userId, clicks, timeSpent } = req.body;

        // Validate required fields
        if (!userId || !clicks || !timeSpent) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Validate userId and convert it to ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid userId format" });
        }
        userId = new mongoose.Types.ObjectId(userId);  // Convert to ObjectId

        const updatedActivity = await Activity.findOneAndUpdate(
            { userId },
            { 
                $set: { lastActive: new Date() }, 
                $inc: { clicks, timeSpent } 
            },
            { upsert: true, new: true }
        );

        res.json({ message: "Activity tracked successfully", data: updatedActivity });
    } catch (error) {
        console.error("Error tracking activity:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};



exports.getInactiveUsers = async (req, res) => {
    try {
        const threshold = new Date();
        threshold.setDate(threshold.getDate() - 7);

        const inactiveUsers = await Activity.find({ lastActive: { $lt: threshold } }).populate("userId");

        res.json(inactiveUsers);
    } catch (error) {
        console.error("Error fetching inactive users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
