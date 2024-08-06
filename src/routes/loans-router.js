const express = require('express');
const router = express.Router();
const loansController = require('../controllers/loans-controller');
const verifyToken = require('../middleware/verify-token');
const isAdmin = require('../middleware/verify-admin');

router.get('/loans', verifyToken, loansController.getLoans);
router.post('/loans', verifyToken,
    loansController.createLoans);

router.put('/loans/:id', verifyToken, loansController.upgradeLoans);

module.exports = router;