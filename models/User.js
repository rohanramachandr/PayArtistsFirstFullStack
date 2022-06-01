const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    spotifyId: String,
    name: String,
    isArtist: Boolean
})

mongoose.model('users', userSchema)

