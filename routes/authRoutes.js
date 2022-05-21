const passport = require('passport');
const mongoose = require("mongoose");
const Artist = mongoose.model("artists");

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
            res.redirect('/dashboard/browse');
        }
    );

    app.get('/api/logout', (req ,res) => {
        req.logout();
        res.redirect('/');
    });


    app.get('/api/current_user', (req, res) => {

        res.send(req.user);

    });

    app.get('/api/current_artist', async (req, res) => {

        if (req.user.isArtist) {

            try {
            const { artistUsername } = await Artist.findOne({ _user: req.user._id });
            return res.send(artistUsername);
            }
            catch (err) {
              return  res.status(422).send(err);
          
            }
          
        }


        return res.send("");



    });
};

