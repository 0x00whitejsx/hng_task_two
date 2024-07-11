// tokenUtils.js

const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.TOKEN_jwt, {
        expiresIn: process.env.JWT_TOKEN_EXPIRED_IN
    });
};

module.exports = generateToken;
