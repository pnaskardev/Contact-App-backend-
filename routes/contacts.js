// IMPORTS FROM PACKAGES
const express=require('express');

// IMPORTS FROM FILES
const User=require('../models/user');
const contactController=require('../controllers/contact_controller');
const authorization=require('../controllers/authorization').authorization;

// INIT
const contactsRouter=express.Router();

// GET LIST OF CONTACTS
contactsRouter.get("/get-contacts",authorization,contactController.getAllContacts);

// POST ADD CONTACT
contactsRouter.post("/add-contact",authorization,contactController.postAddContact);

// EDIT CONTACT
contactsRouter.patch("/edit-contact",authorization,contactController.patchEditContact);

// DELETE CONTACT
contactsRouter.delete("/delete-contact",authorization,contactController.postDeleteContact);


module.exports=contactsRouter;