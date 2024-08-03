const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400); 
    res.send("message: All fields are required");
    return ;
  }

  const existUser = await userModel.findOne({ email });

  if (existUser) {
    res.status(400);
    return res.send("message: User already exists");
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, async (err, hash) => {
      const user = await userModel.create({
        name,
        email,
        password: hash,
        pic,
      });
      if (user) {
        const token = generateToken(user._id);
        res.cookie("token", token);
        res.status(201).json({
          success: true,
          user,
        })
      } else {
        res.status(400).send("message: Failed to create user");
      }
    });
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).send("some thing is wrong");
  } else {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = generateToken(user._id);
        res.cookie("token", token);
        res.status(201).json({
          success: true,
          user,
        });
      }else{
        return res.status(404).send("email or Password is incorrect");
      }
    });
  }
});

module.exports = { registerUser, loginUser };
