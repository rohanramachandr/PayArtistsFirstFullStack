const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');


const Album = mongoose.model('albums');
const Genre = mongoose.model('genres');
const Artist = mongoose.model('artists');
const Song = mongoose.model('songs');

module.exports = app => {

    app.get('/api/albums', requireLogin, async (req, res) => {
        const albums = await Album.find({}).limit(2);
         
        res.send(albums);

    });


    app.get('/api/albums/:albumId', requireLogin, async (req, res) => {
        try {
            const album = await Album.findOne({_id: req.params.albumId});
            res.send(album);
        }
        
        catch(err) {
            res.status(404).send(err);
        }   
    });

    app.get('/api/albums/:albumId/genre', requireLogin, async (req, res) => {
        try {
            const album = await Album.findOne({_id: req.params.albumId});
            const genre = await Genre.findOne({_id: album._genre});
            res.send(genre);
        }
        
        catch(err) {
            res.status(404).send(err);
        }  
    });

    app.get('/api/albums/:albumId/artist', requireLogin, async (req, res) => {
        try {
            const album = await Album.findOne({_id: req.params.albumId});
            const artist = await Artist.findOne({_id: album._artist});
            res.send(artist);
        }
        
        catch(err) {
            res.status(404).send(err);
        }  
    });

    app.get('/api/albums/:albumId/songs', requireLogin, async (req, res) => {
        try {
            const songs = await Song.find({_album: req.params.albumId});
            res.send(songs);
        }
        
        catch(err) {
            res.status(404).send(err);
        }  
    });

   

};