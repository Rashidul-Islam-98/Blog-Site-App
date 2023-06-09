import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import agendash from './routes/agendash';
import article from './routes/article';
import googleAuth from './routes/googleAuth';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
	user(app);
	article(app);
	agendash(app);
	googleAuth(app);

	return app
}