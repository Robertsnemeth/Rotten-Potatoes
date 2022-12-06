const UserController = require('../controllers/user.controller');
const { protect } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/rotten_potatoes/user', UserController.findAllUsers);
    app.get('/api/rotten_potatoes/current_user', protect, UserController.findSingleUser);
    app.post('/api/rotten_potatoes/user', UserController.createUser);
    app.put('/api/rotten_potatoes/user/:id', UserController.updateUser);
    app.post('/api/rotten_potatoes/user/login', UserController.loginUser);
    app.post('/api/rotten_potatoes/user/logout', UserController.logoutUser);
    app.delete('/api/rotten_potatoes/user/:id', UserController.deleteUser);
};