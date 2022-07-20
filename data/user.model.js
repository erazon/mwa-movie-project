const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

mongoose.model('User', userSchema, process.env.COLLECTION_USERS);