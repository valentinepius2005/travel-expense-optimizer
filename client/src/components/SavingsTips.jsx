import React, { useState } from "react";

const SavingsTips = () => {
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(false);

  const mockTips = [
    "💡 Tip: Travel off-season to get cheaper flights and stays.",
    "💡 Tip: Book accommodations early for better deals.",
    "💡 Tip: Use public transport to cut down local travel costs.",
    "💡 Tip: Set a daily budget and track it to avoid overspending.",
    "💡 Tip: Eat like a local — street food is often cheap and tasty!"
  ];

  const generateMockTip = () => {
    setLoading(true);
    setTimeout(() => {
      const randomTip = mockTips[Math.floor(Math.random() * mockTips.length)];
      setTip(randomTip);
      setLoading(false);
    }, 1000); // Simulate API delay
  };

  return (
    <div className="mt-6 text-center">
      <button
        onClick={generateMockTip}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        {loading ? "Thinking..." : "Get AI Savings Tip 💡"}
      </button>
      {tip && <p className="mt-4 text-lg text-green-700 font-medium">{tip}</p>}
    </div>
  );
};

export default SavingsTips;
