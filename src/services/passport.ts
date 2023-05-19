import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from '@/config';
import Users from '@/models/user';

passport.use(
    new GoogleStrategy(
        {
            clientID: config.googleClientId,
            clientSecret: config.googleClientSecret,
            callbackURL: '/api/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Find or create a user based on the Google profile
                let user = await Users.findOne({ userId: profile.id });

                if (!user) {
                    // If the user doesn't exist, create a new user
                    user = new Users({
                        userId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value
                    });

                    await user.save();
                }

                done(null, user);
            } catch (error) {
                done(error, false);
            }
        }
    )
);

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await Users.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
export default passport;