const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
       type: String,
       required: true,
    },
    desc: {
        type: String,
    },
    backgroundImage: {
       type: String,
    },
    image: {
        type: String,
    },
    trailer: {
        type: String,
    },
    date: {
        type: String,
    },
    limit: {
        type: String,
    },
    genre: {
        type: Array,
    },
    characters: {
        type: Array,
    },
    director: {
        type: String,
    },
    writer: {
        type: String,
    },
    isSeries: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Movies', MovieSchema);