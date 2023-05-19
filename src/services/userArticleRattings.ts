import UserArticleRating from "@/models/user-article-rattings";

export default class userArticleRattingMethods {
    public find(articleId, userId) {
        return UserArticleRating.findOne({ articleId: articleId, userId: userId }).select('-_id rated');
    };
}