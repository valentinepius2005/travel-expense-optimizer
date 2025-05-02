import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpenseResult = ({ result, totalExpense, budget }) => {
  useEffect(() => {
    if (budget && totalExpense > parseFloat(budget)) {
      // Showing toast notification for exceeding budget
      const exceedAmount = totalExpense - parseFloat(budget);
      toast.error(`🚨 You’ve exceeded your budget by ₹${exceedAmount.toFixed(2)}!`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    } else if (totalExpense <= parseFloat(budget)) {
      // Showing toast notification for staying within budget
      toast.success("You’re within your budget! 🎉", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }, [totalExpense, budget]);

  return (
    <div>
      {/* Display predicted total expense */}
      {result !== null && (
        <div className="mt-6 bg-green-600 text-white px-6 py-3 rounded shadow text-xl font-semibold">
          Predicted Total Expense: ₹ {result.toFixed(2)}
        </div>
      )}

      {/* Displaying the progress bar */}
      {budget && totalExpense && (
        <div className="mt-4">
          <label className="block text-sm text-gray-700">Budget Progress</label>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 uppercase">
                  ₹{totalExpense.toFixed(2)} / ₹{parseFloat(budget).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex mb-2 items-center justify-between">
              <div className="relative w-full">
                <div className="flex mb-2 items-center justify-between">
                  <div className="h-2 mb-2 relative flex rounded-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full ${totalExpense > parseFloat(budget) ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{
                        width: `${(totalExpense / parseFloat(budget)) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseResult;
