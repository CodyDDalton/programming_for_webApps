const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    firstName: {
        type: String,
    },
    lastName: {
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