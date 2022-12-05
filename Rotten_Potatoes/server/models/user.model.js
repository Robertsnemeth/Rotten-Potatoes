const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const validator = require('validator');
const MovieWatchlist = require('./movie_watchlist.model');
const { isEmail } = validator;

const MovieWatchlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minLength: [ 2, "Title must be at least 2 characters long"]
    },
    movies: [String]
}, {timestamps: true});

const UserSchema = new mongoose.Schema( {
    username: {
        type: String,
        required: [true, "Username is required"],
        minLenght: [2, "Username must be at least 2 characters long"],
        unique: true,
        uniqueCaseInsensitive: [true]

    },
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        minLength: [2, "First Name must be at least 2 characters"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],
        minLength: [2, "Last Name must be at least 2 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [isEmail, "Invalid Email"],
        unique: true,
        uniqueCaseInsensitive: [true]
    },
    watchlists: [MovieWatchlistSchema],
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be at least 8 characters long"]
    }
}, {timestamps:true});

UserSchema.plugin(uniqueValidator, { message: "This username is already taken"});
UserSchema.plugin(uniqueValidator, { message: "This email is already taken"});


UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword )
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model("User", UserSchema);