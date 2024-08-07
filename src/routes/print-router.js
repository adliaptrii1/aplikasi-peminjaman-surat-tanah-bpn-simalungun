const express = require('express');
const router = express.Router();
const printController = require('../controllers/print-controller');

router.post('/berita-acara/', printController.createBeritaAcara);

module.exports = router;