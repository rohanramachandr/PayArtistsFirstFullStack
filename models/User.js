const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
const { Schema } = mongoose;

const userSchema = new Schema({
    spotifyId: String,
    name: String
})

mongoose.model('users', userSchema)

