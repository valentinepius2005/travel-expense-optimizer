const cron = require("node-cron");
const { sendDailySummaryEmail } = require("./emailService");

// Sample user data (you can get this from your database)
const user = {
  name: "John Doe",
  xp: 500,
  dealsViewed: ["Deal1", "Deal2"],
  budgetStatus: "On Track"
};

const userEmail = "user-email@example.com";

// Schedule a cron job to run daily at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Sending daily summary email...");
    
    // Call the sendDailySummaryEmail function
    await sendDailySummaryEmail(user, userEmail);

  } catch (error) {
    console.error("Error in cron job:", error);
  }
});
