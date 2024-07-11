require('dotenv').config({ path: `${process.cwd()}/.env` });

const jwt = require('jsonwebtoken');
const Users = require("../db/models/user");

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'No token provided'
        });
    }

    try {
        const tokenDetails = jwt.verify(token, process.env.TOKEN_jwt);
        const freshUser = await Users.findByPk(tokenDetails.id);

        if (!freshUser) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        req.user = freshUser;
        next();
    } catch (err) {
        return res.status(403).json({
            status: 'fail',
            message: 'Token verification failed'
        });
    }
};

module.exports = authenticateToken;
