import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  tripId: mongoose.Schema.Types.ObjectId,
  category: String,
  amount: Number,
  date: Date,
});

export default mongoose.model('Expense', expenseSchema);
