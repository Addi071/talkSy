import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/util.js";
// import user from "../models/user.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req,res)=>{
    const info = req.body
    try{
        if(!info.password || !info.name || !info.email){
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await User.findOne({email: info.email});

        if(user){
            return res.status(400).json({message: "User already exists"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(info.password, salt);

        const newUser = new User({
            name: info.name,
            email: info.email,
            password: hashedPassword
        });
        if(newUser){
            generateToken(newUser._id,res)
            let result = await newUser.save();
            res.status(200).json(result)
        }else{
            res.status(400).json({message:"Invalid user data"})
        }

    } catch(err){
        console.log("Error in signup controller")
        res.status(500).json({message:"Internal server error"})
    }   
    // res.send(result)

}

export const login = async (req,res)=>{
     let info = req.body;
     try{
        if(!info.email || !info.password){
            return res.status(400).json({message: "All fields are required"});
        }

        let result = await User.findOne({email:info.email});

        if(!result){
            res.status(400).json({message:"Invalid credentials"})
        }

        const checkpass = await bcrypt.compare(info.password, result.password)        
  
        if(!checkpass){
            res.status(400).json({message:"Invalid credentials"})
        }   

        generateToken(result._id,res)

        res.status(200).json({
            _id: result._id,
            name: result.name,
            email: result.email
        })

     }catch(err){
        console.log("Error in login controller")
        res.status(500).json({message:"Internal server error"})
     }
}

export const logout = async (req,res)=>{
    try{

        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
    }catch(err){
        console.log("Error in logout controller")
        res.status(400).json({message:"Internal server error"})
    }
}

export const updateProfile = async (req,res)=>{
    try{
        const {profilePic} = req.body;
        const uesrId = req.user._id
        if(!profilePic){
            return res.status(400).json({message: "Proile pic is required"})
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)

        const updatedUser = await User.findByIdAndUpdate(uesrId, {profilePic:uploadResponse.secure_url},{new:true})

        res.status (200).json(updatedUser)

    } catch (err){
        res.status(500).json({message:"Internal server error"})
    }
}

export const checkAuth = (req,res)=>{
    try{
        res.status(200).json(req.user)
    } catch(err){
        console.log("Error in checkAuth controller", err.message)
        res.status(500).json({message:'Internal server error'})
    }
}