const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Genre = mongoose.model('genres');


module.exports = app => {

    app.get('/api/genre/labels', requireLogin, async (req, res) => {


        try {
            const genres = await Genre.find({});

            let genreLabels = [];
           genres.forEach(genre => {
            genreLabels.push({ label: genre.genreName, id: genre._id });

           });



            res.send(genreLabels);
        }
        catch(err) {
            res.status(404).send(err);
        }   
        

    });






};