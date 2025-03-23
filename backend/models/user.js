const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  notificationPreference: { type: String, enum: ["email", "sms", "push"], default: "email" },
}, { timestamps: true }); // Adds createdAt & updatedAt fields

module.exports = mongoose.model("User", userSchema);
