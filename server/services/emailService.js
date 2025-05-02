const nodemailer = require("nodemailer");

// Create a transport for sending emails (you can use any email service like Gmail, SendGrid, etc.)
const transporter = nodemailer.createTransport({
  service: "gmail", // or you can use SendGrid or any other email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address (use environment variables for security)
    pass: process.env.EMAIL_PASS, // Your email password (or App password)
  },
});

// Function to send a daily summary email
async function sendDailySummaryEmail(user, userEmail) {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email (use environment variables for security)
    to: userEmail, // Recipient's email
    subject: "Your Daily Travel Summary!",
    html: `
      <h1>Daily Summary</h1>
      <p>Hello ${user.name},</p>
      <p>Here's your summary for today:</p>
      <p>Total XP: ${user.xp}</p>
      <p>Deals viewed: ${user.dealsViewed.length}</p>
      <p>Budget: ${user.budgetStatus}</p>
      <p>Keep traveling!</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = {
  sendDailySummaryEmail,
};
