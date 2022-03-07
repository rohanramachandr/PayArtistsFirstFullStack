const passport = require('passport');

module.exports = (app) => {
    //other scopes 'user-read-private', 'user-follow-read', 'user-top-read'
    app.get('/auth/spotify', passport.authenticate('spotify', {
        scope: ['user-read-email'],
        showDialog: true

        })
    );

    app.get(
        '/auth/spotify/callback',
        passport.authenticate('spotify'),
        (req, res) => {
            res.redirect('/dashboard');
        }
    );

    app.get('/api/logout', (req ,res) => {
        req.logout();
        res.redirect('/');
    });


    app.get('/api/current_user', (req, res) => {

        res.send(req.user);

    });
};

