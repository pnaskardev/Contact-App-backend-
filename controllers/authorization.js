const bcryptJs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');



const User=require('../models/user');

// INIT
dotenv.config();
exports.authorization=async (req,res,next)=>
{
    try 
    {
        const token=req.header('x-auth-token');
        if(!token)
        {
            return res.status(401).json({ message: "Authorization header missing" });
        }
        const verified=jwt.verify(token,process.env.PASS_KEY);
        if(!verified)return res.status(401).json({ message: "Authorization failed" });

        const user=await User.findById(verified.id);
        if(!user) return res.status(401).json({ message: "Authorization failed" });
        next();
    } catch (error) {
        console.log(`${error.message}`);
        res.status(500).json({ message: "Invalid token" });
    }
}