const mongoose=require('mongoose');

// IMPORTS FROM FILES
const validator=require('../utils/validators');


const contactSchema=mongoose.Schema
({
    name:
    {
        type:String,
        require:true,
        trim:true
    },
    phone:
    {
        type:String,
        require:true,
        trim:true,
        validate:
        {
            validator:(value)=>
            {
                return value.match(validator.phoneValidator);
            },
            message:"Please enter a valid phone number"
        }
    },
    email:
    {
        type:String,
        require:true,
        trim:true,
        validate:
        {
            validator:(value)=>
            {
                return value.match(validator.emailValidator);
            },
            message:"Please enter a valid email address"
        }
    }
});

const Contact=mongoose.model("Contact",contactSchema);
module.exports={Contact,contactSchema};