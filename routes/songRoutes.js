const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const AWS = require('aws-sdk');
const keys = require('../config/keys');
const Album = mongoose.model('albums');
const Genre = mongoose.model('genres');
const Artist = mongoose.model('artists');
const Song = mongoose.model('songs');

//console.log(keys.cloudfrontKeyPairId, keys.cloudfrontPrivateKey)
const cloudFront = new AWS.CloudFront.Signer('K29MGB2VZSL2SR', `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAiCX/LgPQYfDxvHUBdYFGoCVXkgKQdlv7aXwuDo9+GvT3qITe
AHrZZGq9YyBNmYJf+30uB1B/6K4qb4WdUhAe0iUIIBJiP4ubH79QrE//1bY5sbYq
LAfZdpFaWhHuXptzkPC5mc0kil6DKDreMX/HrHLh1KgukIK9fITpbqNZjocTfD8o
D+mk/Jt4WAFg7SXwzLGiPAI4PVxrYo5+sPCeuEOQzMktDqP+qyQuV4tZaUBdKS4R
druroRykXQkXN5ItBspYlGMdzaQXHr+X/xoYGXtT7GUvHmDfxCnH535x+vwLq/Hk
3FKosHZk2inAJPp54lxlKVk7x3xy+hXw3iNAXQIDAQABAoIBACRVj55mIiyhMsJK
r5L+ZyzCCnbK/Ga58YSbQWddYBgtnBJ7MwwJvQ6Rde2IZ206YAcrxyboktoz8NtG
W0/VQYRvoZV9kn7G8SUt14fE6c/NC+SjaunJRn3gGK7E7kqNTfA2bjHfj4rl4jbQ
TxACu/UHy8EHCTZDzfH3PpzqNzJT8fPk2jUq9HbKstf8iHQyB4FrVyIdE6Q0XEHs
4RphibS/XN/M3lh1ahY/+aMIwSbH14Tfd5RbqF9qMUBKowqz40pdBgY35q6iZr4h
QTW1L4vfKoy13qinYYn951NSgeXCdJwdrd+AUmCdKxu1WX63S58Essrcyc9yOVXk
crOqmoECgYEAzqXe71mYnftD057EOQK60SYq/I1lLonWZijJ9K4sJWnHbAbrlRoD
+UmYaTi7lBHL3RzuisT53kmikvthoz3rIvJyx0PPkYX8iHrueWEfAkGGXOV45ozH
ZVYx96ONJO3+3itOwNHdSeImSC+YDWkJR7BajhaWl6gbreGT+hBKVK0CgYEAqKnl
pn0oKpshWIOATcGTBz6A5sQRbzRMm4r08Wq9J3PhnMdcwdO5ijOVyIfXLKfqFsS/
Nk+VaYgIrjHLAFLlGZ7GCqMDPm7Onh42AcwrT3Bnn+FqwX3PT2B7Hek5rWqaBZCH
XCu9ccL9l88CJpljLv/5NQUB+tuMyU85RLM/YHECgYBs3ZmrAsqSP/Mlo3jAiB2f
Xbo7vsnVUKxwuYBbtP5w318+HA80R7ZcOFdg55B6mz2JSVqqJMd2QdiyElkHxPEB
QjURoTnS8oFt7UWBEJdjet2sRwAAhZ3uVxCP48vR7sfch3g/wNARwmBkmx5Bwlov
OEscm+3OC7Q5UKPCk551KQKBgQCO93Syq2RguR6K6OzY/Dyk51ZcRdaBbNODBUab
XN75kkCrpFH7+nxLqW5NjNfYAn1qz1tFri/4RFcXUR3CKIIKNYupeIRHZ6W8Yd9l
pqsPqzgrTegwG3Se1CmIMSmy1am5DcmvV2Q+Cgrro40vKtXoARI83wHOoku0WHMy
yL3wAQKBgFob91iSfmF8RKjk3VGqdk14A2KKQ7z1ukp+MV2rEB5Gzic9mfltlFLV
M3+n0XclKp4qYEHgSg6SVYmqbhstwD7YRQo7P+y7FVJWbZhMt7jVv8Rf3NXyJ+II
S9mRtIhbI4lcWycjFEu8n6h/8VWtwA3uP1S/dhaSZEadlWrEk5Gx
-----END RSA PRIVATE KEY-----
`);

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

        const { songPath } = await Song.findOne({ _id: req.params.songId });
        console.log("cloudfront url", keys.cloudfrontUrl + songPath)
        const signedUrl = cloudFront.getSignedUrl({
            url: 'https://d1y3hcp3cg8qbg.cloudfront.net/' + songPath,
            expires: Math.floor((new Date()).getTime() / 1000) + (30) // Current Time in UTC + time in seconds, (60 * 60 * 1 = 1 hour)
        });

            res.send(signedUrl)

        }

        catch (err) {
            res.send(400, err);
        }



   
    });








};