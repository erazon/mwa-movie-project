const mongoose = require('mongoose');
const castSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    debut_year: {
        min: 1800,
        max: 2022,
        type: Number,
    }
});

module.exports = castSchema;