import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import ArticleMethodes from '@/services/articles';
import commentMethods from '@/services/comments';
import attachmentMethods from '@/services/attachments';
import userArticleRattingMethods from '@/services/userArticleRattings';
import userMethods from '@/services/users';

const route = Router();
const ARTICLES_ROUTE = "/articles";
const SEARCH_ROUTE = "/search";
const ATTACHMENTS_ROUTE = "/attachments";

export default (app: Router) => {
    app.use(ARTICLES_ROUTE, route);

    route.get(
        '/',
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling aticles from server');
            try {
                const article = Container.get(ArticleMethodes);
                const articles = await article.readAll(Number(req.query.page));
                const likedArticles = await article.readMostLiked();
                const userRecentArticles = await article.readUserRecentArticles(req.query.userId);
                return res.json({ data: { articles: articles, likedArticles: likedArticles, userRecentArticles: userRecentArticles } });
            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.get(
        ATTACHMENTS_ROUTE,
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling attachments from server');
            try {
                const attachment = Container.get(attachmentMethods);
                const attachments = await attachment.readAll();
                return res.json({ data: attachments });
            } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
            }
        },
    );

    route.get(SEARCH_ROUTE,
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Searching articles from server');
            try {
                const article = Container.get(ArticleMethodes);
                const response = await article.search(req.query.q);
                const resp = await article.searchCount(req.query.q);
                return res.json({ data: { articles: response, count: resp } });
            } catch (e) {
                logger.error('🔥 error %o', e);
                return next(e);
            }
        }
    );

    route.get('/:id',
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling users articles from server');
            try {
                const article = Container.get(ArticleMethodes);
                const attachment = Container.get(attachmentMethods);
                const comment = Container.get(commentMethods);
                const userArticleRatting = Container.get(userArticleRattingMethods);
                const users = Container.get(userMethods);

                let authorArticles = [];
                const response = await article.readOne(req.params.id);
                const resp = await attachment.read(req.params.id);
                const re = await comment.read(req.params.id);
                const r = await article.readAuthorArticles(response.author, response._id);
                const isRated = await userArticleRatting.find(req.params.id, req.query.userId);
                const user = await users.getuser(response.author);
                if (r.length > 10) authorArticles = r.slice(0, 10);
                else authorArticles = r;
                return res.json({
                    data: {
                        user,
                        article: response,
                        attachments: resp,
                        comments: re,
                        authorArticles: authorArticles,
                        authorArticlesCount: r.length + 1,
                        rated: isRated ? isRated.rated : null
                    }
                });
            } catch (e) {
                logger.error('🔥 error %o', e);
                return next(e);
            }
        }
    );

};
