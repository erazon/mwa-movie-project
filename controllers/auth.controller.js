const jwt = require('jsonwebtoken');
const utils = require('./utils.controller');

const verifyToken = function (req, res, next) {
    const response = {};
    let headerAuth = req.headers.authorization;
    if (headerAuth) {
        headerAuth = headerAuth.split(' ');
        if (headerAuth.length == 2) {
            const token = headerAuth[1];
            jwt.verify(token, process.env.JWT_SECRET_KEY, (error)=>_handleVerification(error, res, next, response));
        }
        else {
            utils._fillResponse(response, process.env.STATUS_FORBIDDEN, { message: process.env.MSG_FORBIDDEN });
            utils._sendResponse(res, response);
        }
    }
    else {
        utils._fillResponse(response, process.env.STATUS_FORBIDDEN, { message: process.env.MSG_FORBIDDEN });
        utils._sendResponse(res, response);
    }
}

const _handleVerification = function (err, res, next, response) {
    if (err) {
        if (err.name === 'TokenExpiredError') {
            utils._fillResponse(response, process.env.STATUS_UNAUTHORIZED, { message: process.env.MSG_TOKEN_EXPIRED });
            utils._sendResponse(res, response);
        }
        else {
            utils._fillResponse(response, process.env.STATUS_UNAUTHORIZED, { message: process.env.MSG_INVALID_TOKEN });
            utils._sendResponse(res, response);
        }
    } else {
        next();
    }
}

module.exports = { verifyToken };