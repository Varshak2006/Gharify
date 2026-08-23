const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const registerUser=async(req,res)=>{
    try{
        const{name,
              email,
              password,
            role,
            serviceType,
            phone,
            city,
            experience,
            profileImage}=req.body;
        if(role=="admin"){
            return res.status(403).json({
                message:"Admin registeration not allowed"
            });
        }
        
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                message:"User already exists"
            });
        }
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        const user=await User.create({
            name,
            email,
            password:hashedpassword,
            role,
            serviceType,
            phone,
            city,
            experience,
            profileImage
        });
        res.status(201).json({
            message:"user registered sucessfully"   
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
const getAllUsers=async(req,res)=>{
    try{
        const users=await User.find().select("-password");
        res.status(200).json(users);
    }catch(error){
res.status(500).json({
    message:error.message
});
    }
};
const loginUser=async (req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"user not found"
            });
        }
        const isMatch=await bcrypt.compare(
            password,
            user.password
        );
        if(!isMatch){
            return res.status(400).json({
                message:"invalid credentials"
            });
        }
        const token=jwt.sign(
            {
                id:user._id,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        );
        res.status(200).json({
            message:"Login Successful",
            token,
            role:user.role,
            name:user.name,
            userId: user._id
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
const getPublicUsers = async (req, res) => {
    try {

        const users = await User.find(
            {},
            "name role serviceType phone city experience profileImage"
        );

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
module.exports={registerUser,loginUser,getAllUsers,getPublicUsers};