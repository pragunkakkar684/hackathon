const express = require("express");
const { sendNotification } = require("../controllers/notificationcontroller");

const router = express.Router();

router.post("/send", sendNotification); // API to send notifications

module.exports = router;
