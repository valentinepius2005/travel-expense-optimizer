import React from "react";

const ExpenseForm = ({ formData, handleChange, handleSubmit, loading }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
    >
      {["food", "travel", "accommodation", "activities"].map((field) => (
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
          <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="Enter your total budget"
          className="input-field"
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
    
  );
};

export default ExpenseForm;
