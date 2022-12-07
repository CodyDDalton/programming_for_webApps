const mongoose = require('mongoose')
const User = require("../model/user");

const connect = async () => {
    await mongoose.connect(process.env.mongodURL, (err) => {
        if (err) {
            console.error('Error:', err.message);
        } else {
            console.log('MogoDB server connection established');
        }
    });
};

const findUser = async (obj) => {
    return await User.find({email:obj})
};

const saveUser = async(obj) =>{
    return await obj.save({})      
};

const disconnect = async () => {
    await mongoose.connection.close();
};

module.exports = { connect, disconnect, findUser, saveUser };