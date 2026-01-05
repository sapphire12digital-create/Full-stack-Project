import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check user
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid email" });
    }

    // validate password
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

 
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword
    });


    let token = genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json(user);

  } catch (error) {
    console.log("❌ signup error:", error.message);
    return res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async(req,res) =>{
  try{
    let {email,password} = req.body;
    let user = await  User.findOne({email})
    if(!user){
      return res.status(404).json({message:"User is not found"})
    }
    let isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
       return res.status(400).json({message:"Incorrect Password"})
    }
    let token = genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json(user);

  }catch(error){
    console.log("login error");
    return res.status(500).json({ message:`Login error ${error}` });
  }

}
export const logOut = async (req,res) => {
try{
  res.clearCookie("token")
  return res.status(200).json({message:"logout successful"})
} catch(error) {
  console.log("logOut error");
  return res.status(500).json({ message:`LogOut error ${error}` });
}
}