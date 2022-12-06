const mongoose = require('mongoose')

const connect = async () => {
    await mongoose.connect(process.env.mongodURL, (err) => {
        if (err) {
            console.error('Error:', err.message);
        } else {
            console.log('MogoDB server connection established');
        }
    });
};

const disconnect = async () => {
    await mongoose.connection.close();
};

module.exports = { connect, disconnect };