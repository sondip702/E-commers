const express = require('express');
const { params } = require('superagent/lib/utils');

const toureRoute = require('./Route/tourRoute');
const UserRoutes = require('./Route/userRoute');


const app = express();
app.use(express.json());

app.use((req,res,next)=>{
    req.requstTime = new Date().toISOString();
    console.log(req.headers);
    next();
})

app.use('/api/v1/toure', toureRoute);
app.use('/api/v1/user', UserRoutes);

module.exports = app;