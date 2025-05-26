import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  theme: { type: String, required: true },
  name: { type: String, required: true },
  color: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Category = mongoose.model('Category', categorySchema);
export default Category;