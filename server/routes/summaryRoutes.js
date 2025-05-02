const express = require("express");
const { sendDailySummary } = require("../controllers/summaryController");
const router = express.Router();

router.get("/send-summary", (req, res) => {
  sendDailySummary(); // You can pass user object here if dynamic
  res.send("📬 Daily summary email sent!");
});

module.exports = router;
