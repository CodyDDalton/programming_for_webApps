const connect = async() =>{
    console.log("Mocked connection");
}

const disconnect = async() =>{
    console.log("Mocked connection terminated")
}

const postUser = async (user) => {
    console.log('Saving');
    return await Promise.resolve({
        firstName:'John',
        lastName:'Smith',
        email:'jsmith@anon.com',
        password:'jsmith123'
    })
}

module.exports = {connect, disconnect, postUser}

