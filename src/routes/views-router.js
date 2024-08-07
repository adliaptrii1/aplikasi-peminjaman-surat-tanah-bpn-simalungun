const express = require('express');
const router = express.Router();
const refreshToken = require('../utils/refresh-token');
const viewsController = require('../controllers/views-controller');
const expressLayouts = require('express-ejs-layouts');
const verifyToken = require('../middleware/verify-token');

router.get('/', viewsController.renderViewIndex);

router.get('/login', viewsController.renderViewLogin);

router.get('/pengajuan-tambah', viewsController.renderViewTambahPengajuan);

router.get('/pengajuan', viewsController.renderViewPengajuan);

router.get('/pengembalian', viewsController.renderViewPengembalian)

// router.get('/register', (req,res) => {
//     res.render('register', {
//         layout : 'layouts/main-layout',
//         title : 'Register',
//     });
// });

router.get('/peminjaman', viewsController.renderViewPeminjaman);

router.get('/berita-acara', viewsController.renderViewBeritaAcara);

router.get('/penandatangan', viewsController.renderViewPenandatangan);

router.get('/pengguna', viewsController.renderViewPengguna);

module.exports = router;

