const mongoose=require('mongoose');

// IMPORTS FROM FILES
const validator=require('../utils/validators');

const userSchema=mongoose.Schema
({
    name:
    {
        required:true,
        type:String,
        trim:true
    },
    phone:
    {
        required:true,
        type:String,
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
        required:true,
        type:String,
        trim:true,
        validate:
        {
            validator:(value)=>
            {
                return value.match(validator.emailValidator);
            },
            message:"Please enter a valid email address"
        }
    },
    password:
    {
        required:true,
        type:String,
    }
});

const User=mongoose.model('User',userSchema);

module.exports=User;