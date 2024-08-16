const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const getUser = asyncHandler(async(req, res)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message: 'Not authenticated'})
    }
    jwt.verify(req.cookies.token, process.env.JWT_SECRET, async(err, data) => {
        if (err) {
          res.clearCookie("token");
          console.log("token error:", err.message);
          return res.status(401).json({message: 'Not authenticated'});
        }
        
        const user = await userModel.findById(data.id).select("-password");
    
        res.status(200).send({user, auth:true});
      });
});


module.exports = getUser;
