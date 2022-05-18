const mongoose = require('mongoose');
const { Schema } = mongoose;

const artistSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    artistName: String,
    artistUsername: String
})

mongoose.model('artists', artistSchema);
