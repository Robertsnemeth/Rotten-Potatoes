const MovieWatchlist = require("../models/movie_watchlist.model");
const User = require("../models/user.model");

module.exports.findAllMovieWatchlists = (req, res) => {
    MovieWatchlist.find()
        .then(allMovieWatchlists => {res.json({movieWatchlists: allMovieWatchlists})})
        .catch(err => {res.json({message: "Something went wrong", error: err})})
};

module.exports.createMovieWatchlist = (req, res) => {
    MovieWatchlist.create(req.body)
        .then(newMovieWatchlist => {res.json({movieWatchlist: newMovieWatchlist})})
        .catch(err => {res.status(400).json({message: "Something went wrong", error: err})})
};

module.exports.findSingleMovieWatchlist = (req, res) => {
    MovieWatchlist.findOne({_id: req.params.id})
        .then(singleMovieWatchlist => {res.json({movieWatchlist: singleMovieWatchlist})})
        .catch(err => {res.json({message: "Something went wrong", error:err})})
};

module.exports.findSingleMovieWatchlistWithUser = (req, res) => {
    MovieWatchlist.find({user: req.params.user})
        .then(singleMovieWatchlist => {res.json({movieWatchlist: singleMovieWatchlist})})
        .catch(err => {res.json({message: "Something went wrong", error:err})})
};

module.exports.updateMovieWatchlist = (req, res) => {
    MovieWatchlist.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true, runValidators: true}
        )
        .then(updatedMovieWatchlist => {res.json({movieWatchlist: updatedMovieWatchlist})})
        .catch(err => {res.status(400).json({message: "Something went wrong", error: err})})
};

module.exports.deleteMovieWatchlist = (req, res) => {
    MovieWatchlist.deleteOne({_id: req.params.id})
        .then(deletedMovieWatchlist => res.json(deletedMovieWatchlist))
        .catch(err => {res.json({message: "Something went wrong", error: err})})
};