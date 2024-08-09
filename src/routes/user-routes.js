const express = require('express');
const userController = require('../controllers/users-controller');
const router = express.Router();
const verifyToken = require('../middleware/verify-token');
const refreshToken = require('../controllers/refresh-token');
const isAdmin = require('../middleware/verify-admin');

// router.post('/users', userController.createUser);
router.get('/users', isAdmin, userController.getUsers);
router.post('/register', isAdmin, userController.Register);
router.post('/login', userController.Login);
router.get('/token', refreshToken);
router.delete('/logout', userController.Logout);
router.put('/users/:id', verifyToken, userController.UpdateUser);
router.delete('/users/:id', verifyToken, userController.DeleteUser);
// router.get('/users/:id', userController.getUser);
// router.put('/users/:id', userController.updateUser);
// router.delete('/users/:id', userController.deleteUser);

module.exports = router;
