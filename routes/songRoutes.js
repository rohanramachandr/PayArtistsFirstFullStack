const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');


const Album = mongoose.model('albums');
const Genre = mongoose.model('genres');
const Artist = mongoose.model('artists');
const Song = mongoose.model('songs');

module.exports = app => {

    app.get('/api/song/details/:songId', requireLogin, async (req, res) => {


        try {
            const { _id, songTitle, _artist, duration, songPath, albumOrder, plays, _album } = await Song.findOne({ _id: req.params.songId });


            const { artistName, artistUsername } = await Artist.findOne({ _id: _artist });

            const { albumTitle, artworkPath } = await Album.findOne({ _id: _album });



            res.send({ _id, _album, songTitle, artistName, artistUsername, albumTitle, artworkPath, duration, songPath, plays, albumOrder });
        }
        catch(err) {
            res.status(404).send(err);
        }   
        

    });

    app.patch('/api/song/update-plays/:songId', requireLogin, (req, res) => {


        try {
           
            Song.updateOne(
                { _id: req.params.songId }, 
                {
                    $inc: { 'plays': 1 }

                }
            ).exec();

            res.send({});
            
        }
        catch(err) {
            res.status(404).send(err);
        }   
        

    });

      app.get('/api/songs/playlist', requireLogin, async (req, res) => { 
      try {
          const songIds = await Song.find({}, '_id');
          res.send(songIds);
      }

      catch(err) {
          res.status(404).send(err);
      }
  });








};