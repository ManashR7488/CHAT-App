const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    res.send("message: All fields are required");
    return;
  }

  const existUser = await userModel.findOne({ email });

  if (existUser) {
    res.status(400).json({ message: "Email already exists." });
    return;
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
        const thisUser = await userModel.findOne({_id:user._id}).select("-password")
        res.cookie("token", token);
        res.status(201).json({
          success: true,
          user: thisUser,
        });
      } else {
        res.status(400).send("message: Failed to create user");
      }
    });
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  // console.log(user);

  if (!user) {
    return res.status(404).json({ message: "email or Password is incorrect" });
  } else {
    bcrypt.compare(password, user.password, async (err, result) => {
      if (result) {
        const token = generateToken(user._id);
        const thisUser = await userModel.findOne({email}).select("-password",)
        res.cookie("token", token);
        res.status(201).json({
          success: true,
          user: thisUser,
        });
      } else {
        return res
          .status(401)
          .json({ message: "email or Password is incorrect" });
      }
    });
  }
});

// get- api/user?search=manash&age=12

const allUsers = asyncHandler(async (req, res) => {
  const keywords = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const user = await userModel
    .find(keywords)
    .select("-password")
    .find({ _id: { $ne: req.user._id } });

  res.send(user);
});

module.exports = { registerUser, loginUser, allUsers };
