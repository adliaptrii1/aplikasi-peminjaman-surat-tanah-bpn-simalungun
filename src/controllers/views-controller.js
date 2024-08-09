const axios = require('axios');
const dotenv = require('dotenv');
const { response } = require('express');
const jwt_decode = require('jwt-decode');

dotenv.config();

const getAlertMessage = (req) => {
    const alertMessage = req.cookies.alertMessage;
    let message = '';
    let isDanger = false;
    if (alertMessage) {
        const alert = JSON.parse(alertMessage);
        message = alert.message;
        isDanger = alert.isDanger;
    }


    return { message, isDanger };
}

const renderViewIndex = async (req, res) => {
    const { message, isDanger } = getAlertMessage(req);
    res.render('index', {
        layout : 'layouts/main-layout',
        title : 'Home',
        message,
        isDanger
    });
    
}

const renderViewLogin = async (req, res) => {
    const { message, isDanger } = getAlertMessage(req);

    res.render('login', {
        layout : 'layouts/main-layout',
        title : 'Login',
        message, 
        isDanger,
    });
}

const renderViewTambahPengajuan = async (req, res) => {
    const { message, isDanger } = getAlertMessage(req);

    res.render('pengajuan-tambah', {
        layout : 'layouts/main-layout',
        title : 'Tambah Pengajuan',
        message,
        isDanger,
    });
}

const renderViewPeminjaman = async (req, res) => {
    const { message, isDanger } = getAlertMessage(req);

    res.render('peminjaman', {
        layout : 'layouts/main-layout',
        title : 'Peminjaman',
        message,
        isDanger,
    });
}

const renderViewPengajuan = async (req,res) => {
    const { message, isDanger } = getAlertMessage(req);

    res.render('pengajuan', {
        layout : 'layouts/main-layout',
        title : 'Pengajuan',
        message,
        isDanger,
    });

}

const renderViewPengembalian = async (req,res) => {
    const { message, isDanger } = getAlertMessage(req);

    res.render('pengembalian', {
        layout : 'layouts/main-layout',
        title : 'Pengembalian',
        message,
        isDanger,
    });
}

const renderViewBeritaAcara = async (req,res) => {
    const { message, isDanger } = getAlertMessage(req);

    res.render('berita-acara', {
        layout : 'layouts/main-layout',
        title : 'Berita Acara',
        message,
        isDanger,
    });
}

const renderViewPenandatangan = async (req,res) => {
    const { message, isDanger } = getAlertMessage(req);

    res.render('penandatangan', {
        layout : 'layouts/main-layout',
        title : 'Penandatangan',
        message,
        isDanger,
    });
}

const renderViewPengguna = async (req,res) => {
    const { message, isDanger } = getAlertMessage(req);

    res.render('pengguna', {
        layout : 'layouts/main-layout',
        title : 'Pengguna',
        message,
        isDanger,
    });
}

const renderViewKecamatan = async (req,res) => {
    const { message, isDanger } = getAlertMessage(req);

    res.render('kecamatan', {
        layout : 'layouts/main-layout',
        title : 'Kecamatan',
        message,
        isDanger,
    });
}

const renderViewKelurahan = async (req,res) => {
    const { message, isDanger } = getAlertMessage(req);

    res.render('kelurahan', {
        layout : 'layouts/main-layout',
        title : 'Kelurahan',
        message,
        isDanger,
    });
}

const renderViewTipeHak = async (req,res) => {
    const { message, isDanger } = getAlertMessage(req);

    res.render('tipe-hak', {
        layout : 'layouts/main-layout',
        title : 'Tipe Hak',
        message,
        isDanger,
    });
}

const renderViewTipePelayanan = async (req,res) => {
    const { message, isDanger } = getAlertMessage(req);

    res.render('tipe-pelayanan', {
        layout : 'layouts/main-layout',
        title : 'Tipe Pelayanan',
        message,
        isDanger,
    });
}


module.exports = {
    renderViewIndex, 
    renderViewLogin, 
    renderViewTambahPengajuan, 
    renderViewPeminjaman,
    renderViewPengajuan,
    renderViewPengembalian,
    renderViewBeritaAcara,
    renderViewPenandatangan,
    renderViewPengguna,
    renderViewKecamatan,
    renderViewKelurahan,
    renderViewTipeHak,
    renderViewTipePelayanan
}