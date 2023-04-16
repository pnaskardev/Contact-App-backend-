

// IMPORTS FROM FILES
const User=require('../models/user');
const {Contact}=require('../models/contact');


// GET ALL CONTACTS
exports.getAllContacts=async(req,res,next)=>
{
    try 
    {
        const userId = req.query.id;
        console.log(userId);
        const user = await User.findById(userId);
        if (!user) 
        {
            return res.status(404).json({ error: 'User not found' });
        }
        const contacts = user.contacts;
        req.contacts = contacts;
        next();
    } 
      catch (err) 
      {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
      }
}

// POST ADD CONTACT
exports.postAddContact=async(req,res,next)=>
{
    console.log('insidee post add contact');
    try 
    {
        const userId=await req.query.id;
        const user=await User.findById(userId);
        if (!user) 
        {
            return res.status(404).json({ error: 'User not found' });
        }
        const {name,phone,email}=await req.body;
        const existingContact = user.contacts.find
        (
            (contact) => contact.email === email || contact.phone === phone
        );
        if (existingContact) 
        {
            return res.status(400).json({ msg: 'Contact already exists' });
        }
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
exports.postDeleteContact=async (req,res,next)=>
{
    try 
    {
        const userId = req.query.userId;
        const contactId = req.query.contactId;    
        const user=await User.findById(userId);
        if (!user) 
        {
            return res.status(404).json({ error: 'User not found' });
        }
        const contactIndex = user.contacts.findIndex(c => c.id === contactId);
        if (contactIndex === -1) 
        {
            return res.status(404).json({ error: 'Contact not found' });
        }
        user.contacts.splice(contactIndex, 1);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

// PATCH EDIT CONTACT IN THE DB
exports.patchEditContact= async (req,res,next)=>
{
    try 
    {
        const { userId, contactId } = req.query;
        // console.log(userId);
        const { name, email, phone } = req.body;
        const updateFields = 
        {
            "contacts.$.name": name,
            "contacts.$.email": email,
            "contacts.$.phone": phone,
        };
        // const user = await User.findByIdAndUpdate(
        // userId,
        // {
        //     $set: {
        //     'contacts.$[contact].name': name,
        //     'contacts.$[contact].email': email,
        //     'contacts.$[contact].phone': phone,
        //     },
        // },
        // {
        //     new: true,
        //     // arrayFilters: [{ 'contact._id': contactId }],
        //     arrayFilters: [{ '_id': contactId }],
        // }
        // );
        const user = await User.findById(userId);
        if (!user) 
        {
            return res.status(404).send({ error: 'User not found' });
        }
        const contactIndex = user.contacts.findIndex
        (
            (contact) => contact._id.toString() === contactId
        );
        if (contactIndex === -1) 
        {
            return res.status(404).send({ error: 'Contact not found' });
        }
        var contactToUpdate = user.contacts[contactIndex];
        const updatedContact = Object.assign({},contactToUpdate,{
            name: name,
            email: email,
            phone:phone
          });
        user.contacts.set(contactIndex, updatedContact);
        await user.save();
        res.status(200).json(user.contacts[contactIndex]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}