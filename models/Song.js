const {Schema, Types, model} = require('mongoose');

const shema = new Schema({
    id: {type: Types.ObjectId, required: true, unique: true},
    name: {type: String, required: true},
    artist: [
        {type: String, required: true},
        {type: Types.ObjectId, required: true, ref: "User"}
    ],
    albums: {type: String, required: true},
    lyrics: {type: String},
    src: {type: String, required: true, unique: true},
    date: {type: Date, default: Date.now()},
    cover: {type: String, required: true, unique: true},
    owner: [{
        type: Types.ObjectId, ref: 'User', required: true
    }]
})


module.exports = model('Song', shema);