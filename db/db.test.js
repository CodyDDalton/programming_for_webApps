const mongoose = require('mongoose');
const User = require('../api/model/user');
const { connect, disconnect } = require("../db/__mocks__/db");

jest.mock("../db/__mocks__/db")

describe('Functions', () => {
    test('Posts a user to the database', async() => {
        const newUser = new User({
            _id:mongoose.Types.ObjectId(),
            firstName:'John',
            lastName:'Smith',
            email:'jsmith@anon.com',
            password:'jsmith123'
        });
        await connect();
        console.log(newUser)
        const user = newUser;
        expect(user.firstName).toEqual('John');
        expect(user.lastName).toEqual('Smith'),
        expect(user.email).toEqual('jsmith@anon.com');
        expect(user.password).toEqual('jsmith123');
        await disconnect();
    });
    test('Finds a user from the database', async() => {
        await connect();
        User.find({email:"jsmith@anon.com"})
            .then(result => {
                const user = result;
                console.log(result);
                expect(user.firstName).toEqual('John');
                expect(user.lastName).toEqual('Smith'),
                expect(user.email).toEqual('jsmith@anon.com');
                expect(user.password).toEqual('jsmith123')
                
            })
            .catch(err =>{
                if(err){
                    res.status(500).json({
                        message:err.message,
                    })
                }
            });
    });
    
});