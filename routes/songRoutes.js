const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const AWS = require('aws-sdk');
const keys = require('../config/keys');
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
        catch (err) {
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
        catch (err) {
            res.status(404).send(err);
        }


    });

    app.get('/api/songs/playlist', requireLogin, async (req, res) => {
        try {
            const songIds = await Song.find({}, '_id');
            res.send(songIds);
        }

        catch (err) {
            res.status(404).send(err);
        }
    });

    app.post('/api/songs', requireLogin, async (req, res) => {


        const song = new Song({
            ...req.body
        });

        try {
            if (req.body.duration === null) {
                throw new Error("song type not valid");
            }
            await song.save();
            res.send(song);

        } catch (err) {
            res.send(400, err);
        }


    });


    
    app.get('/api/songs/stream/:songId', requireLogin, async (req, res) => {

        try {
        console.log("private key", keys.cloudfrontPrivateKey)
        const cloudFront = new AWS.CloudFront.Signer(keys.cloudfrontPublicKey,  keys.cloudfrontPrivateKey);

        const { songPath } = await Song.findOne({ _id: req.params.songId });
        const signedUrl = cloudFront.getSignedUrl({
            url:  keys.cloudfrontUrl + songPath,
            expires: Math.floor((new Date()).getTime() / 1000) + (30) // Current Time in UTC + time in seconds, (60 * 60 * 1 = 1 hour)
        });

            res.send(signedUrl)

        }

        catch (err) {
            res.send(400, err);
        }



   
    });








};