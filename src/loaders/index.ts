import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import jobsLoader from './jobs';
import Logger from './logger';
//We have to import at least all the events once so they can be triggered
import './events';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');


  const userModel = {
    name: 'userModel',
    model: require('../models/user').default,
  };

  const articleModel = {
    name: 'articleModel',
    model: require('../models/articles').default,
  };

  const articleAttachmentModel = {
    name: 'articleAttachmentModel',
    model: require('../models/article-attachments').default,
  };

  const articleCommentModel = {
    name: 'articleCommentrModel',
    model: require('../models/article-comment').default,
  };

  const categoryModel = {
    name: 'categoryModel',
    model: require('../models/categories').default,
  };

  const userArticleRattingModel = {
    name: 'userArticleRattingModel',
    model: require('../models/user-article-rattings').default,
  };

  // It returns the agenda instance because it's needed in the subsequent loaders
  const { agenda } = await dependencyInjectorLoader({
    mongoConnection,
    models: [
      userModel,
      articleModel,
      articleAttachmentModel,
      articleCommentModel,
      categoryModel,
      userArticleRattingModel
    ],
  });
  Logger.info('✌️ Dependency Injector loaded');

  await jobsLoader({ agenda });
  Logger.info('✌️ Jobs loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
