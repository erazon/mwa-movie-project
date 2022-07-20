const express = require('express');
const castRouter = require('./cast.route');
const movieRouter = require('./movie.route');
const userRouter = require('./user.route');

const router = express.Router();
router.use('/movies', movieRouter);
router.use('/movies/:movieId/casts', castRouter);
router.use('/users', userRouter);

module.exports = router