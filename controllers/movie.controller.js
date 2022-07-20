const mongoose = require('mongoose');
const utils = require('./utils.controller');
const Movie = mongoose.model('Movie');

const deleteMovie = function(req, res){
    const response = {};
    if(!mongoose.isValidObjectId(req.params.movieId)){
        utils._fillResponse(response, process.env.STATUS_USER_ERROR, {message: process.env.MSG_INVALID_MOVIE_ID});
        utils._sendResponse(res, response);
        return;
    }

    Movie.findByIdAndDelete(req.params.movieId)
        .then(deletedMovie=>{
            if(!deletedMovie){
                utils._fillResponse(response, process.env.STATUS_NOT_FOUND, {message: process.env.MSG_MOVIE_NOT_FOUND});
            }
            else{
                utils._fillResponse(response, process.env.STATUS_OK, deletedMovie);
            }
        })
        .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(()=>utils._sendResponse(res, response));
}

const getAllMovies = function(req, res){
    const response = {};
    let count = parseInt(process.env.DEFAULT_COUNT, process.env.BASE_NUMBER);
    let offset = parseInt(process.env.DEFAULT_OFFSET, process.env.BASE_NUMBER);

    if(req.query.count){
        count = parseInt(req.query.count, process.env.BASE_NUMBER);
    }
    if(req.query.offset){
        offset = parseInt(req.query.offset, process.env.BASE_NUMBER);
    }

    if(count > parseInt(process.env.DEFAULT_COUNT, process.env.BASE_NUMBER)){
        utils._fillResponse(process.env.STATUS_USER_ERROR, {message: process.env.MSG_USER_ERROR});
        utils._sendResponse(res, response);
        return;
    }

    Movie.find().skip(offset).limit(count).exec()
        .then(movies=>utils._fillResponse(response, process.env.STATUS_OK, movies))
        .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(()=>utils._sendResponse(res, response));
}

const getOneMovie = function(req, res){
    const response = {};
    if(!mongoose.isValidObjectId(req.params.movieId)){
        utils._fillResponse(response, process.env.STATUS_USER_ERROR, {message: process.env.MSG_INVALID_MOVIE_ID});
        utils._sendResponse(res, response);
        return;
    }

    Movie.findById(req.params.movieId)
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

const insertMovie = function(req, res){
    const response = {};
    let genre = [];
    if(req.body.genre){
        genre = req.body.genre.split(',').map(item=>item.trim());
    }
    const newMovie = {
        title: req.body.title,
        year: req.body.year,
        genre: genre,
        casts: []
    }
    Movie.create(newMovie)
        .then(movie=>utils._fillResponse(response, process.env.STATUS_CREATED, movie))
        .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(()=>utils._sendResponse(res, response));
}

const searchMovies = function(req, res){
    console.log('in search movies');
    const response = {};

    if(req.body.title){
        Movie.find({title:{ $regex: '.*' + req.body.title + '.*', $options: 'i' }}).exec()
            .then(movies=>utils._fillResponse(response, process.env.STATUS_OK, movies))
            .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
            .finally(()=>utils._sendResponse(res, response));
    }
    else{
        utils._fillResponse(response, process.env.STATUS_USER_ERROR, {message: process.env.MSG_EMPTY_SEARCH_TEXT});
        utils._sendResponse(res, response);
    }
}

const updateMovieFull = function(req, res){
    console.log('fullMovieUpdateOne called');
    _updateMovieOne(req, res, _fullMovieUpdateOne);
}

const updateMoviePartial = function(req, res){
    console.log('partialMovieUpdateOne called');
    _updateMovieOne(req, res, _partialMovieUpdateOne);
}

const _fullMovieUpdateOne = function(req, movie){
    if(!movie) return;
    let genre = [];
    if(req.body.genre){
        if(Array.isArray(req.body.genre)){
            genre = req.body.genre;
        }
        else{
            genre = req.body.genre.split(',').map(item=>item.trim());
        }
    }
    movie.title = req.body.title;
    movie.year = req.body.year;
    movie.genre = genre;
    return movie.save();
}

const _partialMovieUpdateOne = function(req, movie){
    if(!movie) return;
    if(req.body.title){
        movie.title = req.body.title;
    }
    if(req.body.year){
        movie.year = req.body.year;
    }
    if(req.body.genre){
        let genre = req.body.genre.split(',').map(item=>item.trim());
        movie.rate = genre;
    }
    return movie.save();
}

const _updateMovieOne = function(req, res, movieUpdateCallback){
    const response = {};
    if(!mongoose.isValidObjectId(req.params.movieId)){
        utils._fillResponse(response, process.env.STATUS_USER_ERROR, {message: process.env.MSG_INVALID_MOVIE_ID});
        utils._sendResponse(res, response);
        return;
    }

    Movie.findById(req.params.movieId)
        .then(movie=>movieUpdateCallback(req, movie))
        .then(updatedMovie=>{
            console.log(updatedMovie);
            if(!updatedMovie){
                utils._fillResponse(response, process.env.STATUS_NOT_FOUND, {message: process.env.MSG_MOVIE_NOT_FOUND});
            }
            else{
                utils._fillResponse(response, process.env.STATUS_OK, updatedMovie);
            }
        })
        .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(()=>utils._sendResponse(res, response));
}

module.exports = {deleteMovie, getAllMovies, getOneMovie, insertMovie, searchMovies, updateMovieFull,
    updateMoviePartial};