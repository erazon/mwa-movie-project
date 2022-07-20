const mongoose = require('mongoose');
const utils = require('./utils.controller');
const Movie = mongoose.model('Movie');

const deleteCast = function(req, res){
    const response = {};
    if(!mongoose.isValidObjectId(req.params.movieId)){
        utils._fillResponse(response, process.env.STATUS_USER_ERROR, {message: process.env.MSG_INVALID_MOVIE_ID});
        utils._sendResponse(res, response);
        return;
    }
    if(!mongoose.isValidObjectId(req.params.castId)){
        utils._fillResponse(response, process.env.STATUS_USER_ERROR, {message: process.env.MSG_INVALID_CAST_ID});
        utils._sendResponse(res, response);
        return;
    }

    Movie.findById(req.params.movieId)
        .then(movie=>_deleteCastByMovie(req, movie))
        .then(movieAfterCastDelete=>{
            console.log('after deleting cast', movieAfterCastDelete);
            if(!movieAfterCastDelete){
                utils._fillResponse(response, process.env.STATUS_NOT_FOUND, {message: process.env.MSG_CAST_NOT_FOUND});
            }
            else{
                utils._fillResponse(response, process.env.STATUS_OK, movieAfterCastDelete);
            }
        })
        .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(()=>utils._sendResponse(res, response));
}

const getAllCasts = function(req, res){
    //console.log('getAllCasts');
    //console.log('movie id', req.params.movieId);
    const response = {};
    if(!mongoose.isValidObjectId(req.params.movieId)){
        utils._fillResponse(response, process.env.STATUS_USER_ERROR, {message: process.env.MSG_INVALID_MOVIE_ID});
        utils._sendResponse(res, response);
        return;
    }

    Movie.findById(req.params.movieId).select(process.env.SUB_COLLECTION_CASTS).exec()
        .then(movie=>{
            if(!movie){
                utils._fillResponse(response, process.env.STATUS_NOT_FOUND, {message: process.env.MSG_MOVIE_NOT_FOUND});
            }
            else{
                utils._fillResponse(response, process.env.STATUS_OK, movie.casts);
            }
        })
        .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(()=>utils._sendResponse(res, response));
}

const getOneCast = function(req, res){
    const response = {};
    if(!mongoose.isValidObjectId(req.params.movieId)){
        utils._fillResponse(response, process.env.STATUS_USER_ERROR, {message: process.env.MSG_INVALID_MOVIE_ID});
        utils._sendResponse(res, response);
        return;
    }
    if(!mongoose.isValidObjectId(req.params.castId)){
        utils._fillResponse(response, process.env.STATUS_USER_ERROR, {message: process.env.MSG_INVALID_CAST_ID});
        utils._sendResponse(res, response);
        return;
    }

    Movie.findById(req.params.movieId)
        .then(movie=>{
            console.log('found movie', movie);
            if(!movie){
                utils._fillResponse(response, process.env.STATUS_NOT_FOUND, {message: process.env.MSG_MOVIE_NOT_FOUND});
            }
            else{
                const cast = movie.casts.id(req.params.castId);
                if(cast){
                    utils._fillResponse(response, process.env.STATUS_OK, cast);
                }
                else{
                    utils._fillResponse(response, process.env.STATUS_NOT_FOUND, {message: process.env.MSG_CAST_NOT_FOUND});
                }
            }
        })
        .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(()=>utils._sendResponse(res, response));
}

const insertCast = function(req, res){
    const response = {};
    if(!mongoose.isValidObjectId(req.params.movieId)){
        utils._fillResponse(response, process.env.STATUS_USER_ERROR, {message: process.env.MSG_INVALID_MOVIE_ID});
        utils._sendResponse(res, response);
        return;
    }

    Movie.findById(req.params.movieId)
        .then(movie=>_insertCast(req, movie))
        .then(movie=>{
            if(!movie){
                utils._fillResponse(response, process.env.STATUS_NOT_FOUND, {message: process.env.MSG_MOVIE_NOT_FOUND});
            }
            else{
                utils._fillResponse(response, process.env.STATUS_OK, movie);
            }
        })
        .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(()=>utils._sendResponse(res, response));
}

const updateCastFull = function(req, res){
    console.log('updateCastFull called');
    _updateCastOne(req, res, _fullCastUpdateOne);
}

const updateCastPartial = function(req, res){
    console.log('updateCastPartial called');
    _updateCastOne(req, res, _partialCastUpdateOne);
}

const _deleteCastByMovie = function(req, movie){
    console.log('_deleteCastByMovie', movie);
    if(!movie) return;

    let cast = movie.casts.id(req.params.castId);
    console.log('cast', cast);
    if(!cast) return;

    movie.casts.id(req.params.castId).remove();
    return movie.save();
}

const _fullCastUpdateOne = function(req, movie){
    if(!movie) return;

    let cast = movie.casts.id(req.params.castId);
    if(!cast) return;

    movie.casts.id(req.params.castId).name = req.body.name;
    movie.casts.id(req.params.castId).debut_year = req.body.debut_year;
    return movie.save();
}

const _insertCast = function(req, movie){
    if(!movie) return;

    const castInput = {
        name: req.body.name,
        debut_year: req.body.debut_year
    }
    movie.casts.push(castInput);
    return movie.save();
}

const _partialCastUpdateOne = function(req, movie){
    if(!movie) return;

    let cast = movie.casts.id(req.params.castId);
    if(!cast) return;

    if(req.body.name){
        movie.casts.id(req.params.castId).name = req.body.name;
    }
    if(req.body.debut_year){
        movie.casts.id(req.params.castId).debut_year = req.body.debut_year;
    }
    
    return movie.save();
}

const _updateCastOne = function(req, res, castUpdateCallback){
    const response = {};
    if(!mongoose.isValidObjectId(req.params.movieId)){
        utils._fillResponse(response, process.env.STATUS_USER_ERROR, {message: process.env.MSG_INVALID_MOVIE_ID});
        utils._sendResponse(res, response);
        return;
    }
    if(!mongoose.isValidObjectId(req.params.castId)){
        utils._fillResponse(response, process.env.STATUS_USER_ERROR, {message: process.env.MSG_INVALID_CAST_ID});
        utils._sendResponse(res, response);
        return;
    }

    Movie.findById(req.params.movieId)
        .then(movie=>castUpdateCallback(req, movie))
        .then(updatedMovie=>{
            console.log(updatedMovie);
            if(!updatedMovie){
                utils._fillResponse(response, process.env.STATUS_NOT_FOUND, {message: process.env.MSG_CAST_NOT_FOUND});
            }
            else{
                utils._fillResponse(response, process.env.STATUS_OK, updatedMovie);
            }
        })
        .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(()=>utils._sendResponse(res, response));
}

module.exports = {deleteCast, getAllCasts, getOneCast, insertCast, updateCastFull, updateCastPartial};