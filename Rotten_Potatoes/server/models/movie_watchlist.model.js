const mongoose = require('mongoose');

const MovieWatchlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Tile is required"]
    },
    movies: {
        type: []
    }
}, {timestamps: true});

module.exports = mongoose.model("Movie Watchlist", MovieWatchlistSchema);