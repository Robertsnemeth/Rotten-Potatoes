const MovieWatchlistController = require("../controllers/movie_watchlist.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/movie_watchlist', MovieWatchlistController.findAllMovieWatchlists);
    app.get('/api/movie_watchlist/:id', MovieWatchlistController.findSingleMovieWatchlist);
    app.put('/api/movie_watchlist/:id', MovieWatchlistController.updateMovieWatchlist);
    app.post('/api/movie_watchlist', MovieWatchlistController.createMovieWatchlist);
    app.delete('/api/movie_watchlist/:id', MovieWatchlistController.deleteMovieWatchlist);
}