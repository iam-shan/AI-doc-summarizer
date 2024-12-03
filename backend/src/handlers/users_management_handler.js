const crypto = require('crypto');

const generateSessionId = async()=>{
    //creating a unique session id
    const session_id = crypto.randomBytes(16).toString('hex');
    return session_id;

    // logic for appending session id into users column
    //
    //
}
module.exports ={
    generateSessionId
}