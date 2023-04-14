// IMPORTS FROM PACKAGES
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// IMPORTS FROM FILES
const authRouter = require('./routes/auth');




// INIT
dotenv.config();
const app = express();


// MIDDLEWARES
app.use('/auth', authRouter);


// CONNECTIONS
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log("Connection Succesful")
    })
    .catch(err => console.log(err));
app.listen(process.env.PORT, "0.0.0.0");