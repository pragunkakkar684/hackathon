const express = require("express");
const { trackActivity } = require("../controllers/activitycontroller");
const { getInactiveUsers } = require("../controllers/activitycontroller");

const router = express.Router();

router.post("/track", trackActivity); // Endpoint to track user activity
router.get("/inactive", getInactiveUsers);


module.exports = router;
