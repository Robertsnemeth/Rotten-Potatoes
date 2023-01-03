const mongoose = require('mongoose');
const User = require('./user.model');

const MovieWatchlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minLength: [ 2, "Title must be at least 2 characters long"],
        maxLength: [ 20, "Title cannot be more than 20 characters long"]
    },
    movies: [{
        movie: {
            title: {
                type: String
            },
            poster: {
                type: String
            },
            imdbID: {
                type: String
            }
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

module.exports = mongoose.model("Watchlist", MovieWatchlistSchema);