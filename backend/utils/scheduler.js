const cron = require("node-cron");
const Activity = require("../models/activity");
const User = require("../models/user"); // ✅ Ensure User model is imported
const { exec } = require("child_process");
const path = require("path");

console.log("🚀 Scheduler script started..."); // ✅ Ensure script runs

cron.schedule("*/1 * * * *", async () => { // ✅ Runs every minute for testing
  console.log("🔄 Running inactivity check...");

  const threshold = new Date();
  threshold.setDate(threshold.getDate() - 7); // Users inactive for 7+ days

  try {
    const inactiveUsers = await Activity.find({ lastActive: { $lt: threshold } }).populate("userId");

    console.log("🔍 Debugging inactive users:", JSON.stringify(inactiveUsers, null, 2));

    if (inactiveUsers.length === 0) {
      console.log("✅ No inactive users found. Skipping email notifications.");
      return;
    }

    console.log(`⚠️ Found ${inactiveUsers.length} inactive users. Sending emails...`);

    // Convert user data to JSON format
    const userData = inactiveUsers
      .filter(user => user.userId?.email) // Ensure user has a valid email
      .map(user => ({
        email: user.userId.email,
        name: user.userId.name || "User" // Fallback to "User" if name is missing
      }));

    console.log("🔍 Valid Users after filtering:", userData);

    if (userData.length === 0) {
      console.log("⚠️ No valid emails found. Skipping email sending.");
      return;
    }

    // Encode user data in Base64
    const encodedData = Buffer.from(JSON.stringify(userData)).toString("base64");

    // Ensure correct path to the Python script
    const scriptPath = path.join(__dirname, "send_email.py");

    // Execute Python script with encoded JSON data
    exec(`python "${scriptPath}" "${encodedData}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error executing script: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`⚠️ Script Warning: ${stderr}`);
      }
      console.log(`✅ Script Output: ${stdout}`);
    });

  } catch (error) {
    console.error("❌ Error fetching inactive users:", error);
  }
});

module.exports = cron;
