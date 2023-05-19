import { Types } from "mongoose";

export interface IUserArticleRattings {
    articleId: Types.ObjectId;
    userId: number;
    rated: string;
}