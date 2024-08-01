const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/services-controller');
// const verifyToken = require('../middleware/verify-token');
const isAdmin = require('../middleware/verify-admin');

router.get('/services', servicesController.getServices);
router.post('/services', servicesController.createServices);
router.get('/services/:id', servicesController.getServicesById);
router.put('/services/:id', servicesController.updateServices);
router.delete('/services/:id', servicesController.deleteServices);

module.exports = router;