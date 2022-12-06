const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const secret = process.env.SECRET_KEY;

const protect = asyncHandler(async(req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, secret)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not Authorized")
        }
    }
    if(!token) {
        res.status(401)
        throw new Error("Not Authorized, no token")
    }
});

module.exports  = { protect };