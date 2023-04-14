// IMPORTS FROM PACKAGES
const express=require('express');

// IMPORTS FROM FILES
const authController=require('../controllers/auth_controller');

// INIT
const authRouter=express.Router();

authRouter.post("/signup",authController.postSignupUser);

module.exports=authRouter;