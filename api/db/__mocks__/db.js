const connect = async() =>{
    console.log("Mocked connection");
}

const disconnect = async() =>{
    console.log("Mocked connection terminated")
}

const saveUser = async (user) => {
    console.log('Mocked Saving');
    return await Promise.resolve({
        firstName:'George',
        lastName:'Jones',
        address:'Somewhere',
        city:'Atlanta',
        state:'Georgia',
        zip:123456,
        email:'gjones@cmt.org',
    });
};

const findUser = async (user) => {
    console.log('Mocked Finding');
    return await Promise.resolve({
        firstName:'George',
        lastName:'Jones',
        address:'Somewhere',
        city:'Atlanta',
        state:'Georgia',
        zip:123456,
        email:'gjones@cmt.org',
    });
};

module.exports = {connect, disconnect, saveUser, findUser}

