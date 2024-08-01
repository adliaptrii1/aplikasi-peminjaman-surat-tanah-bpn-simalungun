const express = require('express');
const router = express.Router();
const rightsTypeController = require('../controllers/rights-type-controller');
// const verifyToken = require('../middleware/verify-token');
const isAdmin = require('../middleware/verify-admin');

router.get('/rights-type', rightsTypeController.getRightsType);
router.post('/rights-type', rightsTypeController.createRightsType);
router.get('/rights-type/:id', rightsTypeController.getRightsTypeById);
router.put('/rights-type/:id', rightsTypeController.updateRightsType);
router.delete('/rights-type/:id', rightsTypeController.deleteRightsType);

module.exports = router;