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
        return res.status(201).json({
            success: true,
            message: "User registered successfully"
            
        });
    }catch(err){
        console.log("Registation failed", err.message);
        res.status(500).json({ success: false, message: "Registration failed", error: err.message });
    }
})

exports.login = AsyncHandler(async(req,res)=>{
    try{
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(isMatch._id)

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
        });
    }catch (err){
        console.log("Registation failed", err.message);
        res.status(500).json({ success: false, message: "Registration failed", error: err.message });
    }
})