const { sendEmail } = require("../services/emailService");
const User = require("../models/User"); // adjust path if needed

const sendDailySummary = async () => {
  try {
    const users = await User.find({}); // Get all users

    for (const user of users) {
      const mailOptions = {
        from: "your-email@gmail.com",
        to: user.email,
        subject: "Your Daily Travel Summary!",
        html: `<h1>Daily Summary</h1>
               <p>Hello ${user.name},</p>
               <p>Here's your summary for today:</p>
               <p>Total XP: ${user.xp || 0}</p>
               <p>Deals viewed: ${user.dealsViewed?.length || 0}</p>
               <p>Budget: ${user.budgetStatus || "N/A"}</p>
               <p>Keep traveling!</p>`
      };

      await sendEmail(mailOptions);
      console.log(`Summary sent to ${user.email}`);
    }
  } catch (err) {
    console.error("Error sending daily summaries:", err);
  }
};

module.exports = { sendDailySummary };
