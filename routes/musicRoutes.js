const _ = require('lodash');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');


const Album = mongoose.model('albums');

module.exports = app => {

    app.get('/api/albums', requireLogin, async (req, res) => {
        const albums = await Album.find({}).limit(2);
         
        res.send(albums);

    });

   

};