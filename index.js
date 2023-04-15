// IMPORTS FROM PACKAGES
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


// IMPORTS FROM FILES
const authRouter = require('./routes/auth');
const contactRouter=require('./routes/contacts');

// INIT
dotenv.config();
const app = express();


// MIDDLEWARES
app.use(express.json());
app.use('/auth', authRouter);
app.use('/contacts',contactRouter);
app.use('/', (req, res, next) => 
{
    console.log('Hello World');
    res.json({ message: 'OK!!' });
});

// CONNECTIONS
mongoose.connect(process.env.DB_URI)
.then(() => 
{
    console.log("Connection Succesful");
    app.listen(process.env.PORT, "0.0.0.0");
})
.catch(err => console.log(err));

