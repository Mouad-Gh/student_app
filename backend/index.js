require("dotenv").config();
const cors=require("cors");
const express = require('express');
const mongoose = require('mongoose');

const app = express();

//middleware

//it looks if the request has some body  and parse and attach it to the req object so we can access it
app.use(express.json());

//to enable cors
app.use(cors());

//routes
app.use('/api/students', require("./routes/students"));


//connect to db
mongoose.connect(process.env.MONG_URI)
    .then(  ()=>{
        //listning for requests
        app.listen(process.env.PORT,()=>{
            
            console.log('connected to db & listening on port ',process.env.PORT);

        });
    })
    .catch((err)=>{
        console.log(err);
    });

// Export the Express API
module.exports = app;