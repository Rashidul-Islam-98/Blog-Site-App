import mongoose from 'mongoose';
import { IArticles } from '@/interfaces/IArticles';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  searchTags: {
    type: Array,
  },
  rating: {
    type: Number,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  dislikes: {
    type: Number,
    required: true
  },
  slugUrl: {
    type: String,
    required: false
  },
  category: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  comments: {
    type: Boolean,
    required: true
  },
  isPublished: {
    type: Boolean,
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
articleSchema.index({ searchTags: 'text', 'category.value': 'text', title: 'text', description: 'text' });

const Article = mongoose.model<IArticles & mongoose.Document>('articles', articleSchema);
export default Article;
