const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const isLoggedIn = asyncHandler(async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      return res.redirect("/");
    }
  } catch (error) {
    return res.status(400).redirect("/");
  }

  jwt.verify(req.cookies.token, process.env.JWT_SECRET, async(err, data) => {
    if (err) {
      res.clearCookie("token");
      console.log("token error:", err.message);
      return res.status(400).redirect("/");
    }
    
    req.user = await userModel.findById(data.id).select("-password");

    next();
  });
});

module.exports = { isLoggedIn };
