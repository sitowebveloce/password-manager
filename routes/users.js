const express = require('express');
const { signup, login, whoisin, logout } = require('../controllers/users');
// Protect and set REQ.USER
const { protect } = require('../middleware/auth');
const router = express.Router();
router
    .route('/signup')
    .post(signup);

router
    .route('/login')
    .post(login);

router
    .route('/whoisin')
    .get(protect, whoisin);

router
    .route('/logout')
    .get(protect, logout);


module.exports = router;