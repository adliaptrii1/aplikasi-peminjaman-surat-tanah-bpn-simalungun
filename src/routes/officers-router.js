const express = require('express');
const router = express.Router();
const officersController = require('../controllers/officers-controller');
// const verifyToken = require('../middleware/verify-token');
const isAdmin = require('../middleware/verify-admin');

router.get('/officers', isAdmin, officersController.getOfficers);
router.post('/officers',isAdmin,  officersController.createOfficers);
router.get('/officers/:id', isAdmin, officersController.getOfficersById);
router.put('/officers/:id', isAdmin, officersController.updateOfficers);
router.delete('/officers/:id', isAdmin, officersController.deleteOfficers);

module.exports = router;


