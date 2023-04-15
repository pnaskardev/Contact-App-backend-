// IMPORTS FROM PACKAGES
const bcryptJs=require('bcryptjs');
const jwt=require('jsonwebtoken');
// IMPORTS FROM FILES
const User=require('../models/user');

exports.getUserData=async(req,res,next)=>
{
    try 
    {
        const token=req.header('x-auth-token');
        if(!token)
        {
            return res.status(401).json({msg:'No auth token access denied'});
        }
        const verified=jwt.verify(token,"passwordKey");
        if(!verified)return res.status(401).json({msg:'Token verification failed authorization denied'});

        req.user=verified.id;
        req.token=token;
        next();
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

exports.tokenIsValid=async (req,res,next)=>
{
    try 
    {
        const token=req.header('x-auth-token');
        if(!token) return res.json(false);
        const verified=jwt.verify(token,"passwordKey");
        if(!verified)return res.json(false);

        const user=await User.findById(verified.id);
        if(!user) return res.json(false);

        res.json(true);
        
    } catch (error) {
        
    }
}

// SIGN UP
exports.postSignupUser=async (req,res,next)=>
{
    console.log
    try 
    {
        const {name,phone,email,password}=await req.body;
        // const name=await req.body.name;
        // const email=await req.body.email;
        // const phone=await req.body.phone;
        // const password=await req.body.password;
        console.log(`${name} ${phone} ${email} ${password}`);
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
            email,
            contacts:[]
        })
        user=await user.save();
        // res.status(200).json(user);
        const token=jwt.sign({id:user._id},"passwordKey");
        res.status(200).json({token,...user._doc});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
   
}
// SIGN-IN
exports.postSignInUser=async(req,res,next)=>
{
    try 
    {
        const {name,password}=req.body;
        const user=await User.findOne({name});
        if(!user)
        {
            return res.status(400)
            .json({msg:"User with this name does not exist"});
        }    
        const isMatch=bcryptJs.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(400)
            .json({msg:"Incorrect Password"});
        }

        const token=jwt.sign({id:user._id},"passwordKey");
        res.json({token,...user._doc});

    } catch (error) {
        res.status(500).json({error:e.message});
    }
}