const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const utils = require('./utils.controller');
const User = mongoose.model('User');

const login = function(req, res){
    const response = {
        is_filled: false
    };

    if(req.body && req.body.username && req.body.password){
        User.findOne({username: req.body.username})
            .then(user=>_checkUserExist(user, response))
            .then(user=>_checkPassword(user, req.body.password, response))
            .then((user)=>{
                const token = jwt.sign({name:user.name}, process.env.JWT_SECRET_KEY, {expiresIn:parseInt(process.env.JWT_EXPIRTY_TIME)});
                utils._fillResponse(response, process.env.STATUS_OK, {token:token});
            })
            .catch(err=>{
                if(!response.is_filled){
                    utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err);
                }
            })
            .finally(()=>utils._sendResponse(res, response));
    }
    else{
        utils._fillResponse(response, process.env.STATUS_USER_ERROR, {message: process.env.MSG_USERNAME_PASSWORD_REQUIRED});
        utils._sendResponse(res, response);
    }
}

const register = function(req, res){
    const response = {};

    if(req.body && req.body.username && req.body.password){
        bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS))
            .then(salt=>_generateHash(salt, req.body.password))
            .then((encryptedPassword)=>_createUser(req.body.name, req.body.username, encryptedPassword))
            .then(user=>utils._fillResponse(response, process.env.STATUS_CREATED, user))
            .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
            .finally(()=>utils._sendResponse(res, response));
    }
    else{
        utils._fillResponse(response, process.env.STATUS_USER_ERROR, {message: process.env.MSG_USERNAME_PASSWORD_REQUIRED});
        utils._sendResponse(res, response);
    }
}

const _checkPassword = function(user, password, response){
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password).then((matched)=>{
            if(matched){
                resolve(user);
            }
            else{
                console.log('not matched');
                response.is_filled = true;
                utils._fillResponse(response, process.env.STATUS_UNAUTHORIZED, {message:process.env.MSG_INVALID_USERNAME_PASSWORD});
                reject();
            }
        })
        .catch(()=>{
            reject();
        });
    });
}

const _checkUserExist = function(user, response){
        return new Promise((resolve, reject) => {
            if(user){
                resolve(user);
            }
            else{
                response.is_filled = true;
                utils._fillResponse(response, process.env.STATUS_UNAUTHORIZED, {message:process.env.MSG_INVALID_USERNAME_PASSWORD});
                reject();
            }
        });
}

const _createUser = function(name, username, password){
    const newUser = {
        name: name,
        username: username,
        password: password
    }
    return User.create(newUser);
}

const _generateHash = function(salt, password){
    return bcrypt.hash(password, salt);
}

module.exports = {login, register};