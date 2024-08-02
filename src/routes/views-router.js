const express = require('express');
const router = express.Router();
const refreshToken = require('../utils/refresh-token');
const viewsController = require('../controllers/views-controller');
const expressLayouts = require('express-ejs-layouts');

router.get('/', viewsController.renderViewIndex);

router.get('/login', viewsController.renderViewLogin);


router.get('/register', (req,res) => {
    res.render('register', {
        layout : 'layouts/main-layout',
        title : 'Register',
    });
});

router.get('/pengajuan', (req, res) => {
    res.render('pengajuan', {
        layout : 'layouts/main-layout',
        title : 'Pengajuan',
    });
});

router.get('/peminjaman', (req, res) => {
    res.render('peminjaman', {
        layout : 'layouts/main-layout',
        title : 'Peminjaman',
    });
});

module.exports = router;

