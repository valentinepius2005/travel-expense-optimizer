const cron = require("node-cron");
const { sendDailySummary } = require("./dailyEmailScheduler");

// ⏰ Every day at 8 AM
cron.schedule("0 8 * * *", () => {
  console.log("Running daily summary job...");
  sendDailySummary();
});
