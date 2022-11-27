const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    address: {
        type: String,
    },
    city:{
        type: String,
    },
    state: {
        type: String,
    },
    zip: {
        type: Number,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },

});

module.exports = mongoose.model( 'User', userSchema);