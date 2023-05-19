import { Types } from "mongoose";

export interface IArticleComments {
    articleId: Types.ObjectId;
    commenterId: number;
    commenter: string;
    content: string;
    isDeleted: boolean;
}