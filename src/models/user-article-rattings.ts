import mongoose from 'mongoose';
import { IUserArticleRattings } from '@/interfaces/IUserArticleRattings';

const userArticleSchema = new mongoose.Schema({
  articleId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  userId: {
    type: Number,
    required: true
  },
  rated: {
    type: String,
    required: true
  }
}, {
  timestamps: true
}
);


const UserArticleRating = mongoose.model<IUserArticleRattings & mongoose.Document>('user-article-rattings', userArticleSchema);

export default UserArticleRating;