const express = require('express');
const router = express.Router();
const refreshToken = require('../utils/refresh-token');
const viewsController = require('../controllers/views-controller');
const expressLayouts = require('express-ejs-layouts');

router.get('/', viewsController.renderViewIndex);

router.get('/login', viewsController.renderViewLogin);

router.get('/pengajuan-tambah', viewsController.renderViewTambahPengajuan);


router.get('/register', (req,res) => {
    res.render('register', {
        layout : 'layouts/main-layout',
        title : 'Register',
    });
});

router.get('/peminjaman', viewsController.renderViewPeminjaman);

module.exports = router;

