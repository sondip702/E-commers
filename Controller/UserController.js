const bcrypt = require('bcryptjs');
const User = require('../schema/userModel');
const jwt = require('jsonwebtoken')
const AsyncHandler =require('express-async-handler')

const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '1h' })
}

exports.registation = AsyncHandler(async (req,res)=>{
    try{
        const {name, email, password, passwordConfirm} = req.body;

        if (!name || !email || !password || !passwordConfirm) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const finemail = await User.findOne({ email });
        if(finemail){
            return res.status(404).json({success: false, message: "User Was already exist"})
        }
        if (password !== passwordConfirm) {
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }
        
        const hashPassword = await bcrypt.hash(password, 12)

        const newUser = await User.create({
                name,
                email,
                password:hashPassword
                
        })   
        const token = createToken(newUser._id)

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token
        });
    }catch(err){
        console.log("Registation failed", err.message);
        res.status(500).json({ success: false, message: "Registration failed", error: err.message });
    }
})