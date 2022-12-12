const mongoose = require('mongoose');
const User = require('./user.model');

const MovieWatchlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Tile is required"]
    },
    movies: [{
        title: {
            type: String,
        },
        movie: {
            title: {
                type: String
            },
            poster: {
                type: String
            }
        }
    }],
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

module.exports = mongoose.model("MovieWatchlist", MovieWatchlistSchema);