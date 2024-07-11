const express = require('express');
const { loginController, signupController, allUsersController } = require('../controllers/userController');
const { protect }  = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.get('/', protect, allUsersController);

module.exports = router;