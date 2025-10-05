//Sign up a new user
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const signup = async (req,res) => {
  const {fullName, email, password, bio } = req.body;
  try {
    if (!fullname || !email || !password || bio)
    {
      return res.json({success: false, message: "Missing Details"})
    }
    const user = await User.findOne({email});

    if (user){
      return res.json({success: false, message: "Account already exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = await User.create({
      fullName, email, password, hashedPassword, bio
    })

    const token = generateToken(newuser._id)
    res.json({success: true, userData: newuser, token, message : "Account Created succesfully"})
  } catch (error) {
    console.log(error.message);
        res.json({success: false, message : error.message})
  }
}


///Controller to login

export const login = async (req,res) => {
  try {
     const {email, password} = req.body;
     const userData = await User.findOne({email})

     const isPasswordCorrect = await bcrypt.compare(password, userData.password )

     if (!isPasswordCorrect){
       return res.json({success: false, message : "Invalid credentials"});
     }

     const token = generateToken(userData._id)
    res.json({success: true, userData, token, message : "Login Succesful"})
  } catch (error) {
    console.log(error.message);
        res.json({success: false, message : error.message})
  }
}