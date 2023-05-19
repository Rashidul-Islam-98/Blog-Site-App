import Article from "@/models/articles";

export default class articleMethodes {
    public readAll(page: number) {
        return Article.find({
            isPublished: true,
            isDeleted: false
        }).select('title description searchTags likes dislikes isPublished category slugUrl createdAt updatedAt').skip((page-1)*10).limit(10).sort('-updatedAt');
    };

    public readMostLiked() {
        return Article.find({
            isDeleted: false,
            isPublished: true
        }).select('title likes dislikes').limit(10).sort('-likes dislikes -updatedAt');
    };

    public readUserRecentArticles(userId) {
        return Article.find({
            author: userId,
            isDeleted: false,
            isPublished: true
        }).select('title likes dislikes').limit(10).sort('-updatedAt');
    };

    public readOne(id) {
        return Article.findOne({ _id: id, isDeleted: false });
    };

    public update(data) {
        return Article.findByIdAndUpdate(data.params.id, data.body, { new: true });
    };

    public search(query) {
        return Article.find({ $text: { "$search": query }, isDeleted: false, isPublished: true }, {
            "score": { "$meta": "textScore" }
        })
            .sort({ "score": { "$meta": "textScore" }, "updatedAt": -1 })
            .select('title description searchTags likes dislikes isPublished category slugUrl createdAt updatedAt').skip(0).limit(10);
    };

    public searchCount(query) {
        return Article.countDocuments({ $text: { "$search": query }, isDeleted: false, isPublished: true });
    };

    public readAuthorArticles(authorId, currentArticleId) {
        return Article.find({
            _id: { $ne: currentArticleId },
            author: authorId,
            isPublished: true,
            isDeleted: false,
        }).select('title').sort('-updatedAt');
    };
}