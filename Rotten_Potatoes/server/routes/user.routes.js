const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/rotten_potato/user', UserController.findAllUsers);
    app.get('/api/rotten_potato/user/:id', UserController.findSingleUser);
    app.post('/api/rotten_potato/user', UserController.createUser);
    app.put('/api/rotten_potato/user/:id', UserController.updateUser);
    app.post('/api/rotten_potato/user/login', UserController.loginUser);
    app.delete('/api/rotten_potato/user/:id', UserController.deleteUser);
};