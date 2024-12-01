const express = require('express');
const { registerController, loginController, currentUserController } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Register route
router.post('/register',registerController)
// Login route
router.post('/login',loginController)
// Get current user
router.get('/current-user',authMiddleware,currentUserController)
module.exports = router