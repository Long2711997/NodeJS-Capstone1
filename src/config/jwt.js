const jwt = require('jsonwebtoken')

// generate token 
const createToken = (data) => {

    // create a token with existing time is 5m, object data and private key = node
    let token = jwt.sign({ data }, 'node', { expiresIn: '5m' });

    return token;
}

// verify token 
const checkToken = (token) => {
    let verifyToken = jwt.verify(token, 'node');
    console.log(verifyToken);
    return verifyToken;
}

// decode token 
const decryptToken = (token) => {
    return jwt.decode(token);
}

module.exports = { createToken, checkToken, decryptToken }