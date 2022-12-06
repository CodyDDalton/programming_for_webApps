const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
<<<<<<< HEAD
    _id: mongoose.Schema.Types.ObjectId,
=======
>>>>>>> f72867ed1f73312ee25a845ce2b8700bf0047e59
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