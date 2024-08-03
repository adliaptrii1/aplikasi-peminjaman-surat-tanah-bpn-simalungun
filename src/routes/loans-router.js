const express = require('express');
const router = express.Router();
const loansController = require('../controllers/loans-controller');
const verifyToken = require('../middleware/verify-token');
const refreshToken = require('../controllers/refresh-token');

router.get('/loans', verifyToken, loansController.getLoans);
router.post('/loans', verifyToken,
    loansController.createLoans);

module.exports = router;