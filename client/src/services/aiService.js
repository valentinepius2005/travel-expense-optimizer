// services/aiService.js

export const getMockSavingsSuggestions = (budget, totalExpense) => {
    // If no budget or total expense is provided
    if (!budget || !totalExpense) {
      return "Please provide both budget and total expense to get suggestions.";
    }
  
    // Calculate the remaining budget
    const remainingBudget = budget - totalExpense;
    let suggestions = [];
  
    // Check if total expense is within the budget
    if (remainingBudget < 0) {
      suggestions.push("Your total expense exceeds your budget! Consider the following:");
      suggestions.push("1. Look for cheaper flights or hotels.");
      suggestions.push("2. Reduce luxury services like spas or dining.");
      suggestions.push("3. Consider shorter trips or alternative destinations.");
    } else if (remainingBudget > 0) {
      suggestions.push(`You have ₹${remainingBudget} left in your budget.`);
      suggestions.push("Here are some ideas to make the most of your remaining budget:");
      suggestions.push("1. Upgrade your hotel to a better one.");
      suggestions.push("2. Add extra activities or experiences.");
      suggestions.push("3. Consider upgrading to premium flights.");
    } else {
      suggestions.push("You're exactly within your budget! Nice job.");
    }
  
    // Additional category-based tips
    suggestions.push("💡 Category-Based Tips:");
    if (totalExpense > budget * 0.7) {
      suggestions.push("Check for discount flights or hotels to reduce costs.");
    }
    if (remainingBudget > 1000) {
      suggestions.push("Consider adding some exciting experiences or activities.");
    }
  
    // Return the suggestions as a string
    return suggestions.join("\n");
  };
  