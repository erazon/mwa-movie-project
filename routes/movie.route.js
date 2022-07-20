const express = require('express');
const authControllers = require('../controllers/auth.controller');
const movieControllers = require('../controllers/movie.controller');

const router = express.Router();

router.route('/').get(movieControllers.getAllMovies)
    .post(authControllers.verifyToken, movieControllers.insertMovie);

router.route('/:movieId')
    .get(movieControllers.getOneMovie)
    .put(authControllers.verifyToken, movieControllers.updateMovieFull)
    .patch(authControllers.verifyToken, movieControllers.updateMoviePartial)
    .delete(authControllers.verifyToken, movieControllers.deleteMovie);

router.route('/search')
    .post(movieControllers.searchMovies)

module.exports = router