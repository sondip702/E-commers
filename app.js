const express = require('express');
const router = require('./Route/userRoute')

const app = express();
app.use(express.json());

app.use((req,res,next)=>{
    req.requstTime = new Date().toISOString();
    console.log(req.headers);
    next();
})

app.use('/api/v1/user', router);

module.exports = app;