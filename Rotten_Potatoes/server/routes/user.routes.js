const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/user', UserController.findAllUsers);
    app.get('/api/user/:id', UserController.findSingleUser);
    app.post('/api/user', UserController.createUser);
    app.post('/api/user/login', UserController.loginUser);
    app.delete('/api/user/:id', UserController.deleteUser);
};