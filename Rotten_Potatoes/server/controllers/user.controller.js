const User = require('../models/user.model');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');
const bcrypt = require('bcrypt');

module.exports.createUser = (req, res) => {
    User.create(req.body)
        .then(newUser => {
            const userToken = jwt.sign({
                id: newUser._id
            }, secret)
            res.cookie("usertoken", userToken, {httpOnly: true}).json({ msg: "success!", user: newUser})
        })
        .catch(err => {res.status(400).json({mesage: "Something went wrong", error: err})});
};

module.exports.loginUser = async(req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(user === null) {
        return res.sendStatus(400).json({error: "invalid email/password"});
    }
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if(!correctPassword) {
        return res.sendStatus(400).json({error: "invalid email/password"});
    }
    const userToken = jwt.sign({
        id: user._id
    }, secret);
    res.cookie("usertoken", userToken, {httpOnly: true}).json({ msg: "success", user})
};

module.exports.logoutUser = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
};

module.exports.findAllUsers = (req, res) => {
    User.find()
        .then(allUsers => {res.json({users: allUsers})})
        .catch(err => {res.json({message: "Something went wrong", error: err})})
};

module.exports.findSingleUser = (req, res) => {
    User.findOne({_id: req.params.id})
        .then(singleUser => {res.json({user: singleUser})})
        .catch(err => {res.json({message: "Something went wrong", error: err})})
};

module.exports.deleteUser = (req, res) => {
    User.deleteOne({_id: req.params.id})
        .then(deletedUser => res.json(deletedUser))
        .catch(err => {res.json({message:"Something went wrong", error: err})})
};