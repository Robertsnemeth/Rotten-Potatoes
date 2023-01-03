const User = require('../models/user.model');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret  = process.env.SECRET_KEY;
const bcrypt = require('bcrypt');

module.exports.createUser = (req, res) => {
    User.create(req.body)
        .then(newUser => {
            const userToken = jwt.sign({
                id: newUser._id
            }, secret)
            res.cookie("usertoken", userToken, {httpOnly: true}).json({ msg: "success!", user: newUser, token: userToken})
        })
        .catch(err => {res.status(400).json({mesage: "Something went wrong", error: err})});
};

module.exports.loginUser = async(req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(user === null) {
        return res.status(400).json({error: "invalid email/password"});
    }
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if(!correctPassword) {
        return res.status(400).json({error: "invalid email/password"});
    }
    const userToken = jwt.sign({
        id: user._id
    }, secret);
    res.cookie("usertoken", userToken, {httpOnly: true}).json({ msg: "success", user, token: userToken})
};

module.exports.logoutUser = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
};

module.exports.findAllUsers = (req, res) => {
    User.find().populate('watchlists')
        .then(allUsers => {res.json({users: allUsers})})
        .catch(err => {res.json({message: "Something went wrong", error: err})})
};

module.exports.findAllWatchlistsByUser = (req, res) => {
    User.find({_id: req.params.id})
        .then(userWatchlists => {
            res.json(userWatchlists)
        })
        .catch(err => {res.json({message: "Something went wrong", error: err})})
};

module.exports.findSingleUser = (req, res) => {
    User.findById(req.user.id).populate('watchlists')
        .then(singleUser => {res.status(200).json({user: singleUser})})
        .catch(err => {res.json({message: "Something went wrong", error: err})})
};

module.exports.updateUser = (req, res) => {
    User.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
    )
    .then(updatedUser => {res.json({user: updatedUser})})
    .catch(err => {res.status(400).json({message:"Something went wrong", error: err})})
};

module.exports.deleteUser = (req, res) => {
    User.deleteOne({_id: req.params.id})
        .then(deletedUser => res.json(deletedUser))
        .catch(err => {res.json({message:"Something went wrong", error: err})})
};