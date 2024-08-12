const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/views-controller');
const expressLayouts = require('express-ejs-layouts');


router.get('/', viewsController.renderViewIndex);

router.get('/login', viewsController.renderViewLogin);

router.get('/register', viewsController.renderViewRegister);

router.get('/pengajuan-tambah', viewsController.renderViewTambahPengajuan);

router.get('/pengajuan', viewsController.renderViewPengajuan);

router.get('/pengembalian', viewsController.renderViewPengembalian)

router.get('/kecamatan', viewsController.renderViewKecamatan);

router.get('/kelurahan', viewsController.renderViewKelurahan);

router.get('/tipe-hak', viewsController.renderViewTipeHak);

router.get('/tipe-pelayanan', viewsController.renderViewTipePelayanan);
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

router.get('/forgot-password', viewsController.renderViewForgotPassword);

router.get('/reset-password', viewsController.renderViewResetPassword);

module.exports = router;

