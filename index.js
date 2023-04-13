// IMPORTS FROM PACKAGES
const express=require('express');

// IMPORTS FROM FILES
const authRouter=require('./routes/auth');




// INIT
const PORT=3000;
const app=express();


// MIDDLEWARES
app.use(authRouter);

app.listen(PORT,"0.0.0.0");