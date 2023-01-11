import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      friends,
      picturePath,
      location,
      accupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      friends,
      picturePath,
      location,
      accupation,
      impressions: Math.floor(Math.random() * 10000),
      viewedProfile: Math.floor(Math.random() * 10000),
    });
    const savedUser =await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({error:error.message})
  }
};


/*LOGIN */

export const login = async(req, res) => { 
    try {
        const {email,password}=req.body
        if(!email | !password) return res.status(400).json({msg:"invalid email or password"})
        const user = await User.findOne({email})

        if(!user) return res.status(400).json({msg:"user does not exists!"})

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(400).json({msg:"user does not exists!"})

        const token = jwt.sign({id:user._id},process.env.SECRET_KEY)
        delete user.password

        res.status(200).json({token,user})
       
        
    } catch (error) {

        res.status(500).json({error:error.message})
        
    }
}