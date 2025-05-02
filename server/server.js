// server.js (backend)
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());  // Enable CORS if frontend and backend are on different ports

app.post('/predict', (req, res) => {
  const { budget, expenses } = req.body;
  const suggestion = budget - expenses > 0 ? "You're under budget!" : "You're overspending!";
  res.json(suggestion);
});

app.listen(5001, () => {
  console.log("Backend is running on http://localhost:5001");
});
