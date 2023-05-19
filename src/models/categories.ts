import mongoose from 'mongoose';
import { ICategories } from '@/interfaces/ICategories';

const categorySchema = new mongoose.Schema({
  value: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
}
);
categorySchema.index({ value: 'text' });

const Category = mongoose.model<ICategories & mongoose.Document>('categories', categorySchema);
export default Category;