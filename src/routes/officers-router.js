const express = require('express');
const router = express.Router();
const officersController = require('../controllers/officers-controller');
// const verifyToken = require('../middleware/verify-token');
const verifyToken = require('../middleware/verify-token');

router.get('/officers', verifyToken, officersController.getOfficers);
router.post('/officers',verifyToken,  officersController.createOfficers);
router.get('/officers/:id', verifyToken, officersController.getOfficersById);
router.put('/officers/:id', verifyToken, officersController.updateOfficers);
router.delete('/officers/:id', verifyToken, officersController.deleteOfficers);

module.exports = router;


