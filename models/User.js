const {Schema, Types, model} = require('mongoose');

const shema = new Schema({
    name: {type: String, required: true},
    listenings: {type: Number, default: 0},
    albums: {type: Number, default: 0},
    img: {type: String, required: true, default: 'https://i.mycdn.me/i?r=AyH4iRPQ2q0otWIFepML2LxR21EoY7T_GZpDBwrrF3W6uw'},
    followers: [{type: Types.ObjectId, ref: 'User', default: 0}],
    songs: [{ type: Types.ObjectId, default: 0}],
    albums: [{ type: Types.ObjectId, ref: 'Song', default: 0}],
    saved: {
        songs: [{ type: Types.ObjectId, unique: true, ref: 'Song'}],
        albums: [{ type: Types.ObjectId }],
        artists: [{ type: Types.ObjectId, unique: true, ref: 'User' }]
    },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    songs: [{ type: Types.ObjectId, ref: 'Song'}]
})

module.exports = model('User', shema);