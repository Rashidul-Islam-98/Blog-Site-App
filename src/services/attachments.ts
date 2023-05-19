import ArticleAttachments from "@/models/article-attachments";

export default class attachmentMethods {
    public add(data) {
        return ArticleAttachments.insertMany(data);
    };

    public delete(articleId) {
        return ArticleAttachments.deleteMany({ articleId });
    };

    public readAll() {
        return ArticleAttachments.find().select('name preview extension type articleId');
    };

    public read(articleId) {
        return ArticleAttachments.find({
            articleId: articleId
        }).select('name preview extension type')
    };
}