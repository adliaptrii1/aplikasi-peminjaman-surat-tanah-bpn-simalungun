const express = require('express');
const router = express.Router();
const kecamatanController = require('../controllers/kecamatan-controller');
// const verifyToken = require('../middleware/verify-token');
const isAdmin = require('../middleware/verify-admin');

router.get('/kecamatan', kecamatanController.getKecamatan);
router.post('/kecamatan', kecamatanController.createKecamatan);
router.get('/kecamatan/:id', kecamatanController.getKecamatanById);
router.put('/kecamatan/:id', kecamatanController.updateKecamatan);
router.delete('/kecamatan/:id', kecamatanController.deleteKecamatan);

module.exports = router;