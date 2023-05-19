import mongoose from 'mongoose';
import { IArticleComments } from '@/interfaces/IArticleComments';

const commentSchema = new mongoose.Schema({
  articleId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  commenterId: {
    type: Number,
    required: true
  },
  commenter: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
}
);


const ArticleComments = mongoose.model<IArticleComments & mongoose.Document>('article-comments', commentSchema);
export default ArticleComments;
