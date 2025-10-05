const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth");
// Sign Up 
router.post("/sign-up",async (req,res)=>{
    try {
        const {username, password, email, address} = req.body;

        // check username length should be greater than 3
        if(username.length < 4){
            return res.status(400).json({message:"username length should be greater than 3"}); 
        }

        // check username already exist? database me username pahle se exist to nhi krta 
        const existingUsername = await User.findOne({username:username});
        if(existingUsername){
            return res.status(400).json({message:"username already exist"});
        }

        // check email already exist? database me email pahle se exist to nhi krta 
        const emailAlreadyExist = await User.findOne({email:email});
        if(emailAlreadyExist){
            return res.status(400).json({message:"email already exist"});
        }

        // check password length
        if(password.length <= 5){
            return res.status(400).json({message:"password length should be greater than 5"});
        }

        // password alredy exist
        const existingPassword = await User.findOne({password:password});
        if(existingPassword){
            return res.status(400).json({message:"password already exist"});
        }
        const hashPass = await bcrypt.hash(password,10);

        const newUser = new User({
            username:username,
            email:email,
            password:hashPass,
            address:address
        });
        await newUser.save();
        return res.status(200).json({message:"SignUp Successfully"});

    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

//Sign-In
router.post("/sign-in", async(req,res)=>{
    try {
        const {username,password} = req.body;
        const existingUser = await User.findOne({username});
        if(!existingUser){
            res.status(400).json({message:"Invalid Credentials"});
        }
        await bcrypt.compare(password, existingUser.password,(err,data)=>{
            if(data){
                const authClaims = [
                    {name:existingUser.username},
                    {role:existingUser.role},

                ]
                const token = jwt.sign({authClaims},"bookStore123",{
                    expiresIn:"30d",

                });
                res.status(200).json({id:existingUser._id, role:existingUser.role, token:token});
            }
            else{ 
                res.status(400).json({message:"Invalid Credentials"});
            }
        })
    } catch (error) {
        res.status(500).json({message:error.mssage});
    }
});


// get-user-info
router.get("/get-user-information", authenticateToken , async(req,res)=>{
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

// update-address
router.put("/update-address", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id , {address : address});
        return res.status(200).json({message: "address updated successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

module.exports = router;