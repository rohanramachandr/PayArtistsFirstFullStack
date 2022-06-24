const AWS = require('aws-sdk');
const uuid = require('uuid');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');


const s3Artwork = new AWS.S3({
    accessKeyId: keys.artworkAccessKeyId,
    secretAccessKey: keys.artworkSecretAccessKey
});

const s3Music = new AWS.S3({
    accessKeyId: keys.musicAccessKeyId,
    secretAccessKey: keys.musicSecretAccessKeyId
});


module.exports = app => {

    app.get('/api/artwork/upload/image/:imageType', requireLogin, (req, res) => {
        const imageType = req.params.imageType;
        console.log("imageType", imageType)
        if (imageType !== 'jpeg' && imageType !== 'jpg' && imageType !== 'png') {
            return res.send(400, "Image type not valid");
        }

        const key = `${req.user.id}/${uuid.v1()}.${imageType}`
        s3Artwork.getSignedUrl('putObject', {
            Bucket: 'release-radar-album-artwork',
            ContentType: `image/${imageType}`,
            Key: key

        }, 
        (err, url) => res.send({ key, url }));

    });

    app.get('/api/music/upload/audio/:audioType', requireLogin, (req, res) => {
        const audioType = req.params.audioType;
        if (audioType !== 'wav' && audioType !== 'mpeg' && audioType !== 'mp3') {
            return res.send(400, "audio type not valid");
        }
        const key = `${req.user.id}/${uuid.v1()}.${audioType}`
        s3Music.getSignedUrl('putObject', {
            Bucket: 'release-radar-music',
            ContentType: `audio/${audioType}`,
            Key: key
        },
        (err, url) => res.send({ key, url }));

    });
};