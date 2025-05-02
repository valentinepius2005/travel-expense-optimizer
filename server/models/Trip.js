import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  destination: String,
  startDate: Date,
  endDate: Date,
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }],
});

export default mongoose.model('Trip', tripSchema);
