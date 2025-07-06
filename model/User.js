const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    uname: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = model('User', userSchema);