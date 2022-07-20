const express = require('express');
const authControllers = require('../controllers/auth.controller');
const castControllers = require('../controllers/cast.controller');

const router = express.Router({mergeParams: true});

router.route('/')
    .get(castControllers.getAllCasts)
    .post(authControllers.verifyToken, castControllers.insertCast);

router.route('/:castId')
    .get(castControllers.getOneCast)
    .put(authControllers.verifyToken, castControllers.updateCastFull)
    .patch(authControllers.verifyToken, castControllers.updateCastPartial)
    .delete(authControllers.verifyToken, castControllers.deleteCast);

module.exports = router