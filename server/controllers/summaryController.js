const { sendEmail } = require("../services/emailService"); // Adjust path as needed

// Dummy user data (Replace with actual DB user data in real implementation)
const dummyUser = {
  name: "John Doe",
  email: "john@example.com",
  xp: 120,
  dealsViewed: ["deal1", "deal2", "deal3"],
  budgetStatus: "Within Budget ✅"
};

const sendDailySummary = (user = dummyUser) => {
  const mailOptions = {
    from: "your-email@gmail.com", // Replace with your Gmail
    to: user.email,
    subject: "Your Daily Travel Summary!",
    html: `
      <h1>🌍 Daily Summary</h1>
      <p>Hello <strong>${user.name}</strong>,</p>
      <p>Here's your travel report for today:</p>
      <ul>
        <li>✨ Total XP: <strong>${user.xp}</strong></li>
        <li>📈 Deals Viewed: <strong>${user.dealsViewed.length}</strong></li>
        <li>💰 Budget Status: <strong>${user.budgetStatus}</strong></li>
      </ul>
      <p>Keep exploring & optimizing your travel!</p>
    `
  };

  // Send email using emailService
  sendEmail(mailOptions);
};

module.exports = { sendDailySummary };
