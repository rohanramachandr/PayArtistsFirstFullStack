const mongoose = require('mongoose');
const { Schema } = mongoose;

const songSchema = new Schema({
   
    songTitle: String,
    _artist: { type: Schema.Types.ObjectId, ref: 'Artist' },
    _album: { type: Schema.Types.ObjectId, ref: 'Album' },
    _genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
    duration: String,
    songPath: String,
    albumOrder: { type: Number, default: 1 },
    plays: { type: Number, default: 0 }

    
})

mongoose.model('songs', songSchema);
