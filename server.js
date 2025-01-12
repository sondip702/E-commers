const app = require('./index');
const dotenv = require('dotenv');
const { mongoose } = require('mongoose');
const Tour = require('.././Nodejs/schema/toureSchema')

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);


mongoose
    .connect(DB, {
   })
   .then(() => console.log('Connect with db')
);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log('App running on port 3000');
});