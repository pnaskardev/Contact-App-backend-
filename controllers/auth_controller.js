// IMPORTS FROM PACKAGES
const bcryptJs=require('bcryptjs');

// IMPORTS FROM FILES
const User=require('../models/user');

// SIGN UP
exports.postSignupUser=async (req,res,next)=>
{
    try 
    {
        const {name,phone,email,password}=req.body;
    
        const existingUser=await User.findOne({email}) || await User.findOne({phone});
        if(existingUser)
        {
            return res.status(400).json
            ({
                msg:"User with same email already exists"
            });
        }
    
        // return that data to the user 
        const hashedPassword=await bcryptJs.hash(password,8);
        let user=new User
        ({
            name,
            password:hashedPassword,
            phone,
            email
        })
        user=await user.save();
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({error:e.message});
    }
   
}