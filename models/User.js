const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
       type: String,
       required: true,
    },
    email: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema);