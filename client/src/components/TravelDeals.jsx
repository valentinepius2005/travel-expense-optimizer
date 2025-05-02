import React, { useState, useEffect } from "react";
import { getMockSavingsSuggestions } from "../services/aiService";

// Mock data for travel deals
const mockDeals = [
  {
    id: 1,
    type: "Flight",
    destination: "Delhi → Goa",
    price: "₹2,999",
    date: "2025-06-15",
  },
  {
    id: 2,
    type: "Hotel",
    destination: "Manali",
    price: "₹799/night",
    date: "2025-06-20",
  },
  {
    id: 3,
    type: "Flight",
    destination: "Mumbai → Kochi",
    price: "₹3,499",
    date: "2025-07-01",
  },
  {
    id: 4,
    type: "Hotel",
    destination: "Jaipur",
    price: "₹999/night",
    date: "2025-06-10",
  },
];

const TravelDeals = ({ budget, totalExpense }) => {
  const [filter, setFilter] = useState("All");
  const [savingsTips, setSavingsTips] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredDeals =
    filter === "All"
      ? mockDeals
      : mockDeals.filter((deal) => deal.type === filter);

  useEffect(() => {
    const fetchSuggestions = () => {
      if (budget && totalExpense) {
        setLoading(true);
        // Use the enhanced mock savings suggestions logic
        const suggestions = getMockSavingsSuggestions(budget, totalExpense);
        setSavingsTips(suggestions);
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [budget, totalExpense]);

  return (
    <div className="p-4 mt-8 bg-indigo-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">✈️ Travel Deals</h2>
      <p>Explore the best travel offers here.</p>

      {/* Savings tips section */}
      <div className="mt-6 bg-yellow-100 p-4 rounded-lg">
        <h3 className="text-lg font-bold">💡 Savings Tips</h3>
        {loading ? (
          <p>Loading suggestions...</p>
        ) : (
          <p>{savingsTips || "No savings tips available."}</p>
        )}
      </div>

      {/* Filter buttons for flight and hotel deals */}
      <div className="mb-4 flex gap-2 justify-center">
        {["All", "Flight", "Hotel"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded ${
              filter === f ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List of filtered deals */}
      <ul className="space-y-4">
        {filteredDeals.map((deal) => (
          <li
            key={deal.id}
            className="p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700"
          >
            <p className="text-lg font-semibold">
              {deal.type}: {deal.destination}
            </p>
            <p className="text-sm text-gray-500">📅 {deal.date}</p>
            <p className="text-green-600 font-bold mt-1">{deal.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TravelDeals;
