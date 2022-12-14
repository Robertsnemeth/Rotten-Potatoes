const MovieWatchlistController = require("../controllers/movie_watchlist.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/rotten_potatoes/movie_watchlist', MovieWatchlistController.findAllMovieWatchlists);
    app.get('/api/rotten_potatoes/movie_watchlist/:user', MovieWatchlistController.findSingleMovieWatchlistWithUser);
    app.get('/api/rotten_potatoes/movie_watchlist/v2/:id', MovieWatchlistController.findSingleMovieWatchlist);
    app.put('/api/rotten_potatoes/movie_watchlist/:id', MovieWatchlistController.updateMovieWatchlist);
    app.post('/api/rotten_potatoes/movie_watchlist', MovieWatchlistController.createMovieWatchlist);
    app.delete('/api/rotten_potatoes/movie_watchlist/:id', MovieWatchlistController.deleteMovieWatchlist);
}