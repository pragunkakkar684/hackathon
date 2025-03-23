require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const activityRoutes = require("./routes/activityroutes");
const notificationRoutes = require("./routes/notificationroutes");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB (Ensure Connection Before Starting Server)
connectDB()
  .then(() => {
    console.log("✅ Database connected successfully");

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/activity", activityRoutes);
    app.use("/api/notifications", notificationRoutes);
    app.use("/api/user", userRoutes);

    // Start the cron job (after DB is connected)
    require("./utils/scheduler");

    // Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  });
