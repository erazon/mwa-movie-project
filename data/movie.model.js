const mongoose = require('mongoose');
const castSchema = require('./cast.model');
const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    genre: [String],
    casts: [castSchema]
});

mongoose.model('Movie', movieSchema, process.env.COLLECTION_MOVIES);