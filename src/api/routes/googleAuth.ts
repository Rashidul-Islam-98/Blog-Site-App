import session from 'express-session';
import { Router } from 'express';
import passport from '@/services/passport';

export default (app: Router) => {
  app.use(
    session({
      secret: ['key1', 'key2'],
      name: 'session',
      resave: false,
      saveUninitialized: true
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/api/auth/signup' }),
    (req, res) => {
      // Redirect the user after successful authentication
      res.redirect('/api/users/me');
    }
  );
};