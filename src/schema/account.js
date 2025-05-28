import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  type: { type: String, required: true },
  balance: { type: Number, required: true },
  budgetStart: { type: Number, required: true },
  taux: { type: Number, required: false, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Account = mongoose.model('Account', accountSchema);
export default Account;