const mongoose = require('mongoose');
const User = require('../model/user');
const { connect, findUser, saveUser, disconnect } = require("./__mocks__/db");

jest.mock("")

beforeEach(async () => {
    connect();
});

describe('Unit tests for functions', () => {
    test('Save User', async () =>{
        const newUser = new User({
            _id:mongoose.Types.ObjectId(),
            firstName:'George',
            lastName:'Jones',
            address:'Somewhere',
            city:'Atlanta',
            state:'Georgia',
            zip:123456,
            email:'gjones@cmt.org',
            password:'guitarman',
        });
        await connect();
        const saved = await saveUser(newUser);
        expect(saved.firstName).toEqual('George');
        expect(saved.lastName).toEqual('Jones');
        expect(saved.address).toEqual('Somewhere');
        expect(saved.city).toEqual('Atlanta');
        expect(saved.state).toEqual('Georgia');
        expect(saved.zip).toEqual(123456);
        expect(saved.email).toEqual('gjones@cmt.org');
        await disconnect();
    });
    test('Find User', async () => {
        const email = 'gjones@cmt.org';
        await connect();
        const found = await findUser(email)
        expect(found.firstName).toEqual('George');
        expect(found.lastName).toEqual('Jones');
        expect(found.address).toEqual('Somewhere');
        expect(found.city).toEqual('Atlanta');
        expect(found.state).toEqual('Georgia');
        expect(found.zip).toEqual(123456);
        expect(found.email).toEqual('gjones@cmt.org');
        await disconnect();
    })
});

afterEach(async () => {
    disconnect();
});

