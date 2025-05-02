export const suggestSavings = (expenses, budget) => {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  if (total > budget) {
    return {
      status: 'over',
      message: 'You are over your budget. Try cutting back on optional expenses.',
    };
  }
  return { status: 'ok', message: 'You’re within budget — keep it up!' };
};
