const express = require('express');
const router = express.Router();
const kelurahanController = require('../controllers/kelurahan-controller');
// const verifyToken = require('../middleware/verify-token');
const isAdmin = require('../middleware/verify-admin');

router.get('/kelurahan', kelurahanController.getKelurahan);
router.post('/kelurahan', kelurahanController.createKelurahan);
router.get('/kelurahan/:id', kelurahanController.getKelurahanById);
router.put('/kelurahan/:id', kelurahanController.updateKelurahan);
router.delete('/kelurahan/:id', kelurahanController.deleteKelurahan);
router.post('/kelurahan-all/', kelurahanController.createArrayKelurahan);

module.exports = router;