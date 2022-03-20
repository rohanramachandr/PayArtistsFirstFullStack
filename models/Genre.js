const mongoose = require('mongoose');
const { Schema } = mongoose;

const genreSchema = new Schema({
    genreName: String
})

mongoose.model('genres', genreSchema);
