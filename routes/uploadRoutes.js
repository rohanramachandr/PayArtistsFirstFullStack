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

    app.get('/api/artwork/upload', requireLogin, (req, res) => {

        const { imageType }  = req.body; 
console.log("imageType", imageType, req.body)
        if (imageType !== 'image/jpeg' && imageType !== 'image/png') {
            return res.send(400, "Image type not valid");
        }

        const key = `${req.user.id}/${uuid.v1()}.jpeg`
        s3Artwork.getSignedUrl('putObject', {
            Bucket: 'release-radar-album-artwork',
            ContentType: imageType,
            Key: key

        }, 
        (err, url) => res.send({ key, url }))

    });

    app.get('/api/music/upload', requireLogin, (req, res) => {
        const key = `${req.user.id}/${uuid.v1()}.wav`
        s3Music.getSignedUrl('putObject', {
            Bucket: 'release-radar-music',
            ContentType: 'audio/wav',
            Key: key

        }, 
        (err, url) => res.send({ key, url }))

    });
};