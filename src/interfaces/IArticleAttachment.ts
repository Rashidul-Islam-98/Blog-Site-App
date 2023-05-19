import { Types } from "mongoose";

export interface IArticleAttachments {
    articleId: Types.ObjectId;
    name: string;
    extension: string;
    type: string;
    preview: string;
}