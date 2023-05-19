import ArticleComments from "@/models/article-comment";

export default class commentMethods {
    public read(articleId) {
        return ArticleComments.find({
             articleId: articleId,
            isDeleted: false
        }).sort('-updatedAt');
    };
}