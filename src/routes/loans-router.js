const express = require('express');
const router = express.Router();
const loansController = require('../controllers/loans-controller');

router.get('/loans', loansController.getLoans);

module.exports = router;