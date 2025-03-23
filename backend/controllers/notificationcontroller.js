const { exec } = require("child_process");
const dotenv = require("dotenv");
dotenv.config();

exports.sendNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.notificationPreference === "email") {
      const subject = "We Miss You!";
      const name = user.name || "User"; // Default to 'User' if name is missing
      const command = `python3 send_email.py "${user.email}" "${subject}" "${name}" "${message}"`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return res.status(500).json({ error: "Failed to send email" });
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return res.status(500).json({ error: "Email script error" });
        }
        console.log(`stdout: ${stdout}`);
        res.json({ message: "Email sent successfully" });
      });
    } else {
      res.status(400).json({ error: "User does not have email notifications enabled" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
