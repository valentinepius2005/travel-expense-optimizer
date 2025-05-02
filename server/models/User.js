import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  budget: Number,
  xp: { type: Number, default: 0 },
  dealsViewed: { type: [String], default: [] },
  budgetStatus: { type: String, default: "N/A" }

});

export default mongoose.model('User', userSchema);
