const mongoose = require('mongoose');
const { Schema } = mongoose;

const albumSchema = new Schema({
   
    albumTitle: String,
    _artist: { type: Schema.Types.ObjectId, ref: 'Artist' },
    _genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
    artworkPath: String

})

mongoose.model('albums', albumSchema);
