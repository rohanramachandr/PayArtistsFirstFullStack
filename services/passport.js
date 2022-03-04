const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
 User.findById(id)
    .then(user => {
            done(null, user);
    });
});

passport.use(
    new SpotifyStrategy({
        clientID: keys.spotifyClientID,
        clientSecret: keys.spotifyClientSecret,
        callbackURL: '/auth/spotify/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ spotifyId: profile.id }).then(existingUser => {
            if (existingUser) {
                done(null, existingUser);

            }
            else {
                new User({ spotifyId: profile.id, name: profile.displayName })
                    .save()
                    .then(user => done(null, user));
            }
        });
    }
    )
);
