const express = require('express');
require('dotenv').config();
require('./data/db');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(process.env.PORT, function(){
    console.log('Server running on port', process.env.PORT);
});

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.header('Access-Control-Allow-Headers', 'authorization, Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    next();
});

app.use('/api', routes);
app.use((req, res)=>{
    res.status(parseInt(process.env.STATUS_NOT_FOUND, process.env.BASE_NUMBER)).json({error:process.env.MSG_REQUEST_NOT_FOUND});
});