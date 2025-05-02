import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseResult from './components/ExpenseResult';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SavingsTips from "./components/SavingsTips";
import TravelDeals from "./components/TravelDeals";
import VoiceAssistant from "./components/VoiceAssistant";
const handleVoiceCommand = (command) => {
  if (command === "travel") {
    toast.info("Opening Travel Deals... ✈️");
    // Scroll or show <TravelDeals />
  } else if (command === "budget") {
    toast.info("Calculating budget status... 📊");
  } else if (command === "reset") {
    toast.warn("Resetting data... 🧹");
  } else {
    toast.error("Sorry, command not recognized.");
  }
};

// Inside JSX
<VoiceAssistant onCommand={handleVoiceCommand} />

import ExpenseForm from './components/ExpenseForm';
function App() {
  const [formData, setFormData] = useState({
    food: "",
    travel: "",
    accommodation: "",
    activities: "",
    budget: "" // Add budget field to form data
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/predict/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResult(data.predicted_total_expense);
      setTotalExpense(data.predicted_total_expense); // Update totalExpense
    } catch (err) {
      alert("Error predicting expense.");
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to show a toast if the budget is exceeded
  useEffect(() => {
    if (formData.budget && totalExpense > parseFloat(formData.budget)) {
      toast.error("🚨 Budget Exceeded!");
    }
  }, [formData, totalExpense]);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white flex flex-col items-center justify-center px-4 transition">
        <h1 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
          Travel Expense Optimizer
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mb-6 px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-700 transition duration-300"
        >
          Toggle Dark Mode
        </button>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
          {["food", "travel", "accommodation", "activities", "budget"].map((field) => (
            <div key={field}>
              <label className="block mb-1 capitalize dark:text-gray-300">
                {field} Expense
              </label>
              <input
                type="number"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 transition duration-300"
          >
            {loading ? "Predicting..." : "Predict Total Expense"}
          </button>
        </form>

        {/* Displaying the ExpenseResult component */}
        <ExpenseResult result={result} totalExpense={totalExpense} budget={formData.budget} />

        {/* Add ToastContainer to display notifications */}
        <ToastContainer />

        {/*Inside your JSX*/}
        <SavingsTips />

        {/*Later in JSX*/}
        <TravelDeals />

        {/*Inside JSX*/}
        <VoiceAssistant onCommand={handleVoiceCommand} />
      </div>
    </div>
  );
}

export default App;
