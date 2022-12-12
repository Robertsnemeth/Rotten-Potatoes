const mongoose = require('mongoose');

const MovieWatchlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Tile is required"]
    },
    movies: [{
        title: {
            type: String,
            required: [true, "Title is required"],
            minLength: [ 2, "Title must be at least 2 characters long"]
        },
        movie: {
            title: {
                type: String
            },
            poster: {
                type: String
            }
        },
        user: {
            type: Schema.Types.ObjectID,
            ref: "User"
        }
}]
}, {timestamps: true});

module.exports = mongoose.model("MovieWatchlist", MovieWatchlistSchema);