

// IMPORTS FROM FILES
const User=require('../models/user');
const {Contact}=require('../models/contact');


// GET ALL CONTACTS
exports.getAllContacts=async(req,res,next)=>
{
    
}

// POST ADD CONTACT
exports.postAddContact=async(req,res,next)=>
{
    try 
    {
        const userId=await req.body.id;
        const user=await User.findById(userId);
        if (!user) 
        {
            return res.status(404).json({ error: 'User not found' });
        }
        const {name,phone,email}=await req.body;
        const contact =new Contact({name,phone,email});
        if (!user.contacts) 
        {
            console.log('contacts is null');
            user.contacts = []; // Initialize contacts array if it's null or undefined
        }
        user.contacts.push(contact);
        await user.save();   
        res.status(201).json(user); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

// POST DELETE CONTACT

// PATCH EDIT CONTACT IN THE DB

// GET CONTACTS FROM THE DB 