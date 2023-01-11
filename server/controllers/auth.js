import bcrypt from "bcrypt";
import Jwt  from "jsonwebtoken";
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
