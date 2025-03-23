const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lastActive: { type: Date, required: true },
  clicks: { type: Number, default: 0 },
  timeSpent: { type: Number, default: 0 }, // Time spent in seconds or minutes
}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);
