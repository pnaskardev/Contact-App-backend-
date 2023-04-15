// IMPORTS FROM PACKAGES
const express=require('express');

// IMPORTS FROM FILES
const User=require('../models/user');
const contactController=require('../controllers/contact_controller');

// INIT
const contactsRouter=express.Router();

// GET LIST OF CONTACTS
contactsRouter.get("/get-contacts",contactController.getAllContacts,(req,res)=>
{
    const contacts = req.contacts;
    res.json(contacts);
});

// POST ADD CONTACT
contactsRouter.post("/add-contact",contactController.postAddContact);

// EDIT CONTACT
contactsRouter.patch("/edit-contact",contactController.patchEditContact);

// DELETE CONTACT
contactsRouter.delete("/delete-contact",contactController.postDeleteContact);


module.exports=contactsRouter;