import mongoose from 'mongoose';
import { IArticleAttachments } from '@/interfaces/IArticleAttachment';

const attachmentSchema = new mongoose.Schema({
  articleId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  extension: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  preview: {
    type: String,
    required: true
  },
}, {
  timestamps: true
}
);


const ArticleAttachments = mongoose.model<IArticleAttachments & mongoose.Document>('article-attachments', attachmentSchema);

export default ArticleAttachments;