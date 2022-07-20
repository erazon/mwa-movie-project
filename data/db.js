const mongoose = require('mongoose');
require('./movie.model');
require('./user.model');

mongoose.connect(process.env.DB_URL);

mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to', process.env.DB_NAME);
});

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected');
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error', err);
});

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log('Mongoose closed by app termination');
        process.exit(0);
    });
});

process.once('SIGUSR2', function(){
    mongoose.connection.close(function(){
        process.kill(process.pid, 'SIGUSR2');
        console.log('Mongoose disconnected by app restart');
    })
})