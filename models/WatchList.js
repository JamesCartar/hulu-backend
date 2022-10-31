const mongoose = require('mongoose');


const WatchListSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        unique: true,
        required: true,
    },
    releaseDate: {
        type: String,
        required: true,
    },
    overView: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('watchList', WatchListSchema);