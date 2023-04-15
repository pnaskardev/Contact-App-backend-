// IMPORTS FROM PACKAGES
const express=require('express');

// IMPORTS FROM FILES
const User=require('../models/user');
const contactController=require('../controllers/contact_controller');

// INIT
const contactsRouter=express.Router();

// GET LIST OF CONTACTS
contactsRouter.get("/get-contacts",contactController.postAddContact);

// POST ADD CONTACT
contactsRouter.post("/add-contact",contactController.postAddContact);

// EDIT CONTACT
contactsRouter.patch("/edit-contact",contactController.postAddContact);

// DELETE CONTACT
contactsRouter.delete("/delete-contact",contactController.postAddContact);


module.exports=contactsRouter;