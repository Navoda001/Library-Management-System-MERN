const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const User = require("../model/UserModel")
const { addUser } = require ("../service/UserService")

const authUrl = "/auth";
const jwtSecret = process.env.JWT_SECRET;

if(!jwtSecret){
    console.error("Missing  required env variables")
    process.exit(1)
}

//Login - SignIn
router.post(`${authUrl}/signin`,async(req,res) =>{
    const { email, password} = req.body;
    try{
        const user = await User.findOne({email});

        //find the user
        if(!user){
            return res.status(401).json({error: "Invalid Credentials" });
        }
    
        //compare the hashpw
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({error: "Invalid Credentials" });
        }
        // Token generate
        const token = jwt.sign({userId: user.email}, jwtSecret, {expiresIn: '1h'});
        res.json({token})
        
    }catch(err){
        console.error("Login Error ",error)
        return res.status(500).json({error: "Internal Server Error" });
    }
   
});

//Register - SignUp
router.post(`${authUrl}/signup`,async(req,res)=>{
    const { userId, firstName, lastName, email, password, role } = req.body;

    if(!userId || !firstName || !lastName || !email || !password || !role){
        return res.status(401).json({error: "Missing required field/s" });
    }
    try{
        //create user
        const user = await addUser(req.body);
        //tokrn gen
        const token = jwt.sign({userId: user.email}, jwtSecret, {expiresIn: '1h'});
        res.status(201).json({message: "User created!!", token})

    }catch(err){
        console.error(err)
        return res.status(500).json({error: "Internal Server Error" });
    }

});

module.exports = router;